import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const webRoot = fs.existsSync('dist/assets') ? 'dist' : '.';
const {
  createTranslationMemory,
  dictionaryDraft,
  findMemoryMatch,
  normalizeTranslationText,
  reviewLabel
} = await import(path.resolve(webRoot, 'assets/hybrid-translator.mjs'));

const index = JSON.parse(fs.readFileSync(path.join(webRoot, 'assets/hybrid-translation-index.json'), 'utf8'));
const legacy = JSON.parse(fs.readFileSync(path.join(webRoot, 'assets/kashmiri-reviewed-training-data.json'), 'utf8'));
const memory = createTranslationMemory(index.pairs, legacy.lexicon);

assert.equal(index.counts.pairs, 145);
assert.equal(index.counts.approved, 52);
assert.equal(normalizeTranslationText('  Come HERE! '), 'come here');

const exact = findMemoryMatch(memory, 'Come here!', 'en-ks');
assert.equal(exact.kind, 'exact');
assert.equal(exact.output, 'وَل یور');
assert.equal(reviewLabel(exact.pair), 'Project-owner approved');

const typo = findMemoryMatch(memory, 'The children are playing fotball in the park.', 'en-ks');
assert.equal(typo.kind, 'close');
assert.match(typo.output, /فُٹ بال/);

assert.equal(findMemoryMatch(memory, 'Entirely unknown short thought', 'en-ks'), undefined);

const lexical = createTranslationMemory([], [
  { english: 'book', kashmiri: 'کِتاب' },
  { english: 'water', kashmiri: 'آب' }
]);
const draft = dictionaryDraft(lexical, 'book and water', 'en-ks');
assert.equal(draft.output, 'کِتاب and آب');
assert.equal(draft.unresolved[0], 'and');
assert.ok(draft.coverage >= 0.6);

console.log(JSON.stringify({ result: 'passed', pairs: index.counts.pairs, approved: index.counts.approved }));
