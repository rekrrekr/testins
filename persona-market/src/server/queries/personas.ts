import { prisma } from '@/server/services/prisma'

const samplePersonas = [
  {
    id: 'sample-1',
    ownerId: 'sample-owner',
    slug: 'voyager-strategist',
    name: 'Voyager Strategist',
    tagline: 'Crisp insights. Calm execution.',
    description: 'A pragmatic product strategist who balances rigor with velocity.',
    tags: ['product', 'strategy', 'startup'],
    avatarUrl: null as string | null,
    stats: { favorites: 0, chats: 0 },
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'sample-2',
    ownerId: 'sample-owner',
    slug: 'pixel-sage',
    name: 'Pixel Sage',
    tagline: 'Visual polish with performance in mind.',
    description: 'Design advisor focusing on clarity, motion, and performance.',
    tags: ['design', 'motion', 'frontend'],
    avatarUrl: null as string | null,
    stats: { favorites: 0, chats: 0 },
    isPublic: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function getPersonas({ take = 20, search }: { take?: number; search?: string }) {
  try {
    const where = search
      ? { isPublic: true, OR: [{ name: { contains: search, mode: 'insensitive' } }, { tags: { has: search } }] }
      : { isPublic: true }
    return await prisma.persona.findMany({ where, take, orderBy: { createdAt: 'desc' } })
  } catch {
    const filtered = search
      ? samplePersonas.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.includes(search)
        )
      : samplePersonas
    return filtered.slice(0, take)
  }
}

export async function getPersonaBySlug(slug: string) {
  try {
    return await prisma.persona.findUnique({ where: { slug } })
  } catch {
    return samplePersonas.find((p) => p.slug === slug) ?? null
  }
}