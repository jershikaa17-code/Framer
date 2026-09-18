import type { CSSProperties } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'
import { useInViewOnce } from '../hooks/useInViewOnce'
import { EASE_OUT } from './variants'
import './scatter-text.css'

interface ScatterTextProps {
  text: string
  className?: string
  /** Per-character stagger in ms — kept small so a long line still settles quickly. */
  stagger?: number
  /** Extra delay (s) before the first character starts, e.g. to line up with a parent block's own entrance delay. */
  delay?: number
  /** Optional shared scroll progress (0 = top of page, 1 = hero fully scrolled past). When
   *  given, each character also scatters back OUT as the page scrolls, on a second,
   *  independent layer so it never fights the CSS-driven entrance above. */
  exitProgress?: MotionValue<number>
}

// Deterministic small per-character jitter (not random per render) — a
// short, fixed sequence of x/y offsets keyed by character index, so it reads
// as organic scatter without reshuffling on every re-render.
const JITTER = [
  { x: -8, y: 6 },
  { x: 7, y: -7 },
  { x: -6, y: -8 },
  { x: 8, y: 5 },
  { x: -7, y: 7 },
]

// Each character starts scattered (small x/y offset, invisible) and
// converges into place on a short stagger. Entrance is driven by a plain
// IntersectionObserver + CSS transition (see useInViewOnce) — deliberately
// NOT Framer Motion's whileInView/animate engine, which is documented
// elsewhere in this codebase (useInViewOnce.ts) to get permanently stuck at
// its hidden state when a nearby node carries a style-driven MotionValue.
//
// The optional scroll-exit lives on a second, INNER span per character,
// driven purely by the `style` prop (never `initial`/`animate`) — kept off
// the same element as the CSS entrance for exactly that reason.
export function ScatterText({ text, className = '', stagger = 18, delay = 0, exitProgress }: ScatterTextProps) {
  const [ref, revealed] = useInViewOnce<HTMLSpanElement>(0.4)

  // Split into words (keeping the separating spaces as their own chunks) so
  // each word's characters can be wrapped in a `white-space: nowrap` span —
  // per-character inline-block spans are atomic boxes the browser is free to
  // line-break between anywhere, not just at whitespace, which without this
  // grouping breaks words mid-letter when the paragraph wraps.
  const words = text.split(/(\s+)/)
  let charIndex = 0

  return (
    <span ref={ref} className={className}>
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          charIndex += word.length
          return word
        }
        const startIndex = charIndex
        charIndex += word.length
        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.split('').map((ch, ci) => {
              const i = startIndex + ci
              const j = JITTER[i % JITTER.length]
              return (
                <span
                  key={i}
                  className={`scatter-char ${revealed ? 'is-revealed' : ''}`}
                  style={
                    {
                      transitionDelay: `${delay + i * (stagger / 1000)}s`,
                      '--scatter-x': `${j.x}px`,
                      '--scatter-y': `${j.y}px`,
                      transitionTimingFunction: `cubic-bezier(${EASE_OUT.join(',')})`,
                    } as CSSProperties
                  }
                >
                  {exitProgress ? <ScatterCharExit ch={ch} jitter={j} exitProgress={exitProgress} /> : ch}
                </span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}

function ScatterCharExit({
  ch,
  jitter,
  exitProgress,
}: {
  ch: string
  jitter: { x: number; y: number }
  exitProgress: MotionValue<number>
}) {
  // Small mono text: keep the per-character drift well under the letter
  // advance width so neighboring characters never visually swap order —
  // opacity does most of the work, position just adds a light dissolve.
  const x = useTransform(exitProgress, [0.05, 0.4], [0, jitter.x * 0.6])
  const y = useTransform(exitProgress, [0.05, 0.4], [0, jitter.y * 0.6])
  const opacity = useTransform(exitProgress, [0.05, 0.35], [1, 0])

  return (
    <motion.span style={{ display: 'inline-block', x, y, opacity }}>{ch === ' ' ? ' ' : ch}</motion.span>
  )
}
