# Persona Market – MVP

A sleek, high-performance persona marketplace + chat built with Next.js 14, Tailwind, Framer Motion, Prisma, React Query, RHF+Zod, Zustand, and Supabase.

## Quickstart

1) Install deps

```bash
npm install
```

2) Configure environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL` (Supabase Postgres connection string)
- `NEXT_PUBLIC_SITE_URL` (defaults to http://localhost:3000)

3) Setup database

```bash
npx prisma generate
npx prisma db push
npm run seed
```

4) Run the app

```bash
npm run dev
```

App: http://localhost:3000

## Scripts

- `dev` – Run Next dev server
- `build` – Build for production
- `start` – Start production server
- `lint` – ESLint
- `seed` – Seed demo data
- `test` – Playwright smoke tests

## Deploy (Vercel)

- Add env vars to Vercel Project Settings
- Set Build Command: `npm run build`
- Output: `.next`

## Notes

- API routes under `src/app/api/*` are Zod-validated and ready to swap in real Supabase auth.
- Streaming chat is a mock endpoint at `/api/chat/stream` to simulate token flow.
- Motion budget kept minimal via LazyMotion and CSS transforms.