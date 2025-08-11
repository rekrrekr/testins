import { NextRequest } from 'next/server'
import { prisma } from '@/server/services/prisma'
import { z } from 'zod'

const schema = z.object({ personaId: z.string() })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return new Response('Invalid payload', { status: 400 })
  const user = await prisma.user.findFirst()
  if (!user) return new Response('User missing', { status: 400 })
  const fav = await prisma.favorite.upsert({
    where: { userId_personaId: { userId: user.id, personaId: parsed.data.personaId } },
    update: {},
    create: { userId: user.id, personaId: parsed.data.personaId },
  })
  return Response.json(fav)
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return new Response('Invalid payload', { status: 400 })
  const user = await prisma.user.findFirst()
  if (!user) return new Response('User missing', { status: 400 })
  await prisma.favorite.delete({ where: { userId_personaId: { userId: user.id, personaId: parsed.data.personaId } } })
  return new Response(null, { status: 204 })
}