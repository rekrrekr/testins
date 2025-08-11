"use client";
import { useEffect, useRef, useState } from 'react';
import { chatStream } from '@/app/api/chatStream';

type Message = { id: string; role: 'user' | 'bot'; content: string };

export default function ChatPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  async function send(prompt: string) {
    setIsStreaming(true);
    const idBase = Math.random().toString(36).slice(2);
    const userMsg: Message = { id: `${idBase}-u`, role: 'user', content: prompt };
    setMessages((m) => [...m, userMsg]);

    const botId = `${idBase}-b`;
    setMessages((m) => [...m, { id: botId, role: 'bot', content: '' }]);

    for await (const ev of chatStream(id, prompt)) {
      if (ev.type === 'token') {
        setMessages((m) => m.map((msg) => (msg.id === botId ? { ...msg, content: msg.content + ev.content } : msg)));
      }
    }

    setIsStreaming(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div ref={listRef} className="space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
          >
            <div
              className={
                'max-w-[80%] rounded-[var(--radius-md)] px-3 py-2 text-sm ' +
                (m.role === 'user' ? 'bg-electric-teal/20 text-electric-teal' : 'bg-white/10 text-white/90')
              }
            >
              {m.content || (m.role === 'bot' ? '...' : '')}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim() || isStreaming) return;
          send(input.trim());
          setInput('');
        }}
        className="sticky bottom-2 mt-6 flex gap-2 rounded-[var(--radius-lg)] border border-white/10 bg-gunmetal/70 p-2 backdrop-blur supports-[backdrop-filter]:bg-gunmetal/50"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Chat with persona ${id}`}
          className="flex-1 rounded-[var(--radius-md)] bg-transparent px-3 py-2 text-sm outline-none"
        />
        <button
          disabled={!input.trim() || isStreaming}
          className="bloom-hover rounded-[var(--radius-lg)] bg-electric-teal/20 px-4 py-2 text-electric-teal disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}