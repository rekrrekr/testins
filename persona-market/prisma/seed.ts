import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@persona.local' },
    update: {},
    create: { email: 'demo@persona.local', name: 'Demo User' },
  })

  const personas = [
    {
      slug: 'voyager-strategist',
      name: 'Voyager Strategist',
      tagline: 'Crisp insights. Calm execution.',
      description: 'A pragmatic product strategist who balances rigor with velocity.',
      tags: ['product', 'strategy', 'startup'],
      isPublic: true,
    },
    {
      slug: 'pixel-sage',
      name: 'Pixel Sage',
      tagline: 'Visual polish with performance in mind.',
      description: 'Design advisor focusing on clarity, motion, and performance.',
      tags: ['design', 'motion', 'frontend'],
      isPublic: true,
    },
    {
      slug: 'scribe-mentor',
      name: 'Scribe Mentor',
      tagline: 'Write less, say more.',
      description: 'Editorial guidance for crisp, high-signal writing.',
      tags: ['writing', 'editing'],
      isPublic: true,
    },
  ]

  for (const p of personas) {
    await prisma.persona.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, ownerId: user.id },
    })
  }

  console.log('Seed complete')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})