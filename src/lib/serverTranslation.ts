const TRANSLATOR_SPACE = 'https://sameer0313-koshur-lughat.hf.space';
const OFFLINE_MODEL = 'Xenova/nllb-200-distilled-600M';

let offlineTranslatorPromise: Promise<any> | null = null;
let offlineModelReady = false;

export function isOfflineModelReady() {
  return offlineModelReady;
}

export async function loadOfflineTranslator(onProgress?: (message: string) => void) {
  if (offlineTranslatorPromise) return offlineTranslatorPromise;
  if (onProgress) onProgress('Loading offline model…');

  const dynamicImport = new Function('url', 'return import(url)');
  offlineTranslatorPromise = (
    dynamicImport('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2') as Promise<any>
  ).then(async ({ pipeline, env }: any) => {
    env.useBrowserCache = true;
    env.allowRemoteModels = true;
    const translator = await pipeline('translation', OFFLINE_MODEL, {
      dtype: 'q4',
      progress_callback: (event: any) => {
        if (event?.status === 'progress' && Number.isFinite(event.progress)) {
          if (onProgress) onProgress(`Downloading offline model… ${Math.round(event.progress)}%`);
        } else if (event?.status === 'initiate') {
          if (onProgress) onProgress('Preparing offline model…');
        }
      }
    });
    offlineModelReady = true;
    if (onProgress) onProgress('Offline model ready on this device');
    return translator;
  }).catch(error => {
    offlineTranslatorPromise = null;
    offlineModelReady = false;
    if (onProgress) onProgress('Offline model could not be loaded');
    throw error;
  });

  return offlineTranslatorPromise;
}

export async function offlineTranslate(
  text: string,
  direction: 'ks-en' | 'en-ks',
  onProgress?: (message: string) => void
): Promise<string> {
  const translator = await loadOfflineTranslator(onProgress);
  const source = direction === 'ks-en' ? 'kas_Arab' : 'eng_Latn';
  const target = direction === 'ks-en' ? 'eng_Latn' : 'kas_Arab';
  const result = await translator(text, { src_lang: source, tgt_lang: target });
  return result?.[0]?.translation_text || '';
}

export async function serverTranslate(
  text: string,
  direction: 'ks-en' | 'en-ks',
  signal?: AbortSignal,
  onStatusChange?: (msg: string) => void
): Promise<[string, string, string, string, string]> {
  const sessionHash =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;
  const serverDirection = direction === 'ks-en' ? 'Kashmiri → English' : 'English → Kashmiri';

  const joined = await fetch(`${TRANSLATOR_SPACE}/gradio_api/queue/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({
      data: [text, serverDirection],
      fn_index: 0,
      session_hash: sessionHash
    })
  });

  if (!joined.ok) {
    throw new Error(`Server queue rejected the request (${joined.status}).`);
  }

  const { event_id: eventId } = await joined.json();
  const response = await fetch(
    `${TRANSLATOR_SPACE}/gradio_api/queue/data?session_hash=${encodeURIComponent(sessionHash)}`,
    {
      signal,
      headers: { Accept: 'text/event-stream' }
    }
  );

  if (!response.ok || !response.body) {
    throw new Error(`Server stream unavailable (${response.status}).`);
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
      if (message.msg === 'process_starts' && onStatusChange) {
        onStatusChange('Server model is translating…');
      }
      if (message.msg === 'process_completed') {
        if (!message.success || message.output?.error) {
          throw new Error(message.output?.error || 'The server could not complete this translation.');
        }
        return message.output.data;
      }
      if (message.msg === 'close_stream') break;
    }
  }

  throw new Error('The server closed the translation stream before returning a result.');
}
