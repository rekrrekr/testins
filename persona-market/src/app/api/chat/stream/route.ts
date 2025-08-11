import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { lastUserMessage } = await req.json()
  const encoder = new TextEncoder()
  const text = `Thanks for your message: "${String(lastUserMessage).slice(0, 120)}". Here is a thoughtful, helpful response with smooth streaming.`

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const tokens = text.split(' ')
      for (const t of tokens) {
        controller.enqueue(encoder.encode(t + ' '))
        await new Promise((r) => setTimeout(r, 50))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  })
}