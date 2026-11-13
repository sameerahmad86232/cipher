import React, { useEffect, useRef, useState } from 'react';
import { generateKashmiriSpeech } from '../lib/speechSynthesis';

type Message = { role: 'user' | 'assistant'; content: string };
type Stage = 'idle' | 'recording' | 'transcribing' | 'thinking' | 'speaking';
type SpeechModel = 'v2' | 'v4';

const speechText = (reply: string) => {
  const lines = reply.split('\n').map(line => line.trim()).filter(Boolean);
  const kashmiri = lines.filter(line => /[\u0600-\u06ff]/.test(line)).join(' ');
  return (kashmiri || lines[0] || '').slice(0, 800);
};

export const VoiceChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechModel, setSpeechModel] = useState<SpeechModel>('v2');
  const [v4Available, setV4Available] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<number | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);
  useEffect(() => {
    fetch('/api/asr').then(response => response.json()).then(data => setV4Available(Boolean(data.models?.v4))).catch(() => setV4Available(false));
  }, []);

  const askQwen = async (text: string) => {
    const userMessage: Message = { role: 'user', content: text.trim() };
    if (!userMessage.content) return;
    const context = [...messages, userMessage];
    setMessages(context); setDraft(''); setStage('thinking'); setError('');
    try {
      const response = await fetch('/api/voice-chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: context }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Qwen could not answer');
      const reply = String(data.reply || '').trim();
      setMessages([...context, { role: 'assistant', content: reply }]);
      if (autoSpeak && speechText(reply)) {
        setStage('speaking');
        const nextAudioUrl = String(data.audioUrl || '') || (await generateKashmiriSpeech(speechText(reply), 'Female', 'Low (fast)')).audioUrl;
        setAudioUrl(nextAudioUrl);
        window.setTimeout(() => audio.current?.play().catch(() => undefined), 50);
      }
      setStage('idle');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Voice chat failed');
      setStage('idle');
    }
  };

  const transcribe = async (file: File) => {
    setStage('transcribing'); setError('');
    try {
      if (file.size > 3 * 1024 * 1024) throw new Error('Recording must be 3 MB or smaller');
      const bytes = new Uint8Array(await file.arrayBuffer());
      let binary = '';
      for (let offset = 0; offset < bytes.length; offset += 0x8000) binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
      const response = await fetch('/api/asr', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64: btoa(binary), mimeType: file.type, fileName: file.name, model: speechModel, fast: speechModel === 'v2' }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Whisper transcription failed');
      const text = String(data.text || '').trim();
      if (!text) throw new Error('Whisper heard no speech. Try again closer to the microphone.');
      await askQwen(text);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Transcription failed'); setStage('idle');
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
        stream.getTracks().forEach(track => track.stop());
        void transcribe(new File([blob], `voice-chat-${Date.now()}.webm`, { type: blob.type }));
      };
      instance.start(250); setSeconds(0); setStage('recording');
      timer.current = window.setInterval(() => setSeconds(value => value + 1), 1000);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Microphone unavailable'); }
  };

  const stopRecording = () => {
    recorder.current?.stop();
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const stageLabel: Record<Stage, string> = {
    idle: 'Tap and speak', recording: `Listening · ${seconds}s`, transcribing: 'Whisper is transcribing…',
    thinking: 'Qwen is thinking…', speaking: 'Bolbosh is creating speech…',
  };

  return <section className="voice-chat" aria-labelledby="voice-chat-title">
    <header className="voice-chat-hero">
      <p className="eyebrow">Experimental live conversation</p>
      <h1 id="voice-chat-title">Koshur Live Voice</h1>
      <p>Speak in Kashmiri. The real fine-tuned Whisper adapter converts your voice to text, Qwen prepares the meaning, and the Kashmiri translation model produces the response Bolbosh reads aloud.</p>
      <div className="voice-pipeline" aria-label="Voice processing pipeline"><span>Whisper</span><b>→</b><span>Qwen 2.5</span><b>→</b><span>Bolbosh</span></div>
    </header>
    <div className="voice-chat-shell">
      <div className="voice-messages" aria-live="polite">
        {!messages.length && <div className="voice-empty"><strong>Start a Kashmiri conversation</strong><p>Ask a short question by voice or type it below. AI wording and pronunciation may contain mistakes.</p></div>}
        {messages.map((message, index) => <article key={`${message.role}-${index}`} className={`voice-message ${message.role}`}>
          <small>{message.role === 'user' ? 'You' : 'KoshurGPT · Qwen'}</small><p dir={/[\u0600-\u06ff]/.test(message.content) ? 'rtl' : 'ltr'}>{message.content}</p>
        </article>)}
      </div>
      <div className="voice-console">
        <fieldset className="voice-model-select">
          <legend>Fine-tuned Whisper adapter</legend>
          <label><input type="radio" name="voice-whisper" checked={speechModel === 'v2'} onChange={() => setSpeechModel('v2')}/><span><strong>v2 fast + stable</strong><small>Greedy live decoding · fine-tuned adapter</small></span></label>
          <label className={!v4Available ? 'is-disabled' : ''}><input type="radio" name="voice-whisper" checked={speechModel === 'v4'} disabled={!v4Available} onChange={() => setSpeechModel('v4')}/><span><strong>v4 candidate</strong><small>Real-speech refinement</small></span></label>
        </fieldset>
        <button className={`voice-orb ${stage === 'recording' ? 'recording' : ''}`} type="button" onClick={stage === 'recording' ? stopRecording : startRecording} disabled={!['idle', 'recording'].includes(stage)} aria-label={stage === 'recording' ? 'Stop and send recording' : 'Start recording'}><span>{stage === 'recording' ? '■' : '●'}</span></button>
        <strong>{stageLabel[stage]}</strong>
        <label className="voice-autoplay"><input type="checkbox" checked={autoSpeak} onChange={event => setAutoSpeak(event.target.checked)}/> Speak replies automatically</label>
        <form onSubmit={event => { event.preventDefault(); void askQwen(draft); }}>
          <input value={draft} onChange={event => setDraft(event.target.value)} placeholder="Or type a Kashmiri or English message…" maxLength={1200}/>
          <button type="submit" disabled={!draft.trim() || stage !== 'idle'}>Send</button>
        </form>
        {error && <div className="speech-error" role="alert">{error}</div>}
        {audioUrl && <audio ref={audio} controls autoPlay src={audioUrl}/>} 
      </div>
    </div>
    <p className="voice-disclaimer">Experimental AI output—not a human expert or verified religious authority. Do not use it for emergencies or consequential decisions.</p>
  </section>;
};
