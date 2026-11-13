const SPACE = 'https://sameer0313-koshur-lughat.hf.space';
export const config = { maxDuration: 180 };

const cleanMessages = value => Array.isArray(value)
  ? value.slice(-8).flatMap(item => {
      const role = item?.role === 'assistant' ? 'assistant' : item?.role === 'user' ? 'user' : null;
      const content = typeof item?.content === 'string' ? item.content.trim().slice(0, 1200) : '';
      return role && content ? [{ role, content }] : [];
    })
  : [];

const historyPairs = messages => {
  const pairs = [];
  for (const message of messages) {
    if (message.role === 'user') pairs.push([message.content, '']);
    else if (pairs.length) pairs[pairs.length - 1][1] = message.content;
  }
  return pairs.filter(pair => pair[0] && pair[1]);
};

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method === 'GET') {
    try {
      const upstream = await fetch(`${SPACE}/gradio_api/info`, { signal: AbortSignal.timeout(15000) });
      const data = await upstream.json();
      const ready = Boolean(data?.named_endpoints?.['/koshur_chat_turn']);
      return response.status(ready ? 200 : 503).json({ ready, model: 'Qwen/Qwen2.5-1.5B-Instruct', voice: 'Bolbosh' });
    } catch (error) {
      return response.status(503).json({ ready: false, error: error instanceof Error ? error.message : 'Voice service unavailable' });
    }
  }
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  const messages = cleanMessages(request.body?.messages);
  const latest = messages.at(-1);
  if (!latest || latest.role !== 'user') return response.status(400).json({ error: 'A user message is required' });

  try {
    const queued = await fetch(`${SPACE}/gradio_api/call/koshur_chat_turn`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [latest.content, historyPairs(messages.slice(0, -1))] }),
      signal: AbortSignal.timeout(30000),
    });
    if (!queued.ok) throw new Error(`Voice service returned ${queued.status}`);
    const { event_id: eventId } = await queued.json();
    if (!eventId) throw new Error('Voice service did not queue the message');
    const event = await fetch(`${SPACE}/gradio_api/call/koshur_chat_turn/${encodeURIComponent(eventId)}`, {
      signal: AbortSignal.timeout(165000),
    });
    const stream = await event.text();
    const completed = [...stream.matchAll(/^event: complete\s*\ndata: (.+)$/gm)].at(-1);
    if (!completed) {
      const failed = [...stream.matchAll(/^event: error\s*\ndata: (.+)$/gm)].at(-1);
      throw new Error(failed?.[1] && failed[1] !== 'null' ? failed[1] : 'Qwen voice request did not complete');
    }
    const payload = JSON.parse(completed[1]);
    const updatedHistory = payload?.[0];
    const lastPair = Array.isArray(updatedHistory) ? updatedHistory.at(-1) : null;
    const reply = String(Array.isArray(lastPair) ? lastPair[1] : '').trim();
    if (!reply) throw new Error('Qwen returned no response');
    const audio = payload?.[1];
    const audioUrl = typeof audio === 'string' ? audio : audio?.url || (audio?.path ? `${SPACE}/gradio_api/file=${encodeURIComponent(audio.path)}` : '');
    return response.status(200).json({ reply, audioUrl, model: 'Qwen/Qwen2.5-1.5B-Instruct', voice: 'Bolbosh' });
  } catch (error) {
    console.error('Voice chat error', error);
    return response.status(502).json({ error: error instanceof Error ? error.message : 'Voice chat request failed' });
  }
}
