// Conservative Kashmiri script cleanup. These are documented character
// equivalences and OCR confusables, not a claim that every word is correct.

const replacements: [RegExp, string][] = [
  [/\u200b|\ufeff/g, ''],
  // 066E 06EA (dotless beh + empty centre low stop) is an incorrect way of
  // writing the KASHMIRI YEH U+0620
  [/\u066e\u06ea/g, '\u0620'],
  // Pashto YE U+06CD used for Kashmiri yeh
  [/\u06cd/g, '\u0620'],
  // Kirghiz OE U+06C5 is an incorrect form of WAW WITH RING U+06C4
  [/\u06c5/g, '\u06c4'],
  // U+065B looks like Kashmiri jazm -> SUKUN U+0652
  [/\u065b/g, '\u0652'],
  // Yeh with hamza above
  [/\u0626/g, '\u06cc\u0654'],
  [/أ|إ|ٱ/g, 'ا'],
  [/ك/g, 'ک'],
  [/ي|ى/g, 'ی'],
  [/ه|ة/g, 'ہ']
];

export function autocorrectKashmiri(value: string): string {
  let text = String(value || '').normalize('NFC');
  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, replacement);
  }
  return text.normalize('NFC');
}

export function correctionChanges(value: string) {
  const original = String(value || '').normalize('NFC');
  const corrected = autocorrectKashmiri(original);
  return { original, corrected, changed: original !== corrected };
}

export function unknownArabicCharacters(value: string, known = ''): string[] {
  const allowed = new Set([...known]);
  return [
    ...new Set(
      [...String(value || '')].filter(
        character => /\p{Script=Arabic}/u.test(character) && !allowed.has(character)
      )
    )
  ];
}
