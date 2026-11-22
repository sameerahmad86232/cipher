import { normalizeKashmiriTts } from './_kashmiriSpeech.js';

const TTS_SPACE = 'https://gaash-lab-matcha-tts-kashmiri-demo.hf.space';
const VOICES = new Set(['Male', 'Female']);
const QUALITIES = new Set(['Low (fast)', 'Medium', 'High']);

export const config = { maxDuration: 180 };

const completedPayload = stream => {
  const match = [...stream.matchAll(/^event: complete\s*\ndata: (.+)$/gm)].at(-1);
  return match ? JSON.parse(match[1]) : null;
};

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method === 'GET') {
    try {
      const upstream = await fetch(`${TTS_SPACE}/gradio_api/info`, {
        signal: AbortSignal.timeout(12000),
      });
      const data = await upstream.json();
      const ready = upstream.ok && Boolean(data?.named_endpoints?.['/pipeline']);
      return response.status(ready ? 200 : 503).json({
        ready,
        model: 'GAASH-Lab/Matcha-TTS-Kashmiri',
        host: 'Hugging Face Spaces',
      });
    } catch (error) {
      return response.status(503).json({
        ready: false,
        error: error instanceof Error ? error.message : 'TTS service unavailable',
      });
    }
  }

  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  const originalText = String(request.body?.text || '').trim();
  const text = normalizeKashmiriTts(originalText);
  const voice = String(request.body?.voice || 'Male');
  const quality = String(request.body?.quality || 'Low (fast)');
  if (!text || text.length > 500) return response.status(400).json({ error: 'Enter 1–500 Kashmiri characters.' });
  if (!/[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u.test(text)) {
    return response.status(400).json({ error: 'Enter Kashmiri in Perso-Arabic script.' });
  }
  if (!VOICES.has(voice) || !QUALITIES.has(quality)) return response.status(400).json({ error: 'Unsupported voice setting.' });

  try {
    const queued = await fetch(`${TTS_SPACE}/gradio_api/call/pipeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [text, false, voice, quality] }),
      signal: AbortSignal.timeout(30000),
    });
    if (!queued.ok) throw new Error(`Hugging Face queue returned ${queued.status}`);
    const { event_id: eventId } = await queued.json();
    if (!eventId) throw new Error('Hugging Face did not return a queue ID');

    const result = await fetch(`${TTS_SPACE}/gradio_api/call/pipeline/${encodeURIComponent(eventId)}`, {
      signal: AbortSignal.timeout(150000),
    });
    const stream = await result.text();
    const payload = completedPayload(stream);
    if (!payload) {
      const failure = [...stream.matchAll(/^event: error\s*\ndata: (.+)$/gm)].at(-1)?.[1];
      throw new Error(failure && failure !== 'null' ? failure : 'Speech generation did not complete');
    }
    const [processedText, audio] = payload;
    const audioUrl = typeof audio === 'string' ? audio : audio?.url || (audio?.path
      ? `${TTS_SPACE}/gradio_api/file=${encodeURIComponent(audio.path)}`
      : '');
    if (!audioUrl) throw new Error('The TTS model returned no audio');
    return response.status(200).json({ processedText: processedText || text, normalizedInput: text, originalText, audioUrl, voice, quality, model: 'GAASH-Lab/Matcha-TTS-Kashmiri' });
  } catch (error) {
    console.error('TTS proxy error', error);
    return response.status(502).json({ error: error instanceof Error ? error.message : 'Speech generation failed' });
  }
}
