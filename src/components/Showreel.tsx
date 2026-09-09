import { motion } from 'motion/react'
import { scaleReveal, FRAMER_SPRING } from '../animations/variants'
import { ScrambleText } from '../animations/ScrambleText'
import './showreel.css'

export function Showreel() {
  return (
    <section className="showreel">
      <div className="showreel__head">
        <ScrambleText as="span" className="eyebrow" text="Showreel" />
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
          <motion.span
            className="showreel__play-ring"
            aria-hidden="true"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span
            className="showreel__play-icon"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            transition={FRAMER_SPRING}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.span>
        </button>
      </motion.div>
    </section>
  )
}
