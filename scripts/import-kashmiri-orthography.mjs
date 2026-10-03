import fs from 'node:fs';

const dir = process.argv[2] || '/tmp/ks-orthography';
const read = name => fs.readFileSync(`${dir}/${name}`, 'utf8');
const langText = read('ks-langdata.js');
const getQuoted = key => langText.match(new RegExp(`${key}:"([^"]*)"`))?.[1] || '';
const spreadsheet = read('arab-ks.js').match(/`([\s\S]*)`/)?.[1] || '';
const headings = spreadsheet.split(/\r?\n/).filter(Boolean);
const fields = headings.shift().split('\t');
const characters = headings.map(line => Object.fromEntries(fields.map((field, i) => [field, line.split('\t')[i] || '']))).filter(row => row.key);
const examplesText = read('ks-examples.js').match(/autoExpandExamples\.ks = `([\s\S]*?)`/)?.[1] || '';
const exampleFields = ['native', 'meaning', 'ipa', 'transcription', 'otherTranscriptions', 'notes', 'wiktionary'];
const examples = examplesText.split(/\r?\n/).filter(line => line.includes('|') && !line.trim().startsWith('@')).map(line => {
  const values = line.split('|');
  return Object.fromEntries(exampleFields.map((field, i) => [field, (values[i] || '').trim()]));
}).filter(row => row.native && row.meaning && row.meaning !== '␣');
const metadata = {
  language: getQuoted('name'), localName: getQuoted('local'), languageTag: 'ks', script: 'Arab', direction: 'rtl',
  letters: getQuoted('letter'), auxiliaryLetters: getQuoted('letteraux'), combiningMarks: getQuoted('mark'), auxiliaryMarks: getQuoted('markaux'),
  digits: getQuoted('number'), punctuation: getQuoted('punctuation'), symbols: getQuoted('symbol'), otherCharacters: getQuoted('other'),
  source: 'Richard Ishida, Arabic (Kashmiri), Nastaliq orthography notes v32', sourceUrl: 'https://r12a.github.io/scripts/arab/ks.html', retrieved: '2026-10-03',
  notes: [
    'Kashmiri is principally written in Arabic script in the Nastaliq style; Naskh is also used.',
    'All Kashmiri vowel sounds are represented in Arabic-script writing. Vowels use combining marks and letters, and vowel diacritics are normally visible.',
    'Modern Kashmiri has 21 basic consonants, 6 aspirated digraphs, and extended consonants for Persian, Arabic and Urdu loans.',
    'Jazm is normally placed over the second consonant in a Kashmiri onset cluster, unlike many other Arabic orthographies.',
    'Palatalisation uses Kashmiri yeh forms and is common in Kashmiri words.',
    'Kashmiri text is right-to-left; embedded Latin text and numbers run left-to-right.',
    'Applications should accept both NFC and decomposed spellings where the source describes canonically equivalent forms.',
  ],
};
fs.writeFileSync('dist/assets/kashmiri-orthography.json', JSON.stringify({ metadata, characters, examples }));
const dictionaryPath = 'dist/assets/dictionary.json';
const dictionary = JSON.parse(fs.readFileSync(dictionaryPath));
const key = (k, e) => `${k.normalize('NFC')}\0${e.toLocaleLowerCase()}`;
const existing = new Map(dictionary.map((row, i) => [key(row.k, row.e), i]));
let added = 0, enriched = 0;
for (const example of examples) {
  const k = example.native.normalize('NFC'), e = example.meaning;
  const provenance = { s: metadata.source, url: metadata.sourceUrl, license: 'Rights-holder permission (reported by project owner)' };
  if (existing.has(key(k, e))) {
    const row = dictionary[existing.get(key(k, e))];
    row.sources ||= [];
    if (!row.sources.some(source => source.url === provenance.url)) row.sources.push(provenance);
    if (example.transcription && !row.tr) row.tr = example.transcription;
    if (example.ipa && !row.ipa) row.ipa = example.ipa;
    enriched++;
  } else {
    const row = { k, e, p: 'Orthography example', tr: example.transcription, ipa: example.ipa, s: metadata.source, url: metadata.sourceUrl, license: provenance.license };
    if (!row.tr) delete row.tr;
    if (!row.ipa) delete row.ipa;
    dictionary.push(row); existing.set(key(k, e), dictionary.length - 1); added++;
  }
}
fs.writeFileSync(dictionaryPath, JSON.stringify(dictionary));
console.log(JSON.stringify({ characters: characters.length, examples: examples.length, added, enriched, records: dictionary.length, letters: [...metadata.letters].length, marks: [...metadata.combiningMarks].length }));
