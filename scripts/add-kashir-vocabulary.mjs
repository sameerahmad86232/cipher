import fs from 'node:fs';
import path from 'node:path';
const root = fs.existsSync('dist/assets/dictionary.json') ? 'dist' : '.';
const dictionaryPath = path.join(root, 'assets/dictionary.json');
const ocrPath = path.join(root, 'assets/kashir-dictionary-ocr.json');
const { fold } = await import(path.resolve(root, 'assets/dictionary-search.mjs'));
const { transliterateKashmiri } = await import(path.resolve(root, 'assets/transliteration.mjs'));
const records = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'));
const ocr = JSON.parse(fs.readFileSync(ocrPath, 'utf8'));
const books = new Map((ocr.books || []).map(book => [book.id, book]));
const tokenPattern = /[\p{Script=Arabic}][\p{Script=Arabic}\p{M}\u200c\u200d'’ʼ-]*/gu;
const edgeMarks = /^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu;
const tokens = new Map();
for (const page of ocr.pages || []) {
  const text = page.normalizedText || page.text || '';
  const seen = new Set();
  for (const match of text.matchAll(tokenPattern)) {
    const token = match[0].normalize('NFC').replace(edgeMarks, '');
    if (!token || ![...token].some(character => /\p{L}/u.test(character)) || [...token].filter(character => /\p{L}/u.test(character)).length < 2) continue;
    const key = fold(token);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    if (!tokens.has(key)) tokens.set(key, { k: token, occurrences: [] });
    const data = tokens.get(key);
    const book = books.get(page.book) || {};
    const sourceKey = `${page.book}:${page.page}`;
    if (!data.occurrences.some(item => item.sourceKey === sourceKey)) {
      const sourceCount = data.occurrences.filter(item => item.page.book === page.book).length;
      if (sourceCount < 2) data.occurrences.push({ page, book, sourceKey });
    }
  }
}
const existing = new Map();
for (const record of records) {
  const key = fold(record.k || '');
  if (key) existing.set(key, [...(existing.get(key) || []), record]);
}
const referenceFor = ({ page, book }) => ({
  s: `OCR occurrence · ${book.title || page.book} · page ${page.page}`,
  url: `${book.source || 'https://archive.org/'}\/page\/n${Math.max(0, Number(page.page) - 1)}\/mode\/1up`,
  license: book.license || 'Source license not stated'
});
let newRecords = 0, updatedRecords = 0, references = 0;
for (const { k, occurrences } of tokens.values()) {
  const refs = occurrences.map(referenceFor);
  const matches = existing.get(fold(k));
  if (matches?.length) {
    for (const record of matches) {
      const seen = new Set((record.references || []).map(ref => `${ref.s}|${ref.url}`));
      const additions = refs.filter(ref => !seen.has(`${ref.s}|${ref.url}`));
      record.references = [...(record.references || []), ...additions];
      references += additions.length;
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
      s: `${book.title || 'Kashir Dictionary'} · OCR vocabulary`,
      url: book.source || 'https://archive.org/',
      license: book.license || 'Source license not stated'
    }],
    references: refs
  };
  records.push(row);
  existing.set(fold(k), [row]);
  newRecords++;
  references += refs.length;
}
fs.writeFileSync(dictionaryPath, `${JSON.stringify(records)}\n`);
console.log(JSON.stringify({ tokens: tokens.size, newRecords, updatedRecords, references, records: records.length }));
