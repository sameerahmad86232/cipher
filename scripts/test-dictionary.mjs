import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const root = fs.existsSync('dist/assets/dictionary.json') ? 'dist' : '.';
// Windows drive paths such as C:\... are rejected by the ESM loader, so every
// dynamic import must go through a file:// URL.
const load = file => import(pathToFileURL(path.resolve(root, file)).href);
const { buildIndex, searchIndex, fold } = await load('assets/dictionary-search.mjs');
const { prepareText, finishText, sentenceChunks, normalizeKashmiri } = await load('assets/translation-text.mjs');
const { analyzeKashmiriSentence, analyzeEnglishSentence, applyGrammarOutput } = await load('assets/grammar-engine.mjs');
const records = [
  JSON.parse(fs.readFileSync(path.join(root, 'assets/dictionary.json'))),
  ...Array.from({ length: 8 }, (_, index) => `dictionary-kashir-${index + 1}.json`).filter(file => fs.existsSync(path.join(root, 'assets', file))).map(file => JSON.parse(fs.readFileSync(path.join(root, 'assets', file)))),
  JSON.parse(fs.readFileSync(path.join(root, 'assets', 'dictionary-corpus.json')))
].flat();
const words = buildIndex(records);
assert.equal(records.length, 58454);
assert.equal(words.length, 49682);
assert.ok(records.every(r => r.k && r.e));
assert.ok(records.every(r => r.tr));
assert.equal(records.filter(r => r.trGenerated).length, 44292);
assert.equal(records.filter(r => r.ocrVocabulary).length, 23377);
assert.equal(records.filter(r => r.ocrObserved).length, 1447);
assert.equal(records.filter(r => r.ocrVocabulary && r.e.startsWith('OCR vocabulary word')).length, 23377);
assert.ok(searchIndex(words, 'water').some(w => w.senses.some(s => s.e.toLowerCase() === 'water')));
assert.equal(searchIndex(words, 'تۆت')[0].k, 'تۆت');
const example = words.find(w => w.k === 'تۆت');
const form = example.forms.find(f => fold(f.word) !== fold(example.k));
assert.ok(searchIndex(words, form.word).some(w => w.k === example.k));
assert.ok(searchIndex(words, 'water', { source: 'sourced', script: 'arabic' }).every(w => w.arabic && w.senses.every(s => [s, ...(s.sources || [])].some(source => source.url))));
assert.ok(searchIndex(words, 'good manners', { source: 'sourced', script: 'arabic' }).some(w => w.k === 'اَدَب' && w.senses.some(s => s.s === 'Koul, Raina & Bhat (2000)')));
assert.ok(searchIndex(words, 'imagination', { source: 'sourced', script: 'arabic' }).some(w => w.k === 'اَنٛداز' && w.senses.some(s => s.s === 'Koul, Raina & Bhat (2000)')));
assert.ok(!records.some(r => r.k === 'اَدَب' && r.e.toLowerCase() === 'court'));
const abdomen = searchIndex(words, 'abdomen', { source: 'sourced', script: 'arabic' });
assert.ok(abdomen.some(w => w.k === 'شِکم' && w.senses.some(s => s.e.toLowerCase() === 'abdomen' && [s, ...(s.sources || [])].some(source => source.license === 'MIT'))));
const historical = JSON.parse(fs.readFileSync(path.join(root, 'assets/historical-lexicon.json')));
assert.equal(historical.length, 20643);
assert.ok(searchIndex(buildIndex(historical), 'āb').some(w => w.k === 'āb' && w.senses.some(s => s.e.includes('water'))));
const resourceIndex = JSON.parse(fs.readFileSync(path.join(root, 'assets/kashmiri-resource-index.json')));
assert.ok(resourceIndex.resources.some(resource => resource.name === 'Koshur Pixel'));
assert.ok(resourceIndex.resources.some(resource => resource.name === 'IndicTrans2'));
for (const name of ['Kashmiri Nastaliq LLM', 'KoshurOCR', 'KoshurAI', 'Koshur Diacritizer ByT5-small', 'Bolbosh', 'Kashmiri Speech Corpus Utilities', 'A Dictionary of the Kashmiri Language (Grierson, 1932)', 'Kashur Grammer']) {
  assert.ok(resourceIndex.resources.some(resource => resource.name === name), `missing resource index entry: ${name}`);
}
if (fs.existsSync('server-data/phrase-memory.json')) {
  const phraseMemory = JSON.parse(fs.readFileSync('server-data/phrase-memory.json'));
  assert.ok(Object.keys(phraseMemory.kashmiri_to_english).length >= 100);
  assert.ok(Object.keys(phraseMemory.english_to_kashmiri).length >= 100);
}
const kslit = JSON.parse(fs.readFileSync(path.join(root, 'assets/ks-lit-3m-reference.json')));
assert.equal(kslit.stats.words, 3100000);
assert.equal(kslit.stats.uniqueWords, 131607);
const orthography = JSON.parse(fs.readFileSync(path.join(root, 'assets/kashmiri-orthography.json')));
assert.equal(orthography.characters.length, 118);
assert.equal(orthography.examples.length, 504);
assert.equal(orthography.metadata.ocrCharacterInventory.length, 38);
const schoolOcr = JSON.parse(fs.readFileSync(path.join(root, 'assets/kashmiri-school-textbooks-ocr.json')));
assert.equal(schoolOcr.pages.length, 490);
const readingOcr = JSON.parse(fs.readFileSync(path.join(root, 'assets/kashmiri-reading-ocr.json')));
assert.equal(readingOcr.pages.length, 2981);
assert.ok(readingOcr.books.some(book => book.id === 'grierson-dictionary-ocr'));
assert.ok(readingOcr.books.some(book => book.id === 'koul-dli-ocr'));
// The 2026 reading-library addition. It passed the per-book OCR quality gate in
// scripts/build-reading-ocr.py; nine other candidates were measured and rejected.
assert.ok(readingOcr.books.some(book => book.id === 'khabar-tagimi-wanoon'));
assert.equal(readingOcr.books.length, 11);
assert.equal(readingOcr.pages.filter(page => page.book === 'khabar-tagimi-wanoon').length, 168);
// Every reading-library page must carry the enriched display fields, not just the
// raw OCR, so the reading view can show a normalized view and a romanization.
assert.ok(readingOcr.pages.every(page => typeof page.normalizedText === 'string' && typeof page.transliteration === 'string'));
assert.ok(schoolOcr.pages.every(page => typeof page.normalizedText === 'string' && typeof page.transliteration === 'string'));
assert.equal(records.reduce((count, row) => count + (row.references || []).filter(reference => reference.s?.startsWith('OCR occurrence')).length, 0), 68174);
assert.equal(records.reduce((count, row) => count + (row.ocrVocabulary ? 1 : 0), 0), 23377);
assert.equal(records.filter(r => r.ocrVocabulary && r.tr).length, 23377);
const ocrOnly = records.find(r => r.ocrVocabulary && r.e.startsWith('OCR vocabulary word'));
assert.ok(ocrOnly?.k && ocrOnly.tr);
assert.ok(searchIndex(words, ocrOnly.k, { script: 'arabic' }).some(w => w.senses.some(s => s.ocrVocabulary)));
assert.ok(searchIndex(words, 'Sunday', { source: 'sourced', script: 'arabic' }).some(w => w.k === 'آتھوار'));
const book = records.find(r => r.kx === 'مےٚ پٔر اَکھ کِتاب');
assert.equal(book.x, 'I read a book');
const prepared = prepareText('Email test@example.com about 12.50 today.', 'en-ks');
assert.deepEqual(prepared.entities, ['test@example.com', '12.50']);
assert.match(finishText('Contact < ID1 > .', 'ks-en', prepared.entities), /test@example.com\.$/);
assert.equal(sentenceChunks('One sentence. Two sentences.', 'en-ks').length, 2);
assert.ok(prepareText('مےٚ پٔر اَکھ کِتاب', 'ks-en').text.includes('کتاب'));
assert.equal(normalizeKashmiri('ه ي ك'), 'ہ ی ک');
// orthography.html documents U+0626 as an incorrect encoding whose correct form
// keeps the hamza on a Farsi yeh base: 06CC 0654, not a bare 06CC. Dropping the
// hamza would delete a vowel, so the yeh-with-hamza must not collapse to ی.
assert.equal(normalizeKashmiri('أ إ ئ ة ك ي ى'), 'ا ا ی\u0654 ہ ک ی ی');

