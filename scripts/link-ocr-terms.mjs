import fs from 'node:fs';
import { fold } from '../dist/assets/dictionary-search.mjs';

const dictionaryPath = 'dist/assets/dictionary.json';
const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'));
const ocr = JSON.parse(fs.readFileSync('dist/assets/kashmiri-school-textbooks-ocr.json', 'utf8'));
const books = new Map((ocr.books || []).map(book => [book.id, book]));
const pages = (ocr.pages || []).map(page => ({ ...page, folded: fold(page.normalizedText || page.text || '') }));
let matched = 0;
let references = 0;
for (const row of dictionary) {
  if (!/\p{Script=Arabic}/u.test(row.k)) continue;
  const key = fold(row.k).replace(/\s+/g, ' ').trim();
  if ([...key].filter(character => /\p{L}/u.test(character)).length < 3) continue;
  const found = [];
  for (const page of pages) {
    if (!page.folded.includes(key)) continue;
    const book = books.get(page.book);
    const url = `${book.source}/page/n${page.page - 1}/mode/1up`;
    if (found.some(reference => reference.url === url)) continue;
    found.push({ s: `OCR occurrence · ${book.title} · page ${page.page}`, url, license: book.license });
    if (found.length === 3) break;
  }
  if (!found.length) continue;
  const existing = Array.isArray(row.references) ? row.references : [];
  const existingUrls = new Set(existing.map(reference => reference.url));
  const additions = found.filter(reference => !existingUrls.has(reference.url));
  if (!additions.length) continue;
  row.references = [...existing, ...additions];
  matched += 1;
  references += additions.length;
}
fs.writeFileSync(dictionaryPath, `${JSON.stringify(dictionary)}\n`);
console.log(JSON.stringify({ matched, references }));
