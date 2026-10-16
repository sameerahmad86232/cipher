import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { WordEntry, TranslationMemory, OCRDataset } from '../types';
import { autocorrectKashmiri } from '../lib/kashmiriText';
import { transliterateKashmiri } from '../lib/transliteration';
import { transliterateUnknownEnglish } from '../lib/translationText';
import { searchIndex, normalize } from '../lib/dictionarySearch';
import { analyzeSentence, applyGrammarOutput } from '../lib/grammarEngine';
import {
  createTranslationMemory,
  findMemoryMatch,
  dictionaryDraft,
  reviewLabel
} from '../lib/hybridTranslator';
import {
  serverTranslate,
  offlineTranslate,
  loadOfflineTranslator,
  isOfflineModelReady
} from '../lib/serverTranslation';
import {
  generateKashmiriSpeech,
  generateGeminiSpeech,
  type TTSResult
} from '../lib/speechSynthesis';
import {
  studioEngine,
  STUDIO_PRESETS,
  type StudioPresetName
} from '../lib/studioAudioEngine';

interface TranslatorViewProps {
  words: WordEntry[];
  englishTokens: Set<string>;
}

const INITIAL_NOTE =
  'Online mode sends text to the public translator. Offline mode downloads a quantized NLLB-200 model once, then runs on this device. The model is large and translation may be slower on phones; review important text with a fluent speaker.';

