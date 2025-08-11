import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { MotionContainer } from '@/components/motion/motion-container'
import { GlassHeader } from '@/components/shell/glass-header'

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_10%,rgba(90,120,255,0.25),transparent),conic-gradient(from_180deg_at_50%_0%,rgba(140,60,255,0.15),transparent)] opacity-60" />
      <GlassHeader />
      <main className="container relative z-10 pt-28 pb-24">
        <MotionContainer>
          <section className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Personas that feel alive.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Explore, favorite, and chat with curated AI personas. Smooth motion, zero bloat.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link className="bloom-hover rounded-[var(--radius-lg)] px-5 py-3 bg-primary text-primary-foreground inline-flex items-center gap-2" href="/explore">
                <Sparkles size={18} /> Explore Personas
              </Link>
              <Link className="bloom-hover rounded-[var(--radius-lg)] px-5 py-3 glass-surface inline-flex items-center gap-2" href="/create">
                Create Persona <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </MotionContainer>

        <section className="mt-24 grid md:grid-cols-3 gap-6">
          {['Premium motion', 'Curated marketplace', 'Lightweight streaming'].map((t) => (
            <div key={t} className="rounded-[var(--radius-lg)] glass-surface p-6 bloom-hover">
              <h3 className="font-medium text-lg">{t}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              </p>
            </div>
          ))}
        </section>
      </main>
      <footer className="container py-10 opacity-70 text-sm">
        <div className="flex items-center justify-between">
          <span>© {new Date().getFullYear()} Persona Market</span>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}