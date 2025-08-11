import { NextRequest } from 'next/server'
import { prisma } from '@/server/services/prisma'
import { z } from 'zod'

const schema = z.object({ personaSlug: z.string(), title: z.string().default('New chat') })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return new Response('Invalid payload', { status: 400 })
  const persona = await prisma.persona.findUnique({ where: { slug: parsed.data.personaSlug } })
  if (!persona) return new Response('Persona not found', { status: 404 })

  const user = await prisma.user.findFirst()
  if (!user) return new Response('User missing', { status: 400 })

  const chat = await prisma.chat.create({ data: { personaId: persona.id, userId: user.id, title: parsed.data.title } })
  return Response.json(chat)
}