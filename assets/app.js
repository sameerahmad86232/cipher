import { buildIndex, searchIndex, normalize as norm, fold } from './dictionary-search.mjs';
import { transliterateKashmiri } from './transliteration.mjs';
import { autocorrectKashmiri } from './kashmiri-text.mjs';
import { transliterateUnknownEnglish } from './translation-text.mjs';
import { analyzeSentence, applyGrammarOutput } from './grammar-engine.mjs';

const $ = selector => document.querySelector(selector);
const input = $('#search-input'), results = $('#results'), statusEl = $('#dictionary-status');
const esc = value => String(value || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const read = key => { try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value.filter(x => typeof x === 'string') : []; } catch { return []; } };
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Private browser: dictionary still works. */ } };
const sourceLink = row => { try { const url = new URL(row.url); return url.protocol === 'https:' ? `<a class="entry-source" href="${esc(url.href)}" target="_blank" rel="noopener noreferrer">${esc(row.s)} · ${esc(row.license)}</a>` : ''; } catch { return ''; } };
let words = [], historicalWords = [], bookOcr = [], schoolOcr = null, kashirOcr = null, readingOcr = null, englishTokens = new Set(), matches = [], visible = 12, collection = '', browse = '', debounce;
const filters = () => ({ script: $('#script-filter').value, source: $('#source-filter').value, pos: $('#pos-filter').value });

