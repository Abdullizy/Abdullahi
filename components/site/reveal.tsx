'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

/** Pops into view when scrolled to: a little rise, a little tilt. */
export function Reveal({
  children,
  delay = 0,
  className,
  tilt = 0,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  tilt?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36, rotate: tilt, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay }}
    >
      {children}
    </motion.div>
  )
}
