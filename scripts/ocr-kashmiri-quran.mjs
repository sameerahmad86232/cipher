import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const [pdfPath, outputDir, ...flags] = process.argv.slice(2);
if (!pdfPath || !outputDir) {
  throw Error('Usage: node scripts/ocr-kashmiri-quran.mjs SOURCE.pdf OUTPUT_DIR [--tessdata-dir DIR] [--languages urd] [--workers N] [--start N] [--end N]');
}

function option(name, fallback) {
  const index = flags.indexOf(name);
  return index >= 0 ? flags[index + 1] : fallback;
}

const tessdata = option('--tessdata-dir', 'tessdata-best');
const languages = option('--languages', 'urd');
const workerCount = Math.max(1, Number(option('--workers', '6')) || 6);
const info = await run('pdfinfo', [pdfPath]);
const pageMatch = info.stdout.match(/^Pages:\s+(\d+)/m);
if (!pageMatch) throw Error(`Could not determine the page count for ${pdfPath}`);
const totalPages = Number(pageMatch[1]);
const start = Math.max(1, Number(option('--start', '1')) || 1);
const end = Math.min(totalPages, Number(option('--end', String(totalPages))) || totalPages);
const pagesDir = path.join(outputDir, 'pages');
await fs.mkdir(pagesDir, { recursive: true });

const jobs = [];
for (let page = start; page <= end; page += 1) {
  const target = path.join(pagesDir, `${String(page).padStart(4, '0')}.txt`);
  try {
    const current = await fs.readFile(target, 'utf8');
    if (current.trim()) continue;
  } catch {}
  jobs.push({ page, target });
}

let cursor = 0;
let completed = 0;
async function worker() {
  const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'ks-quran-ocr-'));
  try {
    while (cursor < jobs.length) {
      const { page, target } = jobs[cursor++];
      const image = path.join(temporary, `page-${page}`);
      await run('pdftoppm', ['-f', String(page), '-l', String(page), '-r', '300', '-png', '-singlefile', pdfPath, image]);
      const { stdout } = await run('tesseract', [`${image}.png`, 'stdout', '-l', languages, '--psm', '3', '--tessdata-dir', tessdata], {
        maxBuffer: 16 * 1024 * 1024
      });
      await fs.writeFile(target, stdout.replace(/\u000c/g, '').trim() + '\n');
      await fs.unlink(`${image}.png`).catch(() => {});
      completed += 1;
      process.stdout.write(`OCR ${completed}/${jobs.length} · PDF page ${page}\n`);
    }
  } finally {
    await fs.rm(temporary, { recursive: true, force: true });
  }
}

await Promise.all(Array.from({ length: Math.min(workerCount, jobs.length || 1) }, worker));

const pageRecords = [];
for (let page = 1; page <= totalPages; page += 1) {
  const target = path.join(pagesDir, `${String(page).padStart(4, '0')}.txt`);
  try {
    const text = (await fs.readFile(target, 'utf8')).trim();
    pageRecords.push({ page, text });
  } catch {}
}

const metadata = {
  title: 'Translation of the Noble Quran in Kashmiri (Koshur)',
  attributedTranslator: 'Mirwaiz Yusuf Shah',
  language: 'Kashmiri and Arabic',
  script: 'Perso-Arabic',
  source: 'https://archive.org/details/Ks_Translation_of_the_Noble_Quran_in_the_Kashmiri_Koshur_Language_www.TheChoice.one',
  sourcePages: totalPages,
  ocrPages: pageRecords.length,
  method: `300 DPI page rendering; Tesseract tessdata_best ${languages}; automatic page segmentation.`,
  reviewStatus: 'Raw machine OCR. Human review is required before quotation, publication, dictionary import, or religious use.',
  licenseNote: 'Public reuse permission from the rights holder was reported by the project owner on 2026-10-04; the Internet Archive item itself did not display a license statement when retrieved.'
};
await fs.writeFile(path.join(outputDir, 'metadata.json'), JSON.stringify(metadata, null, 2) + '\n');
await fs.writeFile(path.join(outputDir, 'ocr-pages.jsonl'), pageRecords.map(record => JSON.stringify(record)).join('\n') + '\n');
await fs.writeFile(path.join(outputDir, 'ocr.txt'), pageRecords.map(record => `===== PDF PAGE ${record.page} =====\n\n${record.text}\n`).join('\n'));
console.log(JSON.stringify(metadata));