function sense(row) {
  const examples = row.examples?.length ? row.examples : row.kx ? [{ k: row.kx, e: row.x }] : [];
  const meaning = row.ocrVocabulary ? 'OCR vocabulary word' : row.e;
  const note = row.ocrVocabulary ? '<p class="sense-context">Added from corrected OCR text. The source does not provide an English definition for this word.</p>' : '';
  const refs = row.references || [];
  const shownRefs = refs.slice(0, 5).map(ref => `<a class="entry-source" href="${esc(ref.url)}" target="_blank" rel="noopener noreferrer">Checked in ${esc(ref.s)}</a>`).join('');
  const moreRefs = refs.length > 5 ? `<details class="ocr-references"><summary>${refs.length - 5} more OCR occurrences</summary>${refs.slice(5).map(ref => `<a class="entry-source" href="${esc(ref.url)}" target="_blank" rel="noopener noreferrer">Checked in ${esc(ref.s)}</a>`).join('')}</details>` : '';
  return `<div class="sense"><p class="meaning">${esc(meaning)} ${row.p ? `<span class="pos">${esc(row.p)}</span>` : ''}</p>${note}
    ${row.fullMeaning ? `<details class="historical-entry"><summary>Read full historical entry</summary><p>${esc(row.fullMeaning)}</p></details>` : ''}
    ${row.context ? `<p class="sense-context">${esc(row.context)}</p>` : ''}
    ${row.grammar?.length ? `<p class="word-details">${esc(row.grammar.join(' · '))}</p>` : ''}
    ${row.ocrTransliteration ? `<p class="ocr-transliteration">${esc(row.ocrTransliteration)} <span>· OCR-derived transliteration</span></p>` : ''}
    ${examples.map(x => `<p class="kashmiri-example" lang="ks-Arab" dir="rtl">${esc(x.k)}</p><p class="example">${esc(x.e)}</p>`).join('')}
    ${row.romanExample ? `<p class="roman-example" lang="ks-Latn">${esc(row.romanExample.k)} <span>· romanized Kashmiri</span></p><p class="example">${esc(row.romanExample.e)}</p>` : ''}
    ${!examples.length && !row.romanExample && row.x ? `<p class="example">${esc(row.x)}</p>` : ''}${sourceLink(row)}${(row.sources || []).filter(s => s.url !== row.url).map(sourceLink).join(' ')}${shownRefs}${moreRefs}</div>`;
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
    const text = page.normalizedText || page.text || '', folded = norm(text);
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
function searchSchoolOcr(query) {
  if (!schoolOcr) return [];
  const q = norm(query), pages = [];
  for (const page of schoolOcr.pages || []) {
    const text = page.text || '', folded = norm(text);
    if (q && !folded.includes(q)) continue;
    const at = q ? folded.indexOf(q) : 0;
    const snippet = text.replace(/\s+/g, ' ').slice(Math.max(0, at - 190), Math.max(0, at - 190) + 520).trim();
    const book = (schoolOcr.books || []).find(item => item.id === page.book) || {};
    pages.push({ k: `${book.title || page.book} · PDF page ${page.page}`, arabic: false, forms: [], senses: [{ e: snippet || '(This scanned page contains no OCR text.)', ocrTransliteration: transliterateKashmiri(snippet), p: `Machine OCR · ${page.grade || ''}${page.part ? ` · ${page.part}` : ''}`, s: book.creator || 'Open Kashmiri book', url: book.source || 'https://archive.org/', license: `${book.license || 'Open license'} · OCR requires review` }] });
  }
  return pages;
}
async function loadSchoolOcr() {
  if (schoolOcr?.pages?.length) return true;
  const response = await fetch('/assets/kashmiri-school-textbooks-ocr.json');
  if (!response.ok) throw Error('Open-book OCR download failed');
  schoolOcr = await response.json();
  return Boolean(schoolOcr.pages?.length);
}
function searchKashirOcr(query) {
  if (!kashirOcr) return [];
  const q = norm(query), pages = [];
  for (const page of kashirOcr.pages || []) {
    const text = page.normalizedText || page.text || '', folded = norm(text);
    if (q && !folded.includes(q)) continue;
    const at = q ? folded.indexOf(q) : 0;
    const start = q ? Math.max(0, at - 190) : 0;
    const snippet = text.replace(/\s+/g, ' ').slice(start, start + 520).trim();
    const book = (kashirOcr.books || []).find(item => item.id === page.book) || {};
    pages.push({ k: `${book.title || page.book} · PDF page ${page.page}`, arabic: false, forms: [], senses: [{ e: snippet || '(This scanned page contains no OCR text.)', ocrTransliteration: transliterateKashmiri(snippet), p: 'Machine OCR · reference dictionary', s: book.creator || 'Kashir Dictionary', url: `${book.source || 'https://archive.org/'}\/page\/n${Math.max(0, page.page - 1)}\/mode\/1up`, license: `${book.license || 'Source license not stated'} · OCR requires review` }] });
  }
  return pages;
}
async function loadKashirOcr() {
  if (kashirOcr?.pages?.length) return true;
  const response = await fetch('/assets/kashir-dictionary-ocr.json');
  if (!response.ok) throw Error('Kashir Dictionary OCR download failed');
  kashirOcr = await response.json();
  return Boolean(kashirOcr.pages?.length);
}
function searchReadingOcr(query) {
  if (!readingOcr) return [];
  const q = norm(query), pages = [];
  for (const page of readingOcr.pages || []) {
    const text = page.normalizedText || page.text || '', folded = norm(text);
    if (q && !folded.includes(q)) continue;
    const at = q ? folded.indexOf(q) : 0;
    const snippet = text.replace(/\s+/g, ' ').slice(q ? Math.max(0, at - 190) : 0, q ? Math.max(0, at - 190) + 520 : 520).trim();
    const book = (readingOcr.books || []).find(item => item.id === page.book) || {};
    pages.push({ k: `${book.title || page.book} · PDF page ${page.page}`, arabic: false, forms: [], senses: [{ e: snippet || '(This scanned page contains no OCR text.)', ocrTransliteration: transliterateKashmiri(snippet), p: `Machine OCR · ${book.category || 'reading source'}`, s: book.creator || 'Kashmiri reading source', url: `${book.source || 'https://archive.org/'}\/page\/n${Math.max(0, page.page - 1)}\/mode\/1up`, license: `${book.license || 'Source license not stated'} · OCR requires review` }] });
  }
  return pages;
}
async function loadReadingOcr() {
  if (readingOcr?.pages?.length) return true;
  const response = await fetch('/assets/kashmiri-reading-ocr.json');
  if (!response.ok) throw Error('Reading-library OCR download failed');
  readingOcr = await response.json();
  return Boolean(readingOcr.pages?.length);
}
function render() {
  const label = ['book-ocr', 'school-ocr', 'kashir-ocr', 'reading-ocr'].includes(collection) ? 'page' : 'headword';
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
  matches = collection === 'book-ocr' ? searchBookOcr(q) : collection === 'school-ocr' ? searchSchoolOcr(q) : collection === 'kashir-ocr' ? searchKashirOcr(q) : collection === 'reading-ocr' ? searchReadingOcr(q) : searchIndex(collection === 'historical' ? historicalWords : words, q, filters());
  if (collection === 'calendar') matches = matches.filter(w => w.senses.some(s => s.topic === 'calendar'));
  if (browse) matches = matches.filter(w => $('#alphabet-select').value === 'en' ? w.senses.some(s => norm(s.e).startsWith(norm(browse))) : fold(w.k).startsWith(fold(browse)));
  $('#results-title').textContent = q ? `Results for “${q}”` : collection === 'calendar' ? 'Days & calendar' : collection === 'historical' ? 'Historical romanized dictionary' : collection === 'book-ocr' ? 'Koul book OCR' : collection === 'school-ocr' ? 'Open Kashmiri books OCR' : collection === 'kashir-ocr' ? 'Kashir Dictionary · seven-volume OCR' : collection === 'reading-ocr' ? 'Grammar, textbooks and translations' : browse ? `Words beginning with ${browse}` : 'Featured words';
  $('#results-eyebrow').textContent = collection === 'historical' ? 'HISTORICAL ROMANIZED KASHMIRI · GRIERSON' : collection === 'book-ocr' ? 'MACHINE OCR · 140 SCANNED PAGES' : collection === 'school-ocr' ? 'MACHINE OCR · OPEN LICENSED KASHMIRI BOOKS' : collection === 'kashir-ocr' ? 'MACHINE OCR · 2,710 REFERENCE-DICTIONARY PAGES' : collection === 'reading-ocr' ? 'MACHINE OCR · 1,393 READING PAGES' : q ? 'DICTIONARY SEARCH' : collection || browse ? 'EXPLORE THE DICTIONARY' : 'START EXPLORING';
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
$('#browse-school-ocr').addEventListener('click', async () => {
  input.value = ''; browse = ''; collection = 'school-ocr';
  $('#script-filter').value = 'all'; $('#pos-filter').value = 'all'; $('#source-filter').value = 'all';
  if (!schoolOcr?.pages?.length) {
    $('#results-title').textContent = 'Loading open Kashmiri book OCR…';
    try { await loadSchoolOcr(); } catch { $('#results-title').textContent = 'Open-book OCR unavailable'; return; }
  }
  search();
});
$('#browse-kashir-ocr').addEventListener('click', async () => {
  input.value = ''; browse = ''; collection = 'kashir-ocr';
  $('#script-filter').value = 'all'; $('#pos-filter').value = 'all'; $('#source-filter').value = 'all';
  if (!kashirOcr?.pages?.length) {
    $('#results-title').textContent = 'Loading seven-volume Kashir Dictionary OCR…';
    try { await loadKashirOcr(); } catch { $('#results-title').textContent = 'Kashir Dictionary OCR unavailable'; return; }
  }
  search();
});
$('#browse-reading-ocr').addEventListener('click', async () => {
  input.value = ''; browse = ''; collection = 'reading-ocr';
  $('#script-filter').value = 'all'; $('#pos-filter').value = 'all'; $('#source-filter').value = 'all';
  if (!readingOcr?.pages?.length) {
    $('#results-title').textContent = 'Loading grammar, textbook and translation OCR…';
    try { await loadReadingOcr(); } catch { $('#results-title').textContent = 'Reading-library OCR unavailable'; return; }
  }
  search();
});
for (const id of ['script-filter', 'source-filter', 'pos-filter']) $(`#${id}`).addEventListener('change', () => search());
input.addEventListener('input', () => { clearTimeout(debounce); if (!['historical', 'book-ocr', 'school-ocr', 'kashir-ocr', 'reading-ocr'].includes(collection)) collection = ''; browse = ''; debounce = setTimeout(search, 60); });
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

// Server-side neural translation runs in the public Hugging Face Space.
const TRANSLATOR_SPACE = 'https://sameer0313-koshur-lughat.hf.space';
const sentenceInput = $('#sentence-input'), output = $('#sentence-output'), note = $('#translation-note'), run = $('#translate-sentence');
let direction = 'ks-en', busy = false, translated = '', activeController;
const initialNote = 'Text is sent to the public server translator; this browser does not download a translation model. The server returns translation, normalization, transliteration and a grammar review. AI translations can be wrong; review important text with a fluent speaker.';
function countSentence() { $('#sentence-count').textContent = `${sentenceInput.value.length} / 1,000`; }
function renderSourceTransliteration() {
  const box = $('#source-transliteration');
  if (direction === 'ks-en' && sentenceInput.value.trim()) {
    box.hidden = false;
    const corrected = autocorrectKashmiri(sentenceInput.value.trim());
    box.textContent = `Normalized Kashmiri: ${corrected} · Romanized reading: ${transliterateKashmiri(corrected)}`;
  } else { box.hidden = true; box.textContent = ''; }
  renderGrammarNote();
}
function renderGrammarNote(value) {
  const text = sentenceInput?.value?.trim() || '';
  $('#grammar-note').textContent = value || (text ? analyzeSentence(text, direction).summary : 'Grammar-aware checks will appear as you type.');
}
function renderTranslation(text) {
  output.replaceChildren();
  if (direction === 'en-ks' && text) {
    const native = document.createElement('span'); native.className = 'translated-script'; native.textContent = text;
    const roman = document.createElement('span'); roman.className = 'translation-translit'; roman.textContent = `Romanized reading: ${transliterateKashmiri(text)}`;
    output.append(native, roman);
  } else output.textContent = text;
}
function applyUnknownEnglishFallback(source, result) {
  if (direction !== 'en-ks') return { text: result, words: [] };
  const unknown = [...source.matchAll(/\b[A-Za-z][A-Za-z'-]{2,}\b/g)].map(match => match[0]).filter((word, index, all) => {
    const key = word.toLowerCase().replace(/^['-]|['-]$/g, '');
    return key && !englishTokens.has(key) && all.findIndex(item => item.toLowerCase() === word.toLowerCase()) === index;
  });
  let text = result, added = [];
  for (const word of unknown) {
    const native = transliterateUnknownEnglish(word);
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = new RegExp(`\\b${escaped}\\b`, 'i');
    if (match.test(text)) text = text.replace(match, native);
    else if (!text.includes(native)) added.push(`${native} (${word})`);
  }
  if (added.length) text = `${text} · ${added.join(' · ')}`;
  return { text, words: unknown };
}
function setBusy(value) {
  busy = value; run.disabled = value; sentenceInput.disabled = value; $('#swap-languages').disabled = value;
  $('#source-language').disabled = value; $('#target-language').disabled = value; $('#example-sentence').disabled = value;
  run.textContent = value ? 'Working on server…' : 'Translate sentence';
  $('#cancel-translation').hidden = !value;
}
function setDirection(next) {
  if (busy) return;
  const swap = next !== direction; direction = next; const english = next === 'en-ks';
  $('#source-language').textContent = english ? 'English' : 'Kashmiri'; $('#target-language').textContent = english ? 'Kashmiri' : 'English';
  $('#source-label').textContent = `${english ? 'English' : 'Kashmiri'} sentence`; $('#target-label').textContent = `${english ? 'Kashmiri' : 'English'} translation`;
  if (swap) sentenceInput.value = translated || '';
  sentenceInput.dir = english ? 'ltr' : 'rtl'; sentenceInput.lang = english ? 'en' : 'ks-Arab';
  sentenceInput.placeholder = english ? 'Type an English sentence here…' : 'اَتہِ کٲشُر جُملہٕ لِکھِو…';
  output.dir = english ? 'rtl' : 'ltr'; output.lang = english ? 'ks-Arab' : 'en'; output.textContent = 'Your translation will appear here.'; output.classList.add('empty');
  renderSourceTransliteration(); translated = ''; $('#copy-translation').disabled = true; note.textContent = initialNote;
  $('#example-sentence').textContent = english ? 'The weather is good today.' : 'مےٚ پٔر اَکھ کِتاب'; countSentence(); setBusy(false);
}
function stop() {
  activeController?.abort(); activeController = undefined; translated = ''; output.textContent = 'Translation stopped.'; output.classList.add('empty');
  $('#copy-translation').disabled = true; note.textContent = 'Stopped. The server request was cancelled.'; setBusy(false);
}
async function serverTranslate(text) {
  const controller = new AbortController(); activeController = controller;
  const sessionHash = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
  const serverDirection = direction === 'ks-en' ? 'Kashmiri → English' : 'English → Kashmiri';
  const joined = await fetch(`${TRANSLATOR_SPACE}/gradio_api/queue/join`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
    body: JSON.stringify({ data: [text, serverDirection], fn_index: 0, session_hash: sessionHash })
  });
  if (!joined.ok) throw new Error(`Server queue rejected the request (${joined.status}).`);
  const { event_id: eventId } = await joined.json();
  const response = await fetch(`${TRANSLATOR_SPACE}/gradio_api/queue/data?session_hash=${encodeURIComponent(sessionHash)}`, { signal: controller.signal, headers: { Accept: 'text/event-stream' } });
  if (!response.ok || !response.body) throw new Error(`Server stream unavailable (${response.status}).`);
  const reader = response.body.getReader(), decoder = new TextDecoder(); let buffer = '';
  while (true) {
    const chunk = await reader.read(); if (chunk.done) break; buffer += decoder.decode(chunk.value, { stream: true });
    const events = buffer.split('\n\n'); buffer = events.pop() || '';
    for (const event of events) {
      const line = event.split('\n').find(item => item.startsWith('data: ')); if (!line) continue;
      const message = JSON.parse(line.slice(6)); if (message.event_id && message.event_id !== eventId) continue;
      if (message.msg === 'process_starts') note.textContent = 'Server model is translating…';
      if (message.msg === 'process_completed') {
        if (!message.success || message.output?.error) throw new Error(message.output?.error || 'The server could not complete this translation.');
        return message.output.data;
      }
      if (message.msg === 'close_stream') break;
    }
  }
  throw new Error('The server closed the translation stream before returning a result.');
}
$('#swap-languages').addEventListener('click', () => setDirection(direction === 'ks-en' ? 'en-ks' : 'ks-en'));
for (const id of ['source-language', 'target-language']) $(`#${id}`).addEventListener('click', () => {
  const next = $(`#${id}`).textContent === 'English' ? 'en-ks' : 'ks-en'; if (next !== direction) setDirection(next);
});
sentenceInput.addEventListener('input', () => { countSentence(); renderSourceTransliteration(); renderGrammarNote(); });
$('#example-sentence').addEventListener('click', () => { sentenceInput.value = $('#example-sentence').textContent; countSentence(); renderSourceTransliteration(); sentenceInput.focus(); });
$('#lookup-koul').addEventListener('click', async () => {
  const text = sentenceInput.value.trim();
  if (!text) { sentenceInput.focus(); return; }
  const button = $('#lookup-koul'); button.disabled = true; button.textContent = 'Loading Koul references…';
  try { await loadBookOcr(); renderKoulReferences(text); } catch { $('#koul-references').hidden = false; $('#koul-references').innerHTML = '<p><strong>Koul OCR unavailable</strong><span>Try again after checking your connection.</span></p>'; }
  button.disabled = false; button.textContent = 'Look up Koul book references';
});
run.addEventListener('click', async () => {
  const text = sentenceInput.value.trim(); if (!text) { sentenceInput.focus(); return; }
  if (direction === 'ks-en' && !/\p{Script=Arabic}/u.test(text)) { note.textContent = 'For Kashmiri → English, enter Perso-Arabic Kashmiri. Romanized sentence translation is not supported by this model.'; return; }
  translated = ''; $('#copy-translation').disabled = true; setBusy(true); note.textContent = 'Sending your sentence to the server…';
  try {
    const [serverOutput, normalized, romanized, grammar] = await serverTranslate(text);
    const grammarOutput = applyGrammarOutput(serverOutput, text, direction);
    const fallback = applyUnknownEnglishFallback(text, grammarOutput);
    translated = fallback.text; renderTranslation(translated); output.classList.remove('empty'); $('#copy-translation').disabled = !translated;
    if (direction === 'ks-en' && normalized) $('#source-transliteration').textContent = `Normalized Kashmiri: ${normalized} · Romanized reading: ${romanized}`;
    renderGrammarNote(grammar); note.textContent = `Server model: NLLB-200 600M. ${fallback.words.length ? `Unknown English words were rendered in Kashmiri script: ${fallback.words.join(', ')}. ` : ''}Automatic translation—check grammar, names and meaning with a fluent speaker.`;
  } catch (error) {
    if (error.name !== 'AbortError') { translated = ''; output.textContent = 'No completed translation.'; output.classList.add('empty'); $('#copy-translation').disabled = true; note.textContent = error.message || 'The server translation failed.'; }
  } finally { activeController = undefined; setBusy(false); }
});
$('#cancel-translation').addEventListener('click', stop);
$('#copy-translation').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(translated); $('#copy-translation').textContent = 'Copied'; setTimeout(() => $('#copy-translation').textContent = 'Copy', 1200); }
  catch { note.textContent = 'Clipboard unavailable. Select and copy the translation manually.'; }
});
setDirection(direction);

