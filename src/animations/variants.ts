import type { Variants } from 'motion/react'

export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
}

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: EASE_OUT },
  },
}

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1, ease: EASE_OUT },
  },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT } },
}

export const springSnappy = { type: 'spring', stiffness: 400, damping: 28 } as const
export const springSoft = { type: 'spring', stiffness: 220, damping: 24 } as const

export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -4, transition: springSnappy },
}

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.06, transition: springSoft },
}
