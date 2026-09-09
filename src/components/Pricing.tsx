import { useState } from 'react'
import { motion } from 'motion/react'
import { pricingPlans } from '../data/pricing'
import { RevealText } from '../animations/RevealText'
import { fadeUp } from '../animations/variants'
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

const closeIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const clockIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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

export function Pricing() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="pricing section">
      <div className="container pricing__head">
        <span className="eyebrow">// 00.07°</span>
        <h2 className="pricing__title">
          <RevealText text="Plans built to fit your next project" />
        </h2>
        <p className="pricing__sub">
          —— Designed around your specs, each plan gives you clarity on scope, features, and cost
          so you can move forward with confidence.
        </p>
        <div className="pricing__dashes" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>

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
                <span className="pricing-card__toggle">{isOpen ? closeIcon : plusIcon}</span>
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
                        <img src={plan.image} alt="" loading="lazy" />
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
