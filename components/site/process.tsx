import { steps } from '@/lib/data'
import { Reveal } from './reveal'
import { WaveText } from './wave-text'

const shapes = ['rounded-full', 'rounded-[18px]', 'rotate-12 rounded-none', 'rounded-[84px_84px_0_84px]']
const fills = { coral: 'bg-coral', sun: 'bg-sun', blue: 'bg-blue text-white', mint: 'bg-mint', pink: 'bg-pink', violet: 'bg-violet' }

export function Process() {
  return (
    <section className="border-t-[3px] border-ink bg-soft">
      <div className="mx-auto max-w-[1360px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <h2 className="display h-section">
          <WaveText text="From hello" />
          <br />
          <WaveText text="to launch" />
        </h2>
        <ol className="mt-12 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.1} tilt={i % 2 ? 4 : -4}>
                <div className="flex items-center gap-5 sm:block">
                  <span className={`pop display grid size-[64px] shrink-0 place-items-center text-[26px] sm:size-[84px] sm:text-[32px] ${shapes[i]} ${fills[s.color]}`}>{i + 1}</span>
                  <div>
                    <div className="display text-[26px] sm:mt-5 sm:text-3xl">{s.title}</div>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted sm:mt-2 sm:text-base">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
