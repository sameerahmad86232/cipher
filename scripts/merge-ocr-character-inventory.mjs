import fs from 'node:fs';

const ocr = JSON.parse(fs.readFileSync('dist/assets/kashmiri-school-textbooks-ocr.json', 'utf8'));
const orthographyPath = 'dist/assets/kashmiri-orthography.json';
const orthography = JSON.parse(fs.readFileSync(orthographyPath, 'utf8'));
const counts = new Map();
for (const page of ocr.pages || []) {
  for (const character of page.text || '') {
    if (/\p{Script=Arabic}/u.test(character)) counts.set(character, (counts.get(character) || 0) + 1);
  }
}
const mapped = new Set(orthography.characters.flatMap(row => [...String(row['arab-ks'] || '')]));
orthography.metadata.ocrCharacterInventory = [...counts.entries()]
  .sort((a, b) => a[0].codePointAt(0) - b[0].codePointAt(0))
  .map(([character, count]) => ({ character, codePoint: `U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`, count, mappedInNotes: mapped.has(character) }));
orthography.metadata.ocrSources = ocr.books.map(book => ({ title: book.title, creator: book.creator, pages: book.pages, license: book.license, source: book.source }));
fs.writeFileSync(orthographyPath, `${JSON.stringify(orthography)}\n`);
console.log(JSON.stringify({ characters: orthography.metadata.ocrCharacterInventory.length, unmapped: orthography.metadata.ocrCharacterInventory.filter(row => !row.mappedInNotes).map(row => row.character) }));
