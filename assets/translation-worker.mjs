import * as ort from 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.21.0/dist/ort.wasm.min.mjs';
import { PreTrainedTokenizer } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2';
import { prepareText, finishText, sentenceChunks } from './translation-text.mjs';

// Pin model snapshots: reproducible downloads, not mutable "main" weights.
const MODELS = {
  'en-ks': { repo: 'hari31416/indictrans2-en-indic-dist-200M-ONNX-int8', revision: '1eaa43a3fb76f382f1b22c76e56f6ab4926ad68b', bytes: 310000000, scale: '200M', src: 'eng_Latn', tgt: 'kas_Arab' },
  'ks-en': { repo: 'hari31416/indictrans2-indic-en-dist-200M-ONNX-int8', revision: 'a7ecdc0ba73148c6e1d051ca372332471d8aff4f', bytes: 265000000, scale: '200M', src: 'kas_Arab', tgt: 'eng_Latn' },
  'en-ks-large': { repo: 'hari31416/indictrans2-en-indic-1B-ONNX-int8', revision: '659294a223583c6bc8686facb8f0dc15d593b2d1', bytes: 1156000000, scale: '1B', src: 'eng_Latn', tgt: 'kas_Arab' },
  'ks-en-large': { repo: 'hari31416/indictrans2-indic-en-1B-ONNX-int8', revision: 'c468733c8368dac63497a1ca446d33588bc596c8', bytes: 1058000000, scale: '1B', src: 'kas_Arab', tgt: 'eng_Latn' },
};
ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.21.0/dist/';
ort.env.wasm.numThreads = 1; // Works on static hosting without cross-origin isolation.
let model = null, loaded = 0, lastProgress = 0;
const send = data => self.postMessage(data);

async function file(base, name, total) {
  const url = `${base}/${name}`;
  let cache;
  try { cache = await caches.open('koshur-models-v1'); } catch { /* storage may be disabled */ }
  let response = cache && await cache.match(url);
  const cached = Boolean(response);
  if (!response) response = await fetch(url, { signal: AbortSignal.timeout(240000) });
  if (!response.ok) throw Error(`Model download failed (${response.status}). Please retry on a stable connection.`);
  const reader = response.body.getReader(), chunks = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value); length += value.length; loaded += value.length;
    if (performance.now() - lastProgress > 200) {
      send({ type: 'progress', phase: 'download', loaded, total, label: name, cached });
      lastProgress = performance.now();
    }
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  if (cache && !cached) {
    try { await cache.put(url, new Response(bytes, { headers: { 'Content-Length': String(length) } })); }
    catch { send({ type: 'cache-warning', message: 'Browser storage is full or disabled. Translation works, but downloads may repeat.' }); }
  }
  return bytes;
}

async function load(direction, size = 'standard') {
  if (model?.direction === direction && model?.size === size) return model;
  if (model) { for (const session of [model.encoder, model.decoder, model.cachedDecoder]) await session.release(); model = null; }
  loaded = 0;
  const config = MODELS[direction + (size === 'large' ? '-large' : '')], base = `https://huggingface.co/${config.repo}/resolve/${config.revision}`;
  send({ type: 'progress', phase: 'download', loaded: 0, total: config.bytes, label: 'Translation model' });
  const json = async name => JSON.parse(new TextDecoder().decode(await file(base, name, config.bytes)));
  const meta = await json('tokenizer_meta.json');
  const srcJson = await json('tokenizer_src.json'), tgtJson = await json('tokenizer_tgt.json');
  const tokenizerConfig = { tokenizer_class: 'PreTrainedTokenizer', unk_token: '<unk>', eos_token: '</s>', pad_token: '<pad>', bos_token: '<s>' };
  const src = new PreTrainedTokenizer(srcJson, tokenizerConfig), tgt = new PreTrainedTokenizer(tgtJson, tokenizerConfig);
  const encoderData = await file(base, 'encoder_model.onnx.data', config.bytes);
  const decoderData = await file(base, 'decoder_shared.onnx.data', config.bytes);
  const encoderGraph = await file(base, 'encoder_model.onnx', config.bytes);
  const decoderGraph = await file(base, 'decoder_model.onnx', config.bytes);
  const cachedGraph = await file(base, 'decoder_with_past_model.onnx', config.bytes);
  send({ type: 'progress', phase: 'initialize', label: 'Preparing neural model…' });
  const options = (name, data) => ({ executionProviders: ['wasm'], graphOptimizationLevel: 'all',
    externalData: [{ path: name, data }] });
  const sessions = [];
  try {
    sessions.push(await ort.InferenceSession.create(encoderGraph, options('encoder_model.onnx.data', encoderData)));
    sessions.push(await ort.InferenceSession.create(decoderGraph, options('decoder_shared.onnx.data', decoderData)));
    sessions.push(await ort.InferenceSession.create(cachedGraph, options('decoder_shared.onnx.data', decoderData)));
  } catch (error) { for (const session of sessions) await session.release(); throw error; }
  model = { direction, size, ...config, meta, src, tgt, srcTag: srcJson.model.vocab[config.src], tgtTag: srcJson.model.vocab[config.tgt],
    encoder: sessions[0], decoder: sessions[1], cachedDecoder: sessions[2] };
  if (!Number.isInteger(model.srcTag) || !Number.isInteger(model.tgtTag)) throw Error('Unsupported language tags in the downloaded model.');
  return model;
}

