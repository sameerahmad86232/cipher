const MAX_AUDIO_BASE64_LENGTH = 5_600_000;
const LANGUAGES = new Set(['ks', 'en', 'ur', 'hi']);

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  const engineUrl = String(process.env.VOICE_CLONE_API_URL || '').replace(/\/$/, '');

  if (request.method === 'GET') {
    if (!engineUrl) return response.status(200).json({ ready: false, message: 'GPU voice engine is not connected yet' });
    try {
      const health = await fetch(`${engineUrl}/health`, { signal: AbortSignal.timeout(12000) });
      if (!health.ok) throw new Error(`Health check returned ${health.status}`);
      return response.status(200).json({ ready: true, message: 'Private multilingual voice engine is ready' });
    } catch {
      return response.status(200).json({ ready: false, message: 'GPU voice engine is starting or unavailable' });
    }
  }

  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  if (!engineUrl) return response.status(503).json({ error: 'The GPU voice-cloning engine is not connected yet.' });

  const { referenceAudioBase64, mimeType, fileName, language, text, consent } = request.body || {};
  if (!consent?.ownershipConfirmed || !consent?.syntheticSpeechConfirmed || String(consent?.phrase || '').trim().toUpperCase() !== 'I CONSENT') {
    return response.status(400).json({ error: 'Voice ownership and synthetic-speech consent are required.' });
  }
  if (!LANGUAGES.has(language)) return response.status(400).json({ error: 'Unsupported language.' });
  if (!String(text || '').trim() || String(text).length > 500) return response.status(400).json({ error: 'Text must contain 1–500 characters.' });
  if (!String(referenceAudioBase64 || '') || String(referenceAudioBase64).length > MAX_AUDIO_BASE64_LENGTH) {
    return response.status(400).json({ error: 'Voice sample is missing or too large.' });
  }
  if (!String(mimeType || '').startsWith('audio/')) return response.status(400).json({ error: 'Reference file must be audio.' });

  try {
    const upstream = await fetch(`${engineUrl}/v1/voice-clone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.VOICE_CLONE_API_KEY ? { Authorization: `Bearer ${process.env.VOICE_CLONE_API_KEY}` } : {}),
      },
      body: JSON.stringify({ referenceAudioBase64, mimeType, fileName, language, text, disclosure: true }),
      signal: AbortSignal.timeout(180000),
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) throw new Error(data.error || `Voice engine returned ${upstream.status}`);
    return response.status(200).json({ audioBase64: data.audioBase64, audioUrl: data.audioUrl, mimeType: data.mimeType || 'audio/wav' });
  } catch (reason) {
    return response.status(502).json({ error: reason instanceof Error ? reason.message : 'Voice engine request failed' });
  }
}
