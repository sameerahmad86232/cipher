import fs from 'node:fs';
import path from 'node:path';

const source = process.argv[2];
if (!source) throw Error('Usage: node scripts/import-kaeshir.mjs /path/to/kaeshir-dictionary-data');
const base = path.resolve(source, 'kashmiri/data');
const destination = path.resolve('dist/assets');
const pin = '4222492fbac277321bc0a4bfc6cc790edc25566a';
const repo = `https://github.com/izan-majeed/kaeshir-dictionary-data/blob/${pin}/kashmiri/data/`;
const license = 'MIT';
const name = 'Kaeshir Dictionary · Izan Majeed';
const clean = value => String(value || '').normalize('NFC').trim();
const valid = value => value && value !== '-' && value !== '—';
const pairKey = (k, e) => `${clean(k)}\0${clean(e).toLocaleLowerCase()}`;
const records = JSON.parse(fs.readFileSync(path.join(destination, 'dictionary.json')));
const pairs = new Map(records.map((row, i) => [pairKey(row.k, row.e), i]));
let inserted = 0, enriched = 0;
for (const sourceRow of JSON.parse(fs.readFileSync(path.join(base, 'collected-words.json')))) {
  const e = clean(sourceRow.title);
  if (!e || !valid(sourceRow.kashmiriMeaning)) continue;
  const variants = clean(sourceRow.kashmiriMeaning).split(/[،,؛;]/).map(clean).filter(valid);
  const roman = clean(sourceRow.englishMeaning).split(/[,،;]/).map(clean).filter(valid);
  const pos = clean(sourceRow.pos).split(',').at(-1).trim().toLowerCase();
  const p = pos.includes('noun') ? 'N' : pos.includes('verb') ? 'V' : pos.includes('adjective') ? 'Adj' : pos.includes('adverb') ? 'Adv' : '';
  const provenance = { s: name, url: `${repo}collected-words.json`, license };
  for (const [i, k] of variants.entries()) {
    if (!/\p{Script=Arabic}/u.test(k)) continue;
    const key = pairKey(k, e);
    const tr = roman.length === variants.length ? roman[i] : roman.length === 1 && variants.length === 1 ? roman[0] : '';
    const romanExample = valid(sourceRow.kashmiriExample) && valid(sourceRow.englishExample) ? { k: clean(sourceRow.kashmiriExample), e: clean(sourceRow.englishExample) } : undefined;
    if (pairs.has(key)) {
      const row = records[pairs.get(key)];
      if (!row.url || row.url !== provenance.url) {
        row.sources ||= [];
        if (!row.sources.some(s => s.url === provenance.url)) row.sources.push(provenance);
      }
      if (tr && !row.tr) row.tr = tr;
      if (romanExample && !row.romanExample) row.romanExample = romanExample;
      enriched++;
    } else {
      const row = { k, e, p, s: name, url: provenance.url, license };
      if (tr) row.tr = tr;
      if (romanExample) row.romanExample = romanExample;
      records.push(row); pairs.set(key, records.length - 1); inserted++;
    }
  }
}
fs.writeFileSync(path.join(destination, 'dictionary.json'), JSON.stringify(records));
const historical = [];
const seen = new Set();
for (const sourceRow of JSON.parse(fs.readFileSync(path.join(base, 'dictionary-words.json')))) {
  const k = clean(sourceRow.word), meaning = clean(sourceRow.meaning);
  if (!k || !meaning || /\p{Script=Arabic}/u.test(k)) continue;
  const key = pairKey(k, meaning);
  if (seen.has(key)) continue;
  seen.add(key);
  const preview = meaning.length > 230 ? `${meaning.slice(0, 230).replace(/\s+\S*$/, '')}…` : meaning;
  historical.push({ k, e: preview, fullMeaning: meaning.length > 230 ? meaning : undefined, s: 'Grierson · via Kaeshir Dictionary', url: `${repo}dictionary-words.json`, license });
}
fs.writeFileSync(path.join(destination, 'historical-lexicon.json'), JSON.stringify(historical));
console.log(JSON.stringify({ inserted, enriched, records: records.length, historical: historical.length }));
