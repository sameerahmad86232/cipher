// Character-based Kashmiri romanization from the published orthography notes.
const rules = [{"native":"پھ","translit":"pʰ"},{"native":"تھ","translit":"tʰ"},{"native":"ژھ","translit":"ʦʰ"},{"native":"چھ","translit":"ʧʰ"},{"native":"ٹھ","translit":"ʈʰ"},{"native":"کھ","translit":"kʰ"},{"native":"نْ","translit":"ñ"},{"native":"یٖ","translit":"yˌ"},{"native":"وٗ","translit":"w˔"},{"native":"وٚ","translit":"wᵉ"},{"native":"ۄا","translit":"ɔã"},{"native":"پ","translit":"p"},{"native":"ب","translit":"b"},{"native":"ت","translit":"t"},{"native":"ط","translit":"ṫ"},{"native":"ژ","translit":"ʦ"},{"native":"چ","translit":"ʧ"},{"native":"د","translit":"d"},{"native":"ج","translit":"ʤ"},{"native":"ٹ","translit":"ʈ"},{"native":"ڈ","translit":"ɖ"},{"native":"ک","translit":"k"},{"native":"ق","translit":"ḱ"},{"native":"خ","translit":"x"},{"native":"گ","translit":"g"},{"native":"غ","translit":"ġ"},{"native":"ع","translit":"ʔ"},{"native":"ف","translit":"f"},{"native":"س","translit":"s"},{"native":"ث","translit":"ṡ"},{"native":"ص","translit":"ś"},{"native":"ش","translit":"ʃ"},{"native":"ز","translit":"ż"},{"native":"ذ","translit":"z"},{"native":"ض","translit":"ź"},{"native":"ظ","translit":"ẑ"},{"native":"ہ","translit":"h"},{"native":"ھ","translit":"ʰ"},{"native":"ح","translit":"ħ"},{"native":"م","translit":"m"},{"native":"ن","translit":"n"},{"native":"و","translit":"w"},{"native":"ؤ","translit":"u͑"},{"native":"ر","translit":"r"},{"native":"ڑ","translit":"ɽ"},{"native":"ل","translit":"l"},{"native":"ی","translit":"y"},{"native":"ؠ","translit":"ʲ"},{"native":"ں","translit":"ñ"},{"native":"ِ","translit":"i"},{"native":"ٕ","translit":"ɨ"},{"native":"ٟ","translit":"ɨ̄"},{"native":"ُ","translit":"u"},{"native":"ے","translit":"ē"},{"native":"ٔ","translit":"ᵊ"},{"native":"ٲ","translit":"ə̄"},{"native":"ۓ","translit":"ɛ͑"},{"native":"ۄ","translit":"ɔ"},{"native":"َ","translit":"a"},{"native":"ا","translit":"ạ̄"},{"native":"آ","translit":"ã"},{"native":"ـ","translit":"_"},{"native":"-","translit":"-"},{"native":"‑","translit":"‑"},{"native":"–","translit":"–"},{"native":"—","translit":"—"},{"native":"،","translit":","},{"native":"؛","translit":";"},{"native":":","translit":":"},{"native":"!","translit":"!"},{"native":"؟","translit":"?"},{"native":"۔","translit":"."},{"native":".","translit":"."},{"native":"…","translit":"…"},{"native":"(","translit":"("},{"native":"[","translit":"["},{"native":")","translit":")"},{"native":"]","translit":"]"},{"native":"ؔ","translit":"{hon}"},{"native":"ٓ","translit":"˜"},{"native":"ْ","translit":"͞"},{"native":"ّ","translit":"˖"},{"native":"₹","translit":"¤"},{"native":"٪","translit":"%"},{"native":"‰","translit":"‰"},{"native":"«","translit":"«"},{"native":"‹","translit":"‹"},{"native":"“","translit":"“"},{"native":"‘","translit":"\\‘"},{"native":"»","translit":"»"},{"native":"›","translit":"›"},{"native":"”","translit":"”"},{"native":"’","translit":"\\’"},{"native":"۰","translit":"0"},{"native":"۱","translit":"1"},{"native":"۲","translit":"2"},{"native":"۳","translit":"3"},{"native":"۴","translit":"4"},{"native":"۵","translit":"5"},{"native":"۶","translit":"6"},{"native":"۷","translit":"7"},{"native":"۸","translit":"8"},{"native":"۹","translit":"9"}];
const fallback = {"ۍ":"y","ٮ":"b","ء":"ʔ","أ":"a","إ":"i","ۂ":"h","ۯ":"ə","ۆ":"w","ئ":"y","ة":"a","ك":"k","ه":"h","ي":"y","ۇ":"u","ە":"a","ې":"e","ڭ":"ng","ى":"y","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9"};

import { autocorrectKashmiri } from './kashmiri-text.mjs';

// Kashmiri vowel diacritics that an alef can carry. orthography.html's
// "standalone vowel" and "composite vowel" sections describe word-initial vowels
// as starting with a carrier alef (or ain) that is followed by the vowel
// indicator, so the alef itself carries no sound of its own.
const VOWEL_MARKS = '\u064e\u064f\u0650\u0655\u0654\u065a\u0657\u0656\u065f';

export function transliterateKashmiri(value) {
  // Apply the documented variant-spelling equivalences first, so Arabic
  // yeh/kaf/heh/teh-marbuta forms reach the rules written for the Kashmiri
  // forms instead of passing through as unromanized Arabic.
  const input = autocorrectKashmiri(value);
  let result = '';
  for (let i = 0; i < input.length;) {
    // An alef directly followed by a vowel diacritic is a carrier, not a long ā:
    // اَکھ is "akʰ", not "ạ̄akʰ". Emit nothing for the carrier and let the
    // diacritic be romanized on the next iteration.
    if (input[i] === '\u0627' && VOWEL_MARKS.includes(input[i + 1] || '')) { i += 1; continue; }
    const rule = rules.find(candidate => input.startsWith(candidate.native, i));
    if (rule) { result += rule.translit; i += rule.native.length; continue; }
    const code = input.codePointAt(i);
    const char = String.fromCodePoint(code);
    // Anything with no rule or fallback is passed through unchanged rather than
    // deleted: a silent deletion produces a plausible-looking but wrong reading,
    // and leaving the character visible keeps it reviewable.
    result += Object.prototype.hasOwnProperty.call(fallback, char) ? fallback[char] : char;
    i += char.length;
  }
  return result.replace(/\s+/g, ' ').replace(/\s+([,;:!?])/g, '$1').trim();
}
