import Image from 'next/image'
import { about } from '@/lib/data'
import { bg } from '@/lib/colors'
import { rich } from '@/lib/rich'
import { Reveal } from './reveal'

export function About() {
  return (
    <section id="about" className="border-t-[3px] border-ink">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:gap-16 lg:px-10">
        <Reveal tilt={-3} className="relative w-full max-w-[520px] flex-1 basis-[380px]">
          <div className="absolute inset-0 -translate-x-3 translate-y-3 -rotate-3 rounded-[32px] border-[3px] border-ink bg-violet sm:-translate-x-4 sm:translate-y-4" />
          <div className="pop relative h-[380px] overflow-hidden rounded-[32px] bg-[#ffe9b0] sm:h-[560px]">
            {about.photo ? (
              <Image src={about.photo} alt="Abdullahi" fill sizes="(min-width:1024px) 520px, 90vw" className="object-cover" />
            ) : (
              <div className="mono-label grid h-full place-items-center">[Second photo]</div>
            )}
          </div>
          <span className="pop wiggle absolute -right-3 bottom-8 rounded-full bg-pink px-5 py-3 text-lg font-semibold shadow-[5px_5px_0_var(--color-ink)]" style={{ ['--r' as string]: '6deg' }}>
            Hi there &#128075;
          </span>
        </Reveal>
        <Reveal delay={0.1} className="flex-1 basis-[440px]">
          <h2 className="display text-[clamp(2.4rem,1.2rem+3.6vw,4rem)] leading-[1]">{rich(about.title)}</h2>
          <p className="mt-7 text-lg leading-[1.7] text-muted">{about.p1}</p>
          <p className="mt-3.5 text-lg leading-[1.7] text-muted">{about.p2}</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {about.chips.map((c) => (
              <span key={c.label} className={`pill px-[18px] py-2.5 text-[15px] font-semibold ${c.color === 'white' ? 'bg-white' : bg[c.color]}`}>{c.label}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
