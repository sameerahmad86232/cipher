import fs from 'node:fs/promises';
import path from 'node:path';

const [tsvDirectory, outputFile] = process.argv.slice(2);
if (!tsvDirectory || !outputFile) throw Error('Usage: node scripts/build-kaishrik-grammar-corpus.mjs TSV_DIRECTORY OUTPUT.json');

const files = (await fs.readdir(tsvDirectory)).filter(name => name.endsWith('.tsv')).sort();
const pages = [];
let acceptedLineCount = 0;
let rejectedLineCount = 0;

for (const name of files) {
  const rows = (await fs.readFile(path.join(tsvDirectory, name), 'utf8')).split(/\r?\n/).slice(1);
  const lines = new Map();
  for (const row of rows) {
    const fields = row.split('\t');
    if (fields.length < 12 || fields[0] !== '5') continue;
    const text = fields.slice(11).join('\t').trim().normalize('NFC');
    const confidence = Number(fields[10]);
    if (!text || confidence < 0) continue;
    const key = fields.slice(1, 5).join(':');
    if (!lines.has(key)) lines.set(key, []);
    lines.get(key).push({ text, confidence });
  }

  const accepted = [];
  for (const words of lines.values()) {
    const text = words.map(word => word.text).join(' ').replace(/\s+/g, ' ').trim();
    const confidence = words.reduce((sum, word) => sum + word.confidence, 0) / words.length;
    const arabic = (text.match(/[\p{Script=Arabic}\p{M}]/gu) || []).length;
    const latinOrCyrillic = (text.match(/[A-Za-z\p{Script=Cyrillic}]/gu) || []).length;
    const wordCount = (text.match(/[\p{Script=Arabic}\p{M}]+/gu) || []).length;
    const repeatedRunningHeader = /گرامر\s*:?.*تاریخی\s+سام|تغیراتی\s+گر\s*امر/u.test(text);
    if (confidence >= 75 && arabic >= 12 && wordCount >= 3 && latinOrCyrillic === 0 && !repeatedRunningHeader) {
      accepted.push({ text, confidence: Math.round(confidence * 10) / 10 });
      acceptedLineCount += 1;
    } else {
      rejectedLineCount += 1;
    }
  }
  pages.push({ page: Number(name.match(/_(\d+)\.tsv$/)?.[1]), acceptedLines: accepted });
}

const payload = {
  title: 'Kaishrik Grammer — confidence-filtered OCR corpus',
  author: 'Shok Shafiq',
  publisher: 'N.S. Publications, Kapran, Shopian',
  source: 'https://archive.org/details/dli.ernet.510105',
  permission: 'Project owner reports direct rights-holder permission for OCR, machine-training use, public website use and redistribution of derived text.',
  purpose: 'Provisional monolingual grammar evidence. Not parallel translation data and not a verified transcription.',
  ocr: { engine: 'Tesseract 5', model: 'tessdata_best urd', pageSegmentationMode: 3, minimumMeanWordConfidence: 75 },
  warnings: [
    'Kashmiri-specific letters and diacritics may be lost or substituted by the Urdu OCR model.',
    'Tables and paradigms require human transcription and are excluded when line confidence is low.',
    'Accepted OCR lines must not be treated as reviewed grammar rules or English translations.'
  ],
  counts: { scannedPages: files.length, acceptedLines: acceptedLineCount, rejectedLines: rejectedLineCount },
  pages
};

await fs.writeFile(outputFile, JSON.stringify(payload, null, 2) + '\n');
console.log(JSON.stringify(payload.counts));
