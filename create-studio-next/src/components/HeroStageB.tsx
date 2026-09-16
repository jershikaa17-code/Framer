'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'framer-motion'

const TEXT = "let's create"

// Two stacked copies of the same text: a dim "embossed" base copy, and a
// second copy clipped to a radial gradient that follows the cursor (touch
// devices get a 6s left-right sweep instead) so the letters glow
// orange-to-warm-white only where the spotlight passes over them.
//
// True "type passes behind the subject" compositing needs a real alpha-
// cutout video of the subject, which isn't available here — this
// approximates it by layering the same background video on top of the text
// with a lighten blend, so its brighter (subject) pixels visually sit over
// the type while darker background stays closer to see-through.
export function HeroStageB({ opacity }: { opacity: MotionValue<number> }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue('50%')
  const y = useMotionValue('50%')
  const springX = useSpring(x, { stiffness: 120, damping: 20 })
  const springY = useSpring(y, { stiffness: 120, damping: 20 })
  const gradient = useMotionTemplate`radial-gradient(circle 320px at ${springX} ${springY}, #FF6041 0%, #FFB08A 45%, transparent 70%)`

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (reduceMotion) return

    if (isTouch) {
      let raf: number
      let start: number | undefined
      const loop = (t: number) => {
        if (start === undefined) start = t
        const progress = ((t - start) % 6000) / 6000
        x.set(`${progress * 100}%`)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      return () => cancelAnimationFrame(raf)
    }

    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      x.set(`${((e.clientX - rect.left) / rect.width) * 100}%`)
      y.set(`${((e.clientY - rect.top) / rect.height) * 100}%`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduceMotion, x, y])

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      className="absolute inset-0 flex items-end justify-center pb-[8%]"
    >
      <div className="relative">
        <span
          className="block whitespace-nowrap font-display text-[clamp(64px,12vw,200px)] font-bold leading-none tracking-[-0.07em]"
          style={{ color: '#2A2A2A' }}
        >
          {TEXT}
        </span>
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block whitespace-nowrap bg-clip-text font-display text-[clamp(64px,12vw,200px)] font-bold leading-none tracking-[-0.07em] text-transparent"
          style={{ backgroundImage: gradient }}
        >
          {TEXT}
        </motion.span>
      </div>
    </motion.div>
  )
}
