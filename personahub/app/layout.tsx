import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PersonaHub',
  description: 'Digital friend repository: explore, create, and chat with personas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-ink text-white`}>
        <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/60 hairline">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight text-white/90 hover:text-white">
              PersonaHub
            </Link>
            <nav className="flex items-center gap-4 text-sm text-white/70">
              <Link href="/explore" className="swoosh-underline hover:text-white">Explore</Link>
              <Link href="/create" className="swoosh-underline hover:text-white">Create</Link>
              <Link href="/account" className="swoosh-underline hover:text-white">Account</Link>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100dvh-56px)]"><Providers>{children}</Providers></main>
      </body>
    </html>
  );
}