import fs from 'node:fs';

const file = 'dist/assets/dictionary.json';
const records = JSON.parse(fs.readFileSync(file));
const base = 'https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul';
const verified = [
  { k: 'اَدَب', e: 'literature', page: 20 },
  { k: 'اَنٛدَر', e: 'inside', page: 20 },
  { k: 'اَداکار', e: 'actor', page: 20 },
  { k: 'عداوَت', e: 'enmity', page: 20 },
  { k: 'اِدارٕ', e: 'institute', page: 20 },
  { k: 'عدالَت', e: 'Court', page: 20 },
  { k: 'اَنُن', e: 'to bring', page: 20 },
  { k: 'اَتھٕ', e: 'hand', page: 20 },
  { k: 'انِگِۆٹ', e: 'Darkness', page: 20 },
  { k: 'اَنٛداز', e: 'Style', page: 20 },
  { k: 'انپڈ', e: 'Illiterate', page: 20 },
];
for (const { k, e, page } of verified) {
  const row = records.find(r => r.k === k && r.e.toLowerCase() === e.toLowerCase());
  if (!row) throw Error(`Existing entry not found: ${k} / ${e}`);
  row.references ||= [];
  const reference = { s: 'Koul, Raina & Bhat (2000), printed p. 10', url: `${base}/page/n${page - 1}/mode/1up` };
  if (!row.references.some(ref => ref.url === reference.url)) row.references.push(reference);
}
const additions = [
  { k: 'اَدَب', e: 'good manners', p: 'N', tr: 'adab' },
  { k: 'اَنٛداز', e: 'imagination', p: 'N', tr: 'anda:z' },
];
for (const addition of additions) {
  if (!records.some(r => r.k === addition.k && r.e.toLowerCase() === addition.e.toLowerCase())) records.push({ ...addition, s: 'Koul, Raina & Bhat (2000)', url: `${base}/page/n19/mode/1up`, license: 'Rights-holder permission (reported by project owner)' });
}
const mistakenCourt = records.findIndex(r => r.k === 'اَدَب' && r.e.toLowerCase() === 'court' && r.s === 'Kaeshir Dictionary · Izan Majeed');
if (mistakenCourt >= 0) records.splice(mistakenCourt, 1);
fs.writeFileSync(file, JSON.stringify(records));
console.log(`Verified ${verified.length} existing word pairs and added ${additions.length} new senses from the scanned book.`);
