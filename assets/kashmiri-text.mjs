// Conservative Kashmiri script cleanup. These are documented character
// equivalences and OCR confusables, not a claim that every word is correct.
const replacements = [
  [/\u200b|\ufeff/g, ''],
  [/أ|إ|ٱ/g, 'ا'],
  [/ك/g, 'ک'],
  [/ي|ى|ئ/g, 'ی'],
  [/ه|ة/g, 'ہ']
];

export function autocorrectKashmiri(value) {
  let text = String(value || '').normalize('NFC');
  for (const [pattern, replacement] of replacements) text = text.replace(pattern, replacement);
  return text;
}

export function correctionChanges(value) {
  const original = String(value || '').normalize('NFC');
  const corrected = autocorrectKashmiri(original);
  return { original, corrected, changed: original !== corrected };
}

export function unknownArabicCharacters(value, known = '') {
  const allowed = new Set([...known]);
  return [...new Set([...String(value || '')].filter(character => /\p{Script=Arabic}/u.test(character) && !allowed.has(character)))];
}
