import { autocorrectKashmiri } from './kashmiri-text.mjs';

export const normalize = value => String(value || '').normalize('NFC').toLocaleLowerCase().trim();
export const fold = value => autocorrectKashmiri(normalize(value)).normalize('NFD').replace(/\p{M}/gu, '').replace(/ـ/g, '');

export function buildIndex(records) {
  const groups = new Map();
  for (const row of records) {
    if (!row.k || !row.e) continue;
    const key = normalize(row.k);
    if (!groups.has(key)) groups.set(key, { k: row.k, senses: [], forms: [], arabic: /\p{Script=Arabic}/u.test(row.k), formKeys: new Set() });
    const group = groups.get(key), id = `${normalize(row.e)}\0${row.context || ''}\0${row.p || ''}`;
    const duplicate = group.senses.find(x => x.id === id);
    if (duplicate) { if (row.url) Object.assign(duplicate.row, row); }
    else group.senses.push({ id, row: { ...row } });
    for (const form of row.forms || []) {
      const id = JSON.stringify(form);
      if (!group.formKeys.has(id)) { group.forms.push(form); group.formKeys.add(id); }
    }
  }
  return [...groups.values()].map(group => {
    const senses = group.senses.map(x => x.row).sort((a, b) => Number(Boolean(b.url)) - Number(Boolean(a.url)));
    const head = normalize(group.k), aliases = [...new Set(group.forms.map(f => fold(f.word)))];
    return { k: group.k, senses, forms: group.forms, arabic: group.arabic,
      index: { head, folded: fold(group.k), aliases, roman: senses.map(s => fold(s.tr)).filter(Boolean) } };
  });
}

export function searchIndex(index, query, filters = {}) {
  const q = normalize(query), fq = fold(query), ranked = [];
  for (const word of index) {
    if (filters.script === 'arabic' && !word.arabic || filters.script === 'roman' && word.arabic) continue;
    const senses = word.senses.filter(s => (filters.source !== 'sourced' || [s, ...(s.sources || [])].some(source => source.url)) && (filters.pos === 'all' || !filters.pos || s.p === filters.pos));
    if (!senses.length) continue;
    const i = word.index;
    let rank = 20;
    if (q) {
      if (i.head === q) rank = 0;
      else if (i.folded === fq) rank = 1;
      else if (i.aliases.includes(fq)) rank = 2;
      else if (i.roman.includes(fq)) rank = 3;
      else if (senses.some(s => normalize(s.e) === q)) rank = 4;
      else if (i.head.startsWith(q) || i.folded.startsWith(fq) || i.roman.some(x => x.startsWith(fq))) rank = 5;
      else if (senses.some(s => normalize(s.e).startsWith(q))) rank = 6;
      else if (!(i.head.includes(q) || i.folded.includes(fq) || i.aliases.some(x => x.includes(fq)) || i.roman.some(x => x.includes(fq)) || senses.some(s => normalize(s.e).includes(q) || normalize(s.context).includes(q)))) continue;
    }
    const displaySenses = q ? [...senses].sort((a, b) => Number(normalize(b.e) === q) - Number(normalize(a.e) === q) || Number(normalize(b.e).includes(q)) - Number(normalize(a.e).includes(q))) : senses;
    ranked.push({ word: { ...word, senses: displaySenses }, rank });
  }
  ranked.sort((a, b) => a.rank - b.rank || Number(Boolean(b.word.senses[0].url)) - Number(Boolean(a.word.senses[0].url)) || a.word.senses[0].e.localeCompare(b.word.senses[0].e));
  return ranked.map(x => x.word);
}
