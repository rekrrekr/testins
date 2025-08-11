"use client"
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { ReactNode } from 'react'

export function MotionContainer({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}