import { buildIndex, searchIndex, normalize as norm, fold } from './dictionary-search.mjs';
import { transliterateKashmiri } from './transliteration.mjs';

const $ = selector => document.querySelector(selector);
const input = $('#search-input'), results = $('#results'), statusEl = $('#dictionary-status');
const esc = value => String(value || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const read = key => { try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value.filter(x => typeof x === 'string') : []; } catch { return []; } };
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Private browser: dictionary still works. */ } };
const sourceLink = row => { try { const url = new URL(row.url); return url.protocol === 'https:' ? `<a class="entry-source" href="${esc(url.href)}" target="_blank" rel="noopener noreferrer">${esc(row.s)} · ${esc(row.license)}</a>` : ''; } catch { return ''; } };
let words = [], historicalWords = [], bookOcr = [], matches = [], visible = 12, collection = '', browse = '', debounce;
const filters = () => ({ script: $('#script-filter').value, source: $('#source-filter').value, pos: $('#pos-filter').value });

function sense(row) {
  const examples = row.examples?.length ? row.examples : row.kx ? [{ k: row.kx, e: row.x }] : [];
  return `<div class="sense"><p class="meaning">${esc(row.e)} ${row.p ? `<span class="pos">${esc(row.p)}</span>` : ''}</p>
    ${row.fullMeaning ? `<details class="historical-entry"><summary>Read full historical entry</summary><p>${esc(row.fullMeaning)}</p></details>` : ''}
    ${row.context ? `<p class="sense-context">${esc(row.context)}</p>` : ''}
    ${row.grammar?.length ? `<p class="word-details">${esc(row.grammar.join(' · '))}</p>` : ''}
    ${examples.map(x => `<p class="kashmiri-example" lang="ks-Arab" dir="rtl">${esc(x.k)}</p><p class="example">${esc(x.e)}</p>`).join('')}
    ${row.romanExample ? `<p class="roman-example" lang="ks-Latn">${esc(row.romanExample.k)} <span>· romanized Kashmiri</span></p><p class="example">${esc(row.romanExample.e)}</p>` : ''}
    ${!examples.length && !row.romanExample && row.x ? `<p class="example">${esc(row.x)}</p>` : ''}${sourceLink(row)}${(row.sources || []).filter(s => s.url !== row.url).map(sourceLink).join(' ')}${(row.references || []).map(ref => `<a class="entry-source" href="${esc(ref.url)}" target="_blank" rel="noopener noreferrer">Checked in ${esc(ref.s)}</a>`).join(' ')}</div>`;
}
function card(word) {
  const primary = word.senses.find(s => s.tr || s.ipa) || word.senses[0];
  const displayedTransliteration = primary.tr || primary.ipa || (!word.arabic ? word.k : '');
  const forms = word.forms.filter(f => norm(f.word) !== norm(word.k));
  const related = [...new Set(word.senses.flatMap(s => [...(s.synonyms || []), ...(s.antonyms || [])]))];
  return `<article class="word-card"><div class="headword"><p class="kashmiri-word" lang="${word.arabic ? 'ks-Arab' : 'ks-Latn'}" dir="${word.arabic ? 'rtl' : 'ltr'}">${esc(word.k)}</p></div>
    <div>${displayedTransliteration ? `<p class="word-details pronunciation">${esc(displayedTransliteration)} ${primary.tr && primary.ipa ? esc(primary.ipa) : ''}${primary.trGenerated ? ' <span class="generated-label">orthography-derived</span>' : ''}</p>` : ''}
    ${word.senses.slice(0, 3).map(sense).join('')}
    ${word.senses.length > 3 ? `<details><summary>${word.senses.length - 3} more meanings</summary>${word.senses.slice(3).map(sense).join('')}</details>` : ''}
    ${forms.length ? `<details class="word-forms"><summary>${new Set(forms.map(f => f.word)).size} inflected / alternate forms</summary><div>${forms.map(f => `<p><button data-query="${esc(f.word)}" class="form-word" lang="ks-Arab" dir="rtl">${esc(f.word)}</button> <span class="form-translit">${esc(transliterateKashmiri(f.word))}</span> <span>${esc((f.tags || []).join(' · '))}</span></p>`).join('')}</div></details>` : ''}
    ${related.length ? `<details><summary>Related words</summary>${related.map(k => `<button class="form-word" data-query="${esc(k)}" lang="ks-Arab">${esc(k)}</button>`).join(' ')}</details>` : ''}
    ${primary.etymology ? `<details><summary>Etymology</summary><p class="etymology">${esc(primary.etymology)}</p></details>` : ''}</div></article>`;
}
function searchBookOcr(query) {
  const q = norm(query), pages = [];
  for (const page of bookOcr) {
    const text = page.text || '', folded = norm(text);
    if (q && !folded.includes(q)) continue;
    const at = q ? folded.indexOf(q) : 0;
    const start = q ? Math.max(0, at - 190) : 0;
    const snippet = text.replace(/\s+/g, ' ').slice(start, start + (q ? 520 : 520)).trim();
    pages.push({ k: `PDF page ${page.page}`, arabic: false, forms: [], senses: [{ e: snippet || '(This scanned page contains no OCR text.)', p: 'Machine OCR', s: 'Koul, Raina & Bhat (2000)', url: `https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul/page/n${page.page - 1}/mode/1up`, license: 'Rights-holder permission (reported by project owner)' }] });
  }
  return pages;
}
async function loadBookOcr() {
  if (bookOcr.length) return true;
  const response = await fetch('/assets/koul-book-ocr.json');
  if (!response.ok) throw Error('Book OCR download failed');
  bookOcr = (await response.json()).pages || [];
  return Boolean(bookOcr.length);
}
function render() {
  const label = collection === 'book-ocr' ? 'page' : 'headword';
  $('#result-count').textContent = `${matches.length.toLocaleString()} ${label}${matches.length === 1 ? '' : 's'}`;
  results.innerHTML = matches.length ? matches.slice(0, visible).map(card).join('') : '<div class="empty-state"><strong>No matching words found</strong><span>Try a shorter spelling, clear your filters, or search the other language.</span></div>';
  $('#load-more').hidden = visible >= matches.length;
}
function renderRecent() {
  const items = read('koshur-recent'); $('.recent-block').hidden = !items.length;
  $('#recent-list').innerHTML = items.map(q => `<button data-query="${esc(q)}">${esc(q)}</button>`).join('');
}
function remember(query) {
  if (query.length < 2) return;
  write('koshur-recent', [query, ...read('koshur-recent').filter(q => q !== query)].slice(0, 6)); renderRecent();
}
function search(commit = false) {
  visible = 12; const q = input.value.trim(); $('#clear-button').hidden = !q;
  matches = collection === 'book-ocr' ? searchBookOcr(q) : searchIndex(collection === 'historical' ? historicalWords : words, q, filters());
  if (collection === 'calendar') matches = matches.filter(w => w.senses.some(s => s.topic === 'calendar'));
  if (browse) matches = matches.filter(w => $('#alphabet-select').value === 'en' ? w.senses.some(s => norm(s.e).startsWith(norm(browse))) : fold(w.k).startsWith(fold(browse)));
  $('#results-title').textContent = q ? `Results for “${q}”` : collection === 'calendar' ? 'Days & calendar' : collection === 'historical' ? 'Historical romanized dictionary' : collection === 'book-ocr' ? 'Koul book OCR' : browse ? `Words beginning with ${browse}` : 'Featured words';
  $('#results-eyebrow').textContent = collection === 'historical' ? 'HISTORICAL ROMANIZED KASHMIRI · GRIERSON' : collection === 'book-ocr' ? 'MACHINE OCR · 140 SCANNED PAGES' : q ? 'DICTIONARY SEARCH' : collection || browse ? 'EXPLORE THE DICTIONARY' : 'START EXPLORING';
  if (!q && !collection && !browse) matches = matches.slice(0, 12);
  if (commit) remember(q); render();
}
function query(value) {
  input.value = value; collection = ''; browse = ''; $('#letter-list .active')?.classList.remove('active'); search();
}
function letters() {
  const alphabet = $('#alphabet-select').value === 'en' ? [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'] : ['ا', 'ٲ', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ڈ', 'ذ', 'ر', 'ڑ', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ہ', 'ی'];
  $('#letter-list').innerHTML = alphabet.map(k => `<button data-letter="${esc(k)}">${esc(k)}</button>`).join('');
}
$('#alphabet-select').addEventListener('change', () => { browse = ''; letters(); search(); });
$('#letter-list').addEventListener('click', e => {
  const button = e.target.closest('[data-letter]'); if (!button) return;
  input.value = ''; collection = ''; browse = button.dataset.letter;
  $('#letter-list .active')?.classList.remove('active'); button.classList.add('active'); search();
});
$('#browse-calendar').addEventListener('click', () => { input.value = ''; browse = ''; collection = 'calendar'; search(); });
$('#browse-historical').addEventListener('click', async () => {
  input.value = ''; browse = ''; collection = 'historical';
  $('#script-filter').value = 'all'; $('#pos-filter').value = 'all'; $('#source-filter').value = 'all';
  if (!historicalWords.length) {
    $('#results-title').textContent = 'Loading historical dictionary…';
    try {
      const response = await fetch('/assets/historical-lexicon.json');
      if (!response.ok) throw Error('Download failed');
      historicalWords = buildIndex(await response.json());
    } catch { $('#results-title').textContent = 'Historical dictionary unavailable'; return; }
  }
  search();
});
$('#browse-koul-ocr').addEventListener('click', async () => {
  input.value = ''; browse = ''; collection = 'book-ocr';
  $('#script-filter').value = 'all'; $('#pos-filter').value = 'all'; $('#source-filter').value = 'all';
  if (!bookOcr.length) {
    $('#results-title').textContent = 'Loading complete book OCR…';
    try { await loadBookOcr(); } catch { $('#results-title').textContent = 'Book OCR unavailable'; return; }
  }
  search();
});
for (const id of ['script-filter', 'source-filter', 'pos-filter']) $(`#${id}`).addEventListener('change', () => search());
input.addEventListener('input', () => { clearTimeout(debounce); if (!['historical', 'book-ocr'].includes(collection)) collection = ''; browse = ''; debounce = setTimeout(search, 60); });
input.addEventListener('keydown', e => { if (e.key === 'Enter') search(true); });
input.addEventListener('blur', () => remember(input.value.trim()));
$('#clear-button').addEventListener('click', () => { query(''); input.focus(); });
$('#load-more').addEventListener('click', () => { visible += 20; render(); });
for (const element of [results, $('#recent-list')]) element.addEventListener('click', e => {
  const button = e.target.closest('[data-query]'); if (button) { query(button.dataset.query); input.focus(); }
});
$('#clear-recent').addEventListener('click', () => { write('koshur-recent', []); renderRecent(); });
function showView(view) {
  if (!['dictionary', 'translator', 'about'].includes(view)) view = 'dictionary';
  for (const name of ['dictionary', 'translator', 'about']) $(`#${name}-view`).hidden = name !== view;
  document.querySelectorAll('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  history.replaceState(null, '', `#${view}`); window.scrollTo({ top: 0 });
}
document.querySelectorAll('.nav-link').forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
document.addEventListener('keydown', e => {
  if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) { e.preventDefault(); showView('dictionary'); input.focus(); }
});
letters(); renderRecent(); showView(location.hash.slice(1));

// Neural translation is independent of dictionary loading and runs off the UI thread.
const sentenceInput = $('#sentence-input'), output = $('#sentence-output'), note = $('#translation-note'), run = $('#translate-sentence'), progress = $('#model-progress');
let direction = 'ks-en', worker, busy = false, cacheWarning = '', readyDirection = '', translated = '';
const initialNote = 'First use downloads about 260–310 MB per direction and caches the model when storage allows. Text stays in this browser. AI translations can be wrong; review important text with a fluent speaker.';
const modelKey = () => `${direction}|${$('#model-size').value}`;
const modelNote = () => $('#model-size').value === 'large' ? 'Large mode downloads about 1.1–1.2 GB per direction. Use a desktop with at least 8 GB RAM; unsupported devices may run out of memory. Greater model capacity does not guarantee a correct translation.' : initialNote;
function countSentence() { $('#sentence-count').textContent = `${sentenceInput.value.length} / 1,000`; }
function renderSourceTransliteration() {
  const box = $('#source-transliteration');
  if (direction === 'ks-en' && sentenceInput.value.trim()) {
    box.hidden = false;
    box.textContent = `Romanized reading: ${transliterateKashmiri(sentenceInput.value.trim())}`;
  } else { box.hidden = true; box.textContent = ''; }
}
function renderTranslation(text) {
  output.replaceChildren();
  if (direction === 'en-ks' && text) {
    const native = document.createElement('span'); native.className = 'translated-script'; native.textContent = text;
    const roman = document.createElement('span'); roman.className = 'translation-translit'; roman.textContent = `Romanized reading: ${transliterateKashmiri(text)}`;
    output.append(native, roman);
  } else output.textContent = text;
}
function renderKoulReferences(query) {
  const box = $('#koul-references'), q = norm(query);
  if (!q) { box.hidden = true; box.innerHTML = ''; return; }
  const tokens = [...q.matchAll(/[\p{L}\p{M}][\p{L}\p{M}'’ʼ-]{2,}/gu)].map(match => match[0]).filter((token, i, all) => all.indexOf(token) === i).slice(0, 12);
  const hits = bookOcr.map(page => {
    const text = page.text || '', folded = norm(text), token = tokens.find(t => folded.includes(t));
    if (!token) return null;
    const at = folded.indexOf(token), snippet = text.replace(/\s+/g, ' ').slice(Math.max(0, at - 90), at + 260).trim();
    return { page: page.page, snippet };
  }).filter(Boolean).slice(0, 5);
  box.hidden = false;
  box.innerHTML = hits.length ? `<p><strong>Koul book references</strong> <span>These OCR matches provide source context; they do not alter the neural model output.</span></p>${hits.map(hit => `<a href="https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul/page/n${hit.page - 1}/mode/1up" target="_blank" rel="noopener noreferrer"><strong>PDF page ${hit.page}</strong><span>${esc(hit.snippet)}</span></a>`).join('')}` : '<p><strong>No Koul OCR match found</strong><span>Search the separate Koul book OCR collection for the full page text.</span></p>';
}
function setBusy(value) {
  busy = value; run.disabled = value; sentenceInput.disabled = value; $('#swap-languages').disabled = value; $('#cancel-translation').hidden = !value; $('#clear-model-cache').disabled = value;
  $('#source-language').disabled = value; $('#target-language').disabled = value; $('#example-sentence').disabled = value;
  $('#model-size').disabled = value;
  run.textContent = value ? 'Working…' : readyDirection === modelKey() ? 'Translate sentence' : 'Download model & translate';
}
function setDirection(next) {
  if (busy) return;
  const swap = next !== direction; direction = next; const english = next === 'en-ks';
  if (swap) { worker?.terminate(); worker = undefined; readyDirection = ''; } // Release WASM memory before loading the other model.
  $('#source-language').textContent = english ? 'English' : 'Kashmiri'; $('#target-language').textContent = english ? 'Kashmiri' : 'English';
  $('#source-label').textContent = `${english ? 'English' : 'Kashmiri'} sentence`; $('#target-label').textContent = `${english ? 'Kashmiri' : 'English'} translation`;
  if (swap) sentenceInput.value = translated || '';
  sentenceInput.dir = english ? 'ltr' : 'rtl'; sentenceInput.lang = english ? 'en' : 'ks-Arab';
  sentenceInput.placeholder = english ? 'Type an English sentence here…' : 'اَتہِ کٲشُر جُملہٕ لِکھِو…';
  output.dir = english ? 'rtl' : 'ltr'; output.lang = english ? 'ks-Arab' : 'en'; output.textContent = 'Your translation will appear here.'; output.classList.add('empty');
  renderSourceTransliteration();
  translated = ''; $('#copy-translation').disabled = true; note.textContent = modelNote(); progress.hidden = true;
  $('#example-sentence').textContent = english ? 'The weather is good today.' : 'مےٚ پٔر اَکھ کِتاب'; countSentence(); setBusy(false);
}
function stop() {
  worker?.terminate(); worker = undefined; readyDirection = ''; translated = ''; output.textContent = 'Translation stopped.'; output.classList.add('empty'); $('#copy-translation').disabled = true;
  progress.hidden = true; note.textContent = 'Stopped. Any completed model downloads remain cached in this browser.'; setBusy(false);
}
function getWorker() {
  if (worker) return worker;
  worker = new Worker('/assets/translation-worker.mjs', { type: 'module' });
  worker.onmessage = ({ data }) => {
    if (data.type === 'progress') {
      progress.hidden = data.phase !== 'download';
      if (data.phase === 'download') { progress.value = Math.min(99, data.loaded / data.total * 100); note.textContent = `${data.cached ? 'Reading cached model' : 'Downloading model'} · ${(data.loaded / 1000000).toFixed(0)} / ~${(data.total / 1000000).toFixed(0)} MB`; }
      else note.textContent = data.label;
    }
    if (data.type === 'cache-warning') cacheWarning = data.message;
    if (data.type === 'partial') { renderTranslation(data.text); output.classList.remove('empty'); }
    if (data.type === 'result') {
      translated = data.text; renderTranslation(translated); output.classList.remove('empty'); $('#copy-translation').disabled = !translated;
      readyDirection = modelKey(); progress.hidden = true;
      note.textContent = `${data.model}. ${data.limited ? 'Output reached the model limit and may be incomplete. ' : ''}Automatic translation—check grammar, names and meaning with a fluent speaker. ${cacheWarning}`;
      setBusy(false);
    }
    if (data.type === 'error') {
      translated = ''; output.textContent = 'No completed translation.'; output.classList.add('empty'); $('#copy-translation').disabled = true; progress.hidden = true;
      note.textContent = data.message; worker.terminate(); worker = undefined; readyDirection = ''; setBusy(false);
    }
  };
  worker.onerror = event => { stop(); note.textContent = `Could not start the translation engine. Try a current desktop Chrome, Edge or Firefox browser and check your connection. ${event.message || ''}`; };
  return worker;
}
$('#swap-languages').addEventListener('click', () => setDirection(direction === 'ks-en' ? 'en-ks' : 'ks-en'));
for (const id of ['source-language', 'target-language']) $(`#${id}`).addEventListener('click', () => {
  const next = $(`#${id}`).textContent === 'English' ? 'en-ks' : 'ks-en'; if (next !== direction) setDirection(next);
});
sentenceInput.addEventListener('input', () => { countSentence(); renderSourceTransliteration(); });
$('#example-sentence').addEventListener('click', () => { sentenceInput.value = $('#example-sentence').textContent; countSentence(); sentenceInput.focus(); });
$('#lookup-koul').addEventListener('click', async () => {
  const text = sentenceInput.value.trim();
  if (!text) { sentenceInput.focus(); return; }
  const button = $('#lookup-koul'); button.disabled = true; button.textContent = 'Loading Koul references…';
  try { await loadBookOcr(); renderKoulReferences(text); } catch { $('#koul-references').hidden = false; $('#koul-references').innerHTML = '<p><strong>Koul OCR unavailable</strong><span>Try again after checking your connection.</span></p>'; }
  button.disabled = false; button.textContent = 'Look up Koul book references';
});
run.addEventListener('click', () => {
  const text = sentenceInput.value.trim(); if (!text) { sentenceInput.focus(); return; }
  if (direction === 'ks-en' && !/\p{Script=Arabic}/u.test(text)) { note.textContent = 'For Kashmiri → English, enter Perso-Arabic Kashmiri. Romanized sentence translation is not supported by this model.'; return; }
  translated = ''; $('#copy-translation').disabled = true; cacheWarning = ''; setBusy(true);
  try { getWorker().postMessage({ type: 'translate', text, direction, size: $('#model-size').value }); } catch (error) { stop(); note.textContent = error.message; }
});
$('#cancel-translation').addEventListener('click', stop);
$('#model-size').addEventListener('change', () => { worker?.terminate(); worker = undefined; readyDirection = ''; translated = ''; output.textContent = 'Your translation will appear here.'; output.classList.add('empty'); $('#copy-translation').disabled = true; note.textContent = modelNote(); setBusy(false); });
$('#clear-model-cache').addEventListener('click', async () => {
  if (busy) return;
  worker?.terminate(); worker = undefined; readyDirection = '';
  try { await caches.delete('koshur-models-v1'); note.textContent = 'Downloaded translation models cleared from this browser. The dictionary and recent searches are unchanged.'; } catch { note.textContent = 'This browser does not allow model cache management.'; }
  setBusy(false);
});
$('#copy-translation').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(translated); $('#copy-translation').textContent = 'Copied'; setTimeout(() => $('#copy-translation').textContent = 'Copy', 1200); }
  catch { note.textContent = 'Clipboard unavailable. Select and copy the translation manually.'; }
});
setDirection(direction);

fetch('/assets/dictionary.json').then(response => { if (!response.ok) throw Error('Dictionary download failed'); return response.json(); }).then(records => {
  words = buildIndex(records);
  const meanings = words.reduce((n, w) => n + w.senses.length, 0), forms = new Set(words.flatMap(w => w.forms.map(f => norm(f.word))));
  statusEl.textContent = `${words.length.toLocaleString()} searchable headwords`;
  $('#dictionary-stats').textContent = `${words.length.toLocaleString()} headwords · ${meanings.toLocaleString()} meanings · ${forms.size.toLocaleString()} sourced word forms`;
  $('#dictionary-total').textContent = records.length.toLocaleString(); search();
}).catch(() => { statusEl.textContent = 'Dictionary unavailable'; results.innerHTML = '<div class="empty-state"><strong>Could not load the dictionary</strong><span>Refresh to retry. The translator remains available.</span></div>'; });
