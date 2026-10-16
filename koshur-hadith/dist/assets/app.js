const TTS_SPACE = 'https://gaash-lab-matcha-tts-kashmiri-demo.hf.space';
const text = document.querySelector('#hadith-text');
const status = document.querySelector('#audio-status');
const audio = document.querySelector('#audio');
let record;
let language = 'kashmiri';
let records = [];
let recordIndex = 0;
const speechCache = new Map();

function render() {
  text.textContent = record[language];
  const english = language === 'english';
  text.lang = english ? 'en' : language === 'arabic' ? 'ar' : 'ks-Arab';
  text.dir = english ? 'ltr' : 'rtl';
  text.classList.toggle('english', english);
  document.querySelectorAll('.tab').forEach(button => {
    const active = button.dataset.language === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelector('#hadith-number').textContent = String(record.hadithNumber).padStart(2, '0');
  document.querySelector('#collection').textContent = record.collection;
  document.querySelector('#book').textContent = `Book of ${record.book}`;
  document.querySelector('#narrator').textContent = `${record.narratorKashmiri} چھِ روایت کَران:`;
  document.querySelector('#source-link').href = record.sourceUrl;
  document.querySelector('#review-link').href = `/proofread.html#${record.id}`;
  document.querySelector('#position').textContent = `Hadith ${record.hadithNumber} of ${records.length}`;
  const approved = record.translationStatus === 'approved-by-project-owner';
  const reviewStatus = document.querySelector('#review-status');
  reviewStatus.textContent = approved ? 'Reviewed and approved' : 'Draft · awaiting your review';
  reviewStatus.classList.toggle('verified', approved);
  reviewStatus.classList.toggle('draft', !approved);
  document.querySelector('#previous').disabled = recordIndex === 0;
  document.querySelector('#next').disabled = recordIndex === records.length - 1;
  history.replaceState(null, '', `#${record.id}`);
  audio.pause(); audio.hidden = true;
}

function selectRecord(index) {
  if (!records[index]) return;
  recordIndex = index; record = records[index]; render();
  document.querySelector('#reader').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function generateSpeech(value) {
  const quality = document.querySelector('#quality').value;
  const voice = document.querySelector('#voice').value;
  const cacheKey = `${voice}\0${quality}\0${value}`;
  if (speechCache.has(cacheKey)) return { url: speechCache.get(cacheKey), cached: true };
  const sessionHash = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);
  try {
  const joined = await fetch(`${TTS_SPACE}/gradio_api/queue/join`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    signal: controller.signal,
    body: JSON.stringify({ data: [value, false, voice, quality], fn_index: 0, session_hash: sessionHash })
  });
  if (!joined.ok) throw Error(`Speech service unavailable (${joined.status}).`);
  const { event_id: eventId } = await joined.json();
  const response = await fetch(`${TTS_SPACE}/gradio_api/queue/data?session_hash=${encodeURIComponent(sessionHash)}`, { signal: controller.signal, headers: { Accept: 'text/event-stream' } });
  if (!response.ok || !response.body) throw Error('Speech stream unavailable.');
  const reader = response.body.getReader(), decoder = new TextDecoder(); let buffer = '';
  while (true) {
    const chunk = await reader.read(); if (chunk.done) break;
    buffer += decoder.decode(chunk.value, { stream: true });
    const events = buffer.split('\n\n'); buffer = events.pop() || '';
    for (const event of events) {
      const line = event.split('\n').find(item => item.startsWith('data: ')); if (!line) continue;
      const message = JSON.parse(line.slice(6));
      if (message.event_id && message.event_id !== eventId) continue;
      if (message.msg === 'process_completed') {
        if (!message.success || message.output?.error) throw Error(message.output?.error || 'Speech generation failed.');
        const file = message.output.data?.[1];
        const url = typeof file === 'string' ? file : file?.url;
        if (!url && !file?.path) throw Error('The speech model returned no audio.');
        const audioUrl = url ? new URL(url, TTS_SPACE).href : `${TTS_SPACE}/gradio_api/file=${encodeURIComponent(file.path)}`;
        speechCache.set(cacheKey, audioUrl);
        return { url: audioUrl, cached: false };
      }
    }
  }
  throw Error('The speech service closed before returning audio.');
  } finally { clearTimeout(timeout); }
}

document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => { language = button.dataset.language; render(); }));
document.querySelector('#previous').addEventListener('click', () => selectRecord(recordIndex - 1));
document.querySelector('#next').addEventListener('click', () => selectRecord(recordIndex + 1));
document.querySelector('#copy').addEventListener('click', async event => {
  await navigator.clipboard.writeText(text.textContent);
  event.currentTarget.textContent = 'Copied'; setTimeout(() => event.currentTarget.textContent = 'Copy text', 1200);
});
document.querySelector('#listen').addEventListener('click', async event => {
  const button = event.currentTarget; button.disabled = true; button.textContent = 'Generating speech…';
  status.textContent = `Bolbosh is generating Sahih al-Bukhari Hadith ${record.hadithNumber} in Kashmiri…`; audio.hidden = true;
  try { const result = await generateSpeech(record.kashmiri); audio.src = result.url; audio.hidden = false; audio.load(); status.textContent = result.cached ? 'Kashmiri audio loaded instantly from this session.' : 'Kashmiri audio is ready.'; }
  catch (error) { status.textContent = error.name === 'AbortError' ? 'Speech generation timed out. Please try Fast mode.' : `${error.message} Please try again.`; }
  finally { button.disabled = false; button.innerHTML = '<span aria-hidden="true">◉</span> Listen in Kashmiri'; }
});

fetch('/data/hadiths.json').then(response => {
  if (!response.ok) throw Error('Hadith data could not be loaded.'); return response.json();
}).then(data => {
  records = data.records;
  const requested = location.hash.slice(1);
  recordIndex = Math.max(0, records.findIndex(item => item.id === requested));
  record = records[recordIndex];
  render();
}).catch(error => { text.textContent = error.message; status.textContent = 'Reload the page to try again.'; });
