import { useState } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'
import { useInViewOnce } from '../hooks/useInViewOnce'
import './scatter-text.css'

interface ScatterTextProps {
  text: string
  className?: string
  /** Stagger between each character's turn, in ms — applied in the shuffled reveal order, not left-to-right. */
  stagger?: number
  /** Extra delay (s) before the first character can start, e.g. to line up with a parent block's own entrance delay. */
  delay?: number
  /** Optional shared scroll progress (0 = top of page, 1 = hero fully scrolled past). When
   *  given, each character also drifts back OUT as the page scrolls, on a second,
   *  independent layer so it never fights the entrance reveal above. */
  exitProgress?: MotionValue<number>
}

// mulberry32 — a small, fast, well-distributed seeded PRNG.
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

// Fisher-Yates shuffle over a fresh seed each call — genuinely uniform, no
// short-range correlation (unlike a `sin(n * k)`-as-sort-key hash, which
// visibly clustered whole substrings onto adjacent ranks in an earlier pass
// at this component).
function shuffledIndices(length: number, seed: number) {
  const arr = Array.from({ length }, (_, i) => i)
  const rand = mulberry32(seed)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}

// Clean character-by-character appearance: every letter is fully invisible
// until its own turn, then simply appears directly in its final position —
// no movement, no sliding, no scaling, nothing flying in from elsewhere.
// Reveal order is a genuine Fisher-Yates shuffle seeded fresh from
// `Math.random()` once per mount (via lazy useState, so it never reshuffles
// on re-render — this component's parent re-renders every second from the
// live clock elsewhere in the hero — but IS different on every page
// load/reload, per spec).
//
// Entrance is driven by a plain IntersectionObserver + CSS transition (see
// useInViewOnce) — deliberately NOT Framer Motion's whileInView/animate
// engine, which is documented elsewhere in this codebase to get permanently
// stuck at its hidden state when a nearby node carries a style-driven
// MotionValue.
//
// The optional scroll-exit lives on a second, INNER span per character,
// driven purely by the `style` prop (never `initial`/`animate`) — kept off
// the same element as the CSS-driven entrance for exactly that reason.
export function ScatterText({ text, className = '', stagger = 28, delay = 0, exitProgress }: ScatterTextProps) {
  const [ref, revealed] = useInViewOnce<HTMLSpanElement>(0.4)

  const words = text.split(/(\s+)/)
  const totalChars = text.replace(/\s+/g, '').length

  // Freeze both the shuffle order AND its random seed for this component's
  // whole lifetime on mount — recomputing per render would reshuffle every
  // time the live clock elsewhere in the hero ticks and re-renders Hero().
  const [order] = useState(() => shuffledIndices(totalChars, Math.floor(Math.random() * 2 ** 31)))
  const rank: number[] = new Array(totalChars)
  order.forEach((charI, position) => {
    rank[charI] = position
  })

  // IMPORTANT: this counter only ever advances across REAL (non-whitespace)
  // characters — it must exactly match the 0..totalChars-1 range the `rank`
  // array above was built for. Earlier this also advanced across whitespace
  // runs, which silently drifted every later word's index out of bounds
  // (rank[i] === undefined -> NaN -> invalid CSS -> transition-delay
  // silently reset to 0s), causing the LAST word(s) in a sentence to appear
  // instantly instead of on their proper staggered turn.
  let charIndex = 0

  return (
    <span ref={ref} className={className}>
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          return word
        }
        const startIndex = charIndex
        charIndex += word.length
        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.split('').map((ch, ci) => {
              const i = startIndex + ci
              return (
                <span
                  key={i}
                  className={`scatter-char ${revealed ? 'is-revealed' : ''}`}
                  style={{ transitionDelay: `${delay + rank[i] * (stagger / 1000)}s` }}
                >
                  {exitProgress ? <ScatterCharExit ch={ch} index={i} exitProgress={exitProgress} /> : ch}
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
  index,
  exitProgress,
}: {
  ch: string
  index: number
  exitProgress: MotionValue<number>
}) {
  // Small, deterministic per-character exit drift — independent of the
  // (movement-free) entrance above; only used once scrolling away.
  const rand = mulberry32(index + 1)
  const jx = (rand() - 0.5) * 16
  const jy = (rand() - 0.5) * 16
  const x = useTransform(exitProgress, [0.05, 0.4], [0, jx])
  const y = useTransform(exitProgress, [0.05, 0.4], [0, jy])
  const opacity = useTransform(exitProgress, [0.05, 0.35], [1, 0])

  return (
    <motion.span style={{ display: 'inline-block', x, y, opacity }}>{ch === ' ' ? ' ' : ch}</motion.span>
  )
}
