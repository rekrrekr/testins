# PersonaHub

A minimal, production-ready MVP: digital friend repository. Explore community personas, create your own, and chat.

## Tech
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn style primitives + Lucide icons
- React Query, Zod, react-hook-form
- Prisma (SQLite dev, Postgres prod-ready)
- NextAuth (Email magic link + Google)
- Stripe test mode (credits wallet scaffold)

## Setup
1. Copy `.env.example` to `.env` and fill values (keep `DATABASE_URL=file:./dev.db` for dev).
2. Install deps:
   ```bash
   npm install
   ```
3. Generate Prisma client and migrate:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate --name init
   npm run seed
   ```
4. Run dev server:
   ```bash
   npm run dev
   ```

Open http://localhost:3000.

## Notes
- Chat streaming is stubbed via `/api/chat/[personaId]/stream`. Replace `chunks` with real tokens in `chatStream()` later.
- Stripe is test-mode; on success, poll client-side then call `/api/wallet` to increment balance (no webhooks in MVP).
- Protected routes: `/create`, `/account`, `/vault` via middleware.
- Animations favor CSS; Framer Motion reserved for small hero/hover accents.