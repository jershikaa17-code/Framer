import { motion } from 'motion/react'
import { springSnappy } from '../animations/variants'
import './cta-area.css'

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

// Rendered as a scroll-linked chapter inside Hero.tsx's pinned frame now —
// see the note in Intro.tsx. The `cta-pill` hover/tap springs stay, since
// those are interaction feedback, unrelated to scroll-triggered entrance.
export function CTAArea() {
  return (
    <section className="cta-area section">
      <div className="container cta-area__inner">
        <span className="eyebrow">// 00.04°</span>
        <div className="cta-area__row">
          <motion.a
            href="#work"
            className="cta-pill"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
          >
            See work {arrow}
          </motion.a>
          <motion.a
            href="#contact"
            className="cta-pill cta-pill--accent"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
          >
            Let's chat {arrow}
          </motion.a>
        </div>
      </div>
    </section>
  )
}
