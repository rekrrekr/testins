import { useEffect, useMemo, useRef, useState } from 'react'
import { MessageSquare, Moon, Sun, Plus, Send, Settings2, Search, Sparkles } from 'lucide-react'
import { clsx } from 'clsx'

// Data types
export type BotId = 'zen-coach' | 'study-buddy' | 'career-mentor' | 'fitness-pal' | 'travel-guide' | 'creative-writer'

export type Message = {
  id: string
  role: 'user' | 'assistant' | 'system'
  text: string
  createdAt: number
}

export type Bot = {
  id: BotId
  name: string
  tagline: string
  color: string
  gradient: string
  avatar: string
}

const BOTS: Bot[] = [
  {
    id: 'zen-coach',
    name: 'Zen Coach',
    tagline: 'Mindful guidance and calm clarity',
    color: 'from-teal-400 to-emerald-500',
    gradient: 'bg-gradient-to-br from-teal-400 to-emerald-600',
    avatar: '🧘‍♂️',
  },
  {
    id: 'study-buddy',
    name: 'Study Buddy',
    tagline: 'Explain, quiz, and help you learn',
    color: 'from-indigo-400 to-violet-500',
    gradient: 'bg-gradient-to-br from-indigo-400 to-violet-600',
    avatar: '📚',
  },
  {
    id: 'career-mentor',
    name: 'Career Mentor',
    tagline: 'Resume, interviews, and growth',
    color: 'from-amber-400 to-pink-500',
    gradient: 'bg-gradient-to-br from-amber-400 to-pink-600',
    avatar: '🧭',
  },
  {
    id: 'fitness-pal',
    name: 'Fitness Pal',
    tagline: 'Workouts, habits, and nutrition',
    color: 'from-rose-400 to-red-500',
    gradient: 'bg-gradient-to-br from-rose-400 to-red-600',
    avatar: '💪',
  },
  {
    id: 'travel-guide',
    name: 'Travel Guide',
    tagline: 'Trips, tips, and itineraries',
    color: 'from-sky-400 to-cyan-500',
    gradient: 'bg-gradient-to-br from-sky-400 to-cyan-600',
    avatar: '✈️',
  },
  {
    id: 'creative-writer',
    name: 'Creative Writer',
    tagline: 'Brainstorms, outlines, and prose',
    color: 'from-fuchsia-400 to-purple-500',
    gradient: 'bg-gradient-to-br from-fuchsia-400 to-purple-600',
    avatar: '📝',
  },
]

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore
    }
  }, [key, value])

  return [value, setValue] as const
}

function useDarkMode() {
  const [isDark, setIsDark] = useLocalStorage<boolean>('ydf:dark', true)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [isDark])

  return { isDark, toggle: () => setIsDark(!isDark) }
}

function EmptyState({ bot }: { bot: Bot }) {
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="text-center max-w-xl px-6">
        <div className={clsx('mx-auto mb-6 size-16 rounded-2xl grid place-items-center text-2xl text-white shadow-xl', bot.gradient)}>
          <span aria-hidden>{bot.avatar}</span>
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight">{bot.name}</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">{bot.tagline}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="btn-secondary">
            <Sparkles className="size-4" /> Suggested prompts
          </button>
          <button className="btn-secondary">
            <Settings2 className="size-4" /> Customize
          </button>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message, bot }: { message: Message; bot: Bot }) {
  const isUser = message.role === 'user'
  return (
    <div className={clsx('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className={clsx('size-9 rounded-xl grid place-items-center text-white', bot.gradient)}>{bot.avatar}</div>
      )}
      <div
        className={clsx(
          'max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm',
          isUser
            ? 'bg-brand-600 text-white rounded-br-md'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-md'
        )}
      >
        {message.text}
      </div>
      {isUser && (
        <div className="size-9 rounded-xl grid place-items-center bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">🙂</div>
      )}
    </div>
  )
}

function ChatWindow({ bot, messages }: { bot: Bot; messages: Message[] }) {
  const endRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages])

  if (messages.length === 0) return <EmptyState bot={bot} />

  return (
    <div className="h-full overflow-y-auto px-4">
      <div className="mx-auto max-w-3xl space-y-4 py-6">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} bot={bot} />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  )
}

