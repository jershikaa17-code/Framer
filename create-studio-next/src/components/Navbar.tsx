'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrambleLink } from './ScrambleLink'

const links = [
  { label: 'WORK', href: '/work', count: 5 },
  { label: 'STUDIO', href: '/studio', count: null },
  { label: 'WHISPERS', href: '/whispers', count: 7 },
]

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y > lastY && y > 80) setHidden(true)
      else setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40 flex h-[60px] items-center bg-ink px-5 md:px-7"
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex w-full max-w-page items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold lowercase tracking-tight text-accent">
            create<sup className="text-[0.6em]">®</sup>
          </Link>

          <nav className="hidden items-center gap-7 md:ml-[180px] md:mr-auto md:flex">
            {links.map((link) => (
              <span key={link.label} className="relative inline-flex items-baseline">
                <ScrambleLink href={link.href}>{link.label}</ScrambleLink>
                {link.count !== null && (
                  <motion.sup
                    className="ml-0.5 translate-x-0.5 -translate-y-1 font-mono-label text-[10.24px] text-grey-600"
                    whileHover={{ scale: [1, 1.25, 1] }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  >
                    {link.count}
                  </motion.sup>
                )}
              </span>
            ))}
          </nav>

          <div className="hidden md:block">
            <ScrambleLink href="/contact">CONTACT</ScrambleLink>
          </div>

          <button
            className="flex flex-col gap-1 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="font-mono-label text-[13px] text-off">MENU</span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-start justify-center gap-2 bg-ink px-5 pt-[60px]"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {[...links, { label: 'CONTACT', href: '/contact', count: null }].map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono-label text-3xl text-off"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
