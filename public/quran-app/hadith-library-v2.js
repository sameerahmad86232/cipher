/* Sahih al-Bukhari 1–100: reviewed Kashmiri originals + clearly labelled new drafts.
 * Local review notes only; no silent uploads or automatic owner-approval.
 */
(() => {
  'use strict';
  const URLS = ['/quran-app/bukhari-1-20.json', '/quran-app/bukhari-21-58.json', '/quran-app/bukhari-59-100.json'];
  const STORAGE_KEY = 'koshur-bukhari-feedback-v1';
  const PAGE_SIZE = 18;
  let records = [], loaded = false, loading = false, error = '';
  let search = '', statusFilter = 'all', visibleCount = PAGE_SIZE;
  let expanded = new Set([1]), notes = {};
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); if (saved && typeof saved.notes === 'object' && saved.notes) notes = saved.notes; } catch (_) {}
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const isDraft = h => h.translationStatus !== 'approved-by-project-owner';
  function persist() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify({notes})); } catch (_) {} }
  function filtered() {
    const term = search.trim().toLocaleLowerCase();
    return records.filter(h => (statusFilter === 'all' || (statusFilter === 'draft' ? isDraft(h) : !isDraft(h))) &&
      (!term || [h.number, h.title, h.narrator, h.kashmiri, h.book].some(x => String(x ?? '').toLocaleLowerCase().includes(term))));
  }
  function intro() {
    return '<div class="bh-review-intro"><div class="bh-review-ornament" aria-hidden="true">۞</div>' +
      '<span class="section-eyebrow">SAHIH AL-BUKHARI · KASHMIRI COLLECTION</span>' +
      '<h2>100 narrations. One careful reading journey.</h2>' +
      '<p>Read Sahih al-Bukhari 1–100 in Kashmiri. Narrations 1–26 preserve the previously owner-approved translations. Narrations 27–100 are new <strong>unreviewed drafts</strong> — compare with the original Arabic and suggest corrections before treating them as final.</p>' +
      '<div class="bh-highlights"><span>100 numbered narrations</span><span>26 earlier approved translations</span><span>74 Kashmiri drafts for review</span></div></div>';
  }
  function toolbar() {
    return intro() + '<div class="bh-toolbar"><label class="bh-search"><span aria-hidden="true">⌕</span>' +
      '<input id="bh-search" type="search" value="' + esc(search) + '" placeholder="Search number, narrator, topic or Kashmiri" aria-label="Search Bukhari narration"></label>' +
      '<div class="bh-filters" role="group" aria-label="Filter translation review status">' +
      [['all','All 100'],['approved','Approved 26'],['draft','Review drafts 74']].map(([id,label]) =>
        '<button type="button" data-bh-filter="' + id + '" class="' + (statusFilter === id ? 'active' : '') +
        '" aria-pressed="' + (statusFilter === id) + '">' + label + '</button>').join('') + '</div></div>';
  }
  function card(h) {
    const open = expanded.has(h.number), n = h.number, note = String(notes[n] ?? '');
    const draft = isDraft(h), label = draft ? 'Draft · needs review' : 'Owner-reviewed';
    return '<article class="bh-card" id="bukhari-' + n + '">' +
      '<div class="bh-card-heading"><span class="bh-number">' + String(n).padStart(3,'0') + '</span>' +
      '<div class="bh-card-title"><span class="bh-book">' + esc(h.book) + ' · HADITH ' + n + '</span>' +
      '<h3>' + esc(h.title) + '</h3><p>Narrated by ' + esc(h.narrator) + '</p></div>' +
      '<span class="bh-status ' + (draft ? 'bh-draft' : 'bh-approved') + '">' + label + '</span></div>' +
      '<button type="button" class="bh-expand" data-bh-expand="' + n + '" aria-expanded="' + open +
      '" aria-controls="bh-content-' + n + '">' + (open ? 'Hide translation' : 'Read Kashmiri translation') +
      '<span aria-hidden="true">' + (open ? '−' : '+') + '</span></button>' +
      '<div class="bh-detail" id="bh-content-' + n + '"' + (open ? '' : ' hidden') + '>' +
      (draft ? '<div class="bh-review-disclaimer" role="note">Unreviewed Kashmiri translation draft. Vocabulary was previously reviewed, but the full narration has not been approved. Check the Arabic and source before citing.</div>' : '') +
      '<div class="bh-script-label"><span>KASHMIRI · کٲشُر</span><span>Hadith ' + n + '</span></div>' +
      '<div class="bh-kashmiri" lang="ks-Arab" dir="rtl">' + esc(h.kashmiri).replace(/\n/g,'<span class="bh-break"></span>') + '</div>' +
      (h.arabic ? '<details class="bh-arabic-original"><summary>Read the Arabic original</summary><div lang="ar" dir="rtl" class="bh-arabic-text">' + esc(h.arabic) + '</div></details>' : '') +
      '<div class="bh-source"><span>' + (draft ? 'AI-assisted Kashmiri draft · full review pending' : 'Previously approved Kashmiri translation') +
      '</span><a href="' + esc(h.sourceUrl) + '" target="_blank" rel="noopener noreferrer">Sunnah.com reference ↗</a></div>' +
      '<section class="bh-correction"><h4>Suggest a Kashmiri correction</h4>' +
      '<p>Your note stays in this browser until you explicitly copy and share it. It will not change the published translation automatically.</p>' +
      '<label for="bh-note-' + n + '">Incorrect phrase → Your corrected wording</label>' +
      '<textarea id="bh-note-' + n + '" rows="3" data-bh-note="' + n + '" placeholder="Write your Kashmiri correction…">' + esc(note) + '</textarea>' +
      '<div class="bh-correction-actions"><button type="button" class="btn btn-outline" data-bh-copy="' + n + '">Copy correction</button>' +
      '<span id="bh-save-status-' + n + '">' + (note.trim() ? 'Saved locally' : 'Not submitted') + '</span></div></section></div></article>';
  }
  function footer() {
    const count = Object.values(notes).filter(x => String(x).trim()).length;
    return '<div class="bh-review-footer"><h3>Your review notes</h3>' +
      '<p>All corrections remain on this device. Copy and share them for editorial review; nothing is auto-submitted or auto-approved.</p>' +
      '<div class="bh-review-footer-actions"><button type="button" class="btn btn-green" data-bh-export>Copy all corrections (' + count + ')</button>' +
      '<button type="button" class="btn btn-outline" data-bh-clear>Clear my local notes</button></div>' +
      '<textarea id="bh-export-text" class="bh-fallback" hidden aria-label="Copy review text manually"></textarea>' +
      '<div id="bh-save-toast" class="bh-toast" role="status" hidden></div></div>';
  }
  function renderResults() {
    const el = document.getElementById('bh-results');
    if (!el) return;
    const found = filtered(), shown = found.slice(0,visibleCount);
    el.innerHTML = '<div class="bh-count">' + found.length + ' matching narrations · showing ' + shown.length + '</div>' +
      '<div class="bh-grid">' + (shown.map(card).join('') || '<div class="bh-empty">No narrations match your search.</div>') + '</div>' +
      (found.length > shown.length ? '<div class="bh-more-wrap"><button type="button" class="btn btn-outline" data-bh-more>Show more (' + (found.length-shown.length) + ' remaining)</button></div>' : '');
  }
  function list() {
    const root = document.getElementById('hadith-library');
    if (!root) return;
    if (error) { root.innerHTML = '<div class="bh-error">Could not load the Hadith collection. ' + esc(error) + ' <button type="button" data-bh-retry>Retry</button></div>'; return; }
    if (!loaded) { root.innerHTML = '<div class="bh-loading">Loading Sahih al-Bukhari 1–100…</div>'; return; }
    root.innerHTML = toolbar() + '<div id="bh-results"></div>' + footer();
    renderResults();
  }
  async function load() {
    if (loading) return;
    loading = true; error = ''; list();
    try {
      const res = await Promise.all(URLS.map(url => fetch(url, {cache:'no-cache'})));
      if (res.some(x => !x.ok)) throw Error('One or more Hadith data files are unavailable');
      const batches = await Promise.all(res.map(x => x.json()));
      if (batches.some((x,i) => !Array.isArray(x.records) || x.records.length !== [20,38,42][i])) throw Error('Incorrect Hadith data range');
      const merged = batches.flatMap(x => x.records).sort((a,b) => a.number - b.number);
      if (merged.length !== 100 || merged.some((h,i) => h.number !== i+1 || !String(h.kashmiri ?? '').trim() || !/^https:\/\/sunnah\.com\/bukhari:\d+$/.test(h.sourceUrl))) throw Error('Missing or incorrectly numbered Hadith');
      records = merged;
      loaded = true;
    } catch (err) { error = String(err.message || err); }
    finally { loading = false; list(); }
  }
  function mount() { if (!document.getElementById('hadith-library')) return; if (!loaded) load(); else list(); }
  function exportText(number) {
    const selected = (number ? records.filter(h => h.number === number) : records).filter(h => String(notes[h.number] ?? '').trim());
    return 'Sahih al-Bukhari Kashmiri translation corrections\n' +
      selected.map(h => 'Hadith ' + h.number + ' · ' + h.title + '\nStatus: ' + (isDraft(h) ? 'Draft; full narration not approved' : 'Previously approved') +
        '\n' + String(notes[h.number]).trim() + '\nSource: ' + h.sourceUrl).join('\n\n');
  }
  function toast(message) { const el=document.getElementById('bh-save-toast'); if(el){el.hidden=false;el.textContent=message;} }
  async function copy(message) {
    try { await navigator.clipboard.writeText(message); toast('Copied. Share this text for review.'); }
    catch (_) { const el=document.getElementById('bh-export-text'); if(el){el.hidden=false;el.value=message;el.focus();el.select();} }
  }
  document.addEventListener('click',ev => {
    const button = ev.target.closest('button'); if (!button || !document.getElementById('hadith-library')) return;
    if (button.hasAttribute('data-bh-filter')) { statusFilter=button.dataset.bhFilter;visibleCount=PAGE_SIZE;list();return; }
    if (button.hasAttribute('data-bh-expand')) { const n=Number(button.dataset.bhExpand);if(expanded.has(n))expanded.delete(n);else expanded.add(n);renderResults();return; }
    if (button.hasAttribute('data-bh-more')) { visibleCount+=PAGE_SIZE;renderResults();return; }
    if (button.hasAttribute('data-bh-copy')) { const n=Number(button.dataset.bhCopy);if(!String(notes[n]??'').trim()){toast('Write a correction first.');return;}copy(exportText(n));return; }
    if (button.hasAttribute('data-bh-export')) { if(!Object.values(notes).some(x=>String(x).trim())){toast('No corrections yet.');return;}copy(exportText());return; }
    if (button.hasAttribute('data-bh-clear')) { if(confirm('Clear all saved Hadith review notes from this device?')){notes={};persist();list();}return; }
    if (button.hasAttribute('data-bh-retry')) load();
  });
  document.addEventListener('input',ev => {
    if (!document.getElementById('hadith-library')) return;
    if (ev.target.id === 'bh-search') { search=ev.target.value;visibleCount=PAGE_SIZE;renderResults(); }
    if (ev.target.hasAttribute('data-bh-note')) { const n=Number(ev.target.dataset.bhNote);notes[n]=ev.target.value;persist();const el=document.getElementById('bh-save-status-'+n);if(el)el.textContent='Saved locally'; }
  });
  window.KoshurHadithReview = {mount};
})();
