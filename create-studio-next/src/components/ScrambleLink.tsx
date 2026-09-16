'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\°'
const FRAME_MS = 30
const TOTAL_MS = 350

// On hover, cycles each character through random glyphs, resolving
// left-to-right as the animation progresses, while tinting to the accent
// color. Reverses (settles back to white) on mouse leave.
export function ScrambleLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: string
  className?: string
}) {
  const [display, setDisplay] = useState(children)
  const [active, setActive] = useState(false)
  const frameRef = useRef(0)
  const intervalRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => window.clearInterval(intervalRef.current)
  }, [])

  const scramble = () => {
    window.clearInterval(intervalRef.current)
    frameRef.current = 0
    const totalFrames = Math.ceil(TOTAL_MS / FRAME_MS)
    intervalRef.current = window.setInterval(() => {
      frameRef.current += 1
      const progress = frameRef.current / totalFrames
      setDisplay(
        children
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            const revealAt = (i / children.length) * 0.7
            return progress > revealAt + 0.3 ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      )
      if (frameRef.current >= totalFrames) {
        setDisplay(children)
        window.clearInterval(intervalRef.current)
      }
    }, FRAME_MS)
  }

  return (
    <Link
      href={href}
      className={`font-mono-label transition-colors duration-200 ${active ? 'text-accent' : 'text-off'} ${className}`}
      onMouseEnter={() => {
        setActive(true)
        scramble()
      }}
      onMouseLeave={() => setActive(false)}
    >
      {display}
    </Link>
  )
}
