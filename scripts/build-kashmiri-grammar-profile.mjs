import fs from 'node:fs/promises';

const [sourceFile, outputFile] = process.argv.slice(2);
if (!sourceFile || !outputFile) throw Error('Usage: node scripts/build-kashmiri-grammar-profile.mjs CORPUS.json OUTPUT.json');
const corpus = JSON.parse(await fs.readFile(sourceFile, 'utf8'));
const wordPattern = /[\p{Script=Arabic}\p{M}][\p{Script=Arabic}\p{M}\u200c\u200d]*/gu;
const clean = (corpus.records || []).filter(record => {
  const text = String(record.text || '');
  const arabic = (text.match(/\p{Script=Arabic}/gu) || []).length;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  return arabic >= 20 && latin < Math.max(6, arabic * 0.08) && !/%[0-9A-F]{2}|==|https?:/i.test(text);
});

const frequencies = [new Map(), new Map(), new Map()];
const constructions = {
  copulas: ['چھُ', 'چُھ', 'چھِ', 'چِھ', 'چھےٚ', 'چُھس', 'چُھکھ', 'اوس', 'آسِ'],
  negation: ['نہٕ', 'نَہ', 'نٕہ', 'چھُنہٕ', 'چُھنہٕ', 'چھن'],
  relatives: ['یُس', 'یۄس', 'یِم', 'یَتھ'],
  correlatives: ['سُہ', 'تِم', 'تَتھ', 'تتھ'],
  genitives: ['ہُنٛد', 'ہِنٛز', 'سُنٛد', 'سٕنٛز'],
  postpositions: ['منٛز', 'مَنٛز', 'پؠٹھ', 'سٟتؠ', 'سٕتۍ', 'سٲتِہ', 'خٲطرٕ'],
  comparatives: ['کھۄتہٕ', 'کھوتہٕ'],
  questions: ['کیا', 'کُس', 'کوٚس', 'کٔتھ', 'کِتھ', 'کوت']
};
const constructionCounts = Object.fromEntries(Object.keys(constructions).map(key => [key, new Map()]));
const examples = Object.fromEntries(Object.keys(constructions).map(key => [key, []]));
for (const record of clean) {
  const words = String(record.text).normalize('NFC').match(wordPattern) || [];
  const wordSet = new Set(words);
  for (const [category, forms] of Object.entries(constructions)) {
    const present = forms.filter(form => wordSet.has(form));
    for (const form of present) constructionCounts[category].set(form, (constructionCounts[category].get(form) || 0) + words.filter(word => word === form).length);
    if (present.length && examples[category].length < 3) examples[category].push({ text: String(record.text).slice(0, 360), forms: present, source: record.source, dataset: record.dataset });
  }
  for (let index = 0; index < words.length; index += 1) {
    for (let size = 1; size <= 3; size += 1) {
      if (index + 1 < size) continue;
      const phrase = words.slice(index + 1 - size, index + 1).join(' ');
      frequencies[size - 1].set(phrase, (frequencies[size - 1].get(phrase) || 0) + 1);
    }
  }
}
const top = (map, limit) => [...map].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([text, count]) => ({ text, count }));
const pairedRelativeRecords = clean.filter(record => {
  const words = String(record.text).normalize('NFC').match(wordPattern) || [];
  return words.some(word => constructions.relatives.includes(word)) && words.some(word => constructions.correlatives.includes(word));
}).length;
const payload = {
  title: 'Licensed Kashmiri corpus grammar profile',
  generatedFrom: corpus.title,
  sourceRecords: corpus.records.length,
  cleanRecords: clean.length,
  excludesQuranMaterial: true,
  purpose: 'Attested-pattern evidence for grammar diagnostics; not a generative model or a claim of grammatical correctness.',
  limitations: ['The corpus is domain-skewed and contains repeated biographical templates.', 'Frequency is evidence of attestation, not a universal grammar rule.', 'Raw OCR collections are excluded from these counts.'],
  frequentWords: top(frequencies[0], 150),
  frequentBigrams: top(frequencies[1], 150),
  frequentTrigrams: top(frequencies[2], 150)
  ,constructionEvidence: Object.fromEntries(Object.keys(constructions).map(category => [category, {
    forms: top(constructionCounts[category], constructions[category].length),
    examples: examples[category]
  }])),
  pairedRelativeCorrelativeRecords: pairedRelativeRecords,
  reviewRules: [
    { id: 'predicate-late', statement: 'Finite predicates and auxiliaries commonly occur late in the clause; marked information structure can vary the order.', status: 'diagnostic-not-rewrite' },
    { id: 'copula-agreement', statement: 'Copula and auxiliary forms vary with person, number and gender; do not flatten every form to چھُ.', status: 'diagnostic-not-rewrite' },
    { id: 'past-ergative', statement: 'Perfective transitive clauses require review for ergative agent marking and agreement controlled by the object or default agreement.', status: 'diagnostic-not-rewrite' },
    { id: 'dative-subject', statement: 'Experiencer, possession and obligation constructions may use a dative subject.', status: 'diagnostic-not-rewrite' },
    { id: 'genitive-agreement', statement: 'Genitive forms such as ہُنٛد/ہِنٛز and سُنٛد/سٕنٛز agree with the possessed expression, not simply with the possessor.', status: 'diagnostic-not-rewrite' },
    { id: 'relative-correlative', statement: 'Relative forms often participate in a relative–correlative construction; check the matching main-clause expression.', status: 'diagnostic-not-rewrite' },
    { id: 'postpositions', statement: 'Kashmiri uses postpositions and oblique/case-marked dependents rather than English preposition order.', status: 'diagnostic-not-rewrite' },
    { id: 'negation', statement: 'Negative particles and fused negative copulas must be interpreted with the finite predicate; their surface position can vary.', status: 'diagnostic-not-rewrite' }
  ]
};
await fs.writeFile(outputFile, JSON.stringify(payload, null, 2) + '\n');
console.log(JSON.stringify({ sourceRecords: payload.sourceRecords, cleanRecords: payload.cleanRecords, outputFile }));
