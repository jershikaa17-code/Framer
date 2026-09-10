import { motion, useReducedMotion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { Counter } from '../animations/Counter'
import { EASE_OUT } from '../animations/variants'
import './hero.css'

export function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion())

  const eyebrowInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
  const eyebrowAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  const statInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
  const statAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <section id="top" className="hero" data-cursor="Let's create">
      <div className="hero__top container">
        <motion.span
          className="eyebrow eyebrow--coord hero__coord"
          initial={eyebrowInitial}
          animate={eyebrowAnimate}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <span className="eyebrow__line" aria-hidden="true" />
          // 00.01°
        </motion.span>
        <motion.span
          className="eyebrow eyebrow--coord hero__coord hero__coord--right"
          initial={eyebrowInitial}
          animate={eyebrowAnimate}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
        >
          34.05°N 118.24°W — LOS ANGELES
        </motion.span>
      </div>

      <div className="container hero__main">
        <h1 className="hero__headline">
          <RevealText text="Digital experiences that" delay={0.15} duration={0.9} blur />
          <RevealText text="connect, scale and perform." delay={0.3} duration={0.9} blur />
        </h1>

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
    </section>
  )
}
