import React, { useEffect, useRef, useState } from 'react';

type EngineState = 'checking' | 'ready' | 'offline';
type RecordingState = 'idle' | 'recording';

const CONSENT_WORDS = 'I CONSENT';
const MAX_AUDIO_BYTES = 4 * 1024 * 1024;

const fileToBase64 = async (file: File) => {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
};

export const VoiceCloneView: React.FC = () => {
  const [engine, setEngine] = useState<EngineState>('checking');
  const [engineMessage, setEngineMessage] = useState('Checking the private voice engine…');
  const [recording, setRecording] = useState<RecordingState>('idle');
  const [seconds, setSeconds] = useState(0);
  const [sample, setSample] = useState<File | null>(null);
  const [sampleUrl, setSampleUrl] = useState('');
  const [ownerConfirmed, setOwnerConfirmed] = useState(false);
  const [syntheticConfirmed, setSyntheticConfirmed] = useState(false);
  const [consentText, setConsentText] = useState('');
  const [language, setLanguage] = useState('ks');
  const [text, setText] = useState('میون ناو چھُ سمیٖر۔ بہٕ چھُس کوئل، پُلوامہ پؠٹھ۔');
  const [generating, setGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [error, setError] = useState('');
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<number | null>(null);

  const consentReady = ownerConfirmed && syntheticConfirmed && consentText.trim().toUpperCase() === CONSENT_WORDS;

  useEffect(() => {
    fetch('/api/voice-clone', { signal: AbortSignal.timeout(15000) })
      .then(async response => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        const ready = response.ok && Boolean(data.ready);
        setEngine(ready ? 'ready' : 'offline');
        setEngineMessage(String(data.message || (ready ? 'Voice engine ready' : 'GPU voice engine is not connected')));
      })
      .catch(() => {
        setEngine('offline');
        setEngineMessage('GPU voice engine is not connected');
      });
  }, []);

  useEffect(() => () => {
    if (timer.current) window.clearInterval(timer.current);
    stream.current?.getTracks().forEach(track => track.stop());
  }, []);

  useEffect(() => () => {
    if (sampleUrl) URL.revokeObjectURL(sampleUrl);
  }, [sampleUrl]);

  useEffect(() => () => {
    if (generatedUrl.startsWith('blob:')) URL.revokeObjectURL(generatedUrl);
  }, [generatedUrl]);

  const useSample = (file: File) => {
    setError('');
    if (!file.type.startsWith('audio/')) {
      setError('Choose an audio recording in WAV, MP3, M4A, OGG or WebM format.');
      return;
    }
    if (file.size > MAX_AUDIO_BYTES) {
      setError('The voice sample must be 4 MB or smaller. Use a shorter compressed recording.');
      return;
    }
    if (sampleUrl) URL.revokeObjectURL(sampleUrl);
    setSample(file);
    setSampleUrl(URL.createObjectURL(file));
    setGeneratedUrl('');
  };

  const startRecording = async () => {
    setError('');
    try {
      const nextStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const instance = new MediaRecorder(nextStream);
      stream.current = nextStream;
      recorder.current = instance;
      chunks.current = [];
      instance.ondataavailable = event => { if (event.data.size) chunks.current.push(event.data); };
      instance.onstop = () => {
        const type = instance.mimeType || 'audio/webm';
        const blob = new Blob(chunks.current, { type });
        nextStream.getTracks().forEach(track => track.stop());
        stream.current = null;
        useSample(new File([blob], `consented-voice-${Date.now()}.webm`, { type }));
      };
      instance.start(250);
      setSeconds(0);
      setRecording('recording');
      timer.current = window.setInterval(() => setSeconds(value => {
        if (value >= 89) window.setTimeout(() => stopRecording(), 0);
        return value + 1;
      }), 1000);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Microphone access is unavailable.');
    }
  };

  const stopRecording = () => {
    if (recorder.current?.state === 'recording') recorder.current.stop();
    setRecording('idle');
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  };

  const deleteVoice = () => {
    if (sampleUrl) URL.revokeObjectURL(sampleUrl);
    if (generatedUrl.startsWith('blob:')) URL.revokeObjectURL(generatedUrl);
    setSample(null);
    setSampleUrl('');
    setGeneratedUrl('');
    setConsentText('');
    setOwnerConfirmed(false);
    setSyntheticConfirmed(false);
    setError('');
  };

  const generate = async () => {
    if (!sample || !consentReady || !text.trim() || engine !== 'ready') return;
    setGenerating(true);
    setError('');
    setGeneratedUrl('');
    try {
      const response = await fetch('/api/voice-clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceAudioBase64: await fileToBase64(sample),
          mimeType: sample.type,
          fileName: sample.name,
          language,
          text: text.trim(),
          consent: { ownershipConfirmed: ownerConfirmed, syntheticSpeechConfirmed: syntheticConfirmed, phrase: consentText.trim() },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Voice generation failed');
      if (data.audioUrl) setGeneratedUrl(String(data.audioUrl));
      else if (data.audioBase64) {
        const bytes = Uint8Array.from(atob(String(data.audioBase64)), character => character.charCodeAt(0));
        setGeneratedUrl(URL.createObjectURL(new Blob([bytes], { type: data.mimeType || 'audio/wav' })));
      } else throw new Error('The voice engine returned no audio.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to generate the cloned voice.');
    } finally {
      setGenerating(false);
    }
  };

  return <section className="voice-clone" aria-labelledby="voice-clone-title">
    <header className="clone-hero">
      <div>
        <p className="eyebrow">Private voice preview</p>
        <h1 id="voice-clone-title">Speak in your own voice</h1>
        <p>Record a voice you own, choose a language, and generate a disclosed synthetic preview. Your sample stays in this browser session unless you explicitly send it for generation.</p>
      </div>
      <div className={`clone-engine ${engine}`} role="status" aria-live="polite">
        <span aria-hidden="true" />
        <div><strong>{engine === 'ready' ? 'Engine ready' : engine === 'checking' ? 'Checking engine' : 'Engine offline'}</strong><small>{engineMessage}</small></div>
      </div>
    </header>

    <div className="clone-steps" aria-label="Voice cloning steps">
      <section className="clone-step">
        <div className="clone-step-heading"><span>01</span><div><h2>Confirm consent</h2><p>Only clone your own voice or a speaker who has given you explicit permission.</p></div></div>
        <div className="clone-consent">
          <label><input type="checkbox" checked={ownerConfirmed} onChange={event => setOwnerConfirmed(event.target.checked)} /><span>I own this voice or have the speaker’s documented permission.</span></label>
          <label><input type="checkbox" checked={syntheticConfirmed} onChange={event => setSyntheticConfirmed(event.target.checked)} /><span>I understand this creates synthetic speech and I will disclose that it is AI-generated.</span></label>
          <label htmlFor="clone-consent-phrase">Type <strong>{CONSENT_WORDS}</strong> to continue</label>
          <input id="clone-consent-phrase" value={consentText} onChange={event => setConsentText(event.target.value)} autoComplete="off" spellCheck={false} placeholder="I CONSENT…" />
        </div>
      </section>

      <section className={`clone-step ${!consentReady ? 'is-locked' : ''}`}>
        <div className="clone-step-heading"><span>02</span><div><h2>Provide your voice</h2><p>Use 30–90 seconds in a quiet room. Read naturally and keep the microphone one hand away.</p></div></div>
        <div className="clone-capture">
          <p className="clone-read-line" lang="ks-Arab" dir="rtl">بہٕ چھُس پنُن آواز مصنوعی تقریر بناونہٕ خٲطرٕ استعمال کرنس اجازت دِوان۔</p>
          <button className={`clone-record ${recording === 'recording' ? 'recording' : ''}`} type="button" onClick={recording === 'recording' ? stopRecording : startRecording} disabled={!consentReady}>
            <span aria-hidden="true">{recording === 'recording' ? '■' : '●'}</span>{recording === 'recording' ? `Stop · ${seconds}s` : 'Record Voice'}
          </button>
          <span className="clone-or">or</span>
          <label className="clone-upload"><input type="file" accept="audio/*,.wav,.mp3,.m4a,.ogg,.webm" disabled={!consentReady} onChange={event => { const file = event.target.files?.[0]; if (file) useSample(file); }} /><span>Upload a consented recording</span><small>Audio only · maximum 4 MB</small></label>
        </div>
        {sample && <div className="clone-sample"><div><strong>{sample.name}</strong><small>{(sample.size / 1048576).toFixed(2)} MB · session only</small></div><audio controls src={sampleUrl} /><button type="button" onClick={deleteVoice}>Delete Voice</button></div>}
      </section>

      <section className={`clone-step ${!sample ? 'is-locked' : ''}`}>
        <div className="clone-step-heading"><span>03</span><div><h2>Generate a preview</h2><p>Short, punctuated sentences produce the clearest multilingual speech.</p></div></div>
        <div className="clone-generate-grid">
          <label htmlFor="clone-language">Language<select id="clone-language" value={language} onChange={event => setLanguage(event.target.value)} disabled={!sample}><option value="ks">Kashmiri</option><option value="en">English</option><option value="ur">Urdu</option><option value="hi">Hindi</option></select></label>
          <label htmlFor="clone-text">Text to speak<textarea id="clone-text" value={text} onChange={event => setText(event.target.value)} disabled={!sample} maxLength={500} dir={language === 'en' ? 'ltr' : 'rtl'} /></label>
          <div className="clone-generate-footer"><span>{text.length}/500</span><button type="button" onClick={generate} disabled={!sample || !consentReady || !text.trim() || generating || engine !== 'ready'}>{generating ? 'Generating…' : engine === 'offline' ? 'GPU Engine Offline' : 'Generate My Voice'}</button></div>
        </div>
        {generatedUrl && <div className="clone-result" role="status"><div><strong>Synthetic voice preview</strong><small>AI-generated audio · disclose when sharing</small></div><audio controls autoPlay src={generatedUrl} /></div>}
      </section>
    </div>
    {error && <div className="speech-error clone-error" role="alert">{error}</div>}
    <p className="clone-privacy"><strong>Privacy:</strong> recordings are held in memory for this session and sent only when you select Generate. Delete Voice removes the browser copy. The service does not expose speaker embeddings.</p>
  </section>;
};
