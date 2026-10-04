// Adds normalizedText + transliteration to the Kashir Dictionary OCR pages.
// Run from anywhere:  node scripts/enrich-kashir-ocr.mjs
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

const ocrPath = path.join(assets, 'kashir-dictionary-ocr.json');
const ocr = JSON.parse(fs.readFileSync(ocrPath, 'utf8'));
const orthography = JSON.parse(fs.readFileSync(path.join(assets, 'kashmiri-orthography.json'), 'utf8'));
const known = (orthography.metadata.ocrCharacterInventory || []).map(row => row.character).join('') + orthography.metadata.combiningMarks;
for (const page of ocr.pages || []) {
  page.normalizedText = autocorrectKashmiri(page.text || '');
  page.transliteration = transliterateKashmiri(page.normalizedText);
  const changes = correctionChanges(page.text || '');
  if (changes.changed) page.correctionCount = 1;
  page.unknownArabicCharacters = unknownArabicCharacters(page.text || '', known);
}
ocr.normalization = 'NFC plus documented Kashmiri/Perso-Arabic OCR variant correction; raw text is preserved in text.';
ocr.transliteration = 'Character mapping from Kashmiri orthography notes v32, with observed OCR fallbacks. OCR transliteration is a reading aid, not a corrected scholarly transcription.';
fs.writeFileSync(ocrPath, `${JSON.stringify(ocr)}\n`);
console.log(JSON.stringify({ pages: ocr.pages.length, changedPages: ocr.pages.filter(page => page.correctionCount).length, unknownCharacters: [...new Set(ocr.pages.flatMap(page => page.unknownArabicCharacters || []))] }));
