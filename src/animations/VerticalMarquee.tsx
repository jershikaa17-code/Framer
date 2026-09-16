import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import './vertical-marquee.css'

interface VerticalMarqueeProps {
  children: ReactNode[]
  /** Full loop duration in seconds — the reference's own vertical slideshow
   * (`section.framer-slideshow.framer-slideshow-axis-y`) runs a continuous
   * 24s linear loop. Do not shorten this to a quick 1-2s reveal. */
  duration?: number
  className?: string
}

// Continuous, seamless vertical ticker: the track renders the items twice
// back-to-back and animates y from 0 to -50% linearly — once the loop
// restarts at -50% the second copy is pixel-identical to the first, so there
// is no visible jump. Freezes entirely under prefers-reduced-motion.
export function VerticalMarquee({ children, duration = 24, className = '' }: VerticalMarqueeProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`vertical-marquee ${className}`}>
      <motion.div
        className="vertical-marquee__track"
        style={{ willChange: 'transform' }}
        animate={shouldReduceMotion ? undefined : { y: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        <div className="vertical-marquee__set">{children}</div>
        <div className="vertical-marquee__set" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
