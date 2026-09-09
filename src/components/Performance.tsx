import { motion } from 'motion/react'
import { stats } from '../data/stats'
import { Counter } from '../animations/Counter'
import { RevealText } from '../animations/RevealText'
import { fadeUp, staggerContainer } from '../animations/variants'
import './performance.css'

export function Performance() {
  return (
    <section className="performance section">
      <div className="performance__bg" aria-hidden="true">
        <img src="/assets/performance-bg.jpg" alt="" />
      </div>

      <div className="container performance__head">
        <span className="eyebrow">Performance</span>
        <h2 className="performance__title">
          <RevealText text="The proof behind our work" />
        </h2>
        <p className="performance__sub">
          —— From first launches to lasting collaborations, we're trusted to
          deliver on time and at quality.
        </p>
      </div>

      <motion.div
        className="container performance__grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.1)}
      >
        {stats.map((stat) => (
          <motion.div className="stat-card" key={stat.index} variants={fadeUp}>
            <span className="stat-card__value">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="stat-card__label">{stat.label}</span>
            <div className="stat-card__bar">
              <span className="stat-card__bar-fill" />
              <span className="stat-card__bar-index">/{stat.index}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
