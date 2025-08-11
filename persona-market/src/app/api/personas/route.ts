import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/server/services/prisma'
import { Prisma } from '@prisma/client'

const createSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  tagline: z.string().min(2),
  description: z.string().min(4),
  tags: z.array(z.string()).default([]),
  avatarUrl: z.string().url().optional(),
  isPublic: z.boolean().default(true),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')
  const take = Number(searchParams.get('take') ?? '20')
  let where: Prisma.PersonaWhereInput = { isPublic: true }
  if (q) {
    where = {
      isPublic: true,
      OR: [
        { name: { contains: q, mode: Prisma.QueryMode.insensitive } },
        { tags: { has: q } },
      ],
    }
  }
  const personas = await prisma.persona.findMany({ where, take, orderBy: { createdAt: 'desc' } })
  return Response.json({ personas })
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const parsed = createSchema.safeParse(data)
  if (!parsed.success) return new Response('Invalid payload', { status: 400 })

  // TODO: auth check with Supabase auth when wired
  const owner = await prisma.user.findFirst()
  if (!owner) return new Response('Owner missing', { status: 400 })

  const created = await prisma.persona.create({ data: { ...parsed.data, ownerId: owner.id } })
  return Response.json(created)
}