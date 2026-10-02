import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import sourced Perso-Arabic definitions without generating new meanings.
// Use the Kashmiri JSONL from https://kaikki.org/dictionary/Kashmiri/.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/import-wiktionary.mjs SOURCE.jsonl');
const siteRoot = fs.existsSync(path.join(root, 'dist/assets/dictionary.json')) ? path.join(root, 'dist') : root;
const target = path.join(siteRoot, 'assets/dictionary.json');
const entries = JSON.parse(fs.readFileSync(target, 'utf8'));
const initialCount = entries.length;
const clean = text => String(text || '').normalize('NFC').replace(/\s+/g, ' ').trim();
const key = (word, meaning) => `${clean(word)}\u0000${clean(meaning).toLowerCase()}`;
const index = new Map();
for (const entry of entries) {
  const id = key(entry.k, entry.e);
  if (!index.has(id)) index.set(id, []);
  index.get(id).push(entry);
}
const parts = {
  noun: 'N', verb: 'V', adj: 'Adj', name: 'Proper noun', adv: 'Adv',
  pron: 'Pron', num: 'Number', intj: 'Interjection', det: 'Determiner',
  particle: 'Particle', phrase: 'Phrase', prep: 'Prep', postp: 'Postposition',
  conj: 'Conjunction', suffix: 'Suffix', proverb: 'Proverb',
};
let sourceSenses = 0;
let enriched = 0;
for (const line of fs.readFileSync(source, 'utf8').trim().split('\n')) {
  const row = JSON.parse(line);
  if (row.lang_code !== 'ks' || row.pos === 'character' || !/[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/.test(row.word)) continue;
  for (const sense of row.senses || []) {
    const glosses = (sense.glosses || []).map(clean).filter(Boolean);
    if (!glosses.length || sense.tags?.includes('no-gloss')) continue;
    const meaning = glosses.join('; ');
    const example = sense.examples?.find(item => item.text && (item.english || item.translation));
    const metadata = {
      s: 'Wiktionary',
      url: `https://en.wiktionary.org/wiki/${encodeURIComponent(row.word)}#Kashmiri`,
      license: 'CC BY-SA 4.0',
      tr: row.forms?.find(form => form.tags?.includes('romanization'))?.form || '',
      ipa: row.sounds?.find(sound => sound.ipa)?.ipa || '',
    };
    // Descriptions of inflections and long dictionary explanations are for
    // lookup, rather than substitutes for words in the lexical translator.
    if (sense.tags?.includes('form-of') || row.pos === 'proverb' || meaning.length > 100 || meaning.split(/\s+/).length > 5) metadata.lexical = false;
    const id = key(row.word, meaning);
    const matches = index.get(id);
    if (matches) {
      for (const entry of matches) {
        Object.assign(entry, metadata);
        if (!entry.x && example) entry.x = clean(example.english || example.translation);
        if (example) entry.kx = clean(example.text);
      }
      enriched++;
    } else {
      const entry = {
        k: row.word, e: meaning, p: parts[row.pos] || row.pos,
        x: example ? clean(example.english || example.translation) : '',
        ...metadata,
      };
      if (example) entry.kx = clean(example.text);
      entries.push(entry);
      index.set(id, [entry]);
    }
    sourceSenses++;
  }
}
fs.writeFileSync(target, `${JSON.stringify(entries)}\n`, 'utf8');
console.log(JSON.stringify({
  source_senses: sourceSenses,
  added: entries.length - initialCount,
  enriched_or_merged: enriched,
  total: entries.length,
  wiktionary_records: entries.filter(entry => entry.s === 'Wiktionary').length,
  records_with_kashmiri_examples: entries.filter(entry => entry.kx).length,
}));