const tensor = ids => new ort.Tensor('int64', BigInt64Array.from(ids, BigInt), [1, ids.length]);
function pastFeeds(outputs) {
  const feeds = {};
  for (const [key, value] of Object.entries(outputs)) if (key.startsWith('present.')) feeds[key.replace('present.', 'past_key_values.')] = value;
  return feeds;
}

function candidates(logits, tokens, width = 3) {
  const data = logits.data, size = logits.dims.at(-1), offset = data.length - size;
  let maximum = -Infinity;
  for (let i = 0; i < size; i++) maximum = Math.max(maximum, data[offset + i]);
  let sum = 0;
  for (let i = 0; i < size; i++) sum += Math.exp(data[offset + i] - maximum);
  const normalizer = maximum + Math.log(sum), best = [];
  for (let id = 0; id < size; id++) {
    if (id === 0 || id === 1 || (tokens.length === 1 && id === 2)) continue;
    // Block already-seen four-token phrases to reduce runaway repetition.
    if (tokens.length >= 4 && tokens.some((_, i) => i + 3 < tokens.length && tokens[i] === tokens.at(-3) && tokens[i + 1] === tokens.at(-2) && tokens[i + 2] === tokens.at(-1) && tokens[i + 3] === id)) continue;
    const score = data[offset + id] - normalizer;
    if (best.length < width || score > best.at(-1).score) {
      best.push({ id, score }); best.sort((a, b) => b.score - a.score); if (best.length > width) best.pop();
    }
  }
  return best;
}

async function translateChunk(text, m, width = 3) {
  const prepared = prepareText(text, m.direction);
  const encoded = await m.src(` ${prepared.text}`);
  const ids = [m.srcTag, m.tgtTag, ...Array.from(encoded.input_ids.data, n => Number(n) < m.meta.src_dict_size ? Number(n) : m.meta.unk_id)];
  if (ids.length > 256) throw Error('One sentence is too long for this model. Split it into shorter sentences; no text has been silently truncated.');
  const inputIds = tensor(ids), attention = tensor(ids.map(() => 1));
  const encodedOutputs = await m.encoder.run({ input_ids: inputIds, attention_mask: attention });
  const hidden = encodedOutputs.last_hidden_state;
  let beams = [{ tokens: [2], score: 0, past: null }], completed = [], endedNormally = false;
  const rank = beam => beam.score / Math.pow(Math.max(1, beam.tokens.length - 1), 1);
  try {
    for (let step = 0; step < 128; step++) {
      const expansions = [];
      for (const beam of beams) {
        const tokenInput = tensor([beam.tokens.at(-1)]);
        const feeds = { input_ids: tokenInput, encoder_attention_mask: attention };
        if (beam.past) Object.assign(feeds, pastFeeds(beam.past)); else feeds.encoder_hidden_states = hidden;
        const outputs = await (beam.past ? m.cachedDecoder : m.decoder).run(feeds);
        tokenInput.dispose();
        for (const next of candidates(outputs.logits, beam.tokens, width * 2)) {
          const candidate = { tokens: [...beam.tokens, next.id], score: beam.score + next.score, past: outputs };
          expansions.push(candidate);
        }
        outputs.logits.dispose();
      }
      expansions.sort((a, b) => b.score - a.score); beams = [];
      for (let i = 0; i < expansions.length && beams.length < width; i++) {
        const candidate = expansions[i];
        if (candidate.tokens.at(-1) === 2) {
          // A low-ranked EOS must not end a higher-probability live hypothesis.
          if (i < width) completed.push({ ...candidate, past: null });
        } else beams.push(candidate);
      }
      completed.sort((a, b) => rank(b) - rank(a)); completed = completed.slice(0, width);
      if (!beams.length || completed.length === width && rank(completed.at(-1)) >= beams[0].score / (step + 1)) { endedNormally = true; break; }
    }
    const winner = completed[0] || beams.sort((a, b) => rank(b) - rank(a))[0];
    const outputIds = winner.tokens.map(id => id < m.meta.tgt_dict_size ? id : m.meta.unk_id);
    const decoded = await m.tgt.decode(outputIds, { skip_special_tokens: true });
    return { text: finishText(decoded, m.direction, prepared.entities), limited: !endedNormally };
  } finally { inputIds.dispose(); attention.dispose(); hidden.dispose(); }
}

self.onmessage = async ({ data }) => {
  if (data.type !== 'translate') return;
  try {
    if (!MODELS[data.direction] || !data.text?.trim() || data.text.length > 1000) throw Error('Enter up to 1,000 characters of English or Perso-Arabic Kashmiri.');
    const m = await load(data.direction, data.size === 'large' ? 'large' : 'standard'), chunks = sentenceChunks(data.text, data.direction), translated = [];
    let limited = false;
    for (let i = 0; i < chunks.length; i++) {
      send({ type: 'progress', phase: 'translate', label: `Translating sentence ${i + 1} of ${chunks.length}…` });
      const result = await translateChunk(chunks[i], m, data.beams === 1 ? 1 : 3); translated.push(result.text); limited ||= result.limited;
      send({ type: 'partial', text: translated.join('\n') });
    }
    send({ type: 'result', text: translated.join('\n'), limited, model: `IndicTrans2 · ${m.scale} · INT8 · beam ${data.beams === 1 ? 1 : 3}` });
  } catch (error) { send({ type: 'error', message: error.message || 'Translation failed. Try a shorter sentence or reload in a current desktop browser.' }); }
};
