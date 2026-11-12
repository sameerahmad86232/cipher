const SPACE = 'https://sameer0313-koshur-lughat.hf.space';
const MAX_BYTES = 3 * 1024 * 1024;
export const config = { maxDuration: 300 };

const timeoutSignal = (milliseconds) => AbortSignal.timeout(milliseconds);
const spaceHeaders = (extra = {}) => ({
  ...(process.env.HF_TOKEN ? { Authorization: `Bearer ${process.env.HF_TOKEN}` } : {}),
  ...extra,
});

async function readEventResult(eventId) {
  const upstream = await fetch(
    `${SPACE}/gradio_api/call/transcribe_kashmiri/${encodeURIComponent(eventId)}`,
    { headers: spaceHeaders(), signal: timeoutSignal(285000) }
  );
  if (!upstream.ok) throw new Error(`Inference queue returned ${upstream.status}`);
  const stream = await upstream.text();
  const completed = [...stream.matchAll(/^event: complete\s*\ndata: (.+)$/gm)].at(-1);
  if (!completed) {
    const failed = [...stream.matchAll(/^event: error\s*\ndata: (.+)$/gm)].at(-1);
    const upstreamError = failed?.[1] && failed[1] !== 'null' ? failed[1] : '';
    throw new Error(upstreamError || 'The Hugging Face GPU queue could not allocate a worker. Please retry.');
  }
  const payload = JSON.parse(completed[1]);
  return String(payload?.[0] || '').trim();
}

async function transcribe(bytes, mimeType, fileName) {
  const upload = new FormData();
  upload.append('files', new Blob([bytes], { type: mimeType }), fileName);
  const uploadResponse = await fetch(`${SPACE}/gradio_api/upload`, {
    method: 'POST',
    headers: spaceHeaders(),
    body: upload,
    signal: timeoutSignal(60000),
  });
  if (!uploadResponse.ok) throw new Error(`Audio upload returned ${uploadResponse.status}`);
  const uploaded = await uploadResponse.json();
  const path = uploaded?.[0];
  if (!path) throw new Error('The speech service did not accept the audio file');

  const queueResponse = await fetch(`${SPACE}/gradio_api/call/transcribe_kashmiri`, {
    method: 'POST',
    headers: spaceHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      data: [{
        path,
        orig_name: fileName,
        mime_type: mimeType,
        meta: { _type: 'gradio.FileData' },
      }],
    }),
    signal: timeoutSignal(30000),
  });
  if (!queueResponse.ok) throw new Error(`Inference request returned ${queueResponse.status}`);
  const queued = await queueResponse.json();
  if (!queued?.event_id) throw new Error('The speech service did not queue the request');
  return readEventResult(queued.event_id);
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method === 'GET') {
    try {
      const upstream = await fetch(`${SPACE}/gradio_api/info`, {
        headers: spaceHeaders(),
        signal: timeoutSignal(15000),
      });
      const data = await upstream.json();
      const ready = Boolean(data?.named_endpoints?.['/transcribe_kashmiri']);
      return response.status(ready ? 200 : 503).json({
        ready,
        model: 'Kashmiri Whisper Large V3 Turbo v2 · CER 22.34%',
      });
    } catch (error) {
      return response.status(503).json({
        ready: false,
        detail: error instanceof Error ? error.message : 'GPU service unavailable',
      });
    }
  }
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  try {
    const { audioBase64, mimeType = 'audio/webm', fileName = 'recording.webm' } = request.body || {};
    if (typeof audioBase64 !== 'string' || !audioBase64) return response.status(400).json({ error: 'Audio is required' });
    const bytes = Buffer.from(audioBase64, 'base64');
    if (!bytes.length) return response.status(400).json({ error: 'Audio is empty' });
    if (bytes.length > MAX_BYTES) return response.status(413).json({ error: 'Audio must be 3 MB or smaller' });

    const text = await transcribe(bytes, mimeType, fileName);
    return response.status(200).json({ text, language: 'ks-Arab', fileName });
  } catch (error) {
    console.error('ASR proxy error', error);
    return response.status(502).json({
      error: error instanceof Error ? error.message : 'Transcription service failed',
    });
  }
}
