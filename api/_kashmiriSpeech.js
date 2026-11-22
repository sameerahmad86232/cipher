const VARIANTS = new Map([
  ['ك', 'ک'], ['ي', 'ی'], ['ى', 'ی'], ['ئ', 'یٔ'], ['ة', 'ہ'], ['ه', 'ہ'],
  ['أ', 'ا'], ['إ', 'ا'], ['ٱ', 'ا'], ['ٵ', 'ٲ'], ['ۅ', 'ۄ'],
  ['\u065b', '\u0652'],
]);

const replaceVariants = value => [...value].map(character => VARIANTS.get(character) || character).join('');
const removeControls = value => value.replace(/[\u061c\u200b-\u200f\u2060\ufeff]/gu, '');

export function normalizeKashmiriTts(value) {
  let text = removeControls(String(value || '').normalize('NFKC'));
  text = replaceVariants(text).replace(/,/gu, '،').replace(/;/gu, '؛').replace(/\?/gu, '؟').replace(/\./gu, '۔');
  return text.normalize('NFC').replace(/\s+/gu, ' ').replace(/([،؛؟۔!])(?:\s*\1)+/gu, '$1').replace(/\s*([،؛؟۔!])\s*/gu, '$1 ').trim();
}

export function normalizeWhisperTranscript(value) {
  // ASR cleanup is intentionally narrower than TTS preparation: preserve every
  // decoded word and mark, standardize only encoding, spacing and punctuation.
  let text = removeControls(String(value || '').normalize('NFC'));
  text = replaceVariants(text);
  return text.normalize('NFC').replace(/\s+/gu, ' ').replace(/\s+([،؛؟۔!,.?])/gu, '$1').replace(/([،؛؟۔!])\1+/gu, '$1').trim();
}
