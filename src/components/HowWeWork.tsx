import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { ScrambleText } from '../animations/ScrambleText'
import { headerZoom, headerEyebrow, headerTitle, headerSub, headerLine } from '../animations/variants'
import './how-we-work.css'

export function HowWeWork() {
  return (
    <section className="how-we-work section">
      <motion.div
        className="container how-we-work__grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerZoom}
      >
        <div className="how-we-work__left">
          <motion.div variants={headerEyebrow}>
            <span className="eyebrow">
              <span className="eyebrow__marker" aria-hidden="true" />
              <motion.span className="eyebrow__line" variants={headerLine} aria-hidden="true" />
              <ScrambleText as="span" text="How we work" />
            </span>
          </motion.div>
          <motion.div className="how-we-work__swatch" variants={headerEyebrow} aria-hidden="true" />
        </div>

        <div className="how-we-work__middle">
          <motion.div className="how-we-work__rule" variants={headerLine} aria-hidden="true" />
          <motion.h2 className="how-we-work__title" variants={headerTitle}>
            <RevealText text="The process behind our success" />
          </motion.h2>
          <motion.p className="how-we-work__sub" variants={headerSub}>
            —— We work with clarity, precision. Every step designed to move your project forward
            with confidence.
          </motion.p>
        </div>

        <motion.div className="how-we-work__right" variants={headerEyebrow}>
          <span className="how-we-work__logo">
            create<sup>®</sup>
          </span>
        </motion.div>
      </motion.div>

      <div className="how-we-work__dashes container" aria-hidden="true" />
    </section>
  )
}
