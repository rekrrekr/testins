import Link from 'next/link'
import { getPersonas } from '@/server/queries/personas'
import { PersonaCard } from '@/components/persona/persona-card'

export const dynamic = 'force-dynamic'

export default async function ExplorePage() {
  const personas = await getPersonas({ take: 12 })
  return (
    <div className="container pt-28 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Explore personas</h1>
        <Link href="/create" className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-primary text-primary-foreground">Create</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((p) => (
          <PersonaCard key={p.slug} persona={p} />
        ))}
      </div>
    </div>
  )
}