function Sidebar({ bots, current, onSelect, onNew }: {
  bots: Bot[]
  current: BotId
  onSelect: (id: BotId) => void
  onNew: () => void
}) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(
    () => bots.filter((b) => b.name.toLowerCase().includes(query.toLowerCase())),
    [bots, query]
  )

  return (
    <aside className="h-full w-80 flex flex-col border-r border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white to-slate-50/60 dark:from-slate-950 dark:to-slate-900/60">
      <div className="p-4 flex items-center gap-3">
        <div className="size-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white shadow-glow">🤖</div>
        <div>
          <div className="font-display font-bold leading-tight">Your Digital Friend</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Multiple helpful chatbots</div>
        </div>
      </div>
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search friends..."
            className="input pl-9"
          />
        </div>
      </div>
      <div className="px-2 overflow-y-auto">
        {filtered.map((bot) => (
          <button
            key={bot.id}
            onClick={() => onSelect(bot.id)}
            className={clsx(
              'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-slate-100 dark:hover:bg-slate-800',
              current === bot.id && 'bg-slate-100 dark:bg-slate-800'
            )}
          >
            <div className={clsx('size-9 rounded-xl grid place-items-center text-white', bot.gradient)}>{bot.avatar}</div>
            <div className="min-w-0">
              <div className="font-medium truncate">{bot.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{bot.tagline}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-auto p-4">
        <button onClick={onNew} className="btn-primary w-full">
          <Plus className="size-4" /> New chat
        </button>
      </div>
    </aside>
  )
}

function Composer({ onSend, disabled }: { onSend: (text: string) => void; disabled?: boolean }) {
  const [text, setText] = useState('')
  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }
  return (
    <div className="border-t border-slate-200 dark:border-slate-800 p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:glass">
      <div className="mx-auto max-w-3xl flex items-end gap-2">
        <textarea
          className="input min-h-[52px] max-h-40 resize-y flex-1"
          rows={2}
          placeholder="Send a friendly message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <button className="btn-primary h-[52px] px-5" onClick={handleSend} disabled={disabled || text.trim().length === 0}>
          <Send className="size-4" />
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const { isDark, toggle } = useDarkMode()
  const [currentId, setCurrentId] = useLocalStorage<BotId>('ydf:current-bot', 'study-buddy')
  const currentBot = useMemo(() => BOTS.find((b) => b.id === currentId) ?? BOTS[0], [currentId])

  const [messagesByBot, setMessagesByBot] = useLocalStorage<Record<BotId, Message[]>>('ydf:messages', {
    'zen-coach': [],
    'study-buddy': [],
    'career-mentor': [],
    'fitness-pal': [],
    'travel-guide': [],
    'creative-writer': [],
  })

  const messages = messagesByBot[currentBot.id]

  const sendMessage = (text: string) => {
    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', text, createdAt: Date.now() }

    // playful assistant echo stub
    const replyPrefix: Record<BotId, string> = {
      'zen-coach': 'Breathing in calm. ',
      'study-buddy': "Let's break it down. ",
      'career-mentor': 'Strategically speaking, ',
      'fitness-pal': "Let's stay consistent! ",
      'travel-guide': 'Picture this trip: ',
      'creative-writer': 'Here is a spark: ',
    }

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: replyPrefix[currentBot.id] + text,
      createdAt: Date.now() + 100,
    }

    setMessagesByBot({
      ...messagesByBot,
      [currentBot.id]: [...messages, userMessage, assistantMessage],
    })
  }

  const clearChat = () => {
    setMessagesByBot({
      ...messagesByBot,
      [currentBot.id]: [],
    })
  }

  return (
    <div className="h-full flex">
      <Sidebar bots={BOTS} current={currentBot.id} onSelect={setCurrentId} onNew={clearChat} />
      <main className="flex-1 grid grid-rows-[auto,1fr,auto]">
        <header className="sticky top-0 z-10 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:glass">
          <div className="mx-auto max-w-4xl px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className={clsx('size-10 rounded-xl grid place-items-center text-white shadow-glow', currentBot.gradient)}>{currentBot.avatar}</div>
              <div className="min-w-0">
                <div className="font-display font-semibold truncate leading-tight">{currentBot.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentBot.tagline}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-secondary" onClick={clearChat}><MessageSquare className="size-4" /> New</button>
              <button className="btn-secondary" onClick={toggle} aria-label="Toggle theme">
                {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
            </div>
          </div>
        </header>

        <ChatWindow bot={currentBot} messages={messages} />

        <Composer onSend={sendMessage} />
      </main>
    </div>
  )
}
