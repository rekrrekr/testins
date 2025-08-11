import { NextRequest } from 'next/server'
import { prisma } from '@/server/services/prisma'

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  const persona = await prisma.persona.findUnique({ where: { slug: params.slug } })
  if (!persona) return new Response('Not found', { status: 404 })
  return Response.json(persona)
}

export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  const data = await req.json()
  // TODO: check owner via Supabase auth
  const updated = await prisma.persona.update({ where: { slug: params.slug }, data })
  return Response.json(updated)
}