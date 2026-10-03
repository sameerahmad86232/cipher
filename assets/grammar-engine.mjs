import { autocorrectKashmiri } from './kashmiri-text.mjs';

const ARABIC_WORD = /[\p{Script=Arabic}\p{M}][\p{Script=Arabic}\p{M}\u200c\u200d'’ʼ-]*/gu;
const ENGLISH_WORD = /[A-Za-z][A-Za-z'-]*/g;
const NEGATIVE_KASHMIRI = new Set(['نہ', 'نہٕ', 'نَہ', 'نَہٕ', 'نا', 'مَہ', 'مت']);
const QUESTION_KASHMIRI = new Set(['کیا', 'کوٚس', 'کُس', 'کَتھ', 'کوت', 'کٔتھ', 'کِتھ']);
const POSTPOSITIONS = new Set(['منٛز', 'پؠٹھ', 'سٕتۍ', 'سٕنٛد', 'سٕنٛز', 'خٲطرٕ', 'تھٲوُن', 'تھٲں', 'تہٕ']);
const AUXILIARIES = new Set(['چھ', 'چُھ', 'چھِ', 'چھُو', 'آس', 'آسِ', 'آسُن', 'آسٕن', 'اتھ', 'اوس']);

function kashmiriTokens(value) {
  return [...String(value || '').normalize('NFC').matchAll(ARABIC_WORD)].map(match => match[0]);
}
function englishTokens(value) {
  return [...String(value || '').matchAll(ENGLISH_WORD)].map(match => match[0].toLowerCase());
}

export function analyzeKashmiriSentence(input) {
  const normalized = autocorrectKashmiri(input);
  const tokens = kashmiriTokens(normalized);
  const lower = tokens.map(token => token.replace(/[،؛؟۔,.!?]+$/u, ''));
  const question = /[؟?]\s*$/u.test(normalized) || lower.some(token => QUESTION_KASHMIRI.has(token));
  const negative = lower.some(token => NEGATIVE_KASHMIRI.has(token));
  const hasPostposition = lower.some(token => POSTPOSITIONS.has(token));
  const hasAuxiliary = lower.some(token => AUXILIARIES.has(token));
  const wordOrder = tokens.length >= 3 ? 'likely verb-final / SOV' : 'short clause';
  const checks = [
    wordOrder,
    negative ? 'negative polarity' : 'affirmative polarity',
    question ? 'question construction' : 'statement construction',
    hasPostposition ? 'check case and postposition' : 'check case marking',
    hasAuxiliary ? 'check copula/auxiliary agreement' : 'check TAM and verb agreement'
  ];
  return { normalized, tokens, question, negative, wordOrder, checks, summary: `Kashmiri grammar pass: ${checks.join(' · ')}.` };
}

export function analyzeEnglishSentence(input) {
  const tokens = englishTokens(input);
  const first = tokens[0] || '';
  const question = /[?]\s*$/u.test(String(input || '')) || /^(who|what|when|where|why|how|is|are|am|was|were|do|does|did|can|could|will|would|should)\b/i.test(String(input || '').trim());
  const negative = tokens.some(token => ['not', "n't", 'no', 'never', 'neither'].includes(token));
  const tense = tokens.some(token => ['will', 'shall'].includes(token)) ? 'future' : tokens.some(token => ['was', 'were', 'did', 'had'].includes(token)) ? 'past' : 'present/unspecified';
  const checks = [question ? 'question' : 'statement', negative ? 'negative polarity' : 'affirmative polarity', `${tense} meaning`, 'Kashmiri case/agreement will be checked after generation'];
  return { tokens, question, negative, tense, checks, summary: `English grammar pass: ${checks.join(' · ')}.` };
}

export function analyzeSentence(input, direction) {
  return direction === 'ks-en' ? analyzeKashmiriSentence(input) : analyzeEnglishSentence(input);
}

export function applyGrammarOutput(output, source, direction) {
  let value = direction === 'en-ks' ? autocorrectKashmiri(output) : String(output || '').trim();
  const sourceQuestion = direction === 'en-ks' ? /[?]\s*$/u.test(String(source || '')) : /[؟?]\s*$/u.test(String(source || ''));
  if (sourceQuestion) {
    value = value.replace(/[.!؟?۔]+\s*$/u, '').trim() + (direction === 'en-ks' ? '؟' : '?');
  }
  return value;
}
