'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input, Label, Textarea } from '@/components/ui/input'
import { site } from '@/lib/data'
import { Magnetic } from './magnetic'
import { Reveal } from './reveal'
import { WaveText } from './wave-text'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [status, setStatus] = React.useState<Status>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    // No Formspree URL yet: open the visitor's email app with the message filled in.
    if (!site.formEndpoint) {
      const body = `${data.message}\n\n${data.name} (${data.email})`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('failed')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t-[3px] border-ink">
      <i className="absolute -right-16 -top-16 size-[220px] rounded-full border-[3px] border-ink bg-pink sm:size-[260px]" aria-hidden />
      <div className="relative mx-auto flex max-w-[1360px] flex-wrap items-start gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal className="flex-1 basis-[460px]">
          <h2 className="display h-giant leading-[0.88]">
            <WaveText text="Let's" />
            <br />
            <WaveText text="talk" />
            <span className="text-coral">.</span>
          </h2>
          <a href={`mailto:${site.email}`} className="u-link display mt-9 inline-block break-all pb-1 text-[clamp(1.4rem,1rem+1.6vw,2rem)] font-bold tracking-[-0.02em] [background-image:linear-gradient(var(--color-mint),var(--color-mint))]">
            {site.email}
          </a>
          {site.whatsapp && (
            <div className="mt-4 text-base text-muted">
              or message me on{' '}
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="font-semibold text-ink underline decoration-mint decoration-[3px] underline-offset-4">WhatsApp</a>{' '}
              for a faster reply
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1} className="w-full max-w-[460px] flex-1 basis-[360px]">
          <form onSubmit={onSubmit} className="pop-card flex flex-col gap-4 rounded-[28px] bg-white p-6 sm:p-8">
            <Label>Name<Input name="name" required placeholder="Your name" autoComplete="name" /></Label>
            <Label>Email<Input name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></Label>
            <Label>Project<Textarea name="message" required placeholder="Tell me what you need" /></Label>
            <Magnetic className="block">
              <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message ↗'}
              </Button>
            </Magnetic>
            <p role="status" className="min-h-5 text-sm">
              {status === 'sent' && <span className="font-semibold text-ink">Thank you, your message is in. I will reply within 24 hours.</span>}
              {status === 'error' && <span className="font-semibold text-coral">Something went wrong. Please email me directly instead.</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
