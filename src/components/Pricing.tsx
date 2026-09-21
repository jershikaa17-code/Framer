import { useState } from 'react'
import { motion } from 'motion/react'
import { pricingPlans } from '../data/pricing'
import { RevealText } from '../animations/RevealText'
import {
  fadeUp,
  FRAMER_SPRING,
  headerZoom,
  headerEyebrow,
  headerTitle,
  headerSub,
} from '../animations/variants'
import './pricing.css'

const barsIcon = (
  <span className="pricing-card__bars" aria-hidden="true">
    <span />
    <span />
    <span />
    <span />
  </span>
)

const checkIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
    <path d="m8 12.5 2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const plusIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const clockIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const simpleIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 16 16 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const arrowIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path
      d="M7 17 17 7M17 7H9M17 7v8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function nextAvailability() {
  const d = new Date()
  d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7 || 7))
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function Pricing() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="pricing section">
      <motion.div
        className="container pricing__long-run"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="pricing__simple">
          <p className="pricing__big-heading">
            {simpleIcon}
            Simple Pricing
          </p>
          <p className="pricing__simple-sub">
            Plans that scale with your project and give you room for unlimited creative
            opportunities.
          </p>
          <div className="pricing__simple-thumb">
            <img src={`${import.meta.env.BASE_URL}assets/pricing-scale.jpg`} alt="" loading="lazy" />
          </div>
          <p className="pricing__simple-caption">
            Pick a plan that grows with you and keeps creative costs predictable.
          </p>
          <a href="#contact" className="pricing__simple-cta">
            {arrowIcon} Explore plans
          </a>
        </div>

        <div className="pricing__long-run-copy">
          <span className="pricing__long-run-copy-bug" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M6 12c0-2.21 1.79-4 4-4 2.5 0 4.5 2 6 4 1.5 2 3.5 4 6 4 2.21 0 4-1.79 4-4s-1.79-4-4-4c-2.5 0-4.5 2-6 4-1.5 2-3.5 4-6 4-2.21 0-4-1.79-4-4z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="pricing__eyebrow-label">Built for the long run</p>
          <p className="pricing__big-heading">
            With You
            <br />
            Beyond Launch
          </p>
          <ul className="pricing__long-run-list">
            {['Ongoing support', 'Long-term partnership', 'Future-ready builds'].map((item) => (
              <li key={item}>
                {checkIcon}
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="pricing__long-run-book">
          <p className="pricing__eyebrow-label">Quick intro call, no strings attached.</p>
          <p className="pricing__big-heading">Let&rsquo;s chat or just say hello.</p>

          <div className="pricing__book-panel">
            <p className="pricing__book-panel-label">
              {clockIcon} Next Availability
            </p>
            <p className="pricing__book-panel-date">from {nextAvailability()}.</p>
            <a href="#contact" className="pricing__book-panel-cta">
              <span className="pricing__book-panel-cta-icon">{arrowIcon}</span>
              Book now
            </a>
          </div>

          <span className="pricing__book-watermark" aria-hidden="true">
            <span className="pricing__book-watermark-badge">©</span>
            create<sup>®</sup>
          </span>
        </div>
      </motion.div>

      <motion.div
        className="container pricing__head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerZoom}
      >
        <motion.span className="eyebrow" variants={headerEyebrow}>
          // 00.07°
        </motion.span>
        <motion.h2 className="pricing__title" variants={headerTitle}>
          <RevealText text="Pick a plan that grows with you and keeps creative costs predictable." />
        </motion.h2>
        <motion.p className="pricing__sub" variants={headerSub}>
          —— Designed around your specs, each plan gives you clarity on scope, features, and cost
          so you can move forward with confidence.
        </motion.p>
        <div className="pricing__dashes" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </motion.div>

      <div className="container pricing__list">
        {pricingPlans.map((plan, i) => {
          const isOpen = openIndex === i
          return (
            <div className={`pricing-card ${isOpen ? 'is-open' : ''}`} key={plan.index}>
              <button
                className="pricing-card__header"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                {barsIcon}
                <span className="pricing-card__heading">
                  <span className="pricing-card__eyebrow">{plan.eyebrow}</span>
                  <span className="pricing-card__plan-name">{plan.name}</span>
                </span>
                <motion.span
                  className="pricing-card__toggle"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={FRAMER_SPRING}
                >
                  {plusIcon}
                </motion.span>
              </button>

              <div className="pricing-card__body">
                <div className="pricing-card__body-inner">
                  <motion.div
                    className="pricing-card__grid"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                  >
                    <div className="pricing-card__col">
                      <p className="pricing-card__audience">{plan.audience}</p>
                      <div className="pricing-card__price-row">
                        <span className="pricing-card__price">{plan.price}</span>
                        <span className="pricing-card__per">/project</span>
                      </div>
                      <div className="pricing-card__was-row">
                        <span>was {plan.wasPrice}</span>
                        <span className="pricing-card__save">SAVE 20%</span>
                      </div>
                      <div className="pricing-card__thumb">
                        <img src={`${import.meta.env.BASE_URL}${plan.image}`} alt="" loading="lazy" />
                      </div>
                      <p className="pricing-card__desc">{plan.description}</p>
                      <div className="pricing-card__mini-dashes" aria-hidden="true">
                        {Array.from({ length: 22 }).map((_, d) => (
                          <span key={d} />
                        ))}
                      </div>
                    </div>

                    <div className="pricing-card__col pricing-card__col--features">
                      <ul className="pricing-card__features">
                        {plan.features.map((f) => (
                          <li key={f}>
                            {checkIcon}
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pricing-card__col pricing-card__col--cta">
                      <ul className="pricing-card__highlights">
                        {plan.highlights.map((h) => (
                          <li key={h}>
                            <span>+</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      <a href="#contact" className="pricing-card__cta">
                        Get started {arrowIcon}
                      </a>
                      <div className="pricing-card__timeline">
                        {clockIcon}
                        <span>Timeline</span>
                        <span>{plan.timeline}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="container pricing__expert">
        <p className="pricing__expert-title">Ask our expert</p>
        <p className="pricing__expert-sub">
          Schedule a quick call, and we'll walk you through our flexible plans.
        </p>
        <div className="pricing__expert-person">
          <div className="pricing__expert-avatar" aria-hidden="true" />
          <div>
            <p className="pricing__expert-name">Maggie Winslow</p>
            <p className="pricing__expert-role">Project Operations Manager</p>
          </div>
        </div>
        <a href="#contact" className="pricing__expert-cta" aria-label="Book a call">
          {arrowIcon}
        </a>
      </div>
    </section>
  )
}
