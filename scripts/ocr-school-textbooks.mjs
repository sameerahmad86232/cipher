import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const [manifestPath, outputDir, ...flags] = process.argv.slice(2);
if (!manifestPath || !outputDir) throw Error('Usage: node scripts/ocr-school-textbooks.mjs MANIFEST.json OUTPUT_DIR [--tessdata-dir DIR] [--workers N]');
const tessIndex = flags.indexOf('--tessdata-dir');
const workersIndex = flags.indexOf('--workers');
const tessdata = tessIndex >= 0 ? flags[tessIndex + 1] : '';
const workerCount = Math.max(1, Number(workersIndex >= 0 ? flags[workersIndex + 1] : 4) || 4);
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'kashmiri-school-ocr-'));
await fs.mkdir(outputDir, { recursive: true });

const books = [];
for (const book of manifest.books || []) {
  if (!book.file) throw Error(`Missing local file for ${book.id}`);
  const info = await run('pdfinfo', [book.file]);
  const match = info.stdout.match(/^Pages:\s+(\d+)/m);
  if (!match) throw Error(`Could not read page count for ${book.file}`);
  books.push({ ...book, pages: Number(match[1]) });
}

const jobs = books.flatMap(book => Array.from({ length: book.pages }, (_, i) => ({ book, page: i + 1 })));
let cursor = 0;
const result = new Array(jobs.length);
async function worker() {
  while (cursor < jobs.length) {
    const index = cursor++;
    const { book, page } = jobs[index];
    const prefix = path.join(temporary, `${book.id}-${page}`);
    await run('pdftoppm', ['-f', String(page), '-l', String(page), '-r', '300', '-png', '-singlefile', book.file, prefix], { maxBuffer: 1024 * 1024 });
    const args = [`${prefix}.png`, 'stdout', '-l', tessdata ? 'ara+eng' : 'eng', '--psm', '3'];
    if (tessdata) args.push('--tessdata-dir', tessdata);
    const { stdout } = await run('tesseract', args, { maxBuffer: 8 * 1024 * 1024 });
    result[index] = { book: book.id, grade: book.grade, part: book.part || '', page, text: stdout.replace(/\u000c/g, '').trim() };
    await fs.unlink(`${prefix}.png`).catch(() => {});
    process.stdout.write(`OCR ${index + 1}/${jobs.length} · ${book.id} page ${page}\n`);
  }
}
await Promise.all(Array.from({ length: Math.min(workerCount, jobs.length || 1) }, worker));

const payload = {
  title: 'JKBOSE Kashmiri school textbooks',
  language: 'Kashmiri',
  script: 'Perso-Arabic',
  books: books.map(({ file, ...book }) => book),
  pages: result,
  source: 'Jammu and Kashmir Board of School Education (JKBOSE)',
  permission: 'Rights-holder permission reported by the project owner.',
  method: `Tesseract OCR using ${tessdata ? 'Arabic + English traineddata' : 'English traineddata only'}; machine output requires human review.`
};
await fs.writeFile(path.join(outputDir, 'kashmiri-school-textbooks-ocr.json'), JSON.stringify(payload));
await fs.writeFile(path.join(outputDir, 'kashmiri-school-textbooks-ocr.txt'), result.map(x => `\n===== ${x.book} · PDF PAGE ${x.page} =====\n\n${x.text}\n`).join(''));
console.log(JSON.stringify({ books: books.length, pages: result.length, characters: result.reduce((n, x) => n + x.text.length, 0), output: outputDir }));
