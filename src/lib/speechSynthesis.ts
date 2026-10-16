const TTS_SPACE = 'https://gaash-lab-matcha-tts-kashmiri-demo.hf.space';

export interface TTSResult {
  processedText: string;
  audioUrl: string;
  engine: 'bolbosh' | 'gemini';
  voice: string;
}

/**
 * Generate speech using Google Gemini 3.8 Studio TTS (Pristine 24kHz Broadcast Quality)
 */
export async function generateGeminiSpeech(
  text: string,
  voice: 'Kore' | 'Zephyr' | 'Puck' | 'Fenrir' | 'Charon' = 'Kore',
  style = 'Professional studio narrator, warm, clear, studio acoustics',
  signal?: AbortSignal
): Promise<TTSResult> {
  const response = await fetch('/api/gemini-tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice, style }),
    signal
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Studio voice request failed (${response.status})`);
  }

  const data = await response.json();
  return {
    processedText: text,
    audioUrl: data.audioUrl,
    engine: 'gemini',
    voice
  };
}

/**
 * Generate speech using GAASH Lab Bolbosh Matcha-TTS (Native Kashmiri Model)
 * Always requests 'High' quality ODE solver steps for cleanest audio synthesis.
 */
export async function generateKashmiriSpeech(
  text: string,
  voice: 'Female' | 'Male' = 'Female',
  quality: 'Low (fast)' | 'Medium' | 'High' = 'High',
  signal?: AbortSignal
): Promise<TTSResult> {
  const sessionHash =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;

  const joined = await fetch(`${TTS_SPACE}/gradio_api/queue/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({
      data: [text, false, voice, quality],
      fn_index: 0,
      session_hash: sessionHash
    })
  });

  if (!joined.ok) {
    throw new Error(`Speech server rejected the request (${joined.status}).`);
  }

  const { event_id: eventId } = await joined.json();
  const response = await fetch(
    `${TTS_SPACE}/gradio_api/queue/data?session_hash=${encodeURIComponent(sessionHash)}`,
    {
      signal,
      headers: { Accept: 'text/event-stream' }
    }
  );

  if (!response.ok || !response.body) {
    throw new Error(`Speech stream unavailable (${response.status}).`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    buffer += decoder.decode(chunk.value, { stream: true });
    const events = buffer.split('\n\n');
    buffer = events.pop() || '';
    for (const event of events) {
      const line = event.split('\n').find(item => item.startsWith('data: '));
      if (!line) continue;
      const message = JSON.parse(line.slice(6));
      if (message.event_id && message.event_id !== eventId) continue;
      if (message.msg === 'process_completed') {
        if (!message.success || message.output?.error) {
          throw new Error(message.output?.error || 'Speech generation failed.');
        }
        const [processedText, audioFile] = message.output.data || [];
        const audioUrl = typeof audioFile === 'string' ? audioFile : audioFile?.url;
        if (!audioUrl && !audioFile?.path) {
          throw new Error('The speech model returned no audio file.');
        }
        return {
          processedText,
          audioUrl: audioUrl
            ? new URL(audioUrl, TTS_SPACE).href
            : `${TTS_SPACE}/gradio_api/file=${encodeURIComponent(audioFile.path)}`,
          engine: 'bolbosh',
          voice
        };
      }
    }
  }

  throw new Error('The speech stream closed before returning audio.');
}
