"use client"
import { useEffect, useRef, useState } from 'react'

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function send() {
    if (!input.trim()) return
    const userMessage = { role: 'user' as const, content: input.trim() }
    setMessages((m) => [...m, userMessage])
    setInput('')
    setStreaming(true)
    const res = await fetch('/api/chat/stream', { method: 'POST', body: JSON.stringify({ chatId: params.id, lastUserMessage: userMessage.content }) })
    const reader = res.body?.getReader()
    const decoder = new TextDecoder()
    let assistant = ''
    while (reader) {
      const { done, value } = await reader.read()
      if (done) break
      assistant += decoder.decode(value)
      setMessages((m) => {
        const base = m.filter((mm) => mm.role !== 'assistant')
        return [...base, { role: 'assistant', content: assistant }]
      })
    }
    setStreaming(false)
  }

  return (
    <div className="container pt-28 pb-24">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[var(--radius-lg)] glass-surface p-4 min-h-[50vh]">
          {messages.map((m, i) => (
            <div key={i} className={`my-2 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-3 py-2 rounded-[var(--radius-sm)] ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {streaming && <div className="text-xs text-muted-foreground mt-2">Assistant is typing…</div>}
          <div ref={endRef} />
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); void send() }}
          className="mt-4 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 px-3 py-2 rounded-[var(--radius-sm)] glass-surface"
          />
          <button className="px-4 py-2 rounded-[var(--radius-sm)] bg-primary text-primary-foreground" disabled={streaming}>Send</button>
        </form>
      </div>
    </div>
  )
}