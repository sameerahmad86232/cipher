// Adds normalizedText + transliteration to the open Kashmiri school-textbook OCR
// pages. Run from anywhere:  node scripts/enrich-school-ocr.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Resolve relative to this script, so the working directory does not matter.
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(repoRoot, 'assets');
// A bare Windows drive path is rejected by the ESM loader, so import via URL.
const load = file => import(pathToFileURL(path.join(assets, file)).href);
const { autocorrectKashmiri, correctionChanges, unknownArabicCharacters } = await load('kashmiri-text.mjs');
const { transliterateKashmiri } = await load('transliteration.mjs');

const ocrPath = path.join(assets, 'kashmiri-school-textbooks-ocr.json');
const orthography = JSON.parse(fs.readFileSync(path.join(assets, 'kashmiri-orthography.json'), 'utf8'));
const ocr = JSON.parse(fs.readFileSync(ocrPath, 'utf8'));
const known = (orthography.metadata.ocrCharacterInventory || []).map(row => row.character).join('') + orthography.metadata.combiningMarks;

// Count differing code points without comparing shifted indices: a correction may
// change the length of the text (U+0626 becomes two code points), which made the
// previous index-by-index comparison meaningless.
function differingCodePoints(before, after) {
  const a = [...before], b = [...after];
  let differing = Math.abs(a.length - b.length);
  for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) differing++;
  return differing;
}

for (const page of ocr.pages || []) {
  const changes = correctionChanges(page.text || '');
  page.normalizedText = autocorrectKashmiri(page.text || '');
  page.transliteration = transliterateKashmiri(page.normalizedText);
  page.correctionCount = differingCodePoints(page.text || '', page.normalizedText);
  page.unknownArabicCharacters = unknownArabicCharacters(page.text || '', known);
  delete page.ocrTransliteration;
  if (!changes.changed) delete page.correctionCount;
}
ocr.normalization = 'NFC plus documented Kashmiri/Perso-Arabic OCR variant correction; raw text is preserved in text.';
ocr.transliteration = 'Character mapping from Kashmiri orthography notes v32, with observed OCR fallbacks.';
fs.writeFileSync(ocrPath, `${JSON.stringify(ocr)}\n`);
console.log(JSON.stringify({ pages: ocr.pages.length, changedPages: ocr.pages.filter(page => page.correctionCount).length, unknownCharacters: [...new Set(ocr.pages.flatMap(page => page.unknownArabicCharacters || []))] }));
