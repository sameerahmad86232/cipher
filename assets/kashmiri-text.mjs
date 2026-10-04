// Conservative Kashmiri script cleanup. These are documented character
// equivalences and OCR confusables, not a claim that every word is correct.
//
// Every entry below comes from the "Confusables & spelling errors" table in
// orthography.html, which states the incorrect code point and the character that
// should have been used instead. The list is ordered so that the more specific
// sequences are replaced before the general letters they contain.
const replacements = [
  [/\u200b|\ufeff/g, ''],
  // 066E 06EA (dotless beh + empty centre low stop) is an incorrect way of
  // writing the KASHMIRI YEH U+0620, used when the Farsi yeh was unavailable.
  // The guide notes it "corrupt[s] the semantics of the text stream", so this
  // must run before the other yeh rules below.
  [/\u066e\u06ea/g, '\u0620'],
  // Pashto YE U+06CD is used for the diphthong əi in Pashto, but appears in
  // Kashmiri text where the word-final KASHMIRI YEH belongs.
  [/\u06cd/g, '\u0620'],
  // Kirghiz OE U+06C5 is an incorrect form of WAW WITH RING U+06C4.
  [/\u06c5/g, '\u06c4'],
  // U+065B only looks like the Kashmiri jazm: it was introduced as a vowel sign
  // for African languages. The SUKUN code point carries the meaning intended in
  // Kashmiri, and using the lookalike breaks interoperability.
  [/\u065b/g, '\u0652'],
  // The precomposed yeh-with-hamza-above keeps its hamza, on a Farsi yeh base;
  // dropping the hamza would delete a vowel sound.
  [/\u0626/g, '\u06cc\u0654'],
  [/أ|إ|ٱ/g, 'ا'],
  [/ك/g, 'ک'],
  [/ي|ى/g, 'ی'],
  [/ه|ة/g, 'ہ']
];

export function autocorrectKashmiri(value) {
  let text = String(value || '').normalize('NFC');
  for (const [pattern, replacement] of replacements) text = text.replace(pattern, replacement);
  // Re-normalise after replacing. Some corrections swap one combining mark for
  // another with a different canonical combining class (U+065B 230 -> U+0652 34),
  // and NFC canonically reorders such marks by class. Without this second pass the
  // result is not stable, and a second call on the same text would reorder it
  // again, so the function would not be idempotent.
  return text.normalize('NFC');
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
