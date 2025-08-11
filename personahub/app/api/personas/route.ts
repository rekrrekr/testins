import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { personasQuerySchema, personaCreateSchema } from '@/lib/validators';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const parsed = personasQuerySchema.safeParse({
    q: searchParams.get('q') ?? undefined,
    page: searchParams.get('page') ?? undefined,
    limit: searchParams.get('limit') ?? undefined,
    sort: searchParams.get('sort') ?? undefined,
    flagged: searchParams.get('flagged') ?? undefined,
  });
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { q, page, limit, sort, flagged } = parsed.data;

  const where = {
    visibility: 'PUBLIC' as const,
    flagged: flagged ?? false,
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' as const } },
            { bio: { contains: q, mode: 'insensitive' as const } },
            { tagsCsv: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };

  const orderBy = sort === 'new' ? { createdAt: 'desc' as const } : { heat: 'desc' as const };
  const [total, items] = await Promise.all([
    prisma.persona.count({ where }),
    prisma.persona.findMany({ where, orderBy, skip: (page - 1) * limit, take: limit }),
  ]);

  return NextResponse.json({ total, items, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const json = await req.json();
  const parsed = personaCreateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const created = await prisma.persona.create({
    data: {
      ownerId: session.user.id,
      name: parsed.data.name,
      bio: parsed.data.bio,
      tagsCsv: parsed.data.tags.join(','),
      visibility: parsed.data.visibility,
      flagged: parsed.data.flagged ?? false,
    },
  });

  return NextResponse.json(created);
}