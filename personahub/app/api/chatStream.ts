export type ChatStreamEvent =
  | { type: 'start'; personaId: string }
  | { type: 'token'; content: string }
  | { type: 'end' };

export async function* chatStream(personaId: string, _prompt: string) {
  // TODO: Swap to real model backend or vendor SDK.
  const res = await fetch(`/api/chat/${personaId}/stream`, { method: 'POST' });
  if (!res.ok || !res.body) throw new Error('Failed to start stream');
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buffer.indexOf('\n\n')) !== -1) {
      const raw = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 2);
      if (!raw.startsWith('data:')) continue;
      const payload = raw.slice(5).trim();
      const event = JSON.parse(payload) as ChatStreamEvent;
      yield event;
    }
  }
}