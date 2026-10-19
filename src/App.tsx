import React, { useState, useEffect } from 'react';
import type { WordEntry, RawDictionaryRecord } from './types';
import { buildIndex } from './lib/dictionarySearch';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DictionaryView } from './views/DictionaryView';
import { TranslatorView } from './views/TranslatorView';
import { AboutView } from './views/AboutView';
import { LanguageGuideView } from './views/LanguageGuideView';
import { OrthographyView } from './views/OrthographyView';
import { SeerahView } from './views/SeerahView';

type ViewMode = 'dictionary' | 'translator' | 'about' | 'guide' | 'orthography' | 'seerah';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'translator') return 'translator';
    if (hash === 'about') return 'about';
    if (hash === 'guide' || hash === 'language-guide') return 'guide';
    if (hash === 'orthography') return 'orthography';
    if (hash === 'seerah') return 'seerah';
    return 'dictionary';
  });

  const [words, setWords] = useState<WordEntry[]>([]);
  const [englishTokens, setEnglishTokens] = useState<Set<string>>(new Set());
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loadingDictionary, setLoadingDictionary] = useState<boolean>(true);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'translator') setCurrentView('translator');
      else if (hash === 'about') setCurrentView('about');
      else if (hash === 'guide' || hash === 'language-guide') setCurrentView('guide');
      else if (hash === 'orthography') setCurrentView('orthography');
      else if (hash === 'seerah') setCurrentView('seerah');
      else setCurrentView('dictionary');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectView = (view: ViewMode) => {
    setCurrentView(view);
    window.location.hash = `#${view}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load dictionary data
  useEffect(() => {
    const files = [
      '/assets/dictionary.json',
      ...Array.from({ length: 8 }, (_, i) => `/assets/dictionary-kashir-${i + 1}.json`),
      '/assets/dictionary-corpus.json'
    ];

    Promise.allSettled(
      files.map(url =>
        fetch(url).then(res => {
          if (!res.ok) throw new Error(`Status ${res.status}`);
          return res.json() as Promise<RawDictionaryRecord[]>;
        })
      )
    ).then(results => {
      const records: RawDictionaryRecord[] = [];
      results.forEach(res => {
        if (res.status === 'fulfilled' && Array.isArray(res.value)) {
          records.push(...res.value);
        }
      });

      const indexed = buildIndex(records);
      const tokens = new Set<string>(
        records
          .flatMap(record => [
            record.e,
            record.x,
            ...(record.examples || []).flatMap(ex => [ex.e])
          ])
          .flatMap(text => String(text || '').toLowerCase().match(/[a-z][a-z'-]*/g) || [])
      );

      setWords(indexed);
      setEnglishTokens(tokens);
      setTotalRecords(records.length);
      setLoadingDictionary(false);
    }).catch(err => {
      console.error('Failed to load dictionary records:', err);
      setLoadingDictionary(false);
    });
  }, []);

  return (
    <div className="app-shell">
      <Header currentView={currentView} onSelectView={handleSelectView} />

      <main>
        {currentView === 'dictionary' && (
          <DictionaryView
            words={words}
            loadingDictionary={loadingDictionary}
            totalRecords={totalRecords}
          />
        )}
        {currentView === 'translator' && (
          <TranslatorView words={words} englishTokens={englishTokens} />
        )}
        {currentView === 'about' && <AboutView />}
        {currentView === 'guide' && (
          <LanguageGuideView
            onBackToDictionary={() => handleSelectView('dictionary')}
            onGoToOrthography={() => handleSelectView('orthography')}
          />
        )}
        {currentView === 'orthography' && (
          <OrthographyView
            onBackToDictionary={() => handleSelectView('dictionary')}
            onGoToLanguageGuide={() => handleSelectView('guide')}
          />
        )}
        {currentView === 'seerah' && <SeerahView />}
      </main>

      <Footer totalRecords={totalRecords} />
    </div>
  );
};
