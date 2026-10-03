import fs from 'node:fs';
import path from 'node:path';

const root = fs.existsSync('dist/assets/dictionary.json') ? 'dist' : '.';
const dictionaryPath = path.join(root, 'assets/dictionary.json');
const ocrPath = path.join(root, 'assets/kashmiri-school-textbooks-ocr.json');
const koulPath = path.join(root, 'assets/koul-book-ocr.json');
const { fold } = await import(path.resolve(root, 'assets/dictionary-search.mjs'));
const { transliterateKashmiri } = await import(path.resolve(root, 'assets/transliteration.mjs'));

const records = JSON.parse(fs.readFileSync(dictionaryPath));
for (const record of records) {
  if (record.ocrVocabulary && !record.e.startsWith('OCR vocabulary word')) {
    delete record.ocrVocabulary;
    record.ocrObserved = true;
  }
}
const ocr = JSON.parse(fs.readFileSync(ocrPath));
const books = new Map((ocr.books || []).map(book => [book.id, book]));
const koul = JSON.parse(fs.readFileSync(koulPath));
const tokenData = new Map();
const tokenPattern = /[\p{Script=Arabic}][\p{Script=Arabic}\p{M}\u200c\u200d'’ʼ-]*/gu;

function collectPage(page, book) {
  const text = page.normalizedText || page.text || '';
  const seenOnPage = new Set();
  for (const match of text.matchAll(tokenPattern)) {
    const token = match[0].normalize('NFC');
    if (![...token].some(character => /\p{L}/u.test(character))) continue;
    const key = fold(token);
    if (!key || seenOnPage.has(key)) continue;
    seenOnPage.add(key);
    if (!tokenData.has(key)) tokenData.set(key, { k: token, occurrences: [] });
    tokenData.get(key).occurrences.push({ page, book });
  }
}
for (const page of ocr.pages || []) collectPage(page, books.get(page.book) || {});
const koulBook = {
  title: 'Kashmiri–English Dictionary for Second Language Learners',
  source: koul.source || 'https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul',
  license: 'Rights-holder permission (reported by project owner)'
};
for (const page of koul.pages || []) collectPage(page, koulBook);

const referencesFor = occurrences => occurrences.map(({ page, book }) => ({
  s: `OCR occurrence · ${book.title || page.book} · page ${page.page}`,
  url: `${book.source || 'https://archive.org/'}\/page\/n${Math.max(0, Number(page.page) - 1)}\/mode\/1up`,
  license: book.license || 'Open license'
}));
const existingByKey = new Map();
for (const record of records) {
  const key = fold(record.k);
  if (!key) continue;
  if (!existingByKey.has(key)) existingByKey.set(key, []);
  existingByKey.get(key).push(record);
}

let newRecords = 0, updatedRecords = 0, references = 0;
for (const { k, occurrences } of tokenData.values()) {
  const refs = referencesFor(occurrences);
  references += refs.length;
  const existing = existingByKey.get(fold(k));
  if (existing?.length) {
    for (const record of existing) {
      const prior = new Set((record.references || []).map(reference => `${reference.s}|${reference.url}`));
      record.references = [...(record.references || []), ...refs.filter(reference => !prior.has(`${reference.s}|${reference.url}`))];
      if (record.e.startsWith('OCR vocabulary word')) delete record.ocrObserved;
      else record.ocrObserved = true;
      updatedRecords++;
    }
    continue;
  }
  const book = occurrences[0]?.book || {};
  const row = {
    k,
    e: 'OCR vocabulary word (English definition not supplied by the source)',
    p: 'OCR word',
    tr: transliterateKashmiri(k),
    trGenerated: true,
    ocrVocabulary: true,
    sources: [{
      s: `${book.title || 'Open Kashmiri book'} · OCR vocabulary`,
      url: book.source || 'https://archive.org/',
      license: book.license || 'Open license'
    }],
    references: refs
  };
  records.push(row);
  existingByKey.set(fold(k), [row]);
  newRecords++;
}

fs.writeFileSync(dictionaryPath, `${JSON.stringify(records)}\n`);
console.log(JSON.stringify({ tokens: tokenData.size, newRecords, updatedRecords, references, records: records.length }));
