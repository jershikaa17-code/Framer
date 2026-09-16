'use client'

import Link from 'next/link'

// Each label renders twice inside an overflow-hidden box (copy A at y:0,
// copy B at y:100%). On hover both translate -100%, so the word appears to
// flip up and be replaced by itself — plus a fill/invert color swap.
export function RollButton({
  href,
  children,
  variant = 'outline',
}: {
  href: string
  children: string
  variant?: 'outline' | 'solid'
}) {
  const base =
    'group relative inline-flex h-[51px] items-center justify-center overflow-hidden rounded-full px-7 font-mono-label text-[16px] transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]'
  const styles =
    variant === 'outline'
      ? 'border border-white/35 text-white hover:bg-white hover:text-ink'
      : 'bg-white text-ink hover:bg-transparent hover:text-white hover:border hover:border-white'

  return (
    <Link href={href} data-cursor className={`${base} ${styles}`}>
      <span className="relative block h-[1em] overflow-hidden">
        <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
    </Link>
  )
}
