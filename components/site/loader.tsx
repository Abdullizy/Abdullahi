'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { palette } from '@/lib/colors'

/** Colourful 0 to 100 counter, then it slides up and the door appears. */
export function Loader() {
  const [show, setShow] = React.useState(true)
  const [n, setN] = React.useState(0)

  React.useEffect(() => {
    const root = document.documentElement
    // every reload starts from the top, so the loader always leads into the door
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    root.style.overflow = 'hidden'
    const start = performance.now()
    const dur = 1500
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else window.setTimeout(() => setShow(false), 250)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      root.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={() => (document.documentElement.style.overflow = '')}>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="display flex text-[clamp(7rem,28vw,18rem)] leading-none" aria-label={`Loading ${n} percent`}>
            {String(n)
              .padStart(3, '0')
              .split('')
              .map((d, i) => (
                <span key={i} style={{ color: palette[(i * 2 + Math.floor(n / 14)) % palette.length] }}>
                  {d}
                </span>
              ))}
          </div>
          <div className="mt-6 h-3 w-[min(70vw,420px)] overflow-hidden rounded-full border-[3px] border-ink bg-soft">
            <div
              className="h-full"
              style={{
                width: `${n}%`,
                background: `linear-gradient(90deg, ${palette.join(',')})`,
                backgroundSize: '420px 100%',
              }}
            />
          </div>
          <div className="mono-label mt-5">Opening the door…</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
