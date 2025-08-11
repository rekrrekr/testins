import { prisma } from '@/server/services/prisma'

export async function GET() {
  try {
    const user = await prisma.user.findFirst()
    return Response.json(user)
  } catch {
    return Response.json({ id: 'sample-owner', email: 'demo@persona.local', name: 'Demo User' })
  }
}