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

// Image reveal: wipes up from a bottom mask while zooming down from a slight
// overscan and fading in — the "clip-path reveal" used for content photography.
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.12, opacity: 0.001 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_OUT },
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

// The following are pulled directly from the shipped Framer site's own
// `framer/appear` animation data (framer.html) — the shared "Header" component
// used identically by Services, Performance, Pricing and HowWeWork.
export const headerZoom: Variants = {
  hidden: { opacity: 0, scale: 1.14 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.68, 0, 0.16, 0.97] },
  },
}

export const headerEyebrow: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.2, duration: 1, delay: 0.3 },
  },
}

export const headerTitle: Variants = {
  hidden: { opacity: 0, y: 140 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 27, mass: 0.3, stiffness: 100, delay: 0.3 },
  },
}

export const headerSub: Variants = {
  hidden: { opacity: 0, y: 140 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 27, mass: 0.3, stiffness: 100, delay: 0.5 },
  },
}

// The small accent line inside each section's eyebrow tag draws in from the left.
export const headerLine: Variants = {
  hidden: { x: -100 },
  show: { x: 0, transition: { duration: 1, ease: [0.55, 0.58, 0.34, 1.04] } },
}

// Performance's 4 stat numbers fade in together — no stagger, no slide.
export const statFade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0, 1.2, 0.56, 1], delay: 0.8 },
  },
}

// A handful of additional eases pulled from the same compiled bundle,
// used by CharReveal and other per-character/small-label reveals. Framer
// re-uses these across many different elements rather than inventing a new
// curve per component, so most reveals on the reference site resolve to one
// of this small set (plus headerZoom/headerLine/statFade's curves above).
export const EASE_REVEAL = [0.55, 0.58, 0.34, 1.04] as const // same curve as headerLine — the most common "settle in" ease site-wide
export const EASE_ENTER = [0.68, 0, 0.2, 0.89] as const
export const EASE_SOFT = [0.29, 0.84, 0.56, 1] as const
export const EASE_SNAP = [0.02, 0.79, 0.56, 1] as const
export const EASE_GLIDE = [0.32, 0.43, 0.22, 1] as const

export const springSnappy = { type: 'spring', stiffness: 400, damping: 28 } as const
export const springSoft = { type: 'spring', stiffness: 220, damping: 24 } as const

// Pulled straight from createstudio.framer.media's compiled bundle — this is the
// exact spring (bounce/duration form) Framer uses for nearly all of its hover & tap states.
export const FRAMER_SPRING = { type: 'spring', bounce: 0.2, duration: 0.4 } as const

export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -4, transition: springSnappy },
}

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.06, transition: springSoft },
}

// Image zoom-on-hover used across the reference site's project/case-study and
// service cards — parent needs `overflow: hidden` for the clip effect.
export const imgHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: FRAMER_SPRING },
}

export const scrimHover: Variants = {
  rest: { opacity: 1 },
  hover: { opacity: 0.75, transition: FRAMER_SPRING },
}
