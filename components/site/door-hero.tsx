'use client'

import * as React from 'react'
import Image from 'next/image'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { hero, room } from '@/lib/data'
import { bg, hex } from '@/lib/colors'
import { rich } from '@/lib/rich'
import { WaveText } from './wave-text'

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
const seg = (a: number, b: number, v: number) => clamp((v - a) / (b - a))

const stickerPos = [
  'xl:rotate-[-5deg]',
  'xl:rotate-[4deg] xl:translate-x-10',
  'xl:rotate-[-3deg] xl:translate-x-2',
  'xl:rotate-[5deg] xl:translate-x-14',
]
const miniPos = [
  'left-[-14px] top-[16%] -rotate-[8deg]',
  'right-[-16px] top-[48%] rotate-[6deg]',
  'left-[-12px] bottom-[14%] rotate-[5deg]',
]

/**
 * The first screen. Your photo is a door. The section is tall and its inner
 * frame is pinned, so scrolling swings the two halves open, the camera moves
 * through, and "page two" fills the screen. After that the page scrolls normally.
 */
export function DoorHero() {
  const section = React.useRef<HTMLDivElement>(null)
  const box = React.useRef<HTMLDivElement>(null)
  const doorWrap = React.useRef<HTMLDivElement>(null)
  const doorLayer = React.useRef<HTMLDivElement>(null)
  const leafL = React.useRef<HTMLDivElement>(null)
  const leafR = React.useRef<HTMLDivElement>(null)
  const shadeL = React.useRef<HTMLElement>(null)
  const shadeR = React.useRef<HTMLElement>(null)
  const roomEl = React.useRef<HTMLDivElement>(null)
  const roomInner = React.useRef<HTMLDivElement>(null)
  const sides = React.useRef<HTMLElement[]>([])
  const hint = React.useRef<HTMLDivElement>(null)
  const doorShadow = React.useRef<HTMLDivElement>(null)
  const dims = React.useRef({ vw: 1440, vh: 900, dw: 480, dh: 640 })

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })

  const apply = React.useCallback((v: number) => {
    const d = dims.current
    const set = (el: HTMLElement | null, css: Partial<CSSStyleDeclaration>) => el && Object.assign(el.style, css)

    // 1. the two halves swing open (hinged on the outer edges)
    const a = ease(seg(0.05, 0.5, v)) * 88
    set(leafL.current, { transform: `rotateY(${a}deg)` })
    set(leafR.current, { transform: `rotateY(${-a}deg)` })
    set(doorShadow.current, { opacity: String(1 - seg(0.02, 0.16, v)) })
    set(shadeL.current, { opacity: String((a / 88) * 0.6) })
    set(shadeR.current, { opacity: String((a / 88) * 0.6) })

    // 2. the camera moves through the door
    const S = Math.max(d.vw / d.dw, d.vh / d.dh) * 1.25
    const s = 1 + (S - 1) * ease(seg(0.28, 0.86, v))
    set(doorWrap.current, { transform: `scale(${s})` })
    set(doorLayer.current, { visibility: v > 0.92 ? 'hidden' : 'visible' })

    // 3. page two is only visible through the doorway, then fills the screen
    const hw = (d.dw * s) / 2
    const hh = (d.dh * s) / 2
    const cx = d.vw / 2
    const cy = d.vh / 2 + 32
    const topRaw = cy - hh
    const top = Math.max(0, topRaw)
    const bottom = Math.max(0, d.vh - (cy + hh))
    const left = Math.max(0, cx - hw)
    const right = Math.max(0, d.vw - (cx + hw))
    const r = Math.max(0, hw * (1 - seg(0.4, 0.72, v)) + Math.min(0, topRaw))
    set(roomEl.current, { clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round ${r}px ${r}px 0 0)` })
    roomEl.current?.style.setProperty('--p', v.toFixed(3))
    set(roomInner.current, { transform: `scale(${lerp(1.35, 1, ease(seg(0.12, 0.86, v)))})` })

    // 4. the text beside the door moves out of the way
    const o = 1 - seg(0, 0.18, v)
    const sx = seg(0, 0.3, v) * 150
    sides.current.forEach((el) => {
      const dir = el.dataset.side === 'r' ? 1 : -1
      el.style.opacity = String(o)
      el.style.transform = `translateX(${dir * sx}px)`
    })
    set(hint.current, { opacity: String(1 - seg(0, 0.06, v)) })
  }, [])

  const measure = React.useCallback(() => {
    const b = box.current
    if (!b) return
    sides.current = Array.from(section.current?.querySelectorAll<HTMLElement>('[data-side]') ?? [])
    dims.current = { vw: window.innerWidth, vh: window.innerHeight, dw: b.offsetWidth, dh: b.offsetHeight }
    apply(scrollYProgress.get())
  }, [apply, scrollYProgress])

  useMotionValueEvent(scrollYProgress, 'change', apply)

  React.useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    const t = window.setTimeout(measure, 400)
    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(t)
    }
  }, [measure])

  const half = (side: 'l' | 'r') => (
    <>
      {hero.photo ? (
        <div className="absolute top-0 h-full w-[200%]" style={{ left: side === 'l' ? 0 : '-100%' }}>
          <Image src={hero.photo} alt={side === 'l' ? 'Portrait of Abdullahi' : ''} fill sizes="480px" priority className="object-cover" />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-[#d9e4ff]" />
          <i className={`absolute top-[18%] aspect-square w-[92%] rounded-full bg-ink ${side === 'l' ? '-right-[46%]' : '-left-[46%]'}`} />
          <i className={`absolute top-[58%] h-[70%] w-[190%] rounded-full bg-ink ${side === 'l' ? '-right-[95%]' : '-left-[95%]'}`} />
          {side === 'l' && <span className="mono-label absolute bottom-4 left-4 text-[10px] sm:text-[11px]">[Your photo]</span>}
        </>
      )}
      <i className={`absolute top-1/2 size-[18px] rounded-full border-[3px] border-ink bg-sun ${side === 'l' ? 'right-3' : 'left-3'}`} />
      <i ref={side === 'l' ? shadeL : shadeR} className="absolute inset-0 bg-ink opacity-0" />
    </>
  )

  return (
    <section id="top" ref={section} className="relative h-[300dvh] md:h-[340dvh]" aria-label="Introduction">
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* PAGE TWO, seen through the doorway */}
        <div ref={roomEl} className="absolute inset-0 z-10 bg-white" style={{ clipPath: 'inset(50% 50% 50% 50%)' }}>
          <div ref={roomInner} className="absolute inset-0 origin-center">
            <i className="absolute -left-14 top-[14%] size-[200px] rounded-full border-[3px] border-ink bg-sun sm:size-[260px]" style={{ transform: 'rotate(calc(var(--p, 0) * 300deg))' }} />
            <i className="absolute right-[8%] top-[10%] size-[110px] border-[3px] border-ink bg-blue sm:size-[150px]" style={{ transform: 'rotate(calc(18deg + var(--p, 0) * -400deg))' }} />
            <i className="absolute -bottom-12 -right-10 size-[200px] rounded-tl-full border-[3px] border-ink bg-mint sm:size-[280px]" style={{ transform: 'rotate(calc(var(--p, 0) * 180deg))', transformOrigin: '100% 100%' }} />
            <i className="absolute -bottom-8 left-[10%] size-[100px] rounded-full border-[3px] border-ink bg-pink sm:size-[140px]" style={{ transform: 'translateY(calc(var(--p, 0) * -40px))' }} />
            <i className="absolute left-[18%] top-[62%] hidden size-[70px] rounded-[22px] border-[3px] border-ink bg-violet sm:block" style={{ transform: 'rotate(calc(var(--p, 0) * 540deg))' }} />
            <i className="absolute right-[22%] top-[72%] hidden size-[56px] rounded-full border-[3px] border-ink bg-coral sm:block" style={{ transform: 'translateY(calc(var(--p, 0) * 60px))' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 pt-10 text-center">
              <div className="mono-label">{room.label}</div>
              <h2 className="display mt-5 max-w-[1000px] text-[clamp(3rem,1rem+8vw,7.5rem)]">{rich(room.title)}</h2>
              <p className="mt-6 max-w-[560px] text-base leading-relaxed text-muted sm:text-xl">{room.text}</p>
            </div>
            <div className="mono-label absolute inset-x-0 bottom-8 text-center">Keep scrolling &darr;</div>
          </div>
        </div>

        {/* THE DOOR */}
        <div ref={doorLayer} className="absolute inset-0 z-20 flex items-center justify-center pt-16">
          <div
            ref={box}
            className="rise relative"
            style={{ width: 'min(480px, 70vw, calc((100dvh - 200px) * 0.75))', aspectRatio: '3 / 4', ['--d' as string]: '0.1s' }}
          >
            <div ref={doorWrap} className="absolute inset-0 will-change-transform">
              <div ref={doorShadow} className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] border-[3px] border-ink bg-coral sm:translate-x-3.5 sm:translate-y-3.5" />
              <div className="relative flex h-full gap-[3px] [perspective:1400px]">
                <div ref={leafL} className="relative flex-1 origin-left overflow-hidden rounded-tl-[999px] border-[3px] border-r-[1.5px] border-ink bg-ink">
                  {half('l')}
                </div>
                <div ref={leafR} className="relative flex-1 origin-right overflow-hidden rounded-tr-[999px] border-[3px] border-l-[1.5px] border-ink bg-ink">
                  {half('r')}
                </div>
              </div>
            </div>
            {/* stickers around the door on small screens */}
            {hero.stickers.slice(0, 3).map((s, i) => (
              <span key={s.label} data-side={i % 2 ? "r" : "l"} className={`pop absolute z-10 rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-[3px_3px_0_var(--color-ink)] xl:hidden ${bg[s.color]} ${miniPos[i]}`}>
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* TEXT: small screens, above the door */}
        <div data-side="l" className="pointer-events-none absolute inset-x-0 top-[76px] z-30 px-5 text-center xl:hidden">
          <div className="rise" style={{ ['--d' as string]: '0.25s' }}>
            <h1 className="display text-[clamp(2.4rem,1rem+6vw,4.2rem)]">
              {hero.greeting} {hero.intro}{' '}
              <span className="inline-block -rotate-2 rounded-xl bg-sun px-2">{hero.name}</span>
            </h1>
          </div>
        </div>

        {/* TEXT: wide screens, either side of the door */}
        <div className="pointer-events-none absolute inset-0 z-30 hidden items-center px-10 pt-16 xl:flex">
          <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between">
            <div className="w-[340px]" data-side="l">
              <div className="rise pointer-events-auto" style={{ ['--d' as string]: '0.2s' }}>
                {hero.eyebrow && (
                  <span className="pill inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium">
                    <i className="block size-[9px] rounded-full bg-mint" />
                    {hero.eyebrow}
                  </span>
                )}
                <h1 className="display mt-7 text-[84px]">
                  {hero.greeting}
                  <br />
                  {hero.intro}{' '}
                  <span className="inline-block -rotate-2 rounded-xl bg-sun px-2.5">
                    <WaveText text={hero.name} />
                  </span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted">{hero.text}</p>
              </div>
            </div>
            <div className="w-[340px]" data-side="r">
              <div className="flex flex-col items-start gap-3.5">
                {hero.stickers.map((s, i) => (
                  <span
                    key={s.label}
                    className={`pop bob rounded-full px-5 py-3 text-xl font-semibold shadow-[5px_5px_0_var(--color-ink)] ${bg[s.color]} ${stickerPos[i % 4]}`}
                    style={{ ['--d' as string]: `${i * 0.4}s` }}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={hint} className="pointer-events-none absolute inset-x-0 bottom-6 z-30">
          <div className="rise flex items-center justify-center gap-3" style={{ ['--d' as string]: '0.6s' }}>
            <span className="bob grid size-12 place-items-center rounded-full border-[3px] border-ink bg-sun text-xl">&darr;</span>
            <span className="mono-label leading-snug">Scroll to open<br />the door</span>
          </div>
        </div>
      </div>
    </section>
  )
}
