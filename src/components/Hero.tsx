import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { Counter } from '../animations/Counter'
import { EASE_OUT } from '../animations/variants'
import './hero.css'

// Phase curve shared by every exiting element: mostly visible through 35%,
// fading faster through the middle, essentially gone by 75-100%.
const OPACITY_STOPS = [0, 0.35, 0.75, 1]

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Raw `transform` strings (rather than Motion's x/y/scale shorthands) so this
  // scroll-linked exit never fights with the entrance `initial`/`animate` that
  // runs on the elements underneath it.
  function useExitTransform(distance: number) {
    return useTransform(
      scrollYProgress,
      [0, 1],
      ['translateY(0px)', `translateY(${shouldReduceMotion ? 0 : -distance}px)`]
    )
  }
  function useExitOpacity() {
    return useTransform(scrollYProgress, OPACITY_STOPS, shouldReduceMotion ? [1, 1, 1, 1] : [1, 0.92, 0.3, 0])
  }

  const eyebrowExitT = useExitTransform(25)
  const eyebrowExitO = useExitOpacity()
  const headingExitT = useExitTransform(80)
  const headingExitO = useExitOpacity()
  const statExitT = useExitTransform(60)
  const statExitO = useExitOpacity()

  const eyebrowInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
  const eyebrowAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  const statInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
  const statAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <section id="top" ref={heroRef} className="hero" data-cursor="Let's create">
      <div className="hero__top container">
        <motion.div style={{ transform: eyebrowExitT, opacity: eyebrowExitO }}>
          <motion.span
            className="eyebrow hero__coord"
            initial={eyebrowInitial}
            animate={eyebrowAnimate}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            // 00.01°
          </motion.span>
        </motion.div>
        <motion.div style={{ transform: eyebrowExitT, opacity: eyebrowExitO }}>
          <motion.span
            className="eyebrow hero__coord hero__coord--right"
            initial={eyebrowInitial}
            animate={eyebrowAnimate}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
          >
            34.05°N 118.24°W — LOS ANGELES
          </motion.span>
        </motion.div>
      </div>

      <div className="container hero__main">
        <motion.div style={{ transform: headingExitT, opacity: headingExitO }}>
          <h1 className="hero__headline">
            <RevealText text="Digital experiences that" delay={0.15} duration={0.9} blur />
            <RevealText text="connect, scale and perform." delay={0.3} duration={0.9} blur />
          </h1>
        </motion.div>

        <motion.div style={{ transform: statExitT, opacity: statExitO }} className="hero__stat">
          <motion.span
            className="hero__stat-number"
            initial={statInitial}
            animate={statAnimate}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.65 }}
          >
            <Counter value={10} suffix="+" duration={1.4} />
          </motion.span>
          <motion.p
            className="hero__stat-label"
            initial={statInitial}
            animate={statAnimate}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.73 }}
          >
            Quietly making noise for brands worldwide
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
