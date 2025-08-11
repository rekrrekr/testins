import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const wallet = await prisma.wallet.upsert({
    where: { userId: session.user.id },
    update: {},
    create: { userId: session.user.id, balance: 0 },
  });
  return NextResponse.json({ balance: wallet.balance });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const amount = Number(body?.amount || 0);
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }
  const wallet = await prisma.wallet.upsert({
    where: { userId: session.user.id },
    update: { balance: { increment: amount } },
    create: { userId: session.user.id, balance: amount },
  });
  return NextResponse.json({ balance: wallet.balance });
}