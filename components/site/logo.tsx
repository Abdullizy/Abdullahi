import Link from 'next/link'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" aria-label="Abdullahi, home" className={`display flex items-center gap-2.5 text-[26px] sm:text-[28px] ${className}`}>
      <span className="grid grid-cols-2 gap-[3px]" aria-hidden>
        <i className="block size-3 rounded-full bg-coral" />
        <i className="block size-3 bg-sun" />
        <i className="block size-3 bg-blue" />
        <i className="block size-3 rounded-[12px_0_12px_0] bg-mint" />
      </span>
      abdullahi
    </Link>
  )
}
