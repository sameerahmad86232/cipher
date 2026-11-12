const SPACE = 'https://sameer0313-koshur-lughat.hf.space';
export const config = { maxDuration: 300 };

async function translate(text) {
  const queued = await fetch(`${SPACE}/gradio_api/call/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [text, 'Kashmiri → English'] }),
    signal: AbortSignal.timeout(30000),
  });
  if (!queued.ok) throw new Error(`Translation request returned ${queued.status}`);
  const { event_id: eventId } = await queued.json();
  if (!eventId) throw new Error('The translation service did not queue the request');

  const result = await fetch(
    `${SPACE}/gradio_api/call/translate/${encodeURIComponent(eventId)}`,
    { signal: AbortSignal.timeout(285000) }
  );
  if (!result.ok) throw new Error(`Translation queue returned ${result.status}`);
  const stream = await result.text();
  const completed = [...stream.matchAll(/^event: complete\s*\ndata: (.+)$/gm)].at(-1);
  if (!completed) throw new Error('The translation model did not return a completed result');
  const payload = JSON.parse(completed[1]);
  return {
    english: String(payload?.[0] || '').trim(),
    normalizedKashmiri: String(payload?.[1] || '').trim(),
  };
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  try {
    const text = String(request.body?.text || '').trim();
    if (!text) return response.status(400).json({ error: 'Kashmiri text is required' });
    if (text.length > 4000) return response.status(413).json({ error: 'Text is too long' });
    return response.status(200).json(await translate(text));
  } catch (error) {
    console.error('Speech translation proxy error', error);
    return response.status(502).json({
      error: error instanceof Error ? error.message : 'Translation failed',
    });
  }
}
