const marks = /\p{M}/gu;
const punctuation = /[^\p{L}\p{N}\p{M}]+/gu;

export function normalizeTranslationText(value) {
  return String(value || '')
    .normalize('NFC')
    .toLocaleLowerCase()
    .replace(punctuation, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value) {
  return normalizeTranslationText(value).split(' ').filter(Boolean);
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    previous = current;
  }
  return previous[b.length];
}

function tokenScore(a, b) {
  const left = tokens(a), right = tokens(b);
  if (!left.length || !right.length) return 0;
  const used = new Set();
  let matched = 0;
  for (const source of left) {
    let bestIndex = -1, best = 0;
    right.forEach((target, index) => {
      if (used.has(index)) return;
      const distance = levenshtein(source, target);
      const score = 1 - distance / Math.max(source.length, target.length, 1);
      if (score > best) { best = score; bestIndex = index; }
    });
    if (bestIndex >= 0 && best >= 0.72) { used.add(bestIndex); matched += best; }
  }
  const coverage = (2 * matched) / (left.length + right.length);
  const lengthPenalty = Math.min(left.length, right.length) / Math.max(left.length, right.length);
  return coverage * lengthPenalty;
}

export function createTranslationMemory(pairs = [], lexicon = []) {
  const ranked = [...pairs].sort((a, b) => Number(b.humanReview === 'approved-by-project-owner') - Number(a.humanReview === 'approved-by-project-owner'));
  const indexes = { 'en-ks': new Map(), 'ks-en': new Map() };
  for (const pair of ranked) {
    const en = normalizeTranslationText(pair.english), ks = normalizeTranslationText(pair.kashmiri);
    if (!indexes['en-ks'].has(en)) indexes['en-ks'].set(en, pair);
    if (!indexes['ks-en'].has(ks)) indexes['ks-en'].set(ks, pair);
  }
  const lexical = { 'en-ks': new Map(), 'ks-en': new Map() };
  for (const item of lexicon) {
    const en = normalizeTranslationText(item.english), ks = normalizeTranslationText(item.kashmiri);
    if (en && !lexical['en-ks'].has(en)) lexical['en-ks'].set(en, item);
    if (ks && !lexical['ks-en'].has(ks)) lexical['ks-en'].set(ks, item);
  }
  return { pairs: ranked, indexes, lexical };
}

export function findMemoryMatch(memory, text, direction, fuzzyThreshold = 0.91) {
  const key = normalizeTranslationText(text);
  const exact = memory.indexes[direction].get(key) || memory.lexical[direction].get(key);
  if (exact) return {
    kind: 'exact', pair: exact, confidence: exact.humanReview === 'approved-by-project-owner' ? 1 : 0.97,
    output: direction === 'en-ks' ? exact.kashmiri : exact.english
  };
  if (tokens(text).length < 3) return undefined;
  let candidate, score = 0;
  for (const pair of memory.pairs) {
    const source = direction === 'en-ks' ? pair.english : pair.kashmiri;
    const similarity = tokenScore(text, source);
    const approvedBoost = pair.humanReview === 'approved-by-project-owner' ? 0.01 : 0;
    if (similarity + approvedBoost > score) { score = similarity + approvedBoost; candidate = pair; }
  }
  if (!candidate || score < fuzzyThreshold) return undefined;
  return {
    kind: 'close', pair: candidate, confidence: Math.min(0.96, score),
    source: direction === 'en-ks' ? candidate.english : candidate.kashmiri,
    output: direction === 'en-ks' ? candidate.kashmiri : candidate.english
  };
}

export function dictionaryDraft(memory, text, direction) {
  const input = tokens(text);
  if (!input.length) return undefined;
  const output = [], unresolved = [];
  for (const token of input) {
    const hit = memory.lexical[direction].get(token);
    if (!hit) { unresolved.push(token); output.push(token); continue; }
    output.push(direction === 'en-ks' ? hit.kashmiri : hit.english);
  }
  const coverage = (input.length - unresolved.length) / input.length;
  if (coverage < 0.6) return undefined;
  return { output: output.join(' '), coverage, unresolved, kind: 'dictionary-draft' };
}

export function reviewLabel(pair) {
  return pair?.humanReview === 'approved-by-project-owner' ? 'Project-owner approved' : 'Source-attested';
}
