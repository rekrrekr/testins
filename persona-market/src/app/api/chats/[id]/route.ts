import { NextRequest } from 'next/server'
import { prisma } from '@/server/services/prisma'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const chat = await prisma.chat.findUnique({ where: { id: params.id }, include: { messages: true } })
  if (!chat) return new Response('Not found', { status: 404 })
  return Response.json(chat)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await prisma.message.deleteMany({ where: { chatId: params.id } })
  await prisma.chat.delete({ where: { id: params.id } })
  return new Response(null, { status: 204 })
}