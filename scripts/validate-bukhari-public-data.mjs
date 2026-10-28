import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const load = name => JSON.parse(readFileSync(resolve(root, 'public', 'quran-app', name), 'utf8'));
const ranges = [
  ['bukhari-1-20.json',1,20],
  ['bukhari-21-58.json',21,58],
  ['bukhari-59-100.json',59,100]
];
const all = [];
for (const [filename,start,end] of ranges) {
  const data = load(filename);
  assert.equal(data.collection, 'Sahih al-Bukhari');
  assert.equal(data.records.length, end-start+1, filename + ': expected every hadith');
  for (let number=start; number<=end; number++) {
    const h = data.records[number-start];
    assert.equal(h.number, number, filename + ': out-of-order hadith');
    assert.ok(typeof h.kashmiri === 'string' && h.kashmiri.trim().length>70, 'Missing full Kashmiri narration ' + number);
    assert.equal(h.sourceUrl, 'https://sunnah.com/bukhari:' + number);
    assert.equal(h.translationStatus, number<=26 ? 'approved-by-project-owner' : 'draft-needs-owner-review', 'Incorrect owner-approval status for ' + number);
    if (number>=21) {
      assert.ok(typeof h.arabic === 'string' && h.arabic.length > 35, 'Missing Arabic source for ' + number);
      assert.ok(h.narrator && h.title, 'Missing Hadith metadata for ' + number);
    }
    all.push(h);
  }
}
assert.equal(all.length, 100);
assert.equal(new Set(all.map(x=>x.number)).size,100);
const approved = readFileSync(resolve(root, 'training-data/hadith-corrections/approved-passages.jsonl'), 'utf8')
  .split(/\r?\n/).filter(Boolean).map(x=>JSON.parse(x));
const confirmed = new Map(approved.map(x=>[Number(x.hadithNumber),x.kashmiri]));
for (const h of all.filter(x=>x.number>=21&&x.number<=26)) {
  assert.equal(h.kashmiri, confirmed.get(h.number), 'Owner-approved wording changed for ' + h.number);
}
assert.equal(all.filter(h=>h.translationStatus==='draft-needs-owner-review').length,74);
console.log('PASS: Sahih al-Bukhari 1–100 sequential; 26 owner-approved, 74 clearly labelled draft; Arabic + source links present.');
