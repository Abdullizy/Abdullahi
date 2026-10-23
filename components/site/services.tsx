'use client'

import * as React from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { services } from '@/lib/data'
import { bg } from '@/lib/colors'
import { WaveText } from './wave-text'

function StackCard({ i, progress, s }: { i: number; progress: MotionValue<number>; s: (typeof services)[number] }) {
  const n = services.length
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.04])
  const tilt = i % 2 ? 1 : -1
  return (
    <div className="sticky" style={{ top: `calc(84px + ${i * 22}px)`, marginBottom: i === n - 1 ? 0 : '22vh' }}>
      <motion.article
        style={{ scale, rotate: tilt * 0.6 }}
        className={`pop-card flex origin-top flex-wrap items-center gap-x-12 gap-y-4 rounded-[32px] px-6 py-8 sm:px-12 sm:py-11 ${bg[s.color]}`}
      >
        <span className="display text-[64px] sm:text-[96px]">0{i + 1}</span>
        <div className="min-w-[240px] flex-1">
          <h3 className="display text-[30px] sm:text-5xl">{s.title}</h3>
          <p className="mt-2.5 max-w-[520px] text-base leading-relaxed sm:text-lg">{s.text}</p>
        </div>
        <span className="pill bg-white px-4 py-2 text-[15px] font-semibold text-ink">Good for: {s.goodFor}</span>
      </motion.article>
    </div>
  )
}

export function Services() {
  const list = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 70%', 'end end'] })
  return (
    <section id="services" className="mx-auto max-w-[1360px] px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="display h-section">
          <WaveText text="What I" />
          <br />
          <WaveText text="can build" />
        </h2>
        <span className="mono-label max-w-[240px] leading-relaxed">Cards stack up as you scroll &darr;</span>
      </div>
      <div ref={list} className="mt-10 sm:mt-14">
        {services.map((s, i) => (
          <StackCard key={s.title} i={i} s={s} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
