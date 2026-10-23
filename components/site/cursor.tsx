'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { palette } from '@/lib/colors'

/**
 * A colour-changing blob that trails the pointer. It grows over links and says
 * "View" over anything marked data-cursor="view". Mouse only: touch devices skip it.
 */
export function Cursor() {
  const [on, setOn] = React.useState(false)
  const [mode, setMode] = React.useState<'idle' | 'link' | 'view'>('idle')
  const [ci, setCi] = React.useState(0)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.5 })

  React.useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setOn(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement | null
      if (!t || !t.closest) return
      if (t.closest('[data-cursor="view"]')) setMode('view')
      else if (t.closest('a, button, label, input, textarea')) setMode('link')
      else setMode('idle')
    }
    window.addEventListener('pointermove', move, { passive: true })
    const id = window.setInterval(() => setCi((c) => (c + 1) % palette.length), 1600)
    return () => {
      window.removeEventListener('pointermove', move)
      window.clearInterval(id)
    }
  }, [x, y])

  if (!on) return null
  const size = mode === 'view' ? 92 : mode === 'link' ? 46 : 22
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[120]" style={{ x: sx, y: sy }}>
      <motion.div
        className="-ml-[11px] -mt-[11px] grid place-items-center rounded-full border-[3px] border-ink font-semibold text-ink"
        animate={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, backgroundColor: palette[ci], opacity: mode === 'link' ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {mode === 'view' && <span className="text-sm">View</span>}
      </motion.div>
    </motion.div>
  )
}
