import { useRef } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Counter } from '../animations/Counter'
import { useBlobVideoUrl } from '../hooks/useBlobVideoUrl'
import { useInViewOnce } from '../hooks/useInViewOnce'
import { fadeUp, fadeLeft, fadeRight } from '../animations/variants'
import './inspire-cta.css'

const arrow = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <path
      d="M4 12h16M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function InspireCTA() {
  const quoteVideoUrl = useBlobVideoUrl(`${import.meta.env.BASE_URL}assets/inspire-portrait-bg.mp4`)
  // The section itself is clip-path-collapsed to zero width in its hidden
  // state (for the center-out reveal), so it never registers as intersecting
  // on its own — watch an unclipped sentinel placed right before it instead
  // (see useInViewOnce.ts), then apply the resulting class to the section.
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [, sectionRevealed] = useInViewOnce<HTMLDivElement>(0.15, sentinelRef)

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 0 }} />
      <section className={`inspire-cta section ${sectionRevealed ? 'is-revealed' : ''}`}>
      {quoteVideoUrl && (
        <video className="inspire-cta__bg-video" src={quoteVideoUrl} autoPlay muted loop playsInline />
      )}
      <div className="inspire-cta__bg-scrim" />

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

          <ul className="inspire-cta__row">
            <li className="inspire-cta__stat">
              <span className="inspire-cta__stat-plus" aria-hidden="true">+</span>
              <span className="inspire-cta__stat-value">
                <Counter value={120} suffix="+" />
              </span>{' '}
              projects delivered
            </li>
            <li className="inspire-cta__stat">
              <span className="inspire-cta__stat-plus" aria-hidden="true">+</span>
              <span className="inspire-cta__stat-value">
                <Counter value={99} suffix="%" />
              </span>{' '}
              on-time launches
            </li>
            <li className="inspire-cta__stat">
              <span className="inspire-cta__stat-plus" aria-hidden="true">+</span>
              <span className="inspire-cta__stat-value">
                <Counter value={84} suffix="%" />
              </span>{' '}
              average boost in engagement
            </li>
          </ul>

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
            Let us <em>inspire</em> your next project
          </h3>

          <div className="inspire-cta__testimonial">
            <img
              className="inspire-cta__portrait-img"
              src={`${import.meta.env.BASE_URL}assets/portrait-tobias.jpg`}
              alt="Tobias Neumann"
            />
            <div className="inspire-cta__testimonial-text">
              <p className="inspire-cta__quote-text">
                &ldquo;We listen first, stay transparent, and deliver what we promise. Every project
                matters to us.&rdquo;
              </p>
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
    </>
  )
}
