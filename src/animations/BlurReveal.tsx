import { Fragment } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE_SOFT } from './variants'

interface BlurRevealProps {
  text: string
  as?: 'span' | 'p' | 'h2' | 'h3'
  className?: string
  /** Reference splits this text into ~7 segments (`span:nth-child(1..7)`) —
   * default splits on spaces (word groups); pass a custom splitter for other
   * groupings. */
  splitOn?: RegExp | string
  duration?: number
  stagger?: number
  delay?: number
  once?: boolean
  amount?: number
}

// Blur-to-clear text reveal: filter:blur(Npx)->blur(0) + opacity 0->1 per
// segment, 1500ms — the reference's `framer-1uc1lju` paragraph. Deliberately
// keeps `filter` in the animated properties rather than dropping to a plain
// opacity fade, since the blur-clearing is the whole point of this effect.
export function BlurReveal({
  text,
  as = 'span',
  className = '',
  splitOn = ' ',
  duration = 1.5,
  stagger = 0.09,
  delay = 0,
  once = true,
  amount = 0.6,
}: BlurRevealProps) {
  const Tag = motion[as] as typeof motion.span
  const shouldReduceMotion = useReducedMotion()
  const segments = text.split(splitOn)

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
      {segments.map((segment, i) => (
        <Fragment key={i}>
          <motion.span
            style={{ display: 'inline-block', willChange: 'filter, opacity' }}
            variants={{
              hidden: shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0.001, filter: 'blur(10px)' },
              show: {
                opacity: 1,
                filter: 'blur(0px)',
                transition: { duration, ease: EASE_SOFT },
              },
            }}
          >
            {segment}
          </motion.span>
          {i !== segments.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