// Every mapping in the "Confusables & spelling errors" table of orthography.html
// must be corrected, and the correction must be stable. Stability is not
// cosmetic: some corrections swap a combining mark for one with a different
// canonical combining class, and NFC reorders marks by class.
const confusables = [
  ['\u066e\u06ea', '\u0620', '066E 06EA dotless beh + empty centre stop is not KASHMIRI YEH'],
  ['\u06cd', '\u0620', '06CD Pashto YE is not KASHMIRI YEH'],
  ['\u06c5', '\u06c4', '06C5 Kirghiz OE is not WAW WITH RING'],
  ['\u065b', '\u0652', '065B lookalike jazm is not SUKUN'],
  ['\u0626', '\u06cc\u0654', '0626 does not lose its hamza'],
  ['\u064a', '\u06cc', '064A Arabic YEH is not Farsi YEH'],
  ['\u0643', '\u06a9', '0643 Arabic KAF is not Keheh']
];
for (const [bad, good, label] of confusables) {
  const corrected = normalizeKashmiri(`\u067e${bad}\u067e`);
  assert.ok(corrected.includes(good), `${label}: expected ${good}`);
  assert.equal(normalizeKashmiri(corrected), corrected, `${label}: correction must be idempotent`);
}
// Readings that the confusables table makes correct. The jazm over noon is the
// documented nasalisation digraph, and a mis-encoded KASHMIRI YEH carries
// palatalisation rather than the letter b.
const { transliterateKashmiri } = await load('assets/transliteration.mjs');
assert.equal(transliterateKashmiri('\u0645\u0646\u065b\u0632'), 'm\u00f1\u017c');
assert.equal(transliterateKashmiri('\u067e\u066e\u06ea\u0679\u06be'), 'p\u02b2\u0288\u02b0');
assert.ok(!transliterateKashmiri('\u067e\u066e\u06ea\u0679\u06be').includes('b'), 'mis-encoded KASHMIRI YEH must not romanize as b');
// Folding is what search matches on, so a corrected spelling and the mis-encoded
// headword must produce the same key.
assert.equal(fold('\u067e\u0620\u0679\u06be'), fold('\u067e\u066e\u06ea\u0679\u06be'));
assert.equal(fold('\u06c1\u064f\u067e\u0672\u0631\u0620'), fold('\u06c1\u064f\u067e\u0672\u0631\u06cd'));
assert.equal(analyzeKashmiriSentence('مےٚ پٔر اَکھ کِتاب؟').question, true);
assert.equal(analyzeEnglishSentence('Why do they not come?').negative, true);
assert.equal(applyGrammarOutput('اَمہٕ حالت۔', 'Is this good?', 'en-ks').endsWith('؟'), true);
assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'assets/kashmiri-orthography.json'))).metadata.ocrCharacterInventory.length, 38);
const forms = new Set(words.flatMap(w => w.forms.map(f => f.word)));
assert.equal(forms.size, 1818);
console.log(JSON.stringify({ result: 'passed', records: records.length, headwords: words.length, form_spellings: forms.size }));
