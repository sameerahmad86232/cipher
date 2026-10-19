import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chapterOneSections } from '../src/data/seerahChapterOne';

const output = fileURLToPath(new URL('../training-data/seerah-chapter1-parallel-review.jsonl', import.meta.url));
const rows = chapterOneSections.flatMap(section =>
  section.pairs.map((pair, index) => ({
    id: `seerah-ch1-${section.id}-${String(index + 1).padStart(2, '0')}`,
    english: pair.english.normalize('NFC').trim(),
    kashmiri: pair.kashmiri.normalize('NFC').trim(),
    source: {
      name: 'The Sealed Nectar, Chapter 1 — user-supplied translation',
      page: section.page,
      section: section.title,
    },
    status: 'owner-reviewed-wording-needs-source-audit',
    humanReview: 'pending-source-alignment',
    trainingTier: 'review-only',
    reviewNote: 'User reviewed the Kashmiri wording; verify source alignment and omissions before gold training.',
  }))
);

if (rows.some(row => !row.english || !row.kashmiri)) {
  throw new Error('Chapter 1 contains an empty parallel pair');
}
writeFileSync(output, rows.map(row => JSON.stringify(row)).join('\n') + '\n', 'utf8');
console.log(`Exported ${rows.length} Seerah review pairs to ${output}`);
