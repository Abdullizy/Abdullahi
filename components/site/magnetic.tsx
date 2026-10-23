'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Wraps a button: it leans toward the cursor and springs back. */
export function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 14 })
  const y = useSpring(my, { stiffness: 220, damping: 14 })

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className ?? 'inline-block'}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        mx.set((e.clientX - (r.left + r.width / 2)) * strength)
        my.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