export const TranslatorView: React.FC<TranslatorViewProps> = ({ words, englishTokens }) => {
  const [direction, setDirection] = useState<'ks-en' | 'en-ks'>('ks-en');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [liveTranslateEnabled, setLiveTranslateEnabled] = useState(true);
  const [liveStatus, setLiveStatus] = useState('Ready');
  const [useOfflineModel, setUseOfflineModel] = useState(false);
  const [offlineStatus, setOfflineStatus] = useState('Not downloaded · first download is large');
  const [downloadingOffline, setDownloadingOffline] = useState(false);

  // Status notes & context
  const [grammarNote, setGrammarNote] = useState('Grammar-aware checks will appear as you type.');
  const [dictionaryContext, setDictionaryContext] = useState(
    'Dictionary and corpus matches will appear with the server result.'
  );
  const [translationNote, setTranslationNote] = useState(INITIAL_NOTE);
  const [copyStatus, setCopyStatus] = useState<'Copy' | 'Copied'>('Copy');

  // Book OCR references state
  const [koulReferences, setKoulReferences] = useState<any[] | null>(null);
  const [quranReferences, setQuranReferences] = useState<any[] | null>(null);
  const [loadingKoul, setLoadingKoul] = useState(false);
  const [loadingQuran, setLoadingQuran] = useState(false);

  // Studio Ready TTS State
  const [speechEngine, setSpeechEngine] = useState<'gemini' | 'bolbosh'>('bolbosh');
  const [geminiVoice, setGeminiVoice] = useState<'Kore' | 'Zephyr' | 'Puck' | 'Fenrir' | 'Charon'>('Kore');
  const [ttsVoice, setTtsVoice] = useState<'Female' | 'Male'>('Female');
  const [ttsQuality, setTtsQuality] = useState<'Low (fast)' | 'Medium' | 'High'>('High');
  const [studioPreset, setStudioPreset] = useState<StudioPresetName>('broadcast');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [ttsStatus, setTtsStatus] = useState(
    'Bolbosh Voice Studio ready. High-ODE solver and broadcast DSP rack active.'
  );
  const [ttsAudioUrl, setTtsAudioUrl] = useState<string | null>(null);
  const [ttsLoading, setTtsLoading] = useState(false);
  const [downloadingWav, setDownloadingWav] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const visualizerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Controller for aborting ongoing request
  const abortControllerRef = useRef<AbortController | null>(null);
  const liveTimerRef = useRef<any>(null);
  const translationMemoryRef = useRef<TranslationMemory | null>(null);
  const bookOcrCacheRef = useRef<any[] | null>(null);
  const quranCorpusCacheRef = useRef<OCRDataset | null>(null);

  // Load translation memory
  const getTranslationMemory = useCallback(async (): Promise<TranslationMemory | null> => {
    if (translationMemoryRef.current) return translationMemoryRef.current;
    try {
      const [res1, res2] = await Promise.all([
        fetch('/assets/kashmiri-reviewed-training-data.json').then(r => (r.ok ? r.json() : { pairs: [], lexicon: [] })),
        fetch('/assets/hybrid-translation-index.json').then(r => (r.ok ? r.json() : { pairs: [] }))
      ]);
      const combinedPairs = [...(res2.pairs || []), ...(res1.pairs || [])];
      const mem = createTranslationMemory(combinedPairs, res1.lexicon || []);
      translationMemoryRef.current = mem;
      return mem;
    } catch (e) {
      console.warn('Could not load translation memory:', e);
      return null;
    }
  }, []);

  // Update grammar note on input change
  useEffect(() => {
    const text = sourceText.trim();
    if (!text) {
      setGrammarNote('Grammar-aware checks will appear as you type.');
    } else {
      setGrammarNote(analyzeSentence(text, direction).summary);
    }
  }, [sourceText, direction]);

  // Live dictionary preview
  const liveDictionaryPreview = (() => {
    const text = sourceText.trim();
    if (!text) return 'Dictionary matches will appear as you type.';
    if (!words.length) return 'Loading dictionary matches…';

    const pattern =
      direction === 'en-ks'
        ? /[A-Za-z][A-Za-z'-]*/g
        : /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff][\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\u064b-\u065f\u0670\u200c\u200d'’ʼ-]*/g;

    const found: string[] = [];
    const seen = new Set<string>();

    for (const match of text.matchAll(pattern)) {
      const token = match[0].replace(/[،؛؟.!؟,;:]+$/, '');
      if (!token || seen.has(token.toLowerCase())) continue;
      const hit = searchIndex(words, token, { script: direction === 'en-ks' ? 'arabic' : 'all' })[0];
      if (!hit) continue;
      const sense =
        hit.senses.find(
          item =>
            item.e &&
            !item.e.startsWith('OCR vocabulary') &&
            !item.e.startsWith('Corpus vocabulary')
        ) || hit.senses[0];

      found.push(direction === 'en-ks' ? `${token} → ${hit.k}` : `${hit.k} → ${sense?.e || 'corpus vocabulary'}`);
      seen.add(token.toLowerCase());
      if (found.length >= 8) break;
    }

    if (!found.length) {
      return 'No direct dictionary match yet; the server model will still process this sentence.';
    }
    return found.join(' · ');
  })();

  // Fallback for English words that need transliteration
  const applyUnknownEnglishFallback = (source: string, result: string) => {
    if (direction !== 'en-ks') return { text: result, words: [] };
    const unknown = [...source.matchAll(/\b[A-Za-z][A-Za-z'-]{2,}\b/g)]
      .map(match => match[0])
      .filter((word, index, all) => {
        const key = word.toLowerCase().replace(/^['-]|['-]$/g, '');
        return (
          key &&
          !englishTokens.has(key) &&
          all.findIndex(item => item.toLowerCase() === word.toLowerCase()) === index
        );
      });

    let text = result;
    const added: string[] = [];
    for (const word of unknown) {
      const native = transliterateUnknownEnglish(word);
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const match = new RegExp(`\\b${escaped}\\b`, 'i');
      if (match.test(text)) text = text.replace(match, native);
      else if (!text.includes(native)) added.push(`${native} (${word})`);
    }
    if (added.length) text = `${text} · ${added.join(' · ')}`;
    return { text, words: unknown };
  };

  // Perform translation
  const translateCurrent = useCallback(
    async (automatic = false) => {
      const text = sourceText.trim();
      if (!text) return;

      if (direction === 'ks-en' && !/\p{Script=Arabic}/u.test(text)) {
        setTranslationNote(
          'For Kashmiri → English, enter Perso-Arabic Kashmiri. Romanized sentence translation is not supported by this model.'
        );
        return;
      }

      setIsTranslating(true);
      setLiveStatus(automatic ? 'Translating…' : 'Sending…');
      setTranslationNote('Sending your sentence to the server…');

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        // 1. Check reviewed memory first
        const memory = await getTranslationMemory();
        if (memory) {
          const memoryMatch = findMemoryMatch(memory, text, direction);
          if (memoryMatch) {
            const memoryPair = memoryMatch.pair;
            const outputText = memoryMatch.output;
            setTranslatedText(outputText);
            setIsTranslating(false);
            setLiveStatus('Ready');
            setGrammarNote(analyzeSentence(text, direction).summary);

            const sourceName = memoryPair.source?.name || 'reviewed project memory';
            const license = memoryPair.source?.license ? ` · ${memoryPair.source.license}` : '';
            setDictionaryContext(
              `${memoryPair.headword || 'Sentence memory'} · ${
                memoryPair.partOfSpeech || 'parallel example'
              } · ${sourceName}`
            );

            setTranslationNote(
              memoryMatch.kind === 'exact'
                ? `${reviewLabel(memoryPair)} exact match · confidence ${Math.round(
                    memoryMatch.confidence * 100
                  )}%${license}.`
                : `Close reviewed-memory match · confidence ${Math.round(
                    memoryMatch.confidence * 100
                  )}% · interpreted as “${memoryMatch.source}”. Check that this matches your intended sentence${license}.`
            );
            return;
          }
        }

        // 2. Perform offline or server translation
        let serverOutput = '';
        let normalized = '';
        let romanized = '';
        let grammar = '';
        let dictCtx = '';

        if (useOfflineModel) {
          if (!isOfflineModelReady()) {
            await loadOfflineTranslator(setOfflineStatus);
          }
          serverOutput = await offlineTranslate(text, direction, setOfflineStatus);
          grammar = analyzeSentence(text, direction).summary;
          dictCtx = 'Offline model result. Dictionary matches remain available on this device.';
        } else {
          const res = await serverTranslate(
            text,
            direction,
            controller.signal,
            setTranslationNote
          );
          [serverOutput, normalized, romanized, grammar, dictCtx] = res;
        }

        const grammarOutput = applyGrammarOutput(serverOutput, text, direction);
        const fallback = applyUnknownEnglishFallback(text, grammarOutput);

        setTranslatedText(fallback.text);
        setGrammarNote(grammar || analyzeSentence(text, direction).summary);
        setDictionaryContext(
          dictCtx || 'No exact dictionary entry found; the neural model supplied the translation.'
        );

        setTranslationNote(
          `${useOfflineModel ? 'Offline model: NLLB-200 600M.' : 'Server model: NLLB-200 600M.'} ${
            fallback.words.length
              ? `Unknown English words were rendered in Kashmiri script: ${fallback.words.join(', ')}. `
              : ''
          }Automatic translation—check grammar, names and meaning with a fluent speaker.`
        );
      } catch (err: any) {
        if (err.name === 'AbortError') {
          setTranslationNote('The server request timed out or was stopped. Try again.');
        } else {
          // Attempt dictionary draft fallback
          const memory = await getTranslationMemory().catch(() => null);
          const draft = memory ? dictionaryDraft(memory, text, direction) : null;
          if (draft) {
            setTranslatedText(draft.output);
            setDictionaryContext(
              `${Math.round(draft.coverage * 100)}% direct lexical coverage${
                draft.unresolved.length ? ` · unresolved: ${draft.unresolved.join(', ')}` : ''
              }`
            );
            setTranslationNote(
              'Server unavailable. This is a dictionary-assisted word draft, not a grammatical sentence translation; have a fluent speaker review it.'
            );
          } else {
            setTranslatedText('');
            setTranslationNote(err.message || 'The server translation failed.');
          }
        }
      } finally {
        abortControllerRef.current = null;
        setIsTranslating(false);
        setLiveStatus('Ready');
      }
    },
    [sourceText, direction, useOfflineModel, englishTokens, getTranslationMemory]
  );

  // Schedule debounced live translation
  useEffect(() => {
    clearTimeout(liveTimerRef.current);
    if (!liveTranslateEnabled || isTranslating) return;

    const trimmed = sourceText.trim();
    if (trimmed.length < 3) {
      setLiveStatus('Ready');
      return;
    }

    setLiveStatus('Waiting…');
    liveTimerRef.current = setTimeout(() => {
      translateCurrent(true);
    }, 1400);

    return () => clearTimeout(liveTimerRef.current);
  }, [sourceText, liveTranslateEnabled, direction]);

  const handleStopTranslation = () => {
    clearTimeout(liveTimerRef.current);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsTranslating(false);
    setLiveStatus('Ready');
    setTranslationNote('Stopped. The server request was cancelled.');
  };

  const handleSwapLanguages = () => {
    if (isTranslating) return;
    const nextDir = direction === 'ks-en' ? 'en-ks' : 'ks-en';
    setDirection(nextDir);
    setSourceText(translatedText);
    setTranslatedText('');
    setDictionaryContext('Dictionary and corpus matches will appear with the server result.');
    setTranslationNote(INITIAL_NOTE);
    setLiveStatus('Ready');
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopyStatus('Copied');
      setTimeout(() => setCopyStatus('Copy'), 1400);
    } catch {
      setTranslationNote('Clipboard unavailable. Select and copy the translation manually.');
    }
  };

  // Offline model download handler
  const handleDownloadOfflineModel = async () => {
    setDownloadingOffline(true);
    try {
      await loadOfflineTranslator(setOfflineStatus);
      setTranslationNote(
        'Offline model ready. Turn on “Use offline model” to translate without a server.'
      );
    } catch {
      setTranslationNote(
        'The offline model could not be downloaded. Check storage and connection, then try again.'
      );
    } finally {
      setDownloadingOffline(false);
    }
  };

  // Koul and Quran reference lookups
  const referenceTokens = (text: string) => {
    const stop = new Set(['تہٕ', 'چھ', 'چھُ', 'چھِ', 'یہ', 'یِم', 'سُہ', 'تِم', 'مےٚ', 'کیا', 'ایک', 'اور', 'ہے', 'کے', 'کی']);
    return [
      ...new Set(
        (String(text || '').match(/[\p{Script=Arabic}\p{M}]{3,}/gu) || [])
          .map(normalize)
          .filter(token => token.length >= 3 && !stop.has(token))
      )
    ].slice(0, 12);
  };

  const rankedOcrPages = (records: any[], text: string, limit = 3) => {
    const tokens = referenceTokens(text);
    if (!tokens.length) return [];
    return records
      .map(page => {
        const folded = normalize(page.text || '');
        const hits = tokens.filter(token => folded.includes(token));
        return {
          page,
          hits,
          score: hits.reduce((score, token) => score + Math.min(3, folded.split(token).length - 1), 0)
        };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score || b.hits.length - a.hits.length)
      .slice(0, limit);
  };

  const handleLookupKoul = async () => {
    const text = sourceText.trim();
    if (!text) return;
    setLoadingKoul(true);
    try {
      if (!bookOcrCacheRef.current) {
        const res = await fetch('/assets/koul-book-ocr.json');
        const data = await res.json();
        bookOcrCacheRef.current = data.pages || [];
      }
      const ranked = rankedOcrPages(bookOcrCacheRef.current || [], text);
      setKoulReferences(ranked);
    } catch {
      setKoulReferences([]);
    } finally {
      setLoadingKoul(false);
    }
  };

  const handleLookupQuran = async () => {
    const text = direction === 'ks-en' ? sourceText.trim() : translatedText.trim();
    if (!text || !/\p{Script=Arabic}/u.test(text)) {
      setQuranReferences([]);
      return;
    }
    setLoadingQuran(true);
    try {
      if (!quranCorpusCacheRef.current) {
        const res = await fetch('/assets/kashmiri-quran-ocr.json');
        quranCorpusCacheRef.current = await res.json();
      }
      const ranked = rankedOcrPages(quranCorpusCacheRef.current?.records || [], text);
      setQuranReferences(ranked);
    } catch {
      setQuranReferences([]);
    } finally {
      setLoadingQuran(false);
    }
  };

  // Hook up Web Audio studio rack whenever audio element is mounted
  useEffect(() => {
    if (audioRef.current) {
      studioEngine.init(audioRef.current);
      studioEngine.setPreset(studioPreset);
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [ttsAudioUrl, studioPreset, playbackSpeed]);

  // Audio spectrum visualizer animation
  const startVisualizer = useCallback(() => {
    const canvas = visualizerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const analyser = studioEngine.getAnalyser();
    if (!ctx || !analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / 32;
      let x = 0;

      for (let i = 0; i < 32; i++) {
        const binIndex = Math.floor((i / 32) * (bufferLength / 2));
        const val = dataArray[binIndex] || 0;
        const barHeight = Math.max(3, (val / 255) * (canvas.height - 4));

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#267257');
        gradient.addColorStop(0.7, '#64b693');
        gradient.addColorStop(1, '#dcebd2');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
        x += barWidth;
      }
    };

    draw();
  }, []);

  const stopVisualizer = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    const canvas = visualizerCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1c4233';
        ctx.fillRect(0, canvas.height - 2, canvas.width, 2);
      }
    }
  }, []);

  const handleDownloadMasteredWav = async () => {
    if (!ttsAudioUrl) return;
    setDownloadingWav(true);
    try {
      const blob = await studioEngine.renderMasteredWav(ttsAudioUrl, studioPreset);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `koshur-studio-voice-${studioPreset}.wav`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setDownloadingWav(false);
    }
  };

  // Studio-Ready Speech Generation
  const handleSpeakKashmiri = async () => {
    const text = direction === 'ks-en' ? sourceText.trim() : translatedText.trim();
    if (!text) {
      setTtsStatus(
        direction === 'en-ks'
          ? 'Translate the English sentence first, then generate speech.'
          : 'Enter a sentence first.'
      );
      return;
    }

    if (speechEngine === 'bolbosh' && !/\p{Script=Arabic}/u.test(text)) {
      setTtsStatus('The Bolbosh model needs Kashmiri in Perso-Arabic script.');
      return;
    }

    setTtsLoading(true);
    setTtsAudioUrl(null);
    setTtsStatus(
      speechEngine === 'gemini'
        ? `Generating Studio Ultra-HD Voice (${geminiVoice})…`
        : `Generating Bolbosh Kashmiri voice with High ODE synthesis…`
    );

    try {
      let result: TTSResult;
      if (speechEngine === 'gemini') {
        result = await generateGeminiSpeech(text, geminiVoice);
        setTtsStatus(`Studio Ready · 24kHz HD Voice (${geminiVoice}) with DSP rack active.`);
      } else {
        result = await generateKashmiriSpeech(text, ttsVoice, ttsQuality);
        setTtsStatus(
          `Studio Ready · Bolbosh (${ttsVoice}) remastered with DSP warmth and de-esser.`
        );
      }

      setTtsAudioUrl(result.audioUrl);
      studioEngine.resumeContext();
    } catch (err: any) {
      // Automatic intelligent fallback: if Gemini fails or Bolbosh fails, try the alternative!
      if (speechEngine === 'gemini') {
        try {
          setTtsStatus('Falling back to Bolbosh Matcha-TTS model with Studio Mastering…');
          const fallbackResult = await generateKashmiriSpeech(text, ttsVoice, 'High');
          setTtsAudioUrl(fallbackResult.audioUrl);
          setTtsStatus('Ready · Generated via Bolbosh with Studio Mastering DSP.');
          return;
        } catch {
          // Both failed
        }
      }
      setTtsStatus(
        err.name === 'AbortError'
          ? 'Speech generation timed out. Please try again.'
          : err.message || 'Speech generation failed.'
      );
    } finally {
      setTtsLoading(false);
    }
  };

  const isKashmiriInput = direction === 'ks-en';

  return (
    <section id="translator-view" className="translator-view">
      <div className="translator-heading">
        <p className="eyebrow">NEURAL TRANSLATION · ONLINE + OFFLINE</p>
        <h1>
          Translate a<br />
          <em>whole sentence.</em>
        </h1>
        <p>
          Use the live server for fast translation, or download the quantized NLLB model once and translate offline on a compatible phone.
        </p>
      </div>

      <div className="translation-workspace">
        <div className="model-selection">
          <span>Translation model</span>
          <strong>NLLB-200 600M · server or offline phone model</strong>
          <div className="offline-controls">
            <button
              id="download-offline-model"
              type="button"
              disabled={downloadingOffline || isOfflineModelReady()}
              onClick={handleDownloadOfflineModel}
            >
              {isOfflineModelReady()
                ? 'Offline model ready'
                : downloadingOffline
                ? 'Downloading…'
                : 'Download offline model'}
            </button>
            <label>
              <input
                id="offline-translate"
                type="checkbox"
                checked={useOfflineModel}
                onChange={e => {
                  setUseOfflineModel(e.target.checked);
                  if (e.target.checked && !isOfflineModelReady()) {
                    setTranslationNote('Download the offline model first; it is a large one-time download.');
                  } else {
                    setTranslationNote(
                      e.target.checked
                        ? 'Offline mode enabled. Translation stays on this device.'
                        : INITIAL_NOTE
                    );
                  }
                }}
              />{' '}
              Use offline model
            </label>
            <span id="offline-status" role="status">
              {offlineStatus}
            </span>
          </div>
        </div>

        <div className="direction-bar">
          <button
            id="source-language"
            type="button"
            disabled={isTranslating}
            onClick={() => {
              if (direction !== 'ks-en') handleSwapLanguages();
            }}
          >
            {isKashmiriInput ? 'Kashmiri' : 'English'}
          </button>
          <button
            id="swap-languages"
            type="button"
            aria-label="Swap languages"
            disabled={isTranslating}
            onClick={handleSwapLanguages}
          >
            ⇄
          </button>
          <button
            id="target-language"
            type="button"
            disabled={isTranslating}
            onClick={() => {
              if (direction !== 'en-ks') handleSwapLanguages();
            }}
          >
            {isKashmiriInput ? 'English' : 'Kashmiri'}
          </button>
        </div>

        <div className="translation-panes">
          <div className="translation-pane">
            <label id="source-label" htmlFor="sentence-input">
              {isKashmiriInput ? 'Kashmiri' : 'English'} sentence
            </label>
            <textarea
              id="sentence-input"
              dir={isKashmiriInput ? 'rtl' : 'ltr'}
              lang={isKashmiriInput ? 'ks-Arab' : 'en'}
              maxLength={1000}
              placeholder={
                isKashmiriInput ? 'اَتہِ کٲشُر جُملہٕ لِکھِو…' : 'Type an English sentence here…'
              }
              value={sourceText}
              disabled={isTranslating}
              onChange={e => setSourceText(e.target.value)}
            />

            {isKashmiriInput && sourceText.trim() && (
              <div id="source-transliteration" className="source-transliteration">
                Normalized Kashmiri: {autocorrectKashmiri(sourceText.trim())} · Romanized reading:{' '}
                {transliterateKashmiri(autocorrectKashmiri(sourceText.trim()))}
              </div>
            )}

            <div className="live-controls">
              <label>
                <input
                  id="live-translate"
                  type="checkbox"
                  checked={liveTranslateEnabled}
                  onChange={e => setLiveTranslateEnabled(e.target.checked)}
                />{' '}
                Live server translation after pause
              </label>
              <span id="live-status">{liveStatus}</span>
            </div>

            <div id="live-dictionary-preview" className="live-dictionary-preview" role="status">
              {liveDictionaryPreview.includes('→') ? (
                <>
                  <strong>Live dictionary:</strong> {liveDictionaryPreview}
                </>
              ) : (
                liveDictionaryPreview
              )}
            </div>

            <span id="sentence-count">{sourceText.length} / 1,000</span>
          </div>

          <div className="translation-pane output-pane">
            <span id="target-label" className="field-label">
              {isKashmiriInput ? 'English' : 'Kashmiri'} translation
            </span>
            <div
              id="sentence-output"
              className={`sentence-output ${!translatedText ? 'empty' : ''}`}
              dir={isKashmiriInput ? 'ltr' : 'rtl'}
              lang={isKashmiriInput ? 'en' : 'ks-Arab'}
            >
              {translatedText ? (
                direction === 'en-ks' ? (
                  <>
                    <span className="translated-script">{translatedText}</span>
                    <span className="translation-translit">
                      Romanized reading: {transliterateKashmiri(translatedText)}
                    </span>
                  </>
                ) : (
                  translatedText
                )
              ) : (
                'Your translation will appear here.'
              )}
            </div>
            <button
              id="copy-translation"
              type="button"
              disabled={!translatedText}
              onClick={handleCopy}
            >
              {copyStatus}
            </button>
          </div>
        </div>

        <div id="grammar-note" className="translation-note grammar-note" role="status">
          {grammarNote}
        </div>
        <div id="dictionary-context" className="translation-note" role="status">
          {dictionaryContext}
        </div>

        <div className="translation-examples">
          <span>Try a sentence</span>
          <button
            id="example-sentence"
            type="button"
            disabled={isTranslating}
            onClick={() =>
              setSourceText(isKashmiriInput ? 'مےٚ پٔر اَکھ کِتاب' : 'The weather is good today.')
            }
          >
            {isKashmiriInput ? 'مےٚ پٔر اَکھ کِتاب' : 'The weather is good today.'}
          </button>
        </div>

        <div id="translation-note" className="translation-note" role="status">
          {translationNote}
        </div>

        <div className="book-reference-tools">
          <button
            id="lookup-koul"
            type="button"
            disabled={loadingKoul || isTranslating}
            onClick={handleLookupKoul}
          >
            {loadingKoul ? 'Loading Koul references…' : 'Look up Koul book references'}
          </button>
          <button
            id="lookup-quran"
            type="button"
            disabled={loadingQuran || isTranslating}
            onClick={handleLookupQuran}
          >
            {loadingQuran ? 'Loading Qur’an corpus…' : 'Find Qur’an corpus references'}
          </button>

          {koulReferences !== null && (
            <div id="koul-references" className="koul-references">
              {koulReferences.length > 0 ? (
                <>
                  <p>
                    <strong>Koul OCR references</strong>
                    <span>Machine-matched pages for review; they do not change the neural translation.</span>
                  </p>
                  {koulReferences.map(({ page, hits }, idx) => (
                    <a
                      key={idx}
                      href={`https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul/page/n${Math.max(
                        0,
                        page.page - 1
                      )}/mode/1up`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PDF page {page.page}
                      <span>
                        {hits.join(' · ')} · {String(page.text || '').replace(/\s+/g, ' ').slice(0, 260)}
                      </span>
                    </a>
                  ))}
                </>
              ) : (
                <p>
                  <strong>No close Koul OCR reference found</strong>
                  <span>Try a distinctive Kashmiri word from the sentence.</span>
                </p>
              )}
            </div>
          )}

          {quranReferences !== null && (
            <div id="quran-references" className="koul-references">
              {quranReferences.length > 0 ? (
                <>
                  <p>
                    <strong>Kashmiri Qur’an translation references</strong>
                    <span>Raw OCR matches only—verify every quotation against the linked scan.</span>
                  </p>
                  {quranReferences.map(({ page, hits }, idx) => (
                    <a key={idx} href={page.sourceUrl} target="_blank" rel="noopener noreferrer">
                      PDF page {page.page}
                      <span>
                        {hits.join(' · ')} · {String(page.text || '').replace(/\s+/g, ' ').slice(0, 300)}
                      </span>
                    </a>
                  ))}
                </>
              ) : (
                <p>
                  <strong>No close Qur’an corpus reference found</strong>
                  <span>This corpus is Kashmiri/Arabic OCR and cannot be searched reliably from English alone.</span>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="translation-actions">
          <button
            id="translate-sentence"
            className="translate-sentence"
            type="button"
            disabled={isTranslating}
            onClick={() => translateCurrent(false)}
          >
            {isTranslating ? 'Working on server…' : 'Translate on server'}
          </button>
          {isTranslating && (
            <button
              id="cancel-translation"
              className="cancel-translation"
              type="button"
              onClick={handleStopTranslation}
            >
              Stop
            </button>
          )}
        </div>

        <section className="tts-panel" aria-labelledby="tts-title">
          <div className="tts-heading">
            <div>
              <p className="eyebrow">STUDIO-GRADE VOICE SYNTHESIS</p>
              <h2 id="tts-title">
                Kashmiri Voice Studio <span className="studio-badge">DSP Mastered · 24kHz</span>
              </h2>
            </div>
            <a
              href={speechEngine === 'bolbosh' ? 'https://github.com/gaash-lab/Bolbosh' : 'https://deepmind.google/technologies/gemini/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {speechEngine === 'bolbosh' ? 'Bolbosh Matcha-TTS ↗' : 'Gemini 3.8 Audio ↗'}
            </a>
          </div>

          <p>
            Generates high-fidelity speech from the Kashmiri side (source sentence or translated text) with real-time acoustic mastering.
          </p>

          <div className="engine-selector">
            <button
              type="button"
              className={`engine-tab ${speechEngine === 'gemini' ? 'active' : ''}`}
              onClick={() => {
                setSpeechEngine('gemini');
                setTtsStatus('Studio Ultra-HD Voice selected (24kHz broadcast clarity).');
              }}
            >
              ✨ Studio Ultra-HD Voice (Gemini 3.8)
            </button>
            <button
              type="button"
              className={`engine-tab ${speechEngine === 'bolbosh' ? 'active' : ''}`}
              onClick={() => {
                setSpeechEngine('bolbosh');
                setTtsStatus('Native Bolbosh Matcha-TTS selected (with High ODE & DSP Mastering).');
              }}
            >
              🏔️ Bolbosh Kashmiri (Native Model)
            </button>
          </div>

          <div className="tts-controls">
            {speechEngine === 'gemini' ? (
              <label>
                Studio Persona
                <select
                  id="gemini-voice"
                  value={geminiVoice}
                  onChange={e => setGeminiVoice(e.target.value as any)}
                >
                  <option value="Kore">Kore — Warm Female Narrator</option>
                  <option value="Zephyr">Zephyr — Gentle Female Voice</option>
                  <option value="Puck">Puck — Dynamic Crisp Male</option>
                  <option value="Fenrir">Fenrir — Deep Resonant Male</option>
                  <option value="Charon">Charon — Broadcast Host Male</option>
                </select>
              </label>
            ) : (
              <>
                <label>
                  Bolbosh Voice
                  <select
                    id="tts-voice"
                    value={ttsVoice}
                    onChange={e => setTtsVoice(e.target.value as 'Female' | 'Male')}
                  >
                    <option value="Female">Female (Studio Mastered)</option>
                    <option value="Male">Male (Studio Mastered)</option>
                  </select>
                </label>
                <label>
                  Solver Precision
                  <select
                    id="tts-quality"
                    value={ttsQuality}
                    onChange={e => setTtsQuality(e.target.value as 'Low (fast)' | 'Medium' | 'High')}
                  >
                    <option value="High">High (Cleanest ODE)</option>
                    <option value="Medium">Medium</option>
                    <option value="Low (fast)">Fast</option>
                  </select>
                </label>
              </>
            )}

            <button
              id="speak-kashmiri"
              className="primary-btn"
              type="button"
              disabled={ttsLoading}
              onClick={handleSpeakKashmiri}
            >
              {ttsLoading ? 'Synthesizing Studio Audio…' : 'Generate Studio Speech'}
            </button>
          </div>

          {/* Studio Mastering Rack */}
          <div className="studio-rack">
            <div className="studio-rack-header">
              <span className="studio-rack-title">
                🎛️ Studio DSP Mastering Rack
              </span>
              <span style={{ fontSize: 11, color: '#267257', fontWeight: 600 }}>
                {STUDIO_PRESETS[studioPreset].label}
              </span>
            </div>

            <div className="studio-rack-grid">
              <label>
                Acoustic Profile
                <select
                  value={studioPreset}
                  onChange={e => {
                    const preset = e.target.value as StudioPresetName;
                    setStudioPreset(preset);
                    studioEngine.setPreset(preset);
                  }}
                >
                  <option value="broadcast">Studio Master (Broadcast)</option>
                  <option value="warm-radio">Warm Radio Host</option>
                  <option value="crisp-learning">Crisp Articulation (Learner)</option>
                  <option value="natural-booth">Natural Acoustic Booth</option>
                  <option value="bypass">Raw Model Output (Bypass DSP)</option>
                </select>
              </label>

              <label>
                Pacing &amp; Speed
                <select
                  value={playbackSpeed}
                  onChange={e => {
                    const spd = parseFloat(e.target.value);
                    setPlaybackSpeed(spd);
                    if (audioRef.current) audioRef.current.playbackRate = spd;
                  }}
                >
                  <option value="0.85">0.85x (Language Study)</option>
                  <option value="1.0">1.0x (Natural Studio)</option>
                  <option value="1.15">1.15x (Brisk Narrator)</option>
                </select>
              </label>

              <p className="preset-desc">
                {STUDIO_PRESETS[studioPreset].description}
              </p>
            </div>

            {/* Live Audio Visualizer Spectrum */}
            <div className="visualizer-container">
              <canvas
                ref={visualizerCanvasRef}
                className="visualizer-canvas"
                width={480}
                height={48}
              />
            </div>
          </div>

          <p id="tts-status" className="tts-status" role="status">
            {ttsStatus}
          </p>

          {ttsAudioUrl && (
            <div className="audio-player-row">
              <audio
                ref={audioRef}
                id="tts-audio"
                controls
                autoPlay
                src={ttsAudioUrl}
                onPlay={() => {
                  studioEngine.resumeContext();
                  startVisualizer();
                }}
                onPause={stopVisualizer}
                onEnded={stopVisualizer}
              >
                Your browser does not support the audio element.
              </audio>

              <button
                type="button"
                className="download-wav-btn"
                disabled={downloadingWav}
                onClick={handleDownloadMasteredWav}
                title="Download 24-bit mastered studio WAV file"
              >
                {downloadingWav ? 'Exporting…' : '⬇ Download Mastered WAV'}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};
