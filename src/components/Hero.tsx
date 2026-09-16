import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { CharReveal } from '../animations/CharReveal'
import { Counter } from '../animations/Counter'
import { Intro } from './Intro'
import { TimeLocation } from './TimeLocation'
import { CTAArea } from './CTAArea'
import { EASE_OUT } from '../animations/variants'
import './hero.css'

// Scroll ranges (raw scrollY px) for each chapter that follows `let's
// create`, all sharing the same [fade in start, fade in end, fade out
// start, fade out end] -> [0,1,1,0] opacity shape, with a small rise on the
// way in. `let's create` (per its own -0.8x/bottom:-500px math) has fully
// cleared the clip by roughly 1750-1950px on typical viewport heights, so
// the Intro chapter picks up from there.
// `.hero-pin`'s spacer height in hero.css must reserve at least this much
// scroll room (CTA_RANGE's last value) for the last chapter to fully exit
// before the pin releases.
const INTRO_RANGE = [1900, 2200, 2700, 3000] as const
const TIME_RANGE = [3000, 3300, 3800, 4100] as const
const CTA_RANGE = [4100, 4400, 4900, 5200] as const

export function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion())

  const [bgVisible, setBgVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setBgVisible(true), 16)
    return () => clearTimeout(timer)
  }, [])

  // Raw, unsmoothed scroll-linked transforms — no spring, no easing, no
  // whileInView. `.hero` is pinned (position: sticky) inside `.hero-pin`'s
  // tall spacer, so its own on-screen position holds still while these
  // transforms play out — without that, the hero scrolling away at the same
  // time as this transform made `let's create` appear to enter already
  // high on screen instead of rising from the bottom.
  const { scrollY } = useScroll()
  const headlineY = useTransform(scrollY, (v) => (shouldReduceMotion ? 0 : v * -0.7))
  const letsCreateY = useTransform(scrollY, (v) => (shouldReduceMotion ? 0 : v * -0.8))

  const introOpacity = useTransform(scrollY, [...INTRO_RANGE], [0, 1, 1, 0])
  const introY = useTransform(scrollY, [INTRO_RANGE[0], INTRO_RANGE[1]], [40, 0])

  const timeOpacity = useTransform(scrollY, [...TIME_RANGE], [0, 1, 1, 0])
  const timeY = useTransform(scrollY, [TIME_RANGE[0], TIME_RANGE[1]], [40, 0])

  const ctaOpacity = useTransform(scrollY, [...CTA_RANGE], [0, 1, 1, 0])
  const ctaY = useTransform(scrollY, [CTA_RANGE[0], CTA_RANGE[1]], [40, 0])
  const ctaPointer = useTransform(ctaOpacity, (v) => (v > 0.5 ? 'auto' : 'none'))

  const statInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
  const statAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <div className="hero-pin">
      <section id="top" className="hero" data-cursor="Let's create">
        <div className={`hero__bg ${bgVisible ? 'is-visible' : ''}`} aria-hidden="true">
          <img src="assets/hero-portrait.png" alt="" />
        </div>
        <div className="hero__tint" aria-hidden="true" />

        <div className="hero__top container">
          <span className="eyebrow eyebrow--coord hero__coord">
            <span className="eyebrow__line" aria-hidden="true" />
            <CharReveal text="// 00.01°" />
          </span>
          <span className="eyebrow eyebrow--coord hero__coord hero__coord--right">
            <CharReveal text="34.05°N 118.24°W — LOS ANGELES" delay={0.08} />
          </span>
        </div>

        <div className="container hero__main">
          <div className="hero__headline-mask">
            <motion.h1 className="hero__headline" style={{ y: headlineY }}>
              Digital experiences that
              <br />
              connect, scale and perform.
            </motion.h1>
          </div>

          <div className="hero__stat">
            <motion.span
              className="hero__stat-number"
              initial={statInitial}
              animate={statAnimate}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.65 }}
            >
              <Counter value={120} suffix="+" duration={1.4} />
            </motion.span>
            <motion.p
              className="hero__stat-label"
              initial={statInitial}
              animate={statAnimate}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.73 }}
            >
              Quietly making noise for brands worldwide
            </motion.p>
          </div>
        </div>

        <motion.div className="hero__lets-create-wrap" style={{ x: '-50%', y: letsCreateY }}>
          <span className="hero__lets-create">let&rsquo;s create</span>
        </motion.div>

        <motion.div className="hero__chapter" style={{ opacity: introOpacity, y: introY }}>
          <Intro />
        </motion.div>

        <motion.div className="hero__chapter" style={{ opacity: timeOpacity, y: timeY }}>
          <TimeLocation />
        </motion.div>

        <motion.div className="hero__chapter" style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}>
          <CTAArea />
        </motion.div>
      </section>
    </div>
  )
}
