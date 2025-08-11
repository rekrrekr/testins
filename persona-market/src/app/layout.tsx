import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Providers } from './providers'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Persona Marketplace',
  description: 'Explore and chat with curated personas',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}