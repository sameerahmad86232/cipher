import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Stream the English Kaikki dump rather than loading its 3+ GB into memory.
// curl --fail -L URL | node scripts/import-english-translations.mjs
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = fs.existsSync(path.join(root, 'dist/assets/dictionary.json')) ? path.join(root, 'dist') : root;
const target = path.join(site, 'assets/dictionary.json');
const clean = value => String(value || '').normalize('NFC').replace(/\s+/g, ' ').trim();
const entries = JSON.parse(fs.readFileSync(target, 'utf8'));
const key = (k, e, sense = '') => `${clean(k)}\0${clean(e).toLowerCase()}\0${clean(sense)}`;
const existing = new Set(entries.map(e => key(e.k, e.e, e.context)));
const incoming = [];
let download;
const downloadResult = process.argv.includes('--download') ? new Promise((resolve, reject) => {
  download = spawn('curl', ['--fail', '--location', '--silent', '--show-error', 'https://kaikki.org/dictionary/English/kaikki.org-dictionary-English.jsonl'], { stdio: ['ignore', 'pipe', 'inherit'] });
  download.once('error', reject); download.once('close', resolve);
}) : null;
let lines = 0, pairs = 0;
const parts = { noun: 'N', verb: 'V', adj: 'Adj', adv: 'Adv', pron: 'Pron', name: 'Proper noun', num: 'Number', prep: 'Prep', conj: 'Conjunction', intj: 'Interjection', phrase: 'Phrase' };
for await (const line of readline.createInterface({ input: download?.stdout || process.stdin, crlfDelay: Infinity })) {
  lines++;
  if (!line.includes('"Kashmiri"')) continue;
  const row = JSON.parse(line);
  if (row.lang_code !== 'en' || !row.word || row.pos === 'character') continue;
  for (const translation of row.translations || []) {
    if ((translation.code || translation.lang_code) !== 'ks' || !/\p{Script=Arabic}/u.test(translation.word || '')) continue;
    if (translation.tags?.some(t => ['needs-checking', 'translation-needed', 'extinct', 'error-unknown-tag'].includes(t))) continue;
    const k = clean(translation.word), e = clean(row.word), context = clean(translation.sense);
    const id = key(k, e, context);
    pairs++;
    if (existing.has(id)) continue;
    existing.add(id);
    incoming.push({ k, e, p: parts[row.pos] || row.pos, x: '', context,
      tr: clean(translation.roman), grammar: translation.tags || [], s: 'Wiktionary translation table',
      url: `https://en.wiktionary.org/wiki/${encodeURIComponent(row.word)}#Translations`, license: 'CC BY-SA 4.0' });
  }
}
// The --download path verifies curl's exit before replacing dictionary data.
if (downloadResult && await downloadResult !== 0) throw Error('English dump download failed; dictionary left unchanged.');
// For piped stdin, reject obviously incomplete input; prefer --download.
if (lines < 100000 && !process.argv.includes('--allow-small-fixture')) throw Error(`Incomplete English dump: only ${lines} lines`);
entries.push(...incoming);
fs.writeFileSync(target, `${JSON.stringify(entries)}\n`);
console.log(JSON.stringify({ source_rows: lines, sourced_pairs: pairs, added: incoming.length, total: entries.length }));
