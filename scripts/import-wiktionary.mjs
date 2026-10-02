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
let relatedAdded = 0;
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
      forms: [...new Map((row.forms || []).filter(form => /\p{Script=Arabic}/u.test(form.form || '') && !form.tags?.some(t => ['table-tags', 'inflection-template'].includes(t)))
        .map(form => ({ word: clean(form.form), tags: form.tags || [], tr: clean(form.roman) }))
        .map(form => [JSON.stringify(form), form])).values()],
      grammar: (sense.tags || []).filter(tag => !['no-gloss', 'form-of'].includes(tag)),
      etymology: clean(row.etymology_text),
      synonyms: (sense.synonyms || row.synonyms || []).filter(x => /\p{Script=Arabic}/u.test(x.word || '')).map(x => clean(x.word)),
      antonyms: (sense.antonyms || row.antonyms || []).filter(x => /\p{Script=Arabic}/u.test(x.word || '')).map(x => clean(x.word)),
      examples: (sense.examples || []).filter(x => x.text && (x.english || x.translation)).map(x => ({ k: clean(x.text), e: clean(x.english || x.translation) })),
    };
    // Descriptions of inflections and long dictionary explanations are for
    // lookup, rather than substitutes for words in the lexical translator.
    if (sense.tags?.includes('form-of') || row.pos === 'proverb' || meaning.length > 100 || meaning.split(/\s+/).length > 5) metadata.lexical = false;
    const id = key(row.word, meaning);
    const matches = index.get(id);
    if (matches) {
      for (const entry of matches) {
        const provenance = [...(entry.sources || [])];
        if (entry.url && entry.url !== metadata.url) provenance.push({ s: entry.s, url: entry.url, license: entry.license });
        // Translation-table context was added in this edition. Retain its
        // English-page attribution even when the same pair has a KS definition.
        if (entry.context && !entry.context.includes(' term listed under ')) provenance.push({ s: 'Wiktionary translation table', url: `https://en.wiktionary.org/wiki/${encodeURIComponent(entry.e)}#Translations`, license: 'CC BY-SA 4.0' });
        Object.assign(entry, metadata);
        if (provenance.length) entry.sources = [...new Map(provenance.map(s => [s.url, s])).values()];
        // Keep the two halves from the same source example. A previous English
        // illustration must never be presented as the translation of this KS text.
        if (example) { entry.x = clean(example.english || example.translation); entry.kx = clean(example.text); }
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
  // Explicitly glossed derived / related terms are additional sourced entries,
  // not guessed definitions propagated to every synonym.
  for (const relation of ['derived', 'related', 'synonyms', 'antonyms']) {
    for (const term of row[relation] || []) {
      const word = clean(term.word), meaning = clean(term.english || term.translation);
      if (!/\p{Script=Arabic}/u.test(word) || !meaning || index.has(key(word, meaning))) continue;
      const entry = { k: word, e: meaning, p: '', x: '', tr: clean(term.roman), s: 'Wiktionary',
        url: `https://en.wiktionary.org/wiki/${encodeURIComponent(row.word)}#Kashmiri`, license: 'CC BY-SA 4.0', context: `${relation} term listed under ${row.word}` };
      entries.push(entry); index.set(key(word, meaning), [entry]); relatedAdded++;
    }
  }
}
fs.writeFileSync(target, `${JSON.stringify(entries)}\n`, 'utf8');
console.log(JSON.stringify({
  source_senses: sourceSenses,
  added: entries.length - initialCount,
  enriched_or_merged: enriched,
  related_added: relatedAdded,
  total: entries.length,
  wiktionary_records: entries.filter(entry => entry.s === 'Wiktionary').length,
  records_with_kashmiri_examples: entries.filter(entry => entry.kx).length,
}));
