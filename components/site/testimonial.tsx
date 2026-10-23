import { testimonial } from '@/lib/data'
import { Reveal } from './reveal'

export function Testimonial() {
  const initials = testimonial.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <section className="border-t-[3px] border-ink bg-sun">
      <div className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal>
          <div className="display h-[0.55em] text-[110px] leading-none sm:text-[140px]" aria-hidden>&ldquo;</div>
          <blockquote className="display max-w-[1000px] text-[clamp(1.9rem,1rem+3.4vw,3.4rem)] leading-[1.08] font-bold tracking-[-0.03em]">{testimonial.quote}</blockquote>
          <div className="mt-9 flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-ink text-[15px] font-semibold text-white">{initials}</span>
            <span className="leading-snug">
              <strong className="block font-semibold">{testimonial.name}</strong>
              {testimonial.role}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
