import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chapterOneSections } from '../src/data/seerahChapterOne';

const parseLines = (path: string) => readFileSync(path, 'utf8').trim().split('\n').map(line => JSON.parse(line));
const review = parseLines('training-data/seerah-chapter1-parallel-review.jsonl');
const gold = parseLines('training-data/approved-parallel.jsonl');
const index = JSON.parse(readFileSync('assets/hybrid-translation-index.json', 'utf8'));
const sourcePairs = chapterOneSections.flatMap(section => section.pairs);

assert.equal(review.length, 37);
assert.equal(new Set(review.map(row => row.id)).size, review.length);
assert.deepEqual(review.map(row => row.english), sourcePairs.map(pair => pair.english.normalize('NFC').trim()));
assert.deepEqual(review.map(row => row.kashmiri), sourcePairs.map(pair => pair.kashmiri.normalize('NFC').trim()));
assert.ok(review.every(row => row.trainingTier === 'review-only' && row.humanReview === 'pending-source-alignment'));
assert.ok(review.every(row => !gold.some(item => item.id === row.id)));
assert.ok(review.every(row => index.pairs.some(item => item.id === row.id)));

console.log(`Verified ${review.length} Seerah review pairs; none entered gold training.`);
