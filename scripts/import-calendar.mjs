import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import the calendar subset of Kaikki's Wiktionary extraction. Source words
// and definitions are preserved; romanization and examples are source fields.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/import-calendar.mjs SOURCE.jsonl');
const siteRoot = fs.existsSync(path.join(root, 'dist/assets/dictionary.json')) ? path.join(root, 'dist') : root;
const target = path.join(siteRoot, 'assets/dictionary.json');
const entries = JSON.parse(fs.readFileSync(target, 'utf8'));
const baseCount = entries.length;
const key = (word, meaning) => `${word.normalize('NFC').trim()}\u0000${meaning.normalize('NFC').toLowerCase().trim()}`;
const indexed = new Map(entries.map(entry => [key(entry.k, entry.e), entry]));
const words = new Set([
  'ژٔنٛدرٕوار', 'بۄنٛوار', 'بوموار', 'بۄدوار', 'برَٛسوار', 'برٛؠسوار',
  'جُمعہ', 'شۆکُروار', 'بَٹہٕ وار', 'آتھوار', 'اَز', 'راتھ', 'پَگاہ',
  'دۄہ', 'دۄہَے', 'ٲدؠ', 'یَوٕ', 'روتُل', 'ہَفتہٕ', 'ؤری', 'پَرُس',
  'سُل', 'خۄفتَن',
]);
const parts = { noun: 'N', adv: 'Adv', name: 'Proper noun' };
let imported = 0;
for (const line of fs.readFileSync(source, 'utf8').trim().split('\n')) {
  const row = JSON.parse(line);
  if (row.lang_code !== 'ks' || !/[\u0600-\u06ff]/.test(row.word)) continue;
  for (const sense of row.senses ?? []) {
    const glosses = sense.glosses ?? [];
    if (!glosses.length || (!words.has(row.word) && !glosses.some(gloss => /month of Kashmiri calendar/i.test(gloss)))) continue;
    const meaning = glosses.join('; ');
    const example = sense.examples?.find(item => item.text && (item.english || item.translation));
    const metadata = {
      topic: 'calendar',
      s: 'Wiktionary',
      url: `https://en.wiktionary.org/wiki/${encodeURIComponent(row.word)}#Kashmiri`,
      license: 'CC BY-SA 4.0',
      tr: row.forms?.find(form => form.tags?.includes('romanization'))?.form ?? '',
      ipa: row.sounds?.find(sound => sound.ipa)?.ipa ?? '',
    };
    const match = indexed.get(key(row.word, meaning));
    if (match) {
      Object.assign(match, metadata);
      if (!match.x && example) match.x = example.english || example.translation;
      if (example) match.kx = example.text;
    } else {
      const entry = { k: row.word, e: meaning, p: parts[row.pos] || row.pos, x: example?.english || example?.translation || '', ...metadata };
      if (example) entry.kx = example.text;
      entries.push(entry);
      indexed.set(key(entry.k, entry.e), entry);
    }
    imported++;
  }
}
fs.writeFileSync(target, `${JSON.stringify(entries)}\n`, 'utf8');
console.log(JSON.stringify({ source_senses: imported, added: entries.length - baseCount, total: entries.length, calendar_records: entries.filter(entry => entry.topic === 'calendar').length }));
