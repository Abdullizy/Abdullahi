import { site } from '@/lib/data'

export function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-ink text-white">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-4 px-5 py-7 text-sm sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <span className="order-2 md:order-1">&copy; {new Date().getFullYear()} {site.name}. {site.role}.</span>
        <span className="order-1 flex flex-wrap gap-x-6 gap-y-2 md:order-2">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-sun">{s.label}</a>
          ))}
        </span>
      </div>
    </footer>
  )
}
