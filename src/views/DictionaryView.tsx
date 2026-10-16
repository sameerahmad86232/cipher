import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { WordEntry, SearchFilters, RawDictionaryRecord, OCRDataset, PublicCorpusRecord, Sense, OCRBookInfo } from '../types';
import { buildIndex, searchIndex, normalize, fold } from '../lib/dictionarySearch';
import { transliterateKashmiri } from '../lib/transliteration';

interface DictionaryViewProps {
  words: WordEntry[];
  loadingDictionary: boolean;
  totalRecords: number;
}

const KS_ALPHABET = [
  'ا', 'ٲ', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ',
  'د', 'ڈ', 'ذ', 'ر', 'ڑ', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض',
  'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن',
  'و', 'ہ', 'ی'
];
const EN_ALPHABET = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  words,
  loadingDictionary,
  totalRecords
}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    script: 'all',
    source: 'all',
    pos: 'all'
  });
  const [collection, setCollection] = useState<string>('');
  const [browseLetter, setBrowseLetter] = useState<string>('');
  const [alphabetMode, setAlphabetMode] = useState<'ks' | 'en'>('ks');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Secondary collections caches
  const [historicalWords, setHistoricalWords] = useState<WordEntry[]>([]);
  const [bookOcr, setBookOcr] = useState<any[]>([]);
  const [schoolOcr, setSchoolOcr] = useState<OCRDataset | null>(null);
  const [kashirOcr, setKashirOcr] = useState<OCRDataset | null>(null);
  const [readingOcr, setReadingOcr] = useState<OCRDataset | null>(null);
  const [publicCorpus, setPublicCorpus] = useState<{ records?: PublicCorpusRecord[] } | null>(null);
  const [quranCorpus, setQuranCorpus] = useState<OCRDataset | null>(null);
  const [collectionLoading, setCollectionLoading] = useState<string | null>(null);

  // Recent searches
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('koshur-recent') || '[]');
      return Array.isArray(stored) ? stored.filter(x => typeof x === 'string') : [];
    } catch {
      return [];
    }
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  const rememberSearch = useCallback((q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 2) return;
    setRecentSearches(prev => {
      const updated = [trimmed, ...prev.filter(item => item !== trimmed)].slice(0, 6);
      try {
        localStorage.setItem('koshur-recent', JSON.stringify(updated));
      } catch {
        // Safe fallback in private browsing
      }
      return updated;
    });
  }, []);

  const clearRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.setItem('koshur-recent', '[]');
    } catch {
      // Safe fallback
    }
  };

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !/INPUT|TEXTAREA|SELECT/i.test((document.activeElement as HTMLElement)?.tagName || '') &&
        !(document.activeElement as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Collection loaders
  const loadHistorical = async () => {
    if (historicalWords.length) return;
    setCollectionLoading('historical');
    try {
      const res = await fetch('/assets/historical-lexicon.json');
      if (!res.ok) throw new Error('Historical download failed');
      const data: RawDictionaryRecord[] = await res.json();
      const enriched = data.map(row => ({
        ...row,
        sources: [
          ...(row.sources || []),
          {
            s: 'Original Grierson dictionary scan (1932)',
            url: 'https://archive.org/details/in.ernet.dli.2015.24175',
            license: 'Public domain per Digital Library of India metadata'
          }
        ]
      }));
      setHistoricalWords(buildIndex(enriched));
    } catch (e) {
      console.error(e);
    } finally {
      setCollectionLoading(null);
    }
  };

  const loadBookOcr = async () => {
    if (bookOcr.length) return;
    setCollectionLoading('book-ocr');
    try {
      const res = await fetch('/assets/koul-book-ocr.json');
      if (!res.ok) throw new Error('Book OCR failed');
      const data = await res.json();
      setBookOcr(data.pages || []);
    } catch (e) {
      console.error(e);
    } finally {
      setCollectionLoading(null);
    }
  };

  const loadSchoolOcr = async () => {
    if (schoolOcr?.pages?.length) return;
    setCollectionLoading('school-ocr');
    try {
      const res = await fetch('/assets/kashmiri-school-textbooks-ocr.json');
      if (!res.ok) throw new Error('School OCR failed');
      setSchoolOcr(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setCollectionLoading(null);
    }
  };

  const loadKashirOcr = async () => {
    if (kashirOcr?.pages?.length) return;
    setCollectionLoading('kashir-ocr');
    try {
      const res = await fetch('/assets/kashir-dictionary-ocr.json');
      if (!res.ok) throw new Error('Kashir OCR failed');
      setKashirOcr(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setCollectionLoading(null);
    }
  };

  const loadReadingOcr = async () => {
    if (readingOcr?.pages?.length) return;
    setCollectionLoading('reading-ocr');
    try {
      const res = await fetch('/assets/kashmiri-reading-ocr.json');
      if (!res.ok) throw new Error('Reading OCR failed');
      setReadingOcr(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setCollectionLoading(null);
    }
  };

  const loadPublicCorpus = async () => {
    if (publicCorpus?.records?.length) return;
    setCollectionLoading('public-corpus');
    try {
      const res = await fetch('/assets/kashmiri-public-corpus.json');
      if (!res.ok) throw new Error('Public corpus failed');
      setPublicCorpus(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setCollectionLoading(null);
    }
  };

  const loadQuranOcr = async () => {
    if (quranCorpus?.records?.length) return;
    setCollectionLoading('quran-ocr');
    try {
      const res = await fetch('/assets/kashmiri-quran-ocr.json');
      if (!res.ok) throw new Error('Quran OCR failed');
      setQuranCorpus(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setCollectionLoading(null);
    }
  };

  const selectCollection = (colName: string) => {
    setQuery('');
    setBrowseLetter('');
    setVisibleCount(12);
    setCollection(colName);
    setFilters({ script: 'all', source: 'all', pos: 'all' });
    if (colName === 'historical') loadHistorical();
    else if (colName === 'book-ocr') loadBookOcr();
    else if (colName === 'school-ocr') loadSchoolOcr();
    else if (colName === 'kashir-ocr') loadKashirOcr();
    else if (colName === 'reading-ocr') loadReadingOcr();
    else if (colName === 'public-corpus') loadPublicCorpus();
    else if (colName === 'quran-ocr') loadQuranOcr();
  };

  // Helper search functions for OCR & collections
  const searchBookOcrResults = (q: string): WordEntry[] => {
    const nq = normalize(q);
    const pages: WordEntry[] = [];
    for (const page of bookOcr) {
      const text = page.normalizedText || page.text || '';
      const folded = normalize(text);
      if (nq && !folded.includes(nq)) continue;
      const at = nq ? folded.indexOf(nq) : 0;
      const start = nq ? Math.max(0, at - 190) : 0;
      const snippet = text.replace(/\s+/g, ' ').slice(start, start + 520).trim();
      pages.push({
        k: `PDF page ${page.page}`,
        arabic: false,
        forms: [],
        senses: [{
          e: snippet || '(This scanned page contains no OCR text.)',
          p: 'Machine OCR',
          s: 'Koul, Raina & Bhat (2000)',
          url: `https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul/page/n${page.page - 1}/mode/1up`,
          license: 'Rights-holder permission (reported by project owner)'
        }],
        index: { head: '', folded: '', aliases: [], roman: [] }
      });
    }
    return pages;
  };

  const searchSchoolOcrResults = (q: string): WordEntry[] => {
    if (!schoolOcr?.pages) return [];
    const nq = normalize(q);
    const pages: WordEntry[] = [];
    for (const page of schoolOcr.pages) {
      const text = page.text || '';
      const folded = normalize(text);
      if (nq && !folded.includes(nq)) continue;
      const at = nq ? folded.indexOf(nq) : 0;
      const snippet = text.replace(/\s+/g, ' ').slice(Math.max(0, at - 190), Math.max(0, at - 190) + 520).trim();
      const book: OCRBookInfo = (schoolOcr.books || []).find(item => item.id === page.book) || { id: page.book || '' };
      pages.push({
        k: `${book.title || page.book} · PDF page ${page.page}`,
        arabic: false,
        forms: [],
        senses: [{
          e: snippet || '(This scanned page contains no OCR text.)',
          ocrTransliteration: transliterateKashmiri(snippet),
          p: `Machine OCR · ${page.grade || ''}${page.part ? ` · ${page.part}` : ''}`,
          s: book.creator || 'Open Kashmiri book',
          url: book.source || 'https://archive.org/',
          license: `${book.license || 'Open license'} · OCR requires review`
        }],
        index: { head: '', folded: '', aliases: [], roman: [] }
      });
    }
    return pages;
  };

  const searchKashirOcrResults = (q: string): WordEntry[] => {
    if (!kashirOcr?.pages) return [];
    const nq = normalize(q);
    const pages: WordEntry[] = [];
    for (const page of kashirOcr.pages) {
      const text = page.normalizedText || page.text || '';
      const folded = normalize(text);
      if (nq && !folded.includes(nq)) continue;
      const at = nq ? folded.indexOf(nq) : 0;
      const snippet = text.replace(/\s+/g, ' ').slice(Math.max(0, at - 190), Math.max(0, at - 190) + 520).trim();
      const book: OCRBookInfo = (kashirOcr.books || []).find(item => item.id === page.book) || { id: page.book || '' };
      pages.push({
        k: `${book.title || page.book} · PDF page ${page.page}`,
        arabic: false,
        forms: [],
        senses: [{
          e: snippet || '(This scanned page contains no OCR text.)',
          ocrTransliteration: transliterateKashmiri(snippet),
          p: 'Machine OCR · reference dictionary',
          s: book.creator || 'Kashir Dictionary',
          url: `${book.source || 'https://archive.org/'}/page/n${Math.max(0, page.page - 1)}/mode/1up`,
          license: `${book.license || 'Source license not stated'} · OCR requires review`
        }],
        index: { head: '', folded: '', aliases: [], roman: [] }
      });
    }
    return pages;
  };

  const searchReadingOcrResults = (q: string): WordEntry[] => {
    if (!readingOcr?.pages) return [];
    const nq = normalize(q);
    const pages: WordEntry[] = [];
    for (const page of readingOcr.pages) {
      const text = page.normalizedText || page.text || '';
      const folded = normalize(text);
      if (nq && !folded.includes(nq)) continue;
      const at = nq ? folded.indexOf(nq) : 0;
      const snippet = text.replace(/\s+/g, ' ').slice(Math.max(0, at - 190), Math.max(0, at - 190) + 520).trim();
      const book: OCRBookInfo = (readingOcr.books || []).find(item => item.id === page.book) || { id: page.book || '' };
      pages.push({
        k: `${book.title || page.book} · PDF page ${page.page}`,
        arabic: false,
        forms: [],
        senses: [{
          e: snippet || '(This scanned page contains no OCR text.)',
          ocrTransliteration: transliterateKashmiri(snippet),
          p: `Machine OCR · ${book.category || 'reading source'}`,
          s: book.creator || 'Kashmiri reading source',
          url: `${book.source || 'https://archive.org/'}/page/n${Math.max(0, page.page - 1)}/mode/1up`,
          license: `${book.license || 'Source license not stated'} · OCR requires review`
        }],
        index: { head: '', folded: '', aliases: [], roman: [] }
      });
    }
    return pages;
  };

  const searchPublicCorpusResults = (q: string): WordEntry[] => {
    if (!publicCorpus?.records) return [];
    const nq = normalize(q);
    const rows: WordEntry[] = [];
    for (const row of publicCorpus.records) {
      const folded = normalize(row.text);
      if (nq && !folded.includes(nq)) continue;
      rows.push({
        k: row.text,
        arabic: true,
        forms: [],
        senses: [{
          e: 'Licensed corpus sentence',
          p: row.dataset,
          s: row.dataset,
          url: row.source,
          license: row.license,
          x: `Source: ${row.source}`
        }],
        index: { head: '', folded: '', aliases: [], roman: [] }
      });
    }
    return rows;
  };

  const searchQuranOcrResults = (q: string): WordEntry[] => {
    if (!quranCorpus?.records) return [];
    const nq = normalize(q);
    const pages: WordEntry[] = [];
    for (const page of quranCorpus.records) {
      const text = page.text || '';
      const folded = normalize(text);
      if (nq && !folded.includes(nq)) continue;
      const at = nq ? folded.indexOf(nq) : 0;
      const snippet = text.replace(/\s+/g, ' ').slice(Math.max(0, at - 190), Math.max(0, at - 190) + 520).trim();
      pages.push({
        k: `Kashmiri Qur’an translation · PDF page ${page.page}`,
        arabic: false,
        forms: [],
        senses: [{
          e: snippet || '(No OCR text recognized on this page.)',
          ocrTransliteration: transliterateKashmiri(snippet),
          p: 'Raw machine OCR · verify against scan',
          s: 'Kashmiri translation attributed to Mirwaiz Yusuf Shah',
          url: page.sourceUrl,
          license: 'Rights-holder public-reuse permission reported by project owner · OCR requires review'
        }],
        index: { head: '', folded: '', aliases: [], roman: [] }
      });
    }
    return pages;
  };

  // Compute matches
  const matches = useMemo(() => {
    const q = query.trim();
    let currentMatches: WordEntry[] = [];

    if (collection === 'book-ocr') {
      currentMatches = searchBookOcrResults(q);
    } else if (collection === 'school-ocr') {
      currentMatches = searchSchoolOcrResults(q);
    } else if (collection === 'kashir-ocr') {
      currentMatches = searchKashirOcrResults(q);
    } else if (collection === 'reading-ocr') {
      currentMatches = searchReadingOcrResults(q);
    } else if (collection === 'public-corpus') {
      currentMatches = searchPublicCorpusResults(q);
    } else if (collection === 'quran-ocr') {
      currentMatches = searchQuranOcrResults(q);
    } else if (collection === 'historical') {
      currentMatches = searchIndex(historicalWords, q, filters);
    } else {
      currentMatches = searchIndex(words, q, filters);
    }

    if (collection === 'calendar') {
      currentMatches = currentMatches.filter(w => w.senses.some(s => s.topic === 'calendar'));
    }

    if (browseLetter) {
      currentMatches = currentMatches.filter(w =>
        alphabetMode === 'en'
          ? w.senses.some(s => normalize(s.e).startsWith(normalize(browseLetter)))
          : fold(w.k).startsWith(fold(browseLetter))
      );
    }

    if (!q && !collection && !browseLetter) {
      return currentMatches.slice(0, 12);
    }

    return currentMatches;
  }, [
    query,
    filters,
    collection,
    browseLetter,
    alphabetMode,
    words,
    historicalWords,
    bookOcr,
    schoolOcr,
    kashirOcr,
    readingOcr,
    publicCorpus,
    quranCorpus
  ]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    rememberSearch(query);
  };

  const handleSelectQuery = (val: string) => {
    setQuery(val);
    setCollection('');
    setBrowseLetter('');
    setVisibleCount(12);
    searchInputRef.current?.focus();
    rememberSearch(val);
  };

  const handleSelectLetter = (letter: string) => {
    setQuery('');
    setCollection('');
    setBrowseLetter(letter);
    setVisibleCount(12);
  };

  // Title & Eyebrow formatting
  const resultsEyebrow = useMemo(() => {
    if (collection === 'historical') return 'HISTORICAL ROMANIZED KASHMIRI · GRIERSON';
    if (collection === 'book-ocr') return 'MACHINE OCR · 140 SCANNED PAGES';
    if (collection === 'school-ocr') return 'MACHINE OCR · OPEN LICENSED KASHMIRI BOOKS';
    if (collection === 'kashir-ocr') return 'MACHINE OCR · 2,710 REFERENCE-DICTIONARY PAGES';
    if (collection === 'reading-ocr') return 'MACHINE OCR · 2,893 READING AND DICTIONARY PAGES';
    if (collection === 'public-corpus') return 'LICENSED CORPUS · 8,336 SENTENCES';
    if (collection === 'quran-ocr') return 'SEPARATE RAW OCR CORPUS · 1,694 PAGES';
    if (query) return 'DICTIONARY SEARCH';
    if (collection || browseLetter) return 'EXPLORE THE DICTIONARY';
    return 'START EXPLORING';
  }, [collection, query, browseLetter]);

  const resultsTitle = useMemo(() => {
    if (collectionLoading) return `Loading ${collectionLoading}…`;
    if (query) return `Results for “${query}”`;
    if (collection === 'calendar') return 'Days & calendar';
    if (collection === 'historical') return 'Historical romanized dictionary';
    if (collection === 'book-ocr') return 'Koul book OCR';
    if (collection === 'school-ocr') return 'Open Kashmiri books OCR';
    if (collection === 'kashir-ocr') return 'Kashir Dictionary · seven-volume OCR';
    if (collection === 'reading-ocr') return 'Grammar, textbooks and translations';
    if (collection === 'public-corpus') return 'Licensed Kashmiri corpus';
    if (collection === 'quran-ocr') return 'Kashmiri Qur’an translation OCR';
    if (browseLetter) return `Words beginning with ${browseLetter}`;
    return 'Featured words';
  }, [query, collection, browseLetter, collectionLoading]);

  const resultTypeLabel = ['book-ocr', 'school-ocr', 'kashir-ocr', 'reading-ocr', 'quran-ocr'].includes(collection)
    ? 'page'
    : collection === 'public-corpus'
    ? 'sentence'
    : 'headword';

  return (
    <section id="dictionary-view">
      <div className="hero">
        <p className="kashmiri-kicker" lang="ks-Arab" dir="rtl">
          لفظَن ہُنٛد گھر
        </p>
        <h1>
          Find the word
          <br />
          <em>you mean.</em>
        </h1>
        <p className="hero-copy">
          A growing Kashmiri–English dictionary, with sourced meanings, pronunciations and word forms. Search Perso-Arabic, romanized Kashmiri or English.
        </p>
        <div className="dictionary-stats" id="dictionary-stats">
          {words.length > 0 ? (
            `${words.length.toLocaleString()} headwords · ${totalRecords.toLocaleString()} records · searchable offline`
          ) : (
            'Loading dictionary index…'
          )}
        </div>
      </div>

      <section className="search-shell" aria-label="Dictionary search">
        <form onSubmit={handleSearchSubmit} className="search-row">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
          </svg>
          <input
            ref={searchInputRef}
            id="search-input"
            type="search"
            autoComplete="off"
            spellCheck="false"
            placeholder="Search کٲشُر or English…"
            aria-label="Search Kashmiri or English"
            value={query}
            onChange={e => {
              const val = e.target.value;
              setQuery(val);
              setVisibleCount(12);
              if (
                !['historical', 'book-ocr', 'school-ocr', 'kashir-ocr', 'reading-ocr', 'public-corpus', 'quran-ocr'].includes(
                  collection
                )
              ) {
                setCollection('');
                setBrowseLetter('');
              }
            }}
            onBlur={() => rememberSearch(query)}
          />
          <kbd>/</kbd>
          {query && (
            <button
              id="clear-button"
              className="clear-button"
              type="button"
              onClick={() => {
                setQuery('');
                setVisibleCount(12);
                searchInputRef.current?.focus();
              }}
            >
              Clear
            </button>
          )}
        </form>

        <div className="search-meta">
          <span id="dictionary-status">
            {loadingDictionary
              ? 'Loading dictionary…'
              : `${words.length.toLocaleString()} searchable headwords`}
          </span>
          <span>Perso-Arabic · English</span>
        </div>

        <div className="search-filters">
          <label>
            Script{' '}
            <select
              id="script-filter"
              value={filters.script}
              onChange={e =>
                setFilters(prev => ({ ...prev, script: e.target.value as SearchFilters['script'] }))
              }
            >
              <option value="all">All scripts</option>
              <option value="arabic">Perso-Arabic</option>
              <option value="roman">Romanized</option>
            </select>
          </label>
          <label>
            Source{' '}
            <select
              id="source-filter"
              value={filters.source}
              onChange={e =>
                setFilters(prev => ({ ...prev, source: e.target.value as SearchFilters['source'] }))
              }
            >
              <option value="all">All sources</option>
              <option value="sourced">Attributed sources</option>
            </select>
          </label>
          <label>
            Grammar{' '}
            <select
              id="pos-filter"
              value={filters.pos}
              onChange={e =>
                setFilters(prev => ({ ...prev, pos: e.target.value as SearchFilters['pos'] }))
              }
            >
              <option value="all">All word types</option>
              <option value="N">Nouns</option>
              <option value="V">Verbs</option>
              <option value="Adj">Adjectives</option>
              <option value="Adv">Adverbs</option>
              <option value="Number">Numbers</option>
            </select>
          </label>
        </div>
      </section>

      <section className="content-grid">
        <aside>
          <div className="aside-block">
            <button
              id="browse-calendar"
              className={`collection-button ${collection === 'calendar' ? 'active' : ''}`}
              type="button"
              onClick={() => selectCollection('calendar')}
            >
              Days &amp; calendar
            </button>
            <button
              id="browse-historical"
              className={`collection-button ${collection === 'historical' ? 'active' : ''}`}
              type="button"
              onClick={() => selectCollection('historical')}
            >
              Historical romanized lexicon · 20,643 entries
            </button>
            <button
              id="browse-koul-ocr"
              className={`collection-button ${collection === 'book-ocr' ? 'active' : ''}`}
              type="button"
              onClick={() => selectCollection('book-ocr')}
            >
              Koul book OCR · 140 scanned pages
            </button>
            <button
              id="browse-school-ocr"
              className={`collection-button ${collection === 'school-ocr' ? 'active' : ''}`}
              type="button"
              onClick={() => selectCollection('school-ocr')}
            >
              Open Kashmiri books OCR · 490 pages
            </button>
            <button
              id="browse-kashir-ocr"
              className={`collection-button ${collection === 'kashir-ocr' ? 'active' : ''}`}
              type="button"
              onClick={() => selectCollection('kashir-ocr')}
            >
              Kashir Dictionary · 7 volumes / 2,710 pages
            </button>
            <button
              id="browse-reading-ocr"
              className={`collection-button ${collection === 'reading-ocr' ? 'active' : ''}`}
              type="button"
              onClick={() => selectCollection('reading-ocr')}
            >
              Grammar, textbooks &amp; dictionaries · 2,813 pages
            </button>
            <button
              id="browse-public-corpus"
              className={`collection-button ${collection === 'public-corpus' ? 'active' : ''}`}
              type="button"
              onClick={() => selectCollection('public-corpus')}
            >
              Licensed Kashmiri corpus · 8,336 sentences
            </button>
            <button
              id="browse-quran-ocr"
              className={`collection-button ${collection === 'quran-ocr' ? 'active' : ''}`}
              type="button"
              onClick={() => selectCollection('quran-ocr')}
            >
              Kashmiri Qur’an translation OCR · 1,694 pages
            </button>

            <a
              className="collection-button book-link"
              href="https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Koul’s Kashmiri–English book ↗
            </a>
            <a
              className="collection-button book-link"
              href="https://dsal.uchicago.edu/dictionaries/grierson/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Grierson’s Kashmiri dictionary ↗
            </a>
            <a
              className="collection-button book-link"
              href="https://translate.panlex.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open PanLex lexical translator ↗
            </a>
            <a
              className="collection-button book-link"
              href="https://arxiv.org/abs/2601.01091"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read KS-LIT-3M corpus paper ↗
            </a>
            <a
              className="collection-button book-link"
              href="https://huggingface.co/datasets/Omarrran/Koshur_Pixel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Koshur Pixel OCR dataset ↗
            </a>
            <a
              className="collection-button book-link"
              href="https://huggingface.co/datasets/Omarrran/40K_kashmiri_text_and_image_dataset"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open 40K Kashmiri OCR dataset ↗
            </a>
            <a
              className="collection-button book-link"
              href="https://huggingface.co/megaketu555/kashmiri-nastaliq-llm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Kashmiri Nastaliq LLM ↗
            </a>
            <a
              className="collection-button book-link"
              href="https://huggingface.co/Omarrran/koshur-diacritizer-byt5-small"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Koshur Diacritizer ↗
            </a>
            <a
              className="collection-button book-link"
              href="https://github.com/Faizaniqbal52/KoshurOCR"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open KoshurOCR framework ↗
            </a>
            <a
              className="collection-button book-link"
              href="https://github.com/Faizaniqbal52/KoshurAI"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open KoshurAI stack ↗
            </a>
            <a
              className="collection-button book-link"
              href="https://kashmirairesearch.online/resources"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Kashmir AI resource hub ↗
            </a>
          </div>

          <div className="aside-block">
            <h2>Browse by letter</h2>
            <select
              id="alphabet-select"
              aria-label="Browse alphabet"
              value={alphabetMode}
              onChange={e => {
                setAlphabetMode(e.target.value as 'ks' | 'en');
                setBrowseLetter('');
              }}
            >
              <option value="ks">Kashmiri</option>
              <option value="en">English</option>
            </select>
            <div id="letter-list" className="letter-list">
              {(alphabetMode === 'en' ? EN_ALPHABET : KS_ALPHABET).map(letter => (
                <button
                  key={letter}
                  type="button"
                  className={browseLetter === letter ? 'active' : ''}
                  onClick={() => handleSelectLetter(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {recentSearches.length > 0 && (
            <div className="aside-block recent-block">
              <div className="aside-heading">
                <h2>Recent</h2>
                <button id="clear-recent" type="button" onClick={clearRecent}>
                  Clear
                </button>
              </div>
              <div id="recent-list" className="recent-list">
                {recentSearches.map(term => (
                  <button key={term} type="button" onClick={() => handleSelectQuery(term)}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        <section className="results-area" aria-live="polite">
          <div className="results-heading">
            <div>
              <p className="eyebrow" id="results-eyebrow">
                {resultsEyebrow}
              </p>
              <h2 id="results-title">{resultsTitle}</h2>
            </div>
            <span id="result-count">
              {matches.length.toLocaleString()} {resultTypeLabel}
              {matches.length === 1 ? '' : 's'}
            </span>
          </div>

          <div id="results" className="results-list">
            {loadingDictionary ? (
              <>
                <div className="loading-card" />
                <div className="loading-card" />
                <div className="loading-card" />
              </>
            ) : matches.length === 0 ? (
              <div className="empty-state">
                <strong>No matching words found</strong>
                <span>Try a shorter spelling, clear your filters, or search the other language.</span>
              </div>
            ) : (
              matches.slice(0, visibleCount).map((word, idx) => {
                const primary: Sense = word.senses.find(s => s.tr || s.ipa) || word.senses[0] || { e: '' };
                const displayedTransliteration = primary.tr || primary.ipa || (!word.arabic ? word.k : '');
                const forms = word.forms.filter(f => normalize(f.word) !== normalize(word.k));
                const related = [
                  ...new Set(word.senses.flatMap(s => [...(s.synonyms || []), ...(s.antonyms || [])]))
                ];

                return (
                  <article key={`${word.k}-${idx}`} className="word-card">
                    <div className="headword">
                      <p
                        className="kashmiri-word"
                        lang={word.arabic ? 'ks-Arab' : 'ks-Latn'}
                        dir={word.arabic ? 'rtl' : 'ltr'}
                      >
                        {word.k}
                      </p>
                    </div>

                    <div>
                      {displayedTransliteration ? (
                        <p className="word-details pronunciation">
                          {displayedTransliteration}{' '}
                          {primary.tr && primary.ipa ? primary.ipa : ''}
                          {primary.trGenerated && (
                            <span className="generated-label"> orthography-derived</span>
                          )}
                        </p>
                      ) : null}

                      {word.senses.slice(0, 3).map((sense, sIdx) => {
                        const examples = sense.examples?.length
                          ? sense.examples
                          : sense.kx
                          ? [{ k: sense.kx, e: sense.x || '' }]
                          : [];
                        const meaning = sense.ocrVocabulary
                          ? 'OCR vocabulary word'
                          : sense.corpusVocabulary
                          ? 'Corpus vocabulary word'
                          : sense.e;
                        const refs = sense.references || [];

                        return (
                          <div key={sIdx} className="sense">
                            <p className="meaning">
                              {meaning}{' '}
                              {sense.p && <span className="pos">{sense.p}</span>}
                            </p>
                            {sense.ocrVocabulary && (
                              <p className="sense-context">
                                Added from corrected OCR text. The source does not provide an English definition for this word.
                              </p>
                            )}
                            {sense.corpusVocabulary && (
                              <p className="sense-context">
                                Found in a licensed public Kashmiri corpus. The source does not provide an English definition for this word.
                              </p>
                            )}
                            {sense.fullMeaning && (
                              <details className="historical-entry">
                                <summary>Read full historical entry</summary>
                                <p>{sense.fullMeaning}</p>
                              </details>
                            )}
                            {sense.context && <p className="sense-context">{sense.context}</p>}
                            {sense.grammar && sense.grammar.length > 0 && (
                              <p className="word-details">{sense.grammar.join(' · ')}</p>
                            )}
                            {sense.ocrTransliteration && (
                              <p className="ocr-transliteration">
                                {sense.ocrTransliteration} <span>· OCR-derived transliteration</span>
                              </p>
                            )}
                            {examples.map((ex, exIdx) => (
                              <div key={exIdx}>
                                <p className="kashmiri-example" lang="ks-Arab" dir="rtl">
                                  {ex.k}
                                </p>
                                <p className="example">{ex.e}</p>
                              </div>
                            ))}
                            {sense.romanExample && (
                              <div>
                                <p className="roman-example" lang="ks-Latn">
                                  {sense.romanExample.k} <span>· romanized Kashmiri</span>
                                </p>
                                <p className="example">{sense.romanExample.e}</p>
                              </div>
                            )}
                            {!examples.length && !sense.romanExample && sense.x && (
                              <p className="example">{sense.x}</p>
                            )}
                            {sense.url && (
                              <a
                                className="entry-source"
                                href={sense.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {sense.s || 'Source'} {sense.license ? `· ${sense.license}` : ''}
                              </a>
                            )}
                            {(sense.sources || [])
                              .filter(s => s.url !== sense.url)
                              .map((s, altIdx) => (
                                <a
                                  key={altIdx}
                                  className="entry-source"
                                  href={s.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {s.s || 'Source'} {s.license ? `· ${s.license}` : ''}
                                </a>
                              ))}
                            {refs.slice(0, 5).map((ref, rIdx) => (
                              <a
                                key={rIdx}
                                className="entry-source"
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Checked in {ref.s}
                              </a>
                            ))}
                            {refs.length > 5 && (
                              <details className="ocr-references">
                                <summary>{refs.length - 5} more OCR occurrences</summary>
                                {refs.slice(5).map((ref, rIdx) => (
                                  <a
                                    key={rIdx}
                                    className="entry-source"
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Checked in {ref.s}
                                  </a>
                                ))}
                              </details>
                            )}
                          </div>
                        );
                      })}

                      {word.senses.length > 3 && (
                        <details>
                          <summary>{word.senses.length - 3} more meanings</summary>
                          {word.senses.slice(3).map((sense, sIdx) => (
                            <div key={sIdx} className="sense">
                              <p className="meaning">
                                {sense.e}{' '}
                                {sense.p && <span className="pos">{sense.p}</span>}
                              </p>
                              {sense.context && <p className="sense-context">{sense.context}</p>}
                            </div>
                          ))}
                        </details>
                      )}

                      {forms.length > 0 && (
                        <details className="word-forms">
                          <summary>
                            {new Set(forms.map(f => f.word)).size} inflected / alternate forms
                          </summary>
                          <div>
                            {forms.map((f, fIdx) => (
                              <p key={fIdx}>
                                <button
                                  type="button"
                                  className="form-word"
                                  lang="ks-Arab"
                                  dir="rtl"
                                  onClick={() => handleSelectQuery(f.word)}
                                >
                                  {f.word}
                                </button>{' '}
                                <span className="form-translit">
                                  {transliterateKashmiri(f.word)}
                                </span>{' '}
                                <span>{(f.tags || []).join(' · ')}</span>
                              </p>
                            ))}
                          </div>
                        </details>
                      )}

                      {related.length > 0 && (
                        <details>
                          <summary>Related words</summary>
                          {related.map(k => (
                            <button
                              key={k}
                              type="button"
                              className="form-word"
                              lang="ks-Arab"
                              onClick={() => handleSelectQuery(k)}
                            >
                              {k}
                            </button>
                          ))}
                        </details>
                      )}

                      {primary.etymology && (
                        <details>
                          <summary>Etymology</summary>
                          <p className="etymology">{primary.etymology}</p>
                        </details>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {visibleCount < matches.length && (
            <button
              id="load-more"
              className="load-more"
              type="button"
              onClick={() => setVisibleCount(c => c + 20)}
            >
              Show more results
            </button>
          )}
        </section>
      </section>
    </section>
  );
};
