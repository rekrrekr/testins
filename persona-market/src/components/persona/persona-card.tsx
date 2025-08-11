"use client"
import Link from 'next/link'
import Image from 'next/image'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

type Persona = {
  slug: string
  name: string
  tagline: string
  tags: string[]
  avatarUrl: string | null
}

export function PersonaCard({ persona }: { persona: Persona }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Link href={`/p/${persona.slug}`} className={cn('block rounded-[var(--radius-lg)] glass-surface p-5 bloom-hover')}> 
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-muted">
              <Image
                src={persona.avatarUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${persona.slug}`}
                alt={persona.name}
                fill
                sizes="48px"
              />
            </div>
            <div>
              <h3 className="font-medium leading-tight">{persona.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{persona.tagline}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {persona.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-[var(--radius-sm)] bg-muted text-muted-foreground">{t}</span>
            ))}
          </div>
        </Link>
      </m.div>
    </LazyMotion>
  )
}