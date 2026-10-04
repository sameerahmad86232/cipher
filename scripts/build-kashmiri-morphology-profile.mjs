import fs from 'node:fs/promises';

const [dictionaryFile, outputFile] = process.argv.slice(2);
if (!dictionaryFile || !outputFile) throw Error('Usage: node scripts/build-kashmiri-morphology-profile.mjs DICTIONARY.json OUTPUT.json');
const entries = JSON.parse(await fs.readFile(dictionaryFile, 'utf8'));
const sourced = entries.filter(entry => entry.forms || entry.grammar || entry.examples);
const count = values => [...values.reduce((map, value) => map.set(value, (map.get(value) || 0) + 1), new Map())]
  .sort((a, b) => b[1] - a[1]).map(([label, occurrences]) => ({ label, occurrences }));
const formTags = count(sourced.flatMap(entry => (entry.forms || []).flatMap(form => form.tags || [])));
const grammarTags = count(sourced.flatMap(entry => entry.grammar || []));
const partsOfSpeech = count(sourced.map(entry => entry.p || 'unspecified'));
const formExamples = {};
for (const tag of formTags.map(item => item.label)) {
  formExamples[tag] = sourced.flatMap(entry => (entry.forms || [])
    .filter(form => (form.tags || []).includes(tag))
    .map(form => ({ lemma: entry.k, english: entry.e, form: form.word, partOfSpeech: entry.p, grammar: entry.grammar || [], source: entry.url || entry.sources?.[0]?.url || '' })))
    .slice(0, 25);
}
const attributedEntries = entries.filter(entry => entry.license || entry.sources?.some(source => source.license));
const allAmbiguousEnglish = [...attributedEntries.reduce((map, entry) => {
  const key = String(entry.e || '').trim().toLowerCase();
  if (!key || entry.ocrVocabulary || entry.p === 'Romanized') return map;
  if (!map.has(key)) map.set(key, []);
  map.get(key).push({ kashmiri: entry.k, partOfSpeech: entry.p, source: entry.url || entry.sources?.[0]?.url || '' });
  return map;
}, new Map())]
  .map(([english, senses]) => ({ english, senses: [...new Map(senses.map(sense => [`${sense.kashmiri}\0${sense.partOfSpeech}`, sense])).values()] }))
  .filter(item => item.senses.length > 1)
  .sort((a, b) => b.senses.length - a.senses.length || a.english.localeCompare(b.english));
const ambiguousEnglish = allAmbiguousEnglish.slice(0, 500);

const payload = {
  title: 'Sourced Kashmiri morphology and lexical-ambiguity profile',
  generatedFrom: 'Koshur Lughat dictionary entries carrying Wiktionary/attributed morphology',
  purpose: 'Evidence for vocabulary sense selection and grammar review; not automatic paradigm generation.',
  counts: {
    dictionaryEntries: entries.length,
    morphologyEntries: sourced.length,
    entriesWithForms: sourced.filter(entry => entry.forms?.length).length,
    recordedForms: sourced.reduce((sum, entry) => sum + (entry.forms?.length || 0), 0),
    entriesWithPairedExamples: sourced.filter(entry => entry.examples?.length).length,
    attributedEntries: attributedEntries.length,
    ambiguousEnglishLemmas: allAmbiguousEnglish.length,
    ambiguityExamplesStored: ambiguousEnglish.length
  },
  grammarTags,
  formTags,
  partsOfSpeech,
  formExamples,
  ambiguousEnglish,
  limitations: [
    'Recorded forms are incomplete dictionary attestations, not full inflection tables.',
    'A shared English gloss does not guarantee interchangeable Kashmiri senses.',
    'Generated transliterations and raw OCR vocabulary are excluded as morphological evidence.',
    'Grammar-sensitive generation still requires context and fluent-speaker review.'
  ]
};
await fs.writeFile(outputFile, `${JSON.stringify(payload, null, 2)}\n`);
console.log(JSON.stringify(payload.counts));
