import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Repo-relative paths: this file lives in scripts/, the site root is one level up.
// ESM imports need file: URLs — a bare Windows drive path is rejected by Node.
const here = path.dirname(fileURLToPath(import.meta.url));
const assets = path.resolve(here, '..', 'assets');
const file = path.join(assets, 'kashmiri-reading-ocr.json');

const { autocorrectKashmiri, correctionChanges, unknownArabicCharacters } =
  await import(pathToFileURL(path.join(assets, 'kashmiri-text.mjs')).href);
const { transliterateKashmiri } =
  await import(pathToFileURL(path.join(assets, 'transliteration.mjs')).href);

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const orthography = JSON.parse(fs.readFileSync(path.join(assets, 'kashmiri-orthography.json'), 'utf8'));
const known = (orthography.metadata.ocrCharacterInventory || []).map(x => x.character).join('') + orthography.metadata.combiningMarks;
for (const page of data.pages || []) { page.normalizedText = autocorrectKashmiri(page.text || ''); page.transliteration = transliterateKashmiri(page.normalizedText); const c = correctionChanges(page.text || ''); if (c.changed) page.correctionCount = 1; page.unknownArabicCharacters = unknownArabicCharacters(page.text || '', known); }
data.normalization = 'NFC plus documented Kashmiri/Perso-Arabic OCR variant correction; raw text remains in text.';
data.transliteration = 'Orthography-based reading aid; not a corrected transcription.';
fs.writeFileSync(file, JSON.stringify(data) + '\n');
console.log(JSON.stringify({ books: data.books.length, pages: data.pages.length, changed: data.pages.filter(p => p.correctionCount).length }));
