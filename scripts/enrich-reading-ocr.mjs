import fs from 'node:fs';
import { autocorrectKashmiri, correctionChanges, unknownArabicCharacters } from '../dist/assets/kashmiri-text.mjs';
import { transliterateKashmiri } from '../dist/assets/transliteration.mjs';
const file='dist/assets/kashmiri-reading-ocr.json'; const data=JSON.parse(fs.readFileSync(file));
const orthography=JSON.parse(fs.readFileSync('dist/assets/kashmiri-orthography.json','utf8'));
const known=(orthography.metadata.ocrCharacterInventory||[]).map(x=>x.character).join('')+orthography.metadata.combiningMarks;
for(const page of data.pages||[]){page.normalizedText=autocorrectKashmiri(page.text||'');page.transliteration=transliterateKashmiri(page.normalizedText);const c=correctionChanges(page.text||'');if(c.changed)page.correctionCount=1;page.unknownArabicCharacters=unknownArabicCharacters(page.text||'',known);}
data.normalization='NFC plus documented Kashmiri/Perso-Arabic OCR variant correction; raw text remains in text.';
data.transliteration='Orthography-based reading aid; not a corrected transcription.';
fs.writeFileSync(file,JSON.stringify(data)+'\n');console.log(JSON.stringify({books:data.books.length,pages:data.pages.length,changed:data.pages.filter(p=>p.correctionCount).length}));
