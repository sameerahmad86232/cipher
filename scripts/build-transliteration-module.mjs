import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const orthography = JSON.parse(fs.readFileSync(new URL('dist/assets/kashmiri-orthography.json', root), 'utf8'));
const rules = orthography.characters
  .filter(row => row['arab-ks'] && !row['arab-ks'].startsWith('\\u') && row.translit)
  .map(row => ({ native: row['arab-ks'], translit: row.translit }))
  .sort((a, b) => b.native.length - a.native.length);
const fallback = {'ۍ':'y','ٮ':'b','ء':'ʔ','أ':'a','إ':'i','ۂ':'h','ۯ':'ə','ۆ':'w','ئ':'y','ة':'a','ك':'k','ه':'h','ي':'y','ۇ':'u','ە':'a','ې':'e','ڭ':'ng','ى':'y','٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'};

const output = `// Character-based Kashmiri romanization from the published orthography notes.\nconst rules = ${JSON.stringify(rules)};\nconst fallback = ${JSON.stringify(fallback)};\n\nexport function transliterateKashmiri(value) {\n  const input = String(value || '').normalize('NFC');\n  let result = '';\n  for (let i = 0; i < input.length;) {\n    const rule = rules.find(candidate => input.startsWith(candidate.native, i));\n    if (rule) { result += rule.translit; i += rule.native.length; continue; }\n    const code = input.codePointAt(i);\n    const char = String.fromCodePoint(code);\n    if (Object.prototype.hasOwnProperty.call(fallback, char)) result += fallback[char];\n    else if (!/[\\u0600-\\u06ff\\u0750-\\u077f\\u08a0-\\u08ff]/u.test(char) || !/\\p{M}/u.test(char)) result += char;\n    i += char.length;\n  }\n  return result.replace(/\\s+/g, ' ').replace(/\\s+([,;:!?])/g, '$1').trim();\n}\n`;
fs.writeFileSync(new URL('dist/assets/transliteration.mjs', root), output);
