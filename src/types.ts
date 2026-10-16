export interface Example {
  k: string;
  e: string;
}

export interface DictionarySource {
  s: string;
  url: string;
  license?: string;
}

export interface FormEntry {
  word: string;
  tags?: string[];
}

export interface Sense {
  e: string;
  p?: string;
  s?: string;
  url?: string;
  license?: string;
  context?: string;
  grammar?: string[];
  examples?: Example[];
  kx?: string;
  x?: string;
  romanExample?: Example;
  fullMeaning?: string;
  ocrVocabulary?: boolean;
  corpusVocabulary?: boolean;
  ocrTransliteration?: string;
  references?: DictionarySource[];
  sources?: DictionarySource[];
  tr?: string;
  ipa?: string;
  trGenerated?: boolean;
  synonyms?: string[];
  antonyms?: string[];
  etymology?: string;
  topic?: string;
}

export interface RawDictionaryRecord {
  k: string;
  e: string;
  p?: string;
  s?: string;
  url?: string;
  license?: string;
  context?: string;
  grammar?: string[];
  examples?: Example[];
  kx?: string;
  x?: string;
  romanExample?: Example;
  fullMeaning?: string;
  ocrVocabulary?: boolean;
  corpusVocabulary?: boolean;
  ocrTransliteration?: string;
  references?: DictionarySource[];
  sources?: DictionarySource[];
  forms?: FormEntry[];
  tr?: string;
  ipa?: string;
  trGenerated?: boolean;
  synonyms?: string[];
  antonyms?: string[];
  etymology?: string;
  topic?: string;
}

export interface WordIndexEntry {
  head: string;
  folded: string;
  aliases: string[];
  roman: string[];
}

export interface WordEntry {
  k: string;
  senses: Sense[];
  forms: FormEntry[];
  arabic: boolean;
  index: WordIndexEntry;
}

export interface SearchFilters {
  script: 'all' | 'arabic' | 'roman';
  source: 'all' | 'sourced';
  pos: 'all' | 'N' | 'V' | 'Adj' | 'Adv' | 'Number';
}

export interface OCRPage {
  page: number;
  text?: string;
  normalizedText?: string;
  grade?: string;
  part?: string;
  book?: string;
  sourceUrl?: string;
}

export interface OCRBookInfo {
  id: string;
  title?: string;
  creator?: string;
  source?: string;
  license?: string;
  category?: string;
}

export interface OCRDataset {
  pages?: OCRPage[];
  books?: OCRBookInfo[];
  records?: Array<{
    page: number;
    text?: string;
    sourceUrl?: string;
    dataset?: string;
    source?: string;
    license?: string;
  }>;
}

export interface PublicCorpusRecord {
  text: string;
  dataset: string;
  source: string;
  license: string;
}

export interface TranslationPair {
  english: string;
  kashmiri: string;
  humanReview?: string;
  headword?: string;
  partOfSpeech?: string;
  source?: {
    name?: string;
    license?: string;
  };
}

export interface TranslationMemory {
  pairs: TranslationPair[];
  indexes: {
    'en-ks': Map<string, TranslationPair>;
    'ks-en': Map<string, TranslationPair>;
  };
  lexical: {
    'en-ks': Map<string, TranslationPair>;
    'ks-en': Map<string, TranslationPair>;
  };
}
