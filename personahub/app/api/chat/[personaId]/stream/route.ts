import { NextRequest } from 'next/server';

export async function POST(_req: NextRequest, { params }: { params: { personaId: string } }) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const chunks = [
        `data: ${JSON.stringify({ type: 'start', personaId: params.personaId })}\n\n`,
        `data: ${JSON.stringify({ type: 'token', content: 'Hello' })}\n\n`,
        `data: ${JSON.stringify({ type: 'token', content: ', this is a ' })}\n\n`,
        `data: ${JSON.stringify({ type: 'token', content: 'mock stream. ' })}\n\n`,
        `data: ${JSON.stringify({ type: 'end' })}\n\n`,
      ];
      for (const c of chunks) {
        controller.enqueue(encoder.encode(c));
        await new Promise((r) => setTimeout(r, 180));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}