import { getPersonaBySlug } from '@/server/queries/personas'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const persona = await getPersonaBySlug(params.slug)
  if (!persona) return {}
  return {
    title: `${persona.name} – Persona`,
    openGraph: {
      title: persona.name,
      description: persona.tagline,
      images: [persona.avatarUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${persona.slug}`],
    },
  }
}

export default async function PersonaPage({ params }: { params: { slug: string } }) {
  const persona = await getPersonaBySlug(params.slug)
  if (!persona) return notFound()
  return (
    <div className="container pt-28 pb-16">
      <div className="rounded-[var(--radius-lg)] glass-surface p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted">
            <Image src={persona.avatarUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${persona.slug}`} alt={persona.name} fill sizes="64px" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{persona.name}</h1>
            <p className="text-muted-foreground">{persona.tagline}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {persona.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-[var(--radius-sm)] bg-muted text-muted-foreground">{t}</span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Link href={`/chat/new?persona=${persona.slug}`} className="px-4 py-2 rounded-[var(--radius-sm)] bg-primary text-primary-foreground">Start Chat</Link>
          <button className="px-4 py-2 rounded-[var(--radius-sm)] glass-surface">Favorite</button>
          <button className="px-4 py-2 rounded-[var(--radius-sm)] glass-surface" onClick={async () => { await navigator.clipboard.writeText(window.location.href) }}>Share</button>
        </div>
      </div>

      <section className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-[var(--radius-lg)] glass-surface p-6">
          <h2 className="font-medium mb-3">About</h2>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{persona.description}</p>
        </div>
        <div className="rounded-[var(--radius-lg)] glass-surface p-6">
          <h2 className="font-medium mb-3">Similar personas</h2>
          <p className="text-sm text-muted-foreground">Coming soon.</p>
        </div>
      </section>
    </div>
  )
}