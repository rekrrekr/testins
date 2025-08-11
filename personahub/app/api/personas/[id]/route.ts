import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const persona = await prisma.persona.findUnique({ where: { id: params.id } });
  if (!persona) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(persona);
}