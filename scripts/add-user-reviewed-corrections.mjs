import fs from 'node:fs/promises';

const dictionaryFile = new URL('../dist/assets/dictionary.json', import.meta.url);
const correctionFile = new URL('../training-data/user-reviewed-corrections.json', import.meta.url);
const publicCorrectionFile = new URL('../dist/assets/kashmiri-reviewed-corrections.json', import.meta.url);
const dictionary = JSON.parse(await fs.readFile(dictionaryFile, 'utf8'));
const review = JSON.parse(await fs.readFile(correctionFile, 'utf8'));
const source = review.source;
const opening = review.corrections.find(item => item.id === 'bukhari-3-opening-r1');

for (const item of review.lexicon) {
  let entry = dictionary.find(row => row.k === item.k && String(row.e || '').toLowerCase() === item.e.toLowerCase());
  if (!entry) {
    entry = { ...item };
    dictionary.push(entry);
  }
  entry.s = source.name;
  entry.url = source.url;
  entry.license = source.license;
  entry.humanReview = 'approved-by-project-owner';
  const correction = review.corrections.find(row => row.id === (item.correctionId || opening.id)) || opening;
  entry.reviewCorrectionId = correction.id;
  if (item.k === 'نیک خواب' || item.example) {
    entry.kx = correction.kashmiri;
    entry.x = correction.english;
  }
}

await fs.writeFile(dictionaryFile, `${JSON.stringify(dictionary)}\n`);
await fs.writeFile(publicCorrectionFile, `${JSON.stringify(review, null, 2)}\n`);
console.log(JSON.stringify({ corrections: review.corrections.length, lexicon: review.lexicon.length, dictionaryEntries: dictionary.length }));
