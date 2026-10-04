import fs from 'node:fs/promises';
import path from 'node:path';

const [ocrDir, outputFile] = process.argv.slice(2);
if (!ocrDir || !outputFile) {
  throw Error('Usage: node scripts/build-quran-corpus-json.mjs OCR_DIR OUTPUT.json');
}

const metadata = JSON.parse(await fs.readFile(path.join(ocrDir, 'metadata.json'), 'utf8'));
const records = (await fs.readFile(path.join(ocrDir, 'ocr-pages.jsonl'), 'utf8'))
  .trim()
  .split('\n')
  .filter(Boolean)
  .map(line => JSON.parse(line))
  .map(({ page, text }) => ({
    id: `kashmiri-quran-p${String(page).padStart(4, '0')}`,
    page,
    text,
    sourceUrl: `${metadata.source}/page/n${Math.max(0, page - 1)}/mode/1up`,
    reviewStatus: 'raw-machine-ocr'
  }));

const payload = {
  schemaVersion: 1,
  collectionId: 'kashmiri-quran-translation-ocr',
  collectionType: 'separate-retrieval-corpus',
  integratedIntoDictionaryDefinitions: false,
  integratedIntoNeuralTraining: false,
  ...metadata,
  records
};

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, JSON.stringify(payload));
console.log(JSON.stringify({ outputFile, records: records.length, bytes: Buffer.byteLength(JSON.stringify(payload)) }));
