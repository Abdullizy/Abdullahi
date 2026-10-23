'use client'

import * as React from 'react'
import { palette } from '@/lib/colors'

/**
 * Letters ripple and flash colour as the cursor passes over them.
 * Pass plain text. Works with a mouse; on touch it simply sits still.
 */
export function WaveText({ text, className }: { text: string; className?: string }) {
  const letters = React.useRef<(HTMLSpanElement | null)[]>([])
  const words = text.split(' ')
  let n = -1

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    letters.current.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const f = Math.max(0, 1 - Math.hypot(dx, dy) / 150)
      el.style.transform = f ? `translateY(${-f * 0.22}em) rotate(${f * -9}deg) scale(${1 + f * 0.18})` : ''
      el.style.color = f > 0.28 ? palette[i % palette.length] : ''
    })
  }
  const leave = () =>
    letters.current.forEach((el) => {
      if (!el) return
      el.style.transform = ''
      el.style.color = ''
    })

  return (
    <span className={className} onPointerMove={move} onPointerLeave={leave} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {w.split('').map((ch) => {
            n += 1
            const i = n
            return (
              <span
                key={i}
                ref={(el) => {
                  letters.current[i] = el
                }}
                className="inline-block transition-[transform,color] duration-200 ease-out"
              >
                {ch}
              </span>
            )
          })}
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
