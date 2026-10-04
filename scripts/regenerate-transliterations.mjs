// Regenerates machine-generated transliterations so the stored data matches the
// current transliteration rules. Records without trGenerated carry hand-authored
// values and are never touched.
//
// Run from the repository root:  node scripts/regenerate-transliterations.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = fs.existsSync('dist/assets/dictionary.json') ? 'dist' : '.';
const assets = path.join(root, 'assets');
// A bare Windows drive path is rejected by the ESM loader, so import via URL.
const { transliterateKashmiri } = await import(pathToFileURL(path.resolve(assets, 'transliteration.mjs')).href);

const arabic = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u;
const files = ['dictionary.json', ...Array.from({ length: 8 }, (_, index) => `dictionary-kashir-${index + 1}.json`), 'dictionary-corpus.json'];
const report = { files: 0, generated: 0, changed: 0, alreadyCorrect: 0, skippedNoHeadword: 0, residueBefore: 0, residueAfter: 0, handAuthoredResidue: [] };

for (const name of files) {
  const file = path.join(assets, name);
  if (!fs.existsSync(file)) continue;
  const records = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const record of records) {
    const before = String(record.tr ?? '');
    if (!record.trGenerated) {
      // Human-supplied value that still contains Arabic script is not a
      // romanization; surface it for review instead of silently rewriting it.
      if (arabic.test(before)) report.handAuthoredResidue.push({ file: name, k: record.k, tr: before });
      continue;
    }
    if (!record.k) { report.skippedNoHeadword++; continue; }
    report.generated++;
    if (arabic.test(before)) report.residueBefore++;
    const after = transliterateKashmiri(record.k);
    if (after !== before) { record.tr = after; report.changed++; } else report.alreadyCorrect++;
    if (arabic.test(String(record.tr))) report.residueAfter++;
  }
  fs.writeFileSync(file, `${JSON.stringify(records)}\n`);
  report.files++;
}

report.handAuthoredResidueCount = report.handAuthoredResidue.length;
report.handAuthoredResidue = report.handAuthoredResidue.slice(0, 10);
console.log(JSON.stringify(report, null, 1));
