import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Preview } from '@/components/site/preview'
import { Reveal } from '@/components/site/reveal'
import { projects } from '@/lib/data'
import { bg, hex } from '@/lib/colors'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = projects.find((x) => x.slug === slug)
  return p ? { title: p.title, description: p.summary } : {}
}

const metaColors = ['bg-sun', 'bg-mint', 'bg-blue text-white', 'bg-pink'] as const
const resultColors = ['bg-coral', 'bg-sun', 'bg-blue text-white'] as const

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const i = projects.findIndex((x) => x.slug === slug)
  if (i < 0) notFound()
  const p = projects[i]
  const next = projects[(i + 1) % projects.length]

  const meta = [
    { label: 'Client', value: p.client },
    { label: 'Role', value: p.role },
    { label: 'Stack', value: p.stack },
    { label: 'Year', value: p.year },
  ]

  return (
    <article className="overflow-hidden">
      <section className="mx-auto max-w-[1360px] px-5 pb-10 pt-28 sm:px-8 sm:pt-36 lg:px-10">
        <div className="rise flex flex-wrap gap-2.5">
          <span className={`pill px-4 py-2 text-sm font-semibold ${bg[p.color]}`}>Project {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <span className="pill px-4 py-2 text-sm font-semibold">{p.kind}</span>
        </div>
        <h1 className="display rise mt-7 text-[clamp(3.4rem,0.5rem+12vw,8.25rem)]" style={{ ['--d' as string]: '0.08s' }}>
          {p.title}
          <span style={{ color: hex[p.color] }}>.</span>
        </h1>
        <p className="rise mt-7 max-w-[680px] text-lg leading-relaxed text-muted sm:text-[22px]" style={{ ['--d' as string]: '0.16s' }}>{p.summary}</p>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 pb-12 sm:px-8 lg:px-10">
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {meta.map((m, k) => (
            <div key={m.label} className={`pop rounded-[18px] px-4 py-3.5 shadow-[3px_3px_0_var(--color-ink)] sm:rounded-[22px] sm:px-6 sm:py-5 sm:shadow-[5px_5px_0_var(--color-ink)] ${metaColors[k]}`}>
              <dt className="mono-label text-[10px] sm:text-xs">{m.label}</dt>
              <dd className="display mt-1.5 text-[17px] tracking-[-0.02em] sm:mt-2 sm:text-2xl">{m.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">
        <Preview project={p} index={i} priority sizes="(min-width:1360px) 1280px, 92vw" className="h-[280px] w-full sm:h-[460px] lg:h-[640px]" />
        {p.liveUrl && (
          <Button asChild size="lg" className="mt-9 w-full sm:w-auto">
            <a href={p.liveUrl} target="_blank" rel="noreferrer">Visit live site <span aria-hidden>&#8599;</span></a>
          </Button>
        )}
      </section>

      <section className="mx-auto flex max-w-[1360px] flex-wrap gap-10 px-5 pt-20 sm:px-8 sm:pt-28 lg:px-10">
        <Reveal className="flex-1 basis-[400px]">
          <span className="pill inline-block bg-sun px-4 py-2 text-sm font-semibold">The challenge</span>
          <p className="display mt-6 text-[clamp(1.8rem,1rem+2vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.03em]">{p.challenge}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex-1 basis-[400px]">
          <span className="pill inline-block bg-blue px-4 py-2 text-sm font-semibold text-white">The approach</span>
          <div className="mt-6 space-y-4">
            {p.approach.map((t, k) => (
              <p key={k} className="text-base leading-[1.7] text-muted sm:text-[19px]">{t}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {p.gallery.length > 0 && (
        <section className="mx-auto flex max-w-[1360px] flex-wrap gap-5 px-5 pt-16 sm:gap-6 sm:px-8 sm:pt-24 lg:px-10">
          {p.gallery.map((src, k) => (
            <div key={src} className="pop-card relative h-[240px] flex-1 basis-[300px] overflow-hidden rounded-[28px] bg-soft sm:h-[380px] sm:basis-[520px] lg:h-[400px]">
              <Image src={src} alt={`${p.title} screenshot ${k + 2}`} fill sizes="(min-width:768px) 600px, 92vw" className="object-cover object-top" />
            </div>
          ))}
        </section>
      )}

      <section className="mx-auto max-w-[1360px] px-5 pt-20 sm:px-8 sm:pt-28 lg:px-10">
        <span className="pill inline-block bg-mint px-4 py-2 text-sm font-semibold">The result</span>
        <div className="mt-7 flex flex-wrap gap-5 sm:gap-6">
          {p.results.map((r, k) => (
            <Reveal key={r.label} delay={k * 0.08} className="flex-1 basis-[260px]">
              <div className={`pop-card h-full rounded-[28px] p-6 sm:p-8 ${resultColors[k % 3]}`}>
                <div className="display text-[64px] leading-none sm:text-[88px] lg:text-[104px]">{r.value}</div>
                <div className="mt-3 text-base sm:text-[17px]">{r.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {p.quote && (
        <section className="mt-20 border-y-[3px] border-ink bg-violet sm:mt-28">
          <div className="mx-auto max-w-[1360px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
            <p className="display max-w-[1000px] text-[clamp(1.75rem,1rem+2.6vw,3rem)] leading-[1.1] font-bold tracking-[-0.03em]">&ldquo;{p.quote.text}&rdquo;</p>
            <div className="mt-6 text-base font-medium">{p.quote.by}</div>
          </div>
        </section>
      )}

      <Link href={`/work/${next.slug}`} data-cursor="view" className="group block border-b-[3px] border-ink bg-sun">
        <div className="mx-auto flex max-w-[1360px] items-end justify-between gap-6 px-5 py-10 sm:px-8 sm:py-[72px] lg:px-10">
          <div>
            <div className="mono-label">Next project</div>
            <div className="display mt-3 text-[clamp(3rem,1rem+8vw,7.5rem)]">{next.title}</div>
          </div>
          <span aria-hidden className="grid size-16 shrink-0 place-items-center rounded-full bg-ink text-3xl text-white transition-transform duration-300 group-hover:translate-x-2 sm:size-[104px] sm:text-5xl">&rarr;</span>
        </div>
      </Link>

      <section className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <h2 className="display text-[clamp(2.6rem,1rem+5vw,4.5rem)]">Want a site<br />like this?</h2>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/#contact">Let&rsquo;s talk &#8599;</Link>
        </Button>
      </section>
    </article>
  )
}
