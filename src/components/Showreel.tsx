import { motion } from 'motion/react'
import { scaleReveal } from '../animations/variants'
import './showreel.css'

export function Showreel() {
  return (
    <section className="showreel">
      <div className="showreel__head">
        <span className="eyebrow">Showreel</span>
        <span className="showreel__rule" />
        <span className="showreel__year-tag">{'\\2026'}</span>
      </div>

      <motion.div
        className="showreel__frame"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={scaleReveal}
      >
        <img src="/assets/showreel.jpg" alt="Create Studio showreel still" />
        <div className="showreel__overlay" />
        <button
          className="showreel__play"
          data-cursor="Play showreel"
          data-cursor-icon="play"
          aria-label="Play showreel"
        >
          <span className="showreel__play-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      </motion.div>
    </section>
  )
}
