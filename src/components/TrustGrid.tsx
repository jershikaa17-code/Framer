import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { RevealText } from '../animations/RevealText'
import { Counter } from '../animations/Counter'
import { fadeUp, fadeLeft, staggerContainer } from '../animations/variants'
import './trust-grid.css'

export function TrustGrid() {
  return (
    <section className="trust-grid section">
      <div className="container trust-grid__layout">
        <motion.div
          className="trust-grid__intro"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
        >
          <span className="eyebrow">
            <span className="eyebrow__marker" aria-hidden="true" />
            Why Create
          </span>
          <h2 className="trust-grid__title">
            <RevealText text="Built around how you actually work." />
          </h2>
          <p className="trust-grid__sub">
            From onboarding to handoff, every engagement is shaped around clarity, speed, and the
            way your team already moves.
          </p>
          <Link to="/contact" className="trust-grid__cta">
            Let&rsquo;s talk it through
          </Link>
          <p className="trust-grid__cta-note">No pressure, just a conversation about what you need.</p>
        </motion.div>

        <motion.div
          className="trust-grid__cards"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.08)}
        >
          <motion.div className="trust-card trust-card--wide" variants={fadeUp}>
            <span className="trust-card__dots" aria-hidden="true">
              {Array.from({ length: 40 }).map((_, i) => {
                const angle = i * 137.508
                const radius = 3 + Math.sqrt(i) * 5.2
                return (
                  <span key={i} style={{ transform: `rotate(${angle}deg) translate(${radius}px)` }} />
                )
              })}
            </span>
            <h3>A clean slate, every time.</h3>
            <p>
              No recycled templates or leftover assumptions — every project starts from what your
              brand actually needs.
            </p>
          </motion.div>

          <motion.div className="trust-card" variants={fadeUp}>
            <span className="trust-card__stat">
              <Counter value={98} suffix="%" />
            </span>
            <p>On-time delivery across every engagement.</p>
          </motion.div>

          <motion.div className="trust-card" variants={fadeUp}>
            <h3>Shaped by real feedback.</h3>
            <p>Refined continually through input from the 120+ brands we&rsquo;ve partnered with.</p>
          </motion.div>

          <motion.div className="trust-card" variants={fadeUp}>
            <h3>Custom, from day one.</h3>
            <p>
              No generic starter kits — every deliverable is built specifically for your brand from
              the first call.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
