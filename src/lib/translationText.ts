import { autocorrectKashmiri } from './kashmiriText';

export function normalizeKashmiri(input: string): string {
  return autocorrectKashmiri(input);
}

export function prepareText(input: string, direction: 'en-ks' | 'ks-en') {
  const entities: string[] = [];
  let text = input
    .normalize('NFC')
    .replace(/[\u200b\ufeff]/g, '')
    .replace(/[“”«»]/g, '"')
    .replace(/[‘’`´]/g, "'")
    .replace(/[–—]/g, '-');

  text = text.replace(/[٠-٩۰-۹]/g, c => String(c.charCodeAt(0) - (c <= '٩' ? 0x0660 : 0x06f0)));
  text = text.replace(
    /https?:\/\/[^\s<>]+|[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}|\d+(?:[.,:/-]\d+)+(?:%|\b)|[#@][\p{L}\p{N}_]+/gu,
    entity => {
      const id = entities.push(entity);
      return `<ID${id}>`;
    }
  );

  if (direction === 'ks-en') {
    text = normalizeKashmiri(text)
      .normalize('NFKC')
      .replace(/[\u064e\u064b\u0670\u0650\u064f\u064dـ]/g, '');
  }

  text = text
    .replace(/([!"#$%&()*+,/:;<=>?@[\]^{|}~۔،؟])/g, ' $1 ')
    .replace(/\.(?!\d)/g, ' . ');

  if (direction === 'en-ks') {
    text = text.replace(/([\p{L}])('(?:s|re|ve|ll|d|m)\b|n't\b)/gu, '$1 $2');
  }

  return { text: text.replace(/\s+/g, ' ').trim(), entities };
}

export function finishText(input: string, _direction: 'en-ks' | 'ks-en', entities: string[] = []) {
  let text = input;
  entities.forEach((entity, i) => {
    text = text.replace(new RegExp(`[<\\[]\\s*id\\s*${i + 1}\\s*[>\\]]`, 'gi'), () => entity);
  });
  text = text
    .replace(/\s+([.,!?;:۔،؟%])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\s+('(?:s|re|ve|ll|d|m)\b|n't\b)/g, '$1')
    .replace(/ٮ۪/g, 'ؠ');
  return text.replace(/\s+/g, ' ').trim();
}

const UNKNOWN_ENGLISH_DIGRAPHS: [string, string][] = [
  ['tch', 'چ'], ['sch', 'ش'], ['sh', 'ش'], ['ch', 'چ'], ['kh', 'خ'], ['gh', 'غ'],
  ['ph', 'ف'], ['th', 'تھ'], ['dh', 'دھ'], ['ng', 'نگ'], ['qu', 'کو'], ['ck', 'ک'],
  ['ee', 'ی'], ['oo', 'و'], ['ou', 'او'], ['ow', 'او'], ['ai', 'ے'], ['ay', 'ے'],
  ['ea', 'ی'], ['ei', 'ی'], ['ie', 'ی'], ['oa', 'و'], ['oi', 'و'], ['oy', 'و'],
];

const UNKNOWN_ENGLISH_LETTERS: Record<string, string> = {
  a: 'ا', b: 'ب', c: 'ک', d: 'د', e: 'ے', f: 'ف', g: 'گ', h: 'ہ', i: 'ی', j: 'ج',
  k: 'ک', l: 'ل', m: 'م', n: 'ن', o: 'و', p: 'پ', q: 'ق', r: 'ر', s: 'س', t: 'ت',
  u: 'و', v: 'و', w: 'و', x: 'کس', y: 'ی', z: 'ز'
};

export function transliterateUnknownEnglish(input: string): string {
  return String(input || '').replace(/[A-Za-z][A-Za-z'-]*/g, word => {
    let value = word.toLowerCase();
    for (const [from, to] of UNKNOWN_ENGLISH_DIGRAPHS) {
      value = value.replaceAll(from, to);
    }
    value = [...value].map(character => UNKNOWN_ENGLISH_LETTERS[character] || character).join('');
    return value;
  });
}
