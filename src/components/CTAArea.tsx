import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { springSnappy } from '../animations/variants'
import './cta-area.css'

const MotionLink = motion.create(Link)

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

// Rendered as a scroll-linked chapter inside Hero.tsx's pinned frame now —
// see the note in Intro.tsx. The `cta-pill` hover/tap springs stay, since
// those are interaction feedback, unrelated to scroll-triggered entrance.
export function CTAArea() {
  return (
    <section className="cta-area section">
      <div className="container cta-area__inner">
        <span className="eyebrow">// 00.04°</span>
        <div className="cta-area__row">
          <MotionLink
            to="/work"
            className="cta-pill cta-pill--accent"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
          >
            See work <span className="cta-pill__icon">{arrow}</span>
          </MotionLink>
          <MotionLink
            to="/contact"
            className="cta-pill cta-pill--white"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
          >
            Let's chat <span className="cta-pill__icon">{arrow}</span>
          </MotionLink>
        </div>
      </div>
    </section>
  )
}
