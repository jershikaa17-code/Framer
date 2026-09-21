import { useState, type CSSProperties } from 'react'
import { useInViewOnce } from '../hooks/useInViewOnce'
import './gather-text.css'

interface GatherTextProps {
  text: string
  className?: string
  /** Stagger between each character's turn, in ms, left-to-right. */
  charStagger?: number
  /** Extra delay (s) before the first character can start — used to
   *  stagger separate text elements (eyebrow, heading, sub) against
   *  each other so they don't all gather at once. */
  delay?: number
}

// mulberry32 — small, fast, well-distributed seeded PRNG.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Each character starts scattered a short, random distance from its final
// position (plus a slight rotation) and gathers smoothly into place —
// distinct from a fade, a directional slide, or a typewriter reveal. The
// scatter offsets are seeded once per mount so they don't reshuffle on
// re-render, but differ between page loads.
export function GatherText({ text, className = '', charStagger = 18, delay = 0 }: GatherTextProps) {
  const [ref, revealed] = useInViewOnce<HTMLSpanElement>(0.4)
  const [seed] = useState(() => Math.floor(Math.random() * 2 ** 31))

  const words = text.split(/(\s+)/)
  let charIndex = 0
  const rand = mulberry32(seed)

  return (
    <span ref={ref} className={`gather-text ${className}`}>
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) return word
        return (
          <span key={wi} className="gather-text__word">
            {word.split('').map((ch, ci) => {
              const i = charIndex++
              const angle = rand() * Math.PI * 2
              const dist = 8 + rand() * 16
              const gx = (Math.cos(angle) * dist).toFixed(1)
              const gy = (Math.sin(angle) * dist).toFixed(1)
              const grot = ((rand() - 0.5) * 26).toFixed(1)
              const style: CSSProperties & Record<string, string> = {
                '--gx': `${gx}px`,
                '--gy': `${gy}px`,
                '--gr': `${grot}deg`,
                transitionDelay: `${delay + i * (charStagger / 1000)}s`,
              }
              return (
                <span key={ci} className={`gather-char ${revealed ? 'is-revealed' : ''}`} style={style}>
                  {ch}
                </span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}
