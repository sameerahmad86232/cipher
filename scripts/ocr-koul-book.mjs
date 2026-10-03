import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const [pdf, outputDir, ...flags] = process.argv.slice(2);
if (!pdf || !outputDir) throw Error('Usage: node scripts/ocr-koul-book.mjs BOOK.pdf OUTPUT_DIR [--tessdata-dir DIR]');
const tessIndex = flags.indexOf('--tessdata-dir');
const tessdata = tessIndex >= 0 ? flags[tessIndex + 1] : '';
const pages = 140;
const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'koul-ocr-'));
await fs.mkdir(outputDir, { recursive: true });
const sourceUrl = 'https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul';
const jobs = Array.from({ length: pages }, (_, i) => i + 1);
await run('pdfimages', ['-j', '-f', '1', '-l', String(pages), pdf, path.join(temporary, 'page')], { maxBuffer: 1024 * 1024 });
const imageFiles = (await fs.readdir(temporary)).filter(name => name.startsWith('page-') && /\.(png|jpg|jpeg)$/i.test(name)).sort();
if (imageFiles.length !== pages) throw Error(`Expected ${pages} page images, found ${imageFiles.length}`);
let cursor = 0;
const result = new Array(pages);
async function worker() {
  while (cursor < jobs.length) {
    const page = jobs[cursor++];
    const image = path.join(temporary, imageFiles[page - 1]);
    const args = [image, 'stdout', '-l', 'eng+ara', '--psm', '3'];
    if (tessdata) args.push('--tessdata-dir', tessdata);
    const { stdout } = await run('tesseract', args, { maxBuffer: 4 * 1024 * 1024 });
    result[page - 1] = { page, text: stdout.replace(/\u000c/g, '').trim() };
    await fs.unlink(image).catch(() => {});
    process.stdout.write(`OCR page ${page}/${pages}\n`);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
const payload = { title: 'Kashmiri-English Dictionary for Second Language Learners', creators: ['Omkar N. Koul', 'S. N. Raina', 'Roop Krishen Bhat'], publisher: 'Central Institute of Indian Languages', year: 2000, pages: result, source: sourceUrl, method: 'Tesseract OCR eng+ara, page images rendered at 2400 px; machine output requires human review.' };
await fs.writeFile(path.join(outputDir, 'koul-book-ocr.json'), JSON.stringify(payload));
await fs.writeFile(path.join(outputDir, 'koul-book-ocr.txt'), result.map(x => `\n===== PDF PAGE ${x.page} =====\n\n${x.text}\n`).join(''));
console.log(JSON.stringify({ pages: result.length, characters: result.reduce((n, x) => n + x.text.length, 0), output: outputDir }));
