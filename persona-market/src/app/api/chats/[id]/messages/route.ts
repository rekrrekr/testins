import { NextRequest } from 'next/server'
import { prisma } from '@/server/services/prisma'
import { z } from 'zod'

const schema = z.object({ content: z.string().min(1) })

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()
  const parsed = schema.safeParse(data)
  if (!parsed.success) return new Response('Invalid payload', { status: 400 })
  const msg = await prisma.message.create({ data: { chatId: params.id, role: 'user', content: parsed.data.content } })
  return Response.json(msg)
}