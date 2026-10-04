import fs from 'node:fs/promises';

const sourceFile = process.argv[2] || 'source-ocr/jkbose-class-1/kashmiri-school-textbooks-ocr.json';
const targetFile = process.argv[3] || 'dist/assets/kashmiri-reading-ocr.json';
const source = JSON.parse(await fs.readFile(sourceFile, 'utf8'));
const target = JSON.parse(await fs.readFile(targetFile, 'utf8'));
const incomingIds = new Set(source.books.map(book => book.id));

target.books = target.books.filter(book => !incomingIds.has(book.id));
target.pages = target.pages.filter(page => !incomingIds.has(page.book));
for (const book of source.books) {
  target.books.push({
    id: book.id,
    title: book.title,
    creator: book.creator,
    category: 'School textbook',
    grade: book.grade,
    source: book.url,
    pages: book.pages,
    license: 'Rights-holder permission reported by the project owner; machine OCR for review'
  });
}
target.pages.push(...source.pages);
target.permission = `${target.permission} The project owner reports rights-holder permission for the JKBOSE Class I upload.`;
target.method = `${target.method} JKBOSE Class I was freshly OCRed at 300 DPI with tessdata_best Urdu recognition; output is unverified.`;
await fs.writeFile(targetFile, `${JSON.stringify(target)}\n`);
console.log(JSON.stringify({ books: target.books.length, pages: target.pages.length, addedBooks: source.books.length, addedPages: source.pages.length }));
