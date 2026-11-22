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

const speechPunctuation: [RegExp, string][] = [
  [/,/g, '،'], [/;/g, '؛'], [/\?/g, '؟'], [/\./g, '۔']
];

const speechSafeReplacements: [RegExp, string][] = [
  [/\u066e\u06ea/g, '\u0620'], [/\u06c5/g, '\u06c4'], [/\u065b/g, '\u0652'],
  [/\u0626/g, '\u06cc\u0654'], [/أ|إ|ٱ/g, 'ا'], [/ك/g, 'ک'], [/ي|ى/g, 'ی'], [/ه|ة/g, 'ہ']
];

const speechSafeCleanup = (value: string): string => {
  let text = String(value || '').normalize('NFKC').replace(/[\u061c\u200b-\u200f\u2060\ufeff]/gu, '');
  for (const [pattern, replacement] of speechSafeReplacements) text = text.replace(pattern, replacement);
  return text.normalize('NFC');
};

/** Prepare model-facing TTS text without guessing spellings or missing vowels. */
export function normalizeKashmiriForSpeech(value: string): string {
  let text = speechSafeCleanup(value);
  for (const [pattern, replacement] of speechPunctuation) text = text.replace(pattern, replacement);
  return text
    .normalize('NFC')
    .replace(/\s+/gu, ' ')
    .replace(/([،؛؟۔!])(?:\s*\1)+/gu, '$1')
    .replace(/\s*([،؛؟۔!])\s*/gu, '$1 ')
    .trim();
}

/** Clean Whisper formatting while retaining the model's decoded words verbatim. */
export function normalizeKashmiriTranscript(value: string): string {
  return speechSafeCleanup(value)
    .normalize('NFC')
    .replace(/\s+/gu, ' ')
    .replace(/\s+([،؛؟۔!,.?])/gu, '$1')
    .replace(/([،؛؟۔!])\1+/gu, '$1')
    .trim();
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
