import fs from 'node:fs/promises';
import { transliterateKashmiri } from '../dist/assets/transliteration.mjs';

const [dictionaryFile, jsonFile, jsonlFile] = process.argv.slice(2);
if (!dictionaryFile || !jsonFile || !jsonlFile) throw Error('Usage: node scripts/build-reviewed-training-data.mjs DICTIONARY.json OUTPUT.json OUTPUT.jsonl');
const entries = JSON.parse(await fs.readFile(dictionaryFile, 'utf8'));
const arabic = /\p{Script=Arabic}/u;
const pairs = [];
const seen = new Set();

for (const entry of entries) {
  if (entry.ocrVocabulary || entry.corpusVocabulary || entry.p === 'Romanized') continue;
  const source = entry.url ? { name: entry.s || 'Attributed dictionary source', url: entry.url, license: entry.license || '' }
    : (entry.sources || []).find(item => item.url && item.license);
  if (!source?.url || !source.license) continue;
  const candidates = entry.examples?.length ? entry.examples : entry.kx && entry.x ? [{ k: entry.kx, e: entry.x }] : [];
  for (const example of candidates) {
    const kashmiri = String(example.k || '').normalize('NFC').trim();
    const english = String(example.e || '').trim();
    if (!kashmiri || !english || !arabic.test(kashmiri) || arabic.test(english)) continue;
    const key = `${kashmiri}\0${english.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    pairs.push({
      id: `ks-en-${String(pairs.length + 1).padStart(4, '0')}`,
      kashmiri,
      english,
      transliteration: transliterateKashmiri(kashmiri),
      headword: entry.k,
      partOfSpeech: entry.p || '',
      grammar: entry.grammar || [],
      forms: (entry.forms || []).map(form => ({ word: form.word, tags: form.tags || [] })),
      source: { name: source.name || source.s || entry.s || 'Attributed dictionary source', url: source.url, license: source.license },
      status: 'source-attested',
      humanReview: 'pending'
    });
  }
}

const payload = {
  title: 'Koshur Lughat persistent Kashmiri–English training memory',
  version: 1,
  generatedAt: new Date().toISOString(),
  purpose: 'Versioned, attributed sentence pairs for translation-memory lookup and future model fine-tuning.',
  counts: { pairs: pairs.length, humanReviewed: pairs.filter(pair => pair.humanReview === 'approved').length, pendingHumanReview: pairs.filter(pair => pair.humanReview === 'pending').length },
  policy: [
    'Raw OCR, monolingual corpus rows and historical romanization are excluded.',
    'Source-attested means the two sides occur as a paired example in the cited source; it does not mean a fluent reviewer approved it.',
    'Only humanReview=approved should be used as a gold evaluation set.',
    'Future corrections must preserve the original pair, reviewer note and source provenance.'
  ],
  pairs
};
await fs.mkdir(new URL('../training-data/', import.meta.url), { recursive: true });
await fs.writeFile(jsonFile, `${JSON.stringify(payload, null, 2)}\n`);
await fs.writeFile(jsonlFile, `${pairs.map(pair => JSON.stringify(pair)).join('\n')}\n`);
console.log(JSON.stringify(payload.counts));
