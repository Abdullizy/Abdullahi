import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@fontsource-variable/bricolage-grotesque'
import './globals.css'
import { site } from '@/lib/data'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Cursor } from '@/components/site/cursor'
import { Loader } from '@/components/site/loader'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: 'Frontend developer building fast, bold websites that work on every phone.',
  openGraph: { title: `${site.name} | ${site.role}`, description: 'Websites that load fast, look sharp and move.', type: 'website' },
}

export const viewport: Viewport = { themeColor: '#ffffff' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Loader />
        <Header />
        <main>{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  )
}
