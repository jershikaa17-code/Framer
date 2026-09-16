'use client'

import { motion, type MotionValue } from 'framer-motion'

const words = [
  { text: 'Create', className: 'text-accent' },
  { text: '\\', className: 'text-white' },
  { text: 'Studio', className: 'text-white' },
]

export function HeroWordmark({
  y,
  opacity,
}: {
  y: MotionValue<number>
  opacity: MotionValue<number>
}) {
  return (
    <motion.h2
      style={{ y, opacity }}
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center whitespace-nowrap font-display text-[clamp(56px,10.5vw,160px)] font-bold leading-none tracking-[-0.07em]"
    >
      {words.map((word, i) => (
        <span key={word.text} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${word.className}`}
            initial={{ y: '100%', scale: 1.06 }}
            animate={{ y: '0%', scale: 1 }}
            transition={{ duration: 1.1, delay: 0.7 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            {word.text}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}
