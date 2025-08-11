"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/create', label: 'Create' },
  { href: '/vault', label: 'Vault' },
]

export function GlassHeader() {
  const pathname = usePathname()
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="container pt-4">
        <div className="glass-surface rounded-[var(--radius-lg)] px-4 md:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">Persona</Link>
          <LazyMotion features={domAnimation}>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              {nav.map((item) => (
                <m.div key={item.href} whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-2 py-1 hover:text-foreground/90',
                      pathname === item.href && 'text-foreground'
                    )}
                  >
                    {item.label}
                    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-foreground/60 to-transparent transition-all duration-200" />
                  </Link>
                </m.div>
              ))}
            </nav>
          </LazyMotion>
          <div className="flex items-center gap-2 text-sm">
            <Link className="hidden md:inline px-3 py-1.5 rounded-[var(--radius-sm)] glass-surface" href="/signin">Sign in</Link>
            <Link className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-primary text-primary-foreground" href="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}