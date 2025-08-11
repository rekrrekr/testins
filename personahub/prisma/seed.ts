import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@personahub.local' },
    update: {},
    create: {
      email: 'demo@personahub.local',
      name: 'Demo User',
      image: 'https://avatars.githubusercontent.com/u/000?v=4',
      wallet: { create: { balance: 1500 } },
    },
  });

  const personas = [
    {
      name: 'Astra Mentor',
      bio: 'A friendly mentor who provides concise guidance and resources for learning.',
      tags: ['mentor', 'learning', 'concise'],
    },
    {
      name: 'Pixel Poet',
      bio: 'Playful and creative, turns your prompts into short poems and micro-stories.',
      tags: ['creative', 'poetry', 'fun'],
    },
    {
      name: 'FitBuddy',
      bio: 'Casual fitness coach for quick tips, warmups, and habit nudges.',
      tags: ['fitness', 'casual', 'coach'],
    },
  ];

  for (const p of personas) {
    await prisma.persona.create({
      data: {
        ownerId: user.id,
        name: p.name,
        bio: p.bio,
        tagsCsv: p.tags.join(','),
        visibility: 'PUBLIC',
        heat: Math.floor(Math.random() * 500 + 50),
      },
    });
  }

  console.log('Seeded demo user and personas');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });