import { autocorrectKashmiri } from './kashmiri-text.mjs';

const ARABIC_WORD = /[\p{Script=Arabic}\p{M}][\p{Script=Arabic}\p{M}\u200c\u200d'’ʼ-]*/gu;
const ENGLISH_WORD = /[A-Za-z][A-Za-z'-]*/g;
const normalizedSet = values => new Set(values.map(value => value.normalize('NFC')));
const NEGATIVE_KASHMIRI = normalizedSet(['نہ', 'نہٕ', 'نَہ', 'نَہٕ', 'نٕہ', 'نا', 'مَہ', 'مت', 'چھُنہٕ', 'چُھنہٕ', 'چھن']);
const QUESTION_KASHMIRI = normalizedSet(['کیا', 'کوٚس', 'کُس', 'کَتھ', 'کوت', 'کٔتھ', 'کِتھ', 'کٔژ', 'کَمۍ']);
const POSTPOSITIONS = normalizedSet(['منٛز', 'مَنٛز', 'مَنٛزٕ', 'منز', 'پؠٹھ', 'پؠٹھٕ', 'سٕتۍ', 'سٟتؠ', 'سٲتِہ', 'نِش', 'نِشہٕ', 'کُن', 'تام', 'خٲطرٕ', 'تھٲوُن', 'تھٲں']);
const AUXILIARIES = normalizedSet(['چھ', 'چھُ', 'چُھ', 'چھِ', 'چِھ', 'چھُو', 'چھےٚ', 'چُھس', 'چُھکھ', 'چھُنہٕ', 'چُھنہٕ', 'چھن', 'آس', 'آسِ', 'آسُن', 'آسٕن', 'اوس']);
const ERGATIVE_PRONOUNS = normalizedSet(['مےٚ', 'تٔمۍ', 'تِمَو', 'اَسہِ', 'تُہۍ']);
const DATIVE_FORMS = normalizedSet(['مےٚ', 'تَس', 'تِمَن', 'اَسہِ', 'تُہۍ']);
const PAST_AUXILIARIES = normalizedSet(['اوس', 'آس', 'آسِ', 'آسٕن']);
const RELATIVES = normalizedSet(['یُس', 'یۄس', 'یِم', 'یَتھ']);
const CORRELATIVES = normalizedSet(['سُہ', 'تِم', 'تَتھ', 'تتھ']);
const GENITIVES = normalizedSet(['ہُنٛد', 'ہِنٛز', 'ہُنٛز', 'سُنٛد', 'سٕنٛز']);
const COMPARATIVES = normalizedSet(['کھۄتہٕ', 'کھوتہٕ']);

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
  const ergativeAgent = lower.some(token => ERGATIVE_PRONOUNS.has(token));
  const dativeCandidate = lower.some(token => DATIVE_FORMS.has(token));
  const pastAuxiliary = lower.some(token => PAST_AUXILIARIES.has(token));
  const last = lower.at(-1) || '';
  const verbFinalSignal = AUXILIARIES.has(last) || /(?:ان|وان|مُت|مِت|وُن|نہٕ)$/u.test(last);
  const wordOrder = tokens.length < 3 ? 'short clause' : verbFinalSignal ? 'attested verb-final signal' : 'review predicate position (Kashmiri commonly places it late)';
  const hasRelative = lower.some(token => RELATIVES.has(token));
  const hasCorrelative = lower.some(token => CORRELATIVES.has(token));
  const hasGenitive = lower.some(token => GENITIVES.has(token));
  const hasComparative = lower.some(token => COMPARATIVES.has(token));
  const checks = [
    wordOrder,
    negative ? 'negative polarity' : 'affirmative polarity',
    question ? 'question construction' : 'statement construction',
    hasPostposition ? 'check case and postposition' : 'check case marking',
    hasAuxiliary ? 'check copula/auxiliary agreement' : 'check TAM and verb agreement',
    pastAuxiliary ? 'past auxiliary detected; check transitivity, ergative case and agreement' : ergativeAgent ? 'possible ergative-shaped pronoun; apply ergative analysis only in a perfective transitive clause' : 'no clear ergative-past signal',
    dativeCandidate ? 'check dative subject/object interpretation' : 'no clear dative-pronoun signal',
    hasRelative && !hasCorrelative ? 'relative form detected; check its matching main-clause correlate' : hasRelative ? 'relative–correlative construction detected' : 'no relative–correlative signal',
    hasGenitive ? 'check genitive agreement with the possessed noun' : 'no clear agreeing-genitive signal',
    hasComparative ? 'comparative standard marker detected; check the comparison phrase' : 'no clear comparative marker'
  ];
  return { normalized, tokens, question, negative, wordOrder, ergativeAgent, dativeCandidate, hasRelative, hasCorrelative, hasGenitive, hasComparative, checks, summary: `Kashmiri grammar pass: ${checks.join(' · ')}.` };
}

export function analyzeEnglishSentence(input) {
  const tokens = englishTokens(input);
  const first = tokens[0] || '';
  const question = /[?]\s*$/u.test(String(input || '')) || /^(who|what|when|where|why|how|is|are|am|was|were|do|does|did|can|could|will|would|should)\b/i.test(String(input || '').trim());
  const negative = tokens.some(token => ['not', "n't", 'no', 'never', 'neither'].includes(token));
  const tense = tokens.some(token => ['will', 'shall'].includes(token)) ? 'future' : tokens.some(token => ['was', 'were', 'did', 'had'].includes(token)) ? 'past' : 'present/unspecified';
  const transitivePast = tense === 'past' && tokens.some(token => ['made', 'said', 'saw', 'heard', 'read', 'wrote', 'gave', 'took', 'did', 'married', 'left'].includes(token));
  const checks = [question ? 'question' : 'statement', negative ? 'negative polarity' : 'affirmative polarity', `${tense} meaning`, transitivePast ? 'check Kashmiri ergative past and object agreement' : 'check Kashmiri case/agreement after generation'];
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