Promise.all(['/assets/dictionary.json', ...Array.from({ length: 8 }, (_, index) => `/assets/dictionary-kashir-${index + 1}.json`)].map(file => fetch(file).then(response => { if (!response.ok) throw Error(`Dictionary download failed: ${file}`); return response.json(); }))).then(parts => {
  const records = parts.flat();
  words = buildIndex(records);
  englishTokens = new Set(records.flatMap(record => [record.e, record.x, ...(record.examples || []).flatMap(example => [example.e])]).flatMap(text => String(text || '').toLowerCase().match(/[a-z][a-z'-]*/g) || []));
  const meanings = words.reduce((n, w) => n + w.senses.length, 0), forms = new Set(words.flatMap(w => w.forms.map(f => norm(f.word))));
  statusEl.textContent = `${words.length.toLocaleString()} searchable headwords`;
  $('#dictionary-stats').textContent = `${words.length.toLocaleString()} headwords · ${meanings.toLocaleString()} meanings · ${forms.size.toLocaleString()} sourced word forms`;
  $('#dictionary-total').textContent = records.length.toLocaleString(); search();
}).catch(() => { statusEl.textContent = 'Dictionary unavailable'; results.innerHTML = '<div class="empty-state"><strong>Could not load the dictionary</strong><span>Refresh to retry. The translator remains available.</span></div>'; });
