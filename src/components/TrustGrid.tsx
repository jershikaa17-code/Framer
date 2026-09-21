import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { fadeUp, fadeLeft, staggerContainer } from '../animations/variants'
import './trust-grid.css'

const starIcon = (
  <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
    <path d="M10 0l2.6 6.6L20 7.2l-5.4 4.6L16.2 20 10 15.8 3.8 20l1.6-8.2L0 7.2l7.4-.6z" />
  </svg>
)

const pills = [
  { value: '12+', label: 'Industries served' },
  { value: '24H', label: 'Average Response Time' },
  { value: '96%', label: 'First Draft Approved' },
  { value: '99%', label: 'Ship on-Time' },
]

const DOTTED_R = 95
const DOTTED_SPACING = 9

const dottedDots = (() => {
  const pts: { x: number; y: number; ux: number; uy: number; dist: number }[] = []
  for (let x = 0; x <= DOTTED_R * 2; x += DOTTED_SPACING) {
    for (let y = 0; y <= DOTTED_R * 2; y += DOTTED_SPACING) {
      const dx = x - DOTTED_R
      const dy = y - DOTTED_R
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > DOTTED_R) continue
      pts.push({ x, y, ux: dist === 0 ? 0 : dx / dist, uy: dist === 0 ? 0 : dy / dist, dist })
    }
  }
  return pts
})()

export function TrustGrid() {
  return (
    <section className="trust-grid section">
      <div className="container trust-grid__head">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
        >
          <span className="eyebrow">
            <span className="eyebrow__marker" aria-hidden="true" />
            Why Choose Us
          </span>
          <h2 className="trust-grid__title">
            <RevealText text="Designed to Make Your Life Easier" />
          </h2>
          <p className="trust-grid__sub">
            Clear process, quick reviews, and a clean launch at the end. We keep the steps simple
            so projects never get stuck.
          </p>
        </motion.div>
      </div>

      <div className="trust-grid__dashes container" aria-hidden="true" />

      <motion.div
        className="container trust-grid__cards"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer(0.08)}
      >
        <motion.div className="trust-card trust-card--tagline" variants={fadeUp}>
          <div className="trust-card__tagline">
            <RevealText text="we listen." as="span" className="trust-card__tagline-line" delay={0} />
            <RevealText text="we imagine." as="span" className="trust-card__tagline-line" delay={0.12} />
            <RevealText
              text="we create."
              as="span"
              className="trust-card__tagline-line trust-card__tagline-accent"
              delay={0.24}
            />
          </div>
          <div className="trust-card__dots" aria-hidden="true">
            <motion.span
              className="trust-card__dots-spot"
              animate={{ x: [0, 0, 133, 133, 270, 270, 0] }}
              transition={{
                duration: 6,
                times: [0, 0.1, 0.35, 0.45, 0.7, 0.9, 1],
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
            <span />
            <span />
            <span className="trust-card__dots-last" />
          </div>
          <p className="trust-card__foot">
            <span className="trust-card__hatch" aria-hidden="true" />
            <span>Ideas</span> that start with you
          </p>
        </motion.div>

        <motion.div className="trust-card trust-card--stats" variants={fadeUp}>
          <div className="trust-card__stats-head">
            <h3>Client Satisfaction Rate</h3>
            <span className="trust-card__stats-divider" aria-hidden="true" />
            <span className="trust-card__big-stat">99.9%</span>
          </div>

          <div className="trust-card__pills">
            {pills.map((pill) => (
              <span className="trust-pill" key={pill.label}>
                <span className="trust-pill__value">{pill.value}</span>
                {pill.label}
              </span>
            ))}
          </div>

          <div className="trust-grid__rating">
            <span className="trust-grid__stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{starIcon}</span>
              ))}
            </span>
            <span className="trust-grid__score">
              5 / 5 <span className="trust-grid__reviews-count">(98 reviews)</span>
            </span>
          </div>
          <p className="trust-grid__backed">
            Backed by feedback from <strong>120+</strong> brands we&rsquo;ve worked with.
          </p>
        </motion.div>

        <motion.div className="trust-card trust-card--fresh" variants={fadeUp}>
          <p className="trust-card__eyebrow-line">No reheated or pre-made.</p>
          <h3>Every project starts fresh.</h3>
          <div className="trust-card__fresh-row">
            <span className="trust-card__grip" aria-hidden="true">
              <span />
            </span>
            <span className="trust-card__grip trust-card__grip--quad" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <div className="trust-card__dotted-mark" aria-hidden="true">
              <svg
                className="trust-card__dotted-svg"
                viewBox={`0 0 ${DOTTED_R * 2} ${DOTTED_R * 2}`}
                preserveAspectRatio="xMidYMid meet"
              >
                {dottedDots.map((d, i) => (
                  <circle
                    key={i}
                    cx={d.x}
                    cy={d.y}
                    r={1.4}
                    className="trust-card__dotted-dot"
                    style={
                      {
                        '--ux': d.ux,
                        '--uy': d.uy,
                        animationDelay: `${(d.dist * 18).toFixed(0)}ms`,
                      } as CSSProperties
                    }
                  />
                ))}
              </svg>
              <span className="trust-card__dotted-logo">
                create<sup>®</sup>
              </span>
            </div>
          </div>
          <p className="trust-card__foot">
            <span className="trust-card__hatch" aria-hidden="true" />
            <span>Custom work</span> from day one.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
