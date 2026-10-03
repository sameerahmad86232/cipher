import fs from 'node:fs';
import { autocorrectKashmiri, correctionChanges, unknownArabicCharacters } from '../dist/assets/kashmiri-text.mjs';
import { transliterateKashmiri } from '../dist/assets/transliteration.mjs';
const ocrPath = 'dist/assets/kashir-dictionary-ocr.json';
const ocr = JSON.parse(fs.readFileSync(ocrPath, 'utf8'));
const orthography = JSON.parse(fs.readFileSync('dist/assets/kashmiri-orthography.json', 'utf8'));
const known = (orthography.metadata.ocrCharacterInventory || []).map(row => row.character).join('') + orthography.metadata.combiningMarks;
for (const page of ocr.pages || []) {
  page.normalizedText = autocorrectKashmiri(page.text || '');
  page.transliteration = transliterateKashmiri(page.normalizedText);
  const changes = correctionChanges(page.text || '');
  if (changes.changed) page.correctionCount = changes.changes?.length || 1;
  page.unknownArabicCharacters = unknownArabicCharacters(page.text || '', known);
}
ocr.normalization = 'NFC plus documented Kashmiri/Perso-Arabic OCR variant correction; raw text is preserved in text.';
ocr.transliteration = 'Character mapping from Kashmiri orthography notes v32, with observed OCR fallbacks. OCR transliteration is a reading aid, not a corrected scholarly transcription.';
fs.writeFileSync(ocrPath, `${JSON.stringify(ocr)}\n`);
console.log(JSON.stringify({ pages: ocr.pages.length, changedPages: ocr.pages.filter(page => page.correctionCount).length, unknownCharacters: [...new Set(ocr.pages.flatMap(page => page.unknownArabicCharacters || []))] }));
