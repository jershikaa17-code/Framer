import { Fragment } from 'react'
import { motion } from 'motion/react'
import { EASE_REVEAL } from './variants'

interface CharRevealProps {
  text: string
  as?: 'span' | 'p'
  className?: string
  /** Starting vertical offset in px — 8 for small labels/coordinates, 30 for
   * larger character-split text (matches the reference's own two sizes). */
  offset?: number
  stagger?: number
  delay?: number
  once?: boolean
  amount?: number
}

// Per-character reveal: opacity:0.001 -> 1, translateY(offset) -> 0, one span
// per character — this is how the reference itself animates short labels
// (coordinate markers, timestamps, small metadata) rather than sliding the
// whole string in as one block.
export function CharReveal({
  text,
  as = 'span',
  className = '',
  offset = 8,
  stagger = 0.018,
  delay = 0,
  once = true,
  amount = 0.6,
}: CharRevealProps) {
  const Tag = motion[as] as typeof motion.span

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {text.split('').map((ch, i) => (
        <Fragment key={i}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { opacity: 0.001, y: offset },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_REVEAL } },
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </Fragment>
      ))}
    </Tag>
  )
}
