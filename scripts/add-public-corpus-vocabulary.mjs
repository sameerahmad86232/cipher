import fs from 'node:fs';
import path from 'node:path';
const root = fs.existsSync('dist/assets/dictionary.json') ? 'dist' : '.';
const { fold } = await import(path.resolve(root, 'assets/dictionary-search.mjs'));
const { transliterateKashmiri } = await import(path.resolve(root, 'assets/transliteration.mjs'));
const corpus = JSON.parse(fs.readFileSync(path.join(root, 'assets/kashmiri-public-corpus.json'), 'utf8'));
const file = path.join(root, 'assets/dictionary-corpus.json');
const existing = new Set(JSON.parse(fs.readFileSync(path.join(root, 'assets/dictionary.json'), 'utf8')).map(row => fold(row.k || '')));
for (let i = 1; i <= 8; i++) {
  const shard = path.join(root, `assets/dictionary-kashir-${i}.json`);
  if (fs.existsSync(shard)) for (const row of JSON.parse(fs.readFileSync(shard, 'utf8'))) existing.add(fold(row.k || ''));
}
const tokenPattern = /[\p{Script=Arabic}][\p{Script=Arabic}\p{M}\u200c\u200d'’ʼ-]*/gu;
const entries = new Map();
for (const row of corpus.records || []) {
  const seen = new Set();
  for (const match of row.text.matchAll(tokenPattern)) {
    const token = match[0].normalize('NFC').replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, '');
    const key = fold(token);
    if (!key || [...token].filter(ch => /\p{L}/u.test(ch)).length < 2 || seen.has(key) || existing.has(key)) continue;
    seen.add(key);
    const item = entries.get(key) || { k: token, references: [] };
    if (item.references.length < 1) item.references.push({ row });
    entries.set(key, item);
  }
}
const rows = [...entries.values()].map(({ k, references }) => {
  const first = references[0].row;
  return {
    k,
    e: 'Corpus vocabulary word (English definition not supplied by the source)',
    p: 'Corpus word',
    tr: transliterateKashmiri(k),
    trGenerated: true,
    corpusVocabulary: true,
    sources: [{ s: `${first.dataset} · public corpus`, url: first.source, license: first.license }],
    references: references.map(({ row }) => ({
      s: `${row.dataset} corpus sentence`, url: row.source, license: row.license
    }))
  };
});
fs.writeFileSync(file, JSON.stringify(rows) + '\n');
console.log(JSON.stringify({ vocabulary: rows.length, references: rows.reduce((n, row) => n + row.references.length, 0), file }));
