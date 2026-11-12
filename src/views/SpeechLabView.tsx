import React, { useEffect, useRef, useState } from 'react';

type ServiceState = 'checking' | 'ready' | 'offline';
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export const SpeechLabView: React.FC = () => {
  const [endpoint, setEndpoint] = useState(() => {
    const stored = localStorage.getItem('koshur-asr-endpoint') || '';
    return stored.includes('hf.space') || stored.includes('huggingface.co') ? '' : stored;
  });
  const [service, setService] = useState<ServiceState>('checking');
  const [serviceMessage, setServiceMessage] = useState('Checking the Whisper service…');
  const [audio, setAudio] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recorder = useRef<MediaRecorder | null>(null);
  const timer = useRef<number | null>(null);
  const chunks = useRef<Blob[]>([]);
  const url = (path: string) => `${endpoint.trim().replace(/\/$/, '')}${path}`;

  const checkService = async () => {
    setService('checking'); setServiceMessage('Checking the Whisper service…');
    try {
      const response = await fetch(url('/api/asr'), { signal: AbortSignal.timeout(20000) });
      const data = await response.json();
      if (!response.ok || !data.ready) throw new Error(data.detail || 'Model is not ready');
      setService('ready'); setServiceMessage(`${data.model || 'Kashmiri Whisper'} is ready`);
    } catch (reason) {
      setService('offline'); setServiceMessage(reason instanceof Error ? reason.message : 'Speech service is offline');
    }
  };

  useEffect(() => { void checkService(); }, []);
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const useAudio = (file: File) => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudio(file); setAudioUrl(URL.createObjectURL(file)); setTranscript(''); setError('');
  };
  const startRecording = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const instance = new MediaRecorder(stream); recorder.current = instance; chunks.current = [];
      instance.ondataavailable = event => { if (event.data.size) chunks.current.push(event.data); };
      instance.onstop = () => {
        const blob = new Blob(chunks.current, { type: instance.mimeType || 'audio/webm' });
        useAudio(new File([blob], `kashmiri-${Date.now()}.webm`, { type: blob.type }));
        stream.getTracks().forEach(track => track.stop());
      };
      instance.start(250); setSeconds(0); setRecording(true);
      timer.current = window.setInterval(() => setSeconds(value => value + 1), 1000);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Microphone access was unavailable.'); }
  };
  const stopRecording = () => {
    recorder.current?.stop(); setRecording(false);
    if (timer.current) clearInterval(timer.current); timer.current = null;
  };
  const transcribe = async () => {
    if (!audio) return;
    setTranscribing(true); setError(''); setTranscript('');
    try {
      if (audio.size > 3 * 1024 * 1024) throw new Error('Audio must be 3 MB or smaller. Record a shorter sample.');
      const bytes = new Uint8Array(await audio.arrayBuffer());
      let binary = '';
      for (let offset = 0; offset < bytes.length; offset += 0x8000) binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
      const response = await fetch(url('/api/asr'), {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64: btoa(binary), mimeType: audio.type, fileName: audio.name })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || data.error || 'Transcription failed');
      const text = String(data.text || '').trim();
      setTranscript(text);
      if (!text) setError('The model returned no text. Try a clearer recording.');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to reach the transcription service.'); }
    finally { setTranscribing(false); }
  };

  return <section className="speech-lab" aria-labelledby="speech-lab-title">
    <div className="speech-hero">
      <div><p className="eyebrow">Kashmiri speech recognition</p><h1 id="speech-lab-title">Large V3 Turbo speech lab</h1><p className="speech-intro">Record or upload Kashmiri speech and test the fine-tuned Whisper Large V3 Turbo adapter. Your audio is sent only to the configured inference service.</p></div>
      <div className={`service-pill ${service}`} role="status"><span aria-hidden="true"/><div><strong>{service === 'ready' ? 'Model online' : service === 'checking' ? 'Checking model' : 'Model offline'}</strong><small>{serviceMessage}</small></div></div>
    </div>
    <div className="speech-grid">
      <article className="speech-card capture-card">
        <span className="step-number">01</span><h2>Provide a voice sample</h2><p>Speak naturally in Kashmiri. Clear recordings between 3 and 30 seconds work best. This model completed 8 training epochs with 22.42% CER.</p>
        <div className={`record-orbit ${recording ? 'is-recording' : ''}`}><button className="record-button" type="button" onClick={recording ? stopRecording : startRecording} aria-label={recording ? 'Stop recording' : 'Start recording'}><span>{recording ? '■' : '●'}</span></button><strong>{recording ? clock(seconds) : 'Record'}</strong></div>
        <div className="audio-divider"><span>or upload audio</span></div>
        <label className="upload-audio"><input type="file" accept="audio/*,.wav,.mp3,.m4a,.webm,.ogg,.flac" onChange={event => { const file = event.target.files?.[0]; if (file) useAudio(file); }}/><span>Choose an audio file</span><small>WAV, MP3, M4A, WebM, OGG or FLAC · maximum 3 MB</small></label>
        {audio && <div className="selected-audio"><div><strong>{audio.name}</strong><small>{(audio.size / 1048576).toFixed(2)} MB</small></div><audio controls src={audioUrl}/></div>}
      </article>
      <article className="speech-card transcript-card">
        <span className="step-number">02</span><h2>Read the transcription</h2><p>The output is a model prediction. Check spelling and meaning before treating it as reviewed Kashmiri.</p>
        <div className={`transcript-paper ${transcript ? 'has-text' : ''}`} lang="ks-Arab" dir="rtl">{transcript || <span>تُہُنٛد کٲشُر متن یِیہِ یَتھ پؠٹھ…</span>}</div>
        {error && <div className="speech-error" role="alert">{error}</div>}
        <button className="transcribe-button" type="button" onClick={transcribe} disabled={!audio || transcribing || service !== 'ready'}>{transcribing ? 'Transcribing…' : 'Transcribe Kashmiri audio'}</button>
        {transcript && <button className="copy-transcript" type="button" onClick={() => navigator.clipboard.writeText(transcript)}>Copy transcription</button>}
      </article>
    </div>
    <details className="endpoint-settings"><summary>Advanced service settings</summary><div><label htmlFor="asr-endpoint">Proxy URL</label><input id="asr-endpoint" value={endpoint} onChange={event => setEndpoint(event.target.value)} placeholder="Leave blank to use Cipher"/><button type="button" onClick={() => { localStorage.setItem('koshur-asr-endpoint', endpoint.trim()); void checkService(); }}>Save and test</button></div><p>Leave blank to use the secure Cipher proxy. Existing custom settings can be cleared here.</p></details>
  </section>;
};
