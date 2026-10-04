// Adds normalizedText + transliteration to the Koul learner-dictionary OCR pages.
// This layer was the one OCR collection that had no enrichment pass, so its pages
// carried raw text only. Run from anywhere:  node scripts/enrich-koul-ocr.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(repoRoot, 'assets');
// A bare Windows drive path is rejected by the ESM loader, so import via URL.
const load = file => import(pathToFileURL(path.join(assets, file)).href);
const { autocorrectKashmiri, correctionChanges, unknownArabicCharacters } = await load('kashmiri-text.mjs');
const { transliterateKashmiri } = await load('transliteration.mjs');

const ocrPath = path.join(assets, 'koul-book-ocr.json');
const ocr = JSON.parse(fs.readFileSync(ocrPath, 'utf8'));
const orthography = JSON.parse(fs.readFileSync(path.join(assets, 'kashmiri-orthography.json'), 'utf8'));
const known = (orthography.metadata.ocrCharacterInventory || []).map(row => row.character).join('') + orthography.metadata.combiningMarks;

// Count differing code points without comparing shifted indices: a correction may
// change the text length (U+0626 becomes two code points).
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
  if (!changes.changed) delete page.correctionCount;
}
// Provenance for the rights position, matching the wording used elsewhere.
ocr.license = ocr.license || 'Rights-holder permission (reported by project owner)';
ocr.normalization = 'NFC plus documented Kashmiri/Perso-Arabic OCR variant correction; raw text is preserved in text.';
ocr.transliteration = 'Character mapping from Kashmiri orthography notes v32, with observed OCR fallbacks. OCR transliteration is a reading aid, not a corrected scholarly transcription.';
fs.writeFileSync(ocrPath, `${JSON.stringify(ocr)}\n`);
console.log(JSON.stringify({ pages: ocr.pages.length, pagesWithText: ocr.pages.filter(page => page.text).length, changedPages: ocr.pages.filter(page => page.correctionCount).length, unknownCharacters: [...new Set(ocr.pages.flatMap(page => page.unknownArabicCharacters || []))] }));
