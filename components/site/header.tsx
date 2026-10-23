'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'

const nav = [
  { label: 'Work', href: '/#work', color: 'hover:bg-coral' },
  { label: 'Services', href: '/#services', color: 'hover:bg-sun' },
  { label: 'About', href: '/#about', color: 'hover:bg-mint' },
  { label: 'Contact', href: '/#contact', color: 'hover:bg-pink' },
]
const mobileColors = ['bg-coral', 'bg-sun', 'bg-mint', 'bg-pink']

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const path = usePathname()
  const onProject = path.startsWith('/work/')

  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? 'border-b-[3px] border-ink bg-white/90 backdrop-blur-md' : 'border-b-[3px] border-transparent'}`}>
      <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:h-[84px] lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-1.5 text-[15px] font-medium lg:flex" aria-label="Main">
          {onProject ? (
            <Link href="/#work" className="pill px-4 py-2 font-semibold transition-colors hover:bg-sun">&larr; All projects</Link>
          ) : (
            nav.map((n) => (
              <Link key={n.href} href={n.href} className={`rounded-full border-2 border-transparent px-4 py-2 transition-colors hover:border-ink ${n.color}`}>
                {n.label}
              </Link>
            ))
          )}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="sun" size="sm">
            <Link href="/#contact">Let&rsquo;s talk &#8599;</Link>
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="grid h-11 w-11 place-content-center gap-[5px] lg:hidden" aria-label="Open menu">
              <i className="block h-[3px] w-[26px] rounded bg-ink" />
              <i className="ml-auto block h-[3px] w-4 rounded bg-ink" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">Menu</DialogTitle>
            <DialogDescription className="sr-only">Site navigation</DialogDescription>
            <div className="flex h-[68px] items-center justify-between px-5">
              <Logo />
              <DialogClose className="grid size-11 place-items-center text-3xl leading-none" aria-label="Close menu">&times;</DialogClose>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-3 px-5 pb-12" aria-label="Mobile">
              {nav.map((n, i) => (
                <DialogClose asChild key={n.href}>
                  <Link
                    href={n.href}
                    className={`rise display flex items-center justify-between rounded-3xl border-[3px] border-ink px-6 py-5 text-5xl shadow-[5px_5px_0_var(--color-ink)] ${mobileColors[i]}`}
                    style={{ ['--d' as string]: `${i * 0.06}s` }}
                  >
                    {n.label}
                    <span className="text-3xl">&#8599;</span>
                  </Link>
                </DialogClose>
              ))}
            </nav>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
