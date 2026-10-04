import fs from 'node:fs/promises';

const [sourceFile, outputFile] = process.argv.slice(2);
if (!sourceFile || !outputFile) throw Error('Usage: node scripts/build-kashmiri-grammar-profile.mjs CORPUS.json OUTPUT.json');
const corpus = JSON.parse(await fs.readFile(sourceFile, 'utf8'));
const wordPattern = /[\p{Script=Arabic}\p{M}][\p{Script=Arabic}\p{M}\u200c\u200d]*/gu;
const clean = (corpus.records || []).filter(record => {
  const text = String(record.text || '');
  const arabic = (text.match(/\p{Script=Arabic}/gu) || []).length;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  return arabic >= 20 && latin < Math.max(6, arabic * 0.08) && !/%[0-9A-F]{2}|==|https?:/i.test(text);
});

const frequencies = [new Map(), new Map(), new Map()];
for (const record of clean) {
  const words = String(record.text).normalize('NFC').match(wordPattern) || [];
  for (let index = 0; index < words.length; index += 1) {
    for (let size = 1; size <= 3; size += 1) {
      if (index + 1 < size) continue;
      const phrase = words.slice(index + 1 - size, index + 1).join(' ');
      frequencies[size - 1].set(phrase, (frequencies[size - 1].get(phrase) || 0) + 1);
    }
  }
}
const top = (map, limit) => [...map].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([text, count]) => ({ text, count }));
const payload = {
  title: 'Licensed Kashmiri corpus grammar profile',
  generatedFrom: corpus.title,
  sourceRecords: corpus.records.length,
  cleanRecords: clean.length,
  excludesQuranMaterial: true,
  purpose: 'Attested-pattern evidence for grammar diagnostics; not a generative model or a claim of grammatical correctness.',
  limitations: ['The corpus is domain-skewed and contains repeated biographical templates.', 'Frequency is evidence of attestation, not a universal grammar rule.', 'Raw OCR collections are excluded from these counts.'],
  frequentWords: top(frequencies[0], 150),
  frequentBigrams: top(frequencies[1], 150),
  frequentTrigrams: top(frequencies[2], 150)
};
await fs.writeFile(outputFile, JSON.stringify(payload, null, 2) + '\n');
console.log(JSON.stringify({ sourceRecords: payload.sourceRecords, cleanRecords: payload.cleanRecords, outputFile }));
