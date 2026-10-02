import { motion } from 'motion/react'
import { EASE_OUT } from './variants'

interface TypeRevealProps {
  text: string
  as?: 'span' | 'p'
  className?: string
  /** Seconds before the first character starts — lets a parent sequence
   * several lines one after another (see TrustGrid's tagline card). */
  startDelay?: number
  once?: boolean
  amount?: number
}

const CHAR_STAGGER = 0.085
const CHAR_DURATION = 0.3

// Letter-by-letter "typing" reveal: each character slides in from the right
// (x: 20 -> 0) while fading in, one every 85ms — matches the reference
// site's "why choose us" first card (jovingj24jan-png.github.io/create-studio-site)
// exactly, rather than the project's usual vertical mask reveal.
export function TypeReveal({
  text,
  as = 'span',
  className = '',
  startDelay = 0,
  once = true,
  amount = 0.6,
}: TypeRevealProps) {
  const Tag = motion[as] as typeof motion.span
  const chars = Array.from(text)

  return (
    <Tag
      className={className}
      style={{ whiteSpace: 'pre' }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: CHAR_STAGGER, delayChildren: startDelay } },
      }}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          variants={{
            hidden: { opacity: 0.001, x: 20 },
            show: { opacity: 1, x: 0, transition: { duration: CHAR_DURATION, ease: EASE_OUT } },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </Tag>
  )
}

// Computes the startDelay for the Nth line of a typed sequence, replicating
// the reference's own pacing: each line begins 0.22s after the previous
// line's last character was dispatched (not after it finishes animating —
// the ~80ms overlap with that letter's own 0.3s animation is intentional).
export function typeSequenceDelay(lines: string[], index: number, base = 0): number {
  let delay = base
  for (let i = 0; i < index; i += 1) {
    const len = Array.from(lines[i]).length
    delay += (len - 1) * CHAR_STAGGER + 0.22
  }
  return delay
}
