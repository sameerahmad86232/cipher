import React, { useEffect, useRef, useState } from 'react';

type ServiceState = 'checking' | 'ready' | 'offline';
type SpeechModel = 'v2' | 'v4';
const MODEL_REPOS: Record<SpeechModel, string> = {
  v2: 'Sameer0313/kashmiri-whisper-lora-v2',
  v4: 'Sameer0313/kashmiri-whisper-lora-v4-candidate',
};
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export const SpeechLabView: React.FC = () => {
  const [endpoint, setEndpoint] = useState(() => {
    const stored = localStorage.getItem('koshur-asr-endpoint') || '';
    return stored.includes('hf.space') || stored.includes('huggingface.co') ? '' : stored;
  });
  const [service, setService] = useState<ServiceState>('checking');
  const [serviceMessage, setServiceMessage] = useState('Checking the Whisper service…');
  const [speechModel, setSpeechModel] = useState<SpeechModel>('v4');
  const [v4Available, setV4Available] = useState(false);
  const [audio, setAudio] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [modelTranscript, setModelTranscript] = useState('');
  const [englishTranslation, setEnglishTranslation] = useState('');
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');
  const recorder = useRef<MediaRecorder | null>(null);
  const timer = useRef<number | null>(null);
  const chunks = useRef<Blob[]>([]);
  const url = (path: string) => `${endpoint.trim().replace(/\/$/, '')}${path}`;

  const isGradio = () => {
    const ep = endpoint.trim().toLowerCase();
    return ep.includes('gradio.live') || ep.includes(':7860') || ep.includes('ngrok') || ep.includes('loca.lt');
  };

  const checkService = async () => {
    setService('checking'); setServiceMessage('Checking the Whisper service…');
    try {
      const ep = endpoint.trim().replace(/\/$/, '');
      if (isGradio()) {
        const response = await fetch(`${ep}/gradio_api/info`, { signal: AbortSignal.timeout(15000) });
        const data = await response.json();
        const hasEndpoint = Boolean(data?.named_endpoints?.['/transcribe_kashmiri']);
        if (!hasEndpoint) throw new Error('Colab server missing /transcribe_kashmiri endpoint');
        const v4Ready = Boolean(data?.named_endpoints?.['/transcribe_kashmiri_v4']);
        setV4Available(v4Ready);
        setSpeechModel(v4Ready ? 'v4' : 'v2');
        setService('ready'); setServiceMessage('Google Colab Kashmiri AI GPU Server is ready');
        return;
      }
      const response = await fetch(url('/api/asr'), { signal: AbortSignal.timeout(20000) });
      const data = await response.json();
      if (!response.ok || !data.ready) throw new Error(data.detail || 'Model is not ready');
      const v4Ready = Boolean(data.models?.v4);
      setV4Available(v4Ready);
      setSpeechModel(v4Ready ? 'v4' : 'v2');
      setService('ready'); setServiceMessage(`${data.model || 'Kashmiri Whisper'} is ready`);
    } catch (reason) {
      setService('offline'); setServiceMessage(reason instanceof Error ? reason.message : 'Speech service is offline');
    }
  };

  useEffect(() => { void checkService(); }, [endpoint]);
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const useAudio = (file: File) => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudio(file); setAudioUrl(URL.createObjectURL(file)); setTranscript(''); setModelTranscript(''); setEnglishTranslation(''); setError('');
  };

  const translateToEnglish = async (kashmiriText = transcript) => {
    const text = kashmiriText.trim();
    if (!text) return;
    setTranslating(true); setError('');
    try {
      const ep = endpoint.trim().replace(/\/$/, '');
      if (isGradio()) {
        const queueRes = await fetch(`${ep}/gradio_api/call/translate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [text, 'Kashmiri → English'] }),
          signal: AbortSignal.timeout(30000),
        });
        const queueData = await queueRes.json();
        const eventId = queueData?.event_id;
        if (!eventId) throw new Error('Colab translation queue failed');
        const eventRes = await fetch(`${ep}/gradio_api/call/translate/${eventId}`, { signal: AbortSignal.timeout(60000) });
        const stream = await eventRes.text();
        const completed = [...stream.matchAll(/^event: complete\s*\ndata: (.+)$/gm)].at(-1);
        if (!completed) throw new Error('Colab translation returned no completion');
        const payload = JSON.parse(completed[1]);
        setEnglishTranslation(String(payload?.[0] || '').trim());
        return;
      }
      const response = await fetch(url('/api/translate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'English translation failed');
      setEnglishTranslation(String(data.english || '').trim());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to translate the transcription.');
    } finally {
      setTranslating(false);
    }
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
      const ep = endpoint.trim().replace(/\/$/, '');
      let text = '';

      if (isGradio()) {
        const uploadData = new FormData();
        uploadData.append('files', audio, audio.name);
        const upRes = await fetch(`${ep}/gradio_api/upload`, { method: 'POST', body: uploadData, signal: AbortSignal.timeout(60000) });
        if (!upRes.ok) throw new Error(`Audio upload returned ${upRes.status}`);
        const upJson = await upRes.json();
        const serverPath = upJson?.[0];
        if (!serverPath) throw new Error('Colab server rejected audio upload');

        const gradioEndpoint = speechModel === 'v4' ? 'transcribe_kashmiri_v4' : 'transcribe_kashmiri';
        const queueRes = await fetch(`${ep}/gradio_api/call/${gradioEndpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: [{ path: serverPath, orig_name: audio.name, mime_type: audio.type, meta: { _type: 'gradio.FileData' } }]
          }),
          signal: AbortSignal.timeout(30000)
        });
        const queueData = await queueRes.json();
        const eventId = queueData?.event_id;
        if (!eventId) throw new Error('Colab speech queue failed');

        const eventRes = await fetch(`${ep}/gradio_api/call/${gradioEndpoint}/${eventId}`, { signal: AbortSignal.timeout(120000) });
        const stream = await eventRes.text();
        const completed = [...stream.matchAll(/^event: complete\s*\ndata: (.+)$/gm)].at(-1);
        if (!completed) throw new Error('Colab server returned no transcription completion');
        const payload = JSON.parse(completed[1]);
        text = String(payload?.[0] || '').trim();
      } else {
        const bytes = new Uint8Array(await audio.arrayBuffer());
        let binary = '';
        for (let offset = 0; offset < bytes.length; offset += 0x8000) binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
        const response = await fetch(url('/api/asr'), {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audioBase64: btoa(binary), mimeType: audio.type, fileName: audio.name, model: speechModel })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || data.error || 'Transcription failed');
        text = String(data.text || '').trim();
      }

      setTranscript(text); setModelTranscript(text);
      setEnglishTranslation('');
      if (!text) setError('The model returned no text. Try a clearer recording.');
      else await translateToEnglish(text);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to reach the transcription service.'); }
    finally { setTranscribing(false); }
  };

  const downloadCorrection = () => {
    if (!audio || !modelTranscript || transcript.trim() === modelTranscript.trim()) return;
    const feedback = {
      audioFile: audio.name,
      model: MODEL_REPOS[speechModel],
      modelTranscript,
      correctedTranscript: transcript.trim(),
      reviewedAt: new Date().toISOString(),
    };
    const href = URL.createObjectURL(new Blob([JSON.stringify(feedback, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = href;
    link.download = `${audio.name.replace(/\.[^.]+$/, '')}-kashmiri-correction.json`;
    link.click();
    URL.revokeObjectURL(href);
  };

  return <section className="speech-lab" aria-labelledby="speech-lab-title">
    <div className="speech-hero">
      <div><p className="eyebrow">Kashmiri speech recognition</p><h1 id="speech-lab-title">Large V3 Turbo speech lab</h1><p className="speech-intro">Compare the stable v2 adapter with the experimental v4 real-speech candidate. Your audio is sent only to the configured inference service.</p></div>
      <div className={`service-pill ${service}`} role="status"><span aria-hidden="true"/><div><strong>{service === 'ready' ? 'Model online' : service === 'checking' ? 'Checking model' : 'Model offline'}</strong><small>{serviceMessage}</small></div></div>
    </div>
    <div className="speech-grid">
      <article className="speech-card capture-card">
        <span className="step-number">01</span><h2>Provide a voice sample</h2><p>Speak naturally in Kashmiri. Clear recordings between 3 and 30 seconds work best.</p>
        <fieldset className="speech-model-picker">
          <legend>Model to test</legend>
          <label><input type="radio" name="speech-model" value="v2" checked={speechModel === 'v2'} onChange={() => { setSpeechModel('v2'); setTranscript(''); setModelTranscript(''); }}/><span><strong>v2 fallback</strong><small>Previous production model</small></span></label>
          <label className={!v4Available ? 'is-disabled' : ''}><input type="radio" name="speech-model" value="v4" checked={speechModel === 'v4'} disabled={!v4Available} onChange={() => { setSpeechModel('v4'); setTranscript(''); setModelTranscript(''); }}/><span><strong>v4 recommended</strong><small>{v4Available ? 'Best controlled WER and CER' : 'Model service starting'}</small></span></label>
        </fieldset>
        <div className={`record-orbit ${recording ? 'is-recording' : ''}`}><button className="record-button" type="button" onClick={recording ? stopRecording : startRecording} aria-label={recording ? 'Stop recording' : 'Start recording'}><span>{recording ? '■' : '●'}</span></button><strong>{recording ? clock(seconds) : 'Record'}</strong></div>
        <div className="audio-divider"><span>or upload audio</span></div>
        <label className="upload-audio"><input type="file" accept="audio/*,.wav,.mp3,.m4a,.webm,.ogg,.flac" onChange={event => { const file = event.target.files?.[0]; if (file) useAudio(file); }}/><span>Choose an audio file</span><small>WAV, MP3, M4A, WebM, OGG or FLAC · maximum 3 MB</small></label>
        {audio && <div className="selected-audio"><div><strong>{audio.name}</strong><small>{(audio.size / 1048576).toFixed(2)} MB</small></div><audio controls src={audioUrl}/></div>}
      </article>
      <article className="speech-card transcript-card">
        <span className="step-number">02</span><h2>Read the transcription</h2><p>The output is a model prediction. Check spelling and meaning before treating it as reviewed Kashmiri.</p>
        <label className="transcript-label" htmlFor="kashmiri-transcript">Model output · edit any incorrect words</label>
        <textarea
          id="kashmiri-transcript"
          className={`transcript-paper ${transcript ? 'has-text' : ''}`}
          lang="ks-Arab"
          dir="rtl"
          value={transcript}
          onChange={event => setTranscript(event.target.value)}
          placeholder="تُہُنٛد کٲشُر متن یِیہِ یَتھ پؠٹھ…"
          spellCheck={false}
        />
        {error && <div className="speech-error" role="alert">{error}</div>}
        <button className="transcribe-button" type="button" onClick={transcribe} disabled={!audio || transcribing || service !== 'ready'}>{transcribing ? `Transcribing with ${speechModel}…` : `Transcribe with ${speechModel}`}</button>
        {transcript && <button className="copy-transcript" type="button" onClick={() => navigator.clipboard.writeText(transcript)}>Copy transcription</button>}
        {modelTranscript && transcript.trim() !== modelTranscript.trim() && (
          <button className="copy-transcript" type="button" onClick={downloadCorrection}>Download correction for retraining</button>
        )}
        <div className="english-translation-block">
          <div className="english-translation-heading">
            <span>English translation</span>
            <small>Automatic translation · review important meaning</small>
          </div>
          <div className={`english-translation ${englishTranslation ? 'has-text' : ''}`} lang="en" dir="ltr">
            {translating ? 'Translating to English…' : englishTranslation || 'The English meaning will appear here after transcription.'}
          </div>
          <button
            className="translate-english-button"
            type="button"
            onClick={() => translateToEnglish()}
            disabled={!transcript.trim() || translating}
          >
            {translating ? 'Translating…' : 'Translate corrected Kashmiri to English'}
          </button>
        </div>
      </article>
    </div>
    <details className="endpoint-settings"><summary>Advanced service settings</summary><div><label htmlFor="asr-endpoint">Proxy URL</label><input id="asr-endpoint" value={endpoint} onChange={event => setEndpoint(event.target.value)} placeholder="Leave blank to use Cipher"/><button type="button" onClick={() => { localStorage.setItem('koshur-asr-endpoint', endpoint.trim()); void checkService(); }}>Save and test</button></div><p>Leave blank to use the secure Cipher proxy. Existing custom settings can be cleared here.</p></details>
  </section>;
};
