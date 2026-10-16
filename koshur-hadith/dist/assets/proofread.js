const TTS_SPACE = 'https://gaash-lab-matcha-tts-kashmiri-demo.hf.space';
const editor = document.querySelector('#proof-text');
const status = document.querySelector('#speech-status');
const audio = document.querySelector('#proof-audio');
let baseline = '';
let records = [];
const speechCache = new Map();
const esc = value => String(value || '').replace(/[&<>"']/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[character]));
const reviewedForms = [
  { avoid: 'سَچ', prefer: 'پوٚز', note: 'Project-owner preference for “true/real”.' },
  { avoid: 'پَننِس سۭتۍ کھؠن', prefer: 'پانَس سۭتۍ کھؠن', note: 'Reviewed Hadith 3 construction.' },
  { avoid: 'مَتھَس پؠٹھ', prefer: 'ڑٮ۪کَس پؠٹھ', note: 'Reviewed word for “on the forehead”.' },
  { avoid: 'پَسینٕچۍ ٹیٚپھٕ', prefer: 'عٲرَق', note: 'Reviewed vocabulary for sweat.' },
  { avoid: 'دَرٛاو بہٕ', prefer: 'روٚٹُس بہٕ', note: 'Reviewed narration wording.' },
  { avoid: 'رضی اللہ عنہا نِش', prefer: 'رَضِیَ اللہُ عَنْہاؠس نِش', note: 'Reviewed respectful oblique form.' }
];

function renderReview() {
  const value = editor.value;
  document.querySelector('#count').textContent = `${value.length} characters`;
  const found = reviewedForms.filter(rule => value.includes(rule.avoid));
  document.querySelector('#suggestions').innerHTML = found.length ? found.map(rule => `<div class="suggestion"><strong>${rule.avoid} ⟶ ${rule.prefer}</strong><span>${rule.note}</span></div>`).join('') : '<p>No stored correction pattern detected. This does not certify the grammar.</p>';
  if (!baseline) return;
  const before = baseline.split(/\s+/), after = value.split(/\s+/); const rows = [];
  const length = Math.max(before.length, after.length);
  for (let i = 0; i < length && rows.length < 30; i++) if (before[i] !== after[i]) rows.push(`<div><span class="token-old">${esc(before[i] || '∅')}</span> → <span class="token-new">${esc(after[i] || '∅')}</span></div>`);
  document.querySelector('#changes').innerHTML = rows.length ? rows.join('') : '<p>No changes from the comparison copy.</p>';
}

async function generateSpeech(value) {
  const voice = document.querySelector('#proof-voice').value, quality = document.querySelector('#proof-quality').value;
  const key = `${voice}\0${quality}\0${value}`; if (speechCache.has(key)) return { url: speechCache.get(key), cached: true };
  const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 120000);
  try {
    const sessionHash = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    const joined = await fetch(`${TTS_SPACE}/gradio_api/queue/join`, { method:'POST', headers:{'Content-Type':'application/json'}, signal:controller.signal, body:JSON.stringify({data:[value,false,voice,quality],fn_index:0,session_hash:sessionHash}) });
    if (!joined.ok) throw Error(`Speech service unavailable (${joined.status}).`);
    const { event_id:eventId } = await joined.json();
    const response = await fetch(`${TTS_SPACE}/gradio_api/queue/data?session_hash=${encodeURIComponent(sessionHash)}`, { signal:controller.signal, headers:{Accept:'text/event-stream'} });
    if (!response.ok || !response.body) throw Error('Speech stream unavailable.');
    const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='';
    while(true){const chunk=await reader.read();if(chunk.done)break;buffer+=decoder.decode(chunk.value,{stream:true});const events=buffer.split('\n\n');buffer=events.pop()||'';for(const event of events){const line=event.split('\n').find(item=>item.startsWith('data: '));if(!line)continue;const message=JSON.parse(line.slice(6));if(message.event_id&&message.event_id!==eventId)continue;if(message.msg==='process_completed'){if(!message.success||message.output?.error)throw Error(message.output?.error||'Speech generation failed.');const file=message.output.data?.[1],url=typeof file==='string'?file:file?.url;if(!url&&!file?.path)throw Error('No audio returned.');const audioUrl=url?new URL(url,TTS_SPACE).href:`${TTS_SPACE}/gradio_api/file=${encodeURIComponent(file.path)}`;speechCache.set(key,audioUrl);return{url:audioUrl,cached:false};}}}
    throw Error('Speech service closed before returning audio.');
  } finally { clearTimeout(timeout); }
}

editor.addEventListener('input', renderReview);
document.querySelector('#remember').addEventListener('click', event => { baseline=editor.value; event.currentTarget.textContent='Comparison saved'; setTimeout(()=>event.currentTarget.textContent='Set comparison copy',1200); renderReview(); });
document.querySelector('#copy-proof').addEventListener('click', async event => { await navigator.clipboard.writeText(editor.value); event.currentTarget.textContent='Copied'; setTimeout(()=>event.currentTarget.textContent='Copy',1200); });
document.querySelector('#load-hadith').addEventListener('click', () => { const requested=location.hash.slice(1);const selected=records.find(item=>item.id===requested)||records.at(-1);if(selected){editor.value=selected.kashmiri;baseline=selected.kashmiri;renderReview();} });
document.querySelector('#playback-rate').addEventListener('change', event => { audio.playbackRate=Number(event.target.value); });
document.querySelector('#proof-listen').addEventListener('click', async event => { if(!editor.value.trim()){editor.focus();return;}const button=event.currentTarget;button.disabled=true;button.textContent='Generating…';status.textContent='Bolbosh is generating Kashmiri speech…';audio.hidden=true;try{const result=await generateSpeech(editor.value.trim());audio.src=result.url;audio.playbackRate=Number(document.querySelector('#playback-rate').value);audio.hidden=false;audio.load();status.textContent=result.cached?'Loaded instantly from this session.':'Audio ready. Listen slowly for spelling and wording problems.';}catch(error){status.textContent=error.name==='AbortError'?'Timed out. Try Fast mode or a shorter passage.':`${error.message} Try again.`;}finally{button.disabled=false;button.textContent='Generate speech';} });

fetch('/data/hadiths.json').then(response=>response.json()).then(data=>{records=data.records;const selected=records.at(-1);editor.value=selected?.kashmiri||'';baseline=editor.value;renderReview();}).catch(()=>{renderReview();});
