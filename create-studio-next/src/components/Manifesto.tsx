'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const lines = [
  { text: 'we listen', accent: false },
  { text: 'we imagine', accent: false },
  { text: 'we create', accent: true },
  { text: 'beautiful things', accent: false },
]

function ManifestoLine({ text, accent, index }: { text: string; accent: boolean; index: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: '100%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, amount: 0.75 }}
        transition={{ duration: 1, delay: index * 0.1, ease: EASE }}
      >
        <motion.span
          initial={accent ? { color: '#000000' } : undefined}
          whileInView={accent ? { color: '#FF6041' } : undefined}
          viewport={{ once: true, amount: 0.75 }}
          transition={accent ? { duration: 0.6, delay: index * 0.1 + 1.25 } : undefined}
        >
          {text}
        </motion.span>
      </motion.span>
    </span>
  )
}

export function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1])
  const blockScale = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.96, 1.04, 1.04])
  const blockY = useTransform(scrollYProgress, [0.15, 0.85], [-30, 30])
  const exitOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0])
  const exitBlur = useTransform(scrollYProgress, [0.8, 1], [0, 6])
  const exitFilter = useTransform(exitBlur, (b) => `blur(${b}px)`)

  return (
    <section ref={sectionRef} className="relative min-h-[140svh] overflow-hidden bg-off">
      <motion.video
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        src="/assets/water.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={reduceMotion ? undefined : { scale: videoScale }}
      />

      <div className="sticky top-1/2 z-10 flex -translate-y-1/2 justify-center px-5 py-40">
        <motion.div
          style={
            reduceMotion
              ? undefined
              : { scale: blockScale, y: blockY, opacity: exitOpacity, filter: exitFilter }
          }
          className="text-center font-display text-[clamp(44px,9.35vw,140px)] font-semibold leading-none tracking-[-0.04em] text-black"
        >
          {lines.map((line, i) => (
            <ManifestoLine key={line.text} text={line.text} accent={line.accent} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
