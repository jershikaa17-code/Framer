import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useInView, useMotionValue, useMotionTemplate, animate, useReducedMotion } from 'motion/react'
import { EASE_SOFT } from './variants'

interface MaskRevealProps {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
  once?: boolean
  amount?: number
}

// Reveals its children through a wipe mask (`mask-image`/`-webkit-mask-image`)
// rather than a plain opacity fade — the mask's stop position is driven by a
// Motion value through `useMotionTemplate` so the gradient itself animates,
// not just the element's opacity. Paired with a soft opacity fade so the
// edge doesn't look like a hard cutout mid-wipe.
export function MaskReveal({
  children,
  className = '',
  duration = 1,
  delay = 0,
  once = true,
  amount = 0.4,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount })
  const shouldReduceMotion = useReducedMotion()
  const progress = useMotionValue(0)
  const maskImage = useMotionTemplate`linear-gradient(to right, black ${progress}%, transparent ${progress}%)`

  useEffect(() => {
    if (!inView) return
    if (shouldReduceMotion) {
      progress.set(100)
      return
    }
    const controls = animate(progress, 100, { duration, delay, ease: EASE_SOFT })
    return () => controls.stop()
  }, [inView, duration, delay, shouldReduceMotion, progress])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        opacity: shouldReduceMotion ? 1 : undefined,
        willChange: 'opacity',
      }}
      initial={{ opacity: 0.001 }}
      animate={inView ? { opacity: 1 } : undefined}
      transition={{ duration: duration * 0.6, delay, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  )
}
