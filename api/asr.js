import { Client, handle_file } from '@gradio/client';

const SPACE = 'https://sameer0313-koshur-lughat.hf.space';
const MAX_BYTES = 3 * 1024 * 1024;
export const config = { maxDuration: 300 };

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method === 'GET') {
    try {
      const upstream = await fetch(`${SPACE}/gradio_api/info`, { signal: AbortSignal.timeout(15000) });
      const data = await upstream.json();
      const ready = Boolean(data?.named_endpoints?.['/transcribe_kashmiri']);
      return response.status(ready ? 200 : 503).json({ ready, model: 'Kashmiri Whisper Large V3 Turbo · CER 22.42%' });
    } catch (error) {
      return response.status(503).json({ ready: false, detail: error instanceof Error ? error.message : 'GPU service unavailable' });
    }
  }
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  try {
    const { audioBase64, mimeType = 'audio/webm', fileName = 'recording.webm' } = request.body || {};
    if (typeof audioBase64 !== 'string' || !audioBase64) return response.status(400).json({ error: 'Audio is required' });
    const bytes = Buffer.from(audioBase64, 'base64');
    if (!bytes.length) return response.status(400).json({ error: 'Audio is empty' });
    if (bytes.length > MAX_BYTES) return response.status(413).json({ error: 'Audio must be 3 MB or smaller' });
    const client = await Client.connect(SPACE);
    const result = await client.predict('/transcribe_kashmiri', { audio_path: handle_file(new Blob([bytes], { type: mimeType })) });
    return response.status(200).json({ text: String(result.data?.[0] || '').trim(), language: 'ks-Arab', fileName });
  } catch (error) {
    console.error('ASR proxy error', error);
    return response.status(502).json({ error: error instanceof Error ? error.message : 'Transcription service failed' });
  }
}
