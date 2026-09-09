import { motion } from 'motion/react'
import { stats } from '../data/stats'
import { Counter } from '../animations/Counter'
import { RevealText } from '../animations/RevealText'
import { ScrambleText } from '../animations/ScrambleText'
import {
  headerZoom,
  headerEyebrow,
  headerTitle,
  headerSub,
  headerLine,
  statFade,
} from '../animations/variants'
import './performance.css'

export function Performance() {
  return (
    <section className="performance section">
      <div className="performance__bg" aria-hidden="true">
        <img src="/assets/performance-bg.jpg" alt="" />
      </div>

      <motion.div
        className="container performance__head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerZoom}
      >
        <motion.div variants={headerEyebrow}>
          <span className="eyebrow">
            <span className="eyebrow__marker" aria-hidden="true" />
            <motion.span className="eyebrow__line" variants={headerLine} aria-hidden="true" />
            <ScrambleText as="span" text="Performance" />
          </span>
        </motion.div>
        <motion.h2 className="performance__title" variants={headerTitle}>
          <RevealText text="The proof behind our work" />
        </motion.h2>
        <motion.p className="performance__sub" variants={headerSub}>
          —— From first launches to lasting collaborations, we're trusted to
          deliver on time and at quality.
        </motion.p>
      </motion.div>

      <motion.div
        className="container performance__grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={statFade}
      >
        {stats.map((stat) => (
          <div className="stat-card" key={stat.index}>
            <span className="stat-card__value">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="stat-card__label">{stat.label}</span>
            <div className="stat-card__bar">
              <span className="stat-card__bar-fill" />
              <span className="stat-card__bar-index">/{stat.index}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
