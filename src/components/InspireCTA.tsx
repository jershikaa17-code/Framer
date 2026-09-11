import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { RevealText } from '../animations/RevealText'
import { Counter } from '../animations/Counter'
import { fadeUp, fadeLeft, fadeRight } from '../animations/variants'
import './inspire-cta.css'

const arrow = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <path
      d="M7 17 17 7M17 7H9M17 7v8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function InspireCTA() {
  return (
    <section className="inspire-cta section">
      <div className="container inspire-cta__grid">
        <motion.div
          className="inspire-cta__stats"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
        >
          <h2 className="inspire-cta__years">
            <Counter value={9} /> years
          </h2>
          <p className="inspire-cta__stats-sub">
            Building lasting partnerships, scaling brands, and shipping work that stands out.
          </p>

          <div className="inspire-cta__row">
            <div className="inspire-cta__stat">
              <span className="inspire-cta__stat-value">
                <Counter value={120} suffix="+" />
              </span>
              <span className="inspire-cta__stat-label">Projects delivered</span>
            </div>
            <div className="inspire-cta__stat">
              <span className="inspire-cta__stat-value">
                <Counter value={99} suffix="%" />
              </span>
              <span className="inspire-cta__stat-label">On-time launches</span>
            </div>
            <div className="inspire-cta__stat">
              <span className="inspire-cta__stat-value">
                <Counter value={84} suffix="%" />
              </span>
              <span className="inspire-cta__stat-label">Average boost in engagement</span>
            </div>
          </div>

          <span className="inspire-cta__range">2016 — 2025</span>
        </motion.div>

        <motion.div
          className="inspire-cta__quote"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeRight}
        >
          <h3 className="inspire-cta__quote-title">
            <RevealText text="Let us inspire your next project" />
          </h3>
          <p className="inspire-cta__quote-text">
            &ldquo;We listen first, stay transparent, and deliver what we promise. Every project
            matters to us.&rdquo;
          </p>

          <div className="inspire-cta__person">
            <img src="assets/portrait-tobias.jpg" alt="Tobias Neumann" />
            <div>
              <p className="inspire-cta__person-name">Tobias Neumann</p>
              <p className="inspire-cta__person-role">CEO of Create®</p>
            </div>
          </div>

          <motion.div variants={fadeUp}>
            <Link to="/contact" className="inspire-cta__link">
              Book an intro call {arrow}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
