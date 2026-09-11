import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { RevealText } from '../animations/RevealText'
import { processStages } from '../data/stats'
import { fadeUp, fadeLeft, staggerContainer } from '../animations/variants'
import './services-overview.css'

const icons: Record<string, JSX.Element> = {
  '01': (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M3 11v2a2 2 0 0 0 2 2h1l3 5V4L6 9H5a2 2 0 0 0-2 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 8a4 4 0 0 1 0 8M17 5a8 8 0 0 1 0 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  '02': (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 2v3M12 19v3M22 12h-3M5 12H2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  '03': (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <rect x="3" y="4" width="14" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 10v4a2 2 0 0 0 2 2h1v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="20" r="1.4" fill="currentColor" />
    </svg>
  ),
  '04': (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path
        d="M12 2c2.5 2.5 4 6 4 9.5S12 22 12 22s-4-6.5-4-10.5S9.5 4.5 12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.5 17 6 21M15.5 17 18 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
}

const arrow = (
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

export function ServicesOverview() {
  return (
    <section className="services-overview section">
      <div className="services-overview__bg" aria-hidden="true" />

      <div className="container services-overview__grid">
        <motion.div
          className="services-overview__intro"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
        >
          <h2 className="services-overview__title">
            <RevealText text="Services built on process, precision, and people." />
          </h2>
          <p className="services-overview__sub">
            We combine strategy, design, content, and technology, giving you a single partner for
            every stage of your brand&rsquo;s growth.
          </p>
          <Link to="/contact" className="services-overview__cta">
            <span className="services-overview__cta-icon">{arrow}</span>
            Chat with our Operations Manager
          </Link>
        </motion.div>

        <motion.div
          className="services-overview__cards"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.08)}
        >
          {processStages.map((stage) => (
            <motion.div className="service-overview-card" key={stage.index} variants={fadeUp}>
              <div className="service-overview-card__head">
                <span className="service-overview-card__icon">{icons[stage.index]}</span>
                <span className="service-overview-card__index">//{stage.index}</span>
              </div>
              <div className="service-overview-card__rule" />
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
