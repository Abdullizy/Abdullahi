'use client'

import * as React from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useVelocity, wrap } from 'framer-motion'
import { ribbons } from '@/lib/data'
import { palette } from '@/lib/colors'

function Ribbon({ children, dir, className }: { children: React.ReactNode; dir: 1 | -1; className: string }) {
  const x = useMotionValue(0)
  const one = React.useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const vel = useVelocity(scrollY)

  useAnimationFrame((_, delta) => {
    const w = one.current?.offsetWidth ?? 0
    if (!w) return
    const boost = Math.min(Math.abs(vel.get()) * 0.09, 700) // faster while you scroll
    x.set(wrap(-w, 0, x.get() + (dir * (70 + boost) * delta) / 1000))
  })

  return (
    <div className={`absolute -inset-x-[5%] overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x }} className="flex w-max">
        <div ref={one} className="flex">{children}</div>
        <div className="flex" aria-hidden>{children}</div>
      </motion.div>
    </div>
  )
}

const word = 'display flex items-center gap-8 pr-8 text-[26px] sm:gap-10 sm:pr-10 sm:text-[34px]'

export function Ribbons() {
  return (
    <div className="relative h-[170px] overflow-hidden sm:h-[240px]" aria-hidden>
      <Ribbon dir={-1} className="top-[34px] -rotate-[3.5deg] border-y-[3px] border-ink bg-sun py-3 sm:top-[66px] sm:py-4">
        {ribbons.top.map((t) => (
          <span key={t} className={word}>{t}<span className="text-xl">&#10040;</span></span>
        ))}
      </Ribbon>
      <Ribbon dir={1} className="top-[64px] rotate-[2.5deg] bg-ink py-3 text-white sm:top-[100px] sm:py-4">
        {ribbons.bottom.map((t, i) => (
          <span key={t} className={word}>
            <span style={{ color: palette[(i + 3) % palette.length] }}>{t}</span>
            <span className="text-xl">&#10040;</span>
          </span>
        ))}
      </Ribbon>
    </div>
  )
}
