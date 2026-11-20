import React, { useEffect, useRef, useState } from 'react';

type ServiceState = 'checking' | 'ready' | 'offline';
type Voice = 'Male' | 'Female';
type Quality = 'Low (fast)' | 'Medium' | 'High';

const SAMPLE = 'میون ناو چھُ سمیٖر۔ بہٕ چھُس کوئل، پُلوامہ پؠٹھ۔';

export const TextToSpeechView: React.FC = () => {
  const [service, setService] = useState<ServiceState>('checking');
  const [text, setText] = useState(SAMPLE);
  const [voice, setVoice] = useState<Voice>('Male');
  const [quality, setQuality] = useState<Quality>('Low (fast)');
  const [generating, setGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [error, setError] = useState('');
  const [elapsed, setElapsed] = useState<number | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch('/api/tts', { signal: AbortSignal.timeout(15000) })
      .then(async response => ({ ok: response.ok, data: await response.json() }))
      .then(({ ok, data }) => setService(ok && data.ready ? 'ready' : 'offline'))
      .catch(() => setService('offline'));
  }, []);

  const generate = async () => {
    setGenerating(true);
    setError('');
    setAudioUrl('');
    setProcessedText('');
    setElapsed(null);
    const started = performance.now();
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), voice, quality }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Speech generation failed');
      setAudioUrl(String(data.audioUrl || ''));
      setProcessedText(String(data.processedText || text));
      setElapsed((performance.now() - started) / 1000);
      window.setTimeout(() => audio.current?.play().catch(() => undefined), 80);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to create speech.');
    } finally {
      setGenerating(false);
    }
  };

  return <section className="tts-lab" aria-labelledby="tts-lab-title">
    <header className="tts-lab-hero">
      <div>
        <p className="eyebrow">Kashmiri text to speech</p>
        <h1 id="tts-lab-title">Type Koshur.<br/>Hear it spoken.</h1>
        <p>Generate native Kashmiri speech with the open Matcha-TTS model running on Hugging Face. Fast mode is designed for conversation; High mode takes longer and uses more synthesis steps.</p>
      </div>
      <div className={`tts-live-state ${service}`} role="status" aria-live="polite">
        <span aria-hidden="true"/><div><strong>{service === 'ready' ? 'Model online' : service === 'checking' ? 'Checking model' : 'Model offline'}</strong><small>Hugging Face · Matcha-TTS Kashmiri</small></div>
      </div>
    </header>

    <div className="tts-workbench">
      <div className="tts-script">
        <label htmlFor="tts-kashmiri-text">Kashmiri text</label>
        <textarea id="tts-kashmiri-text" lang="ks-Arab" dir="rtl" value={text} maxLength={500} spellCheck={false} onChange={event => setText(event.target.value)} aria-describedby="tts-character-count"/>
        <div className="tts-script-meta"><span id="tts-character-count">{text.length}/500</span><button type="button" onClick={() => setText(SAMPLE)}>Use sample sentence</button></div>
      </div>

      <aside className="tts-controls-panel" aria-label="Voice settings">
        <fieldset><legend>Voice</legend><div className="tts-segmented">
          {(['Male', 'Female'] as Voice[]).map(option => <label key={option}><input type="radio" name="tts-voice" value={option} checked={voice === option} onChange={() => setVoice(option)}/><span>{option}</span></label>)}
        </div></fieldset>
        <label htmlFor="tts-quality">Generation quality<select id="tts-quality" value={quality} onChange={event => setQuality(event.target.value as Quality)}><option>Low (fast)</option><option>Medium</option><option>High</option></select></label>
        <button className="tts-generate" type="button" onClick={generate} disabled={!text.trim() || generating || service !== 'ready'}>{generating ? 'Generating on Hugging Face…' : service === 'offline' ? 'Model Offline' : 'Generate Speech'}</button>
        <p>Experimental AI-generated voice. Check pronunciation before publishing.</p>
      </aside>
    </div>

    <div className={`tts-output ${audioUrl ? 'has-audio' : ''}`} aria-live="polite">
      <div><span className="tts-output-number">OUTPUT 01</span><strong>{audioUrl ? 'Your Kashmiri audio is ready' : 'Audio will appear here'}</strong><small>{audioUrl ? `${voice} voice · ${quality}${elapsed ? ` · generated in ${elapsed.toFixed(1)}s` : ''}` : 'Enter text and select Generate Speech'}</small></div>
      {audioUrl && <><audio ref={audio} controls src={audioUrl}/><a href={audioUrl} download="kashmiri-speech.wav" target="_blank" rel="noreferrer">Download WAV</a></>}
    </div>
    {processedText && processedText !== text.trim() && <p className="tts-processed" dir="rtl" lang="ks-Arab"><strong>Model input:</strong> {processedText}</p>}
    {error && <div className="speech-error tts-error" role="alert">{error}</div>}
    <footer className="tts-provenance"><span>MODEL</span><a href="https://huggingface.co/GAASH-Lab/Matcha-TTS-Kashmiri" target="_blank" rel="noreferrer">GAASH-Lab/Matcha-TTS-Kashmiri ↗</a><span>HOST</span><strong>Hugging Face Spaces</strong><span>USE</span><strong>Experimental</strong></footer>
  </section>;
};
