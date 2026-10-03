// English / Perso-Arabic processing for IndicTrans2's language-tagged input.
// Keep Kashmiri-specific letters/signs; do not transliterate to Urdu. The six
// shared vowel marks below follow IndicTransToolkit's Arabic input normalizer.
export function normalizeKashmiri(input) {
  return input.normalize('NFC').replace(/[ك]/g, 'ک').replace(/[يى]/g, 'ی').replace(/ه/g, 'ہ');
}

export function prepareText(input, direction) {
  const entities = [];
  let text = input.normalize('NFC').replace(/[\u200b\ufeff]/g, '')
    .replace(/[“”«»]/g, '"').replace(/[‘’`´]/g, "'").replace(/[–—]/g, '-');
  text = text.replace(/[٠-٩۰-۹]/g, c => String(c.charCodeAt(0) - (c <= '٩' ? 0x0660 : 0x06f0)));
  text = text.replace(/https?:\/\/[^\s<>]+|[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}|\d+(?:[.,:/-]\d+)+(?:%|\b)|[#@][\p{L}\p{N}_]+/gu, entity => {
    const id = entities.push(entity);
    return `<ID${id}>`;
  });
  if (direction === 'ks-en') {
    text = normalizeKashmiri(text).normalize('NFKC')
      .replace(/[\u064e\u064b\u0670\u0650\u064f\u064dـ]/g, '');
  }
  text = text.replace(/([!"#$%&()*+,/:;<=>?@[\]^{|}~۔،؟])/g, ' $1 ')
    .replace(/\.(?!\d)/g, ' . ');
  if (direction === 'en-ks') text = text.replace(/([\p{L}])('(?:s|re|ve|ll|d|m)\b|n't\b)/gu, '$1 $2');
  return { text: text.replace(/\s+/g, ' ').trim(), entities };
}

export function finishText(input, direction, entities = []) {
  let text = input;
  entities.forEach((entity, i) => {
    text = text.replace(new RegExp(`[<\\[]\\s*id\\s*${i + 1}\\s*[>\\]]`, 'gi'), () => entity);
  });
  text = text.replace(/\s+([.,!?;:۔،؟%])/g, '$1').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')')
    .replace(/\s+('(?:s|re|ve|ll|d|m)\b|n't\b)/g, '$1').replace(/ٮ۪/g, 'ؠ');
  return text.replace(/\s+/g, ' ').trim();
}

export function sentenceChunks(text, direction) {
  const segmenter = new Intl.Segmenter(direction === 'en-ks' ? 'en' : 'ar', { granularity: 'sentence' });
  return text.split(/\n+/).flatMap(paragraph => [...segmenter.segment(paragraph)].map(s => s.segment.trim())).filter(Boolean);
}
