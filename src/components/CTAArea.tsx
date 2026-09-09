import { motion } from 'motion/react'
import { fadeUp, staggerContainer, springSnappy } from '../animations/variants'
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

export function CTAArea() {
  return (
    <motion.section
      className="cta-area section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={staggerContainer(0.08)}
    >
      <div className="container cta-area__inner">
        <motion.span className="eyebrow" variants={fadeUp}>
          // 00.04°
        </motion.span>
        <motion.div className="cta-area__row" variants={fadeUp}>
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
        </motion.div>
      </div>
    </motion.section>
  )
}
