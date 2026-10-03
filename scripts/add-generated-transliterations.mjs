import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const orthography = JSON.parse(fs.readFileSync(new URL('dist/assets/kashmiri-orthography.json', root), 'utf8'));
const recordsPath = new URL('dist/assets/dictionary.json', root);
const records = JSON.parse(fs.readFileSync(recordsPath, 'utf8'));

const arabic = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u;
const rules = orthography.characters
  .filter(row => row['arab-ks'] && !row['arab-ks'].startsWith('\\u') && row.translit)
  .map(row => ({ native: row['arab-ks'], translit: row.translit }))
  .sort((a, b) => b.native.length - a.native.length);
const examples = new Map();
for (const row of orthography.examples || []) {
  if (row.native && row.transcription) examples.set(row.native.normalize('NFC'), row.transcription);
}
const fallback = new Map(Object.entries({
  'ۍ': 'y', 'ٮ': 'b', 'أ': 'a', 'ۂ': 'h', 'ۯ': 'ə', 'ۆ': 'w', 'ئ': 'y',
  'ۇ': 'u', 'ە': 'a', 'ې': 'e', 'ڭ': 'ng', 'ى': 'y', '٠': '0',
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
}));

function transliterate(value) {
  const input = String(value || '').normalize('NFC');
  let result = '';
  for (let i = 0; i < input.length;) {
    const rule = rules.find(candidate => input.startsWith(candidate.native, i));
    if (rule) { result += rule.translit; i += rule.native.length; continue; }
    const code = input.codePointAt(i);
    const char = String.fromCodePoint(code);
    // Directional controls and unsupported marks have no spoken value.
    if (fallback.has(char)) result += fallback.get(char);
    else if (!/[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u.test(char) || !/[\p{M}]/u.test(char)) result += char;
    i += char.length;
  }
  return result.replace(/\s+/g, ' ').replace(/\s+([,;:!?])/g, '$1').trim();
}

let generated = 0;
for (const row of records) {
  if (row.tr && !row.trGenerated) continue;
  if (row.trGenerated) { delete row.tr; delete row.trSource; delete row.trGenerated; }
  const key = String(row.k || '').normalize('NFC');
  if (!key) continue;
  const exact = examples.get(key);
  const value = exact || (arabic.test(key) ? transliterate(key) : key);
  if (!value) continue;
  row.tr = value;
  row.trGenerated = true;
  row.trSource = exact
    ? 'Richard Ishida, Arabic (Kashmiri), Nastaliq orthography notes v32 · example transcription'
    : 'Richard Ishida, Arabic (Kashmiri), Nastaliq orthography notes v32 · character mapping';
  generated += 1;
}

fs.writeFileSync(recordsPath, `${JSON.stringify(records)}\n`);
console.log(`generated=${generated} total=${records.length} missing=${records.filter(row => !row.tr).length}`);
