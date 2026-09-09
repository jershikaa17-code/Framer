import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { Counter } from '../animations/Counter'
import { EASE_OUT } from '../animations/variants'
import './hero.css'

export function Hero() {
  return (
    <section id="top" className="hero" data-cursor="Let's create">
      <div className="hero__top container">
        <span className="eyebrow hero__coord">// 00.01°</span>
        <span className="eyebrow hero__coord hero__coord--right">
          34.05°N 118.24°W — LOS ANGELES
        </span>
      </div>

      <div className="container hero__main">
        <h1 className="hero__headline">
          <RevealText text="Digital experiences that" />
          <RevealText text="connect, scale and perform." delay={0.25} />
        </h1>

        <motion.div
          className="hero__stat"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
        >
          <span className="hero__stat-number">
            <Counter value={10} suffix="+" duration={1.4} />
          </span>
          <p className="hero__stat-label">Quietly making noise for brands worldwide</p>
        </motion.div>
      </div>
    </section>
  )
}
