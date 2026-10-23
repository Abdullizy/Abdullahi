'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { projects, type Project } from '@/lib/data'
import { palette } from '@/lib/colors'
import { Preview } from './preview'
import { WaveText } from './wave-text'

const pad = (n: number) => String(n).padStart(2, '0')
const total = projects.length
const rainbow = `linear-gradient(90deg, ${palette.join(',')})`

function Card({ project, index, className, mediaClass }: { project: Project; index: number; className?: string; mediaClass: string }) {
  return (
    <Link href={`/work/${project.slug}`} data-cursor="view" draggable={false} className={`group block shrink-0 outline-none ${className ?? ''}`} aria-label={`View ${project.title}`}>
      <div className="transition-transform duration-300 group-hover:-translate-y-2 group-hover:rotate-[-0.6deg]">
        <Preview project={project} index={index} className={mediaClass} priority={index === 0} />
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <span className="display text-[28px] sm:text-4xl">{project.title}</span>
        <span className="pill hidden px-3.5 py-1.5 text-[15px] font-semibold transition-colors group-hover:bg-sun sm:inline">View project &rarr;</span>
      </div>
      <div className="mt-1.5 text-[15px] text-muted">{project.tags} &middot; {project.year}</div>
    </Link>
  )
}

function Heading({ active }: { active: number }) {
  return (
    <div className="mx-auto flex w-full max-w-[1360px] flex-wrap items-end justify-between gap-6 px-5 sm:px-8 lg:px-10">
      <h2 className="display h-section">
        <WaveText text="Selected" />
        <br />
        <WaveText text="work" />
      </h2>
      <div className="text-right">
        <div className="display text-[44px] sm:text-6xl lg:text-7xl" aria-live="polite">
          {pad(active + 1)}
          <span className="text-faint">/{pad(total)}</span>
        </div>
        <div className="mt-2 hidden text-sm text-muted lg:block">Keep scrolling, the projects slide sideways &rarr;</div>
      </div>
    </div>
  )
}

/** Desktop: the section pins and vertical scroll moves the cards sideways. */
function Pinned() {
  const section = React.useRef<HTMLDivElement>(null)
  const track = React.useRef<HTMLDivElement>(null)
  const [dist, setDist] = React.useState(0)
  const [active, setActive] = React.useState(0)

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))))))

  React.useEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div ref={section} style={{ height: `calc(100dvh + ${dist}px)` }} className="relative hidden lg:block">
      <div className="sticky top-0 flex h-dvh flex-col justify-center gap-[clamp(20px,4dvh,48px)] overflow-hidden pt-[84px]">
        <Heading active={active} />
        <motion.div ref={track} style={{ x }} className="flex w-max gap-10 px-[max(40px,calc((100vw-1360px)/2+40px))] will-change-transform">
          {projects.map((p, i) => (
            <Card key={p.slug} project={p} index={i} className="w-[clamp(440px,46vw,620px)]" mediaClass="h-[clamp(220px,34dvh,420px)] w-full" />
          ))}
        </motion.div>
        <div className="mx-auto w-full max-w-[1360px] px-10">
          <div className="h-2.5 overflow-hidden rounded-full border-2 border-ink bg-soft">
            <motion.div style={{ scaleX: scrollYProgress, background: rainbow }} className="h-full origin-left" />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Phones and tablets: a normal swipe row, so the page scroll is never blocked. */
function Swipe() {
  const row = React.useRef<HTMLDivElement>(null)
  const [p, setP] = React.useState(0)
  const [active, setActive] = React.useState(0)

  const onScroll = () => {
    const el = row.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const r = max > 0 ? el.scrollLeft / max : 0
    setP(r)
    setActive(Math.min(total - 1, Math.round(r * (total - 1))))
  }

  return (
    <div className="py-16 sm:py-24 lg:hidden">
      <Heading active={active} />
      <div ref={row} onScroll={onScroll} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8">
        {projects.map((pr, i) => (
          <Card key={pr.slug} project={pr} index={i} className="w-[80vw] max-w-[400px] snap-start sm:w-[56vw]" mediaClass="h-[270px] w-full sm:h-[340px]" />
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
      <div className="mx-auto mt-6 max-w-[1360px] px-5 sm:px-8">
        <div className="h-2.5 overflow-hidden rounded-full border-2 border-ink bg-soft">
          <div className="h-full origin-left transition-transform duration-150" style={{ background: rainbow, transform: `scaleX(${Math.max(p, 1 / total)})` }} />
        </div>
        <div className="mt-3 text-[13px] text-muted">Swipe to see more projects &rarr;</div>
      </div>
    </div>
  )
}

export function Work() {
  return (
    <section id="work">
      <Pinned />
      <Swipe />
    </section>
  )
}
