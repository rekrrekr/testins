import { prisma } from '@/server/services/prisma'

export async function GET() {
  try {
    const purchases = await prisma.purchase.findMany({ orderBy: { createdAt: 'desc' } })
    return Response.json({ purchases })
  } catch {
    return Response.json({ purchases: [] })
  }
}