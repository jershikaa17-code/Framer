import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { ScrambleText } from '../animations/ScrambleText'
import { awards } from '../data/awards'
import {
  headerZoom,
  headerEyebrow,
  headerTitle,
  headerSub,
  headerLine,
  fadeUp,
} from '../animations/variants'
import './awards.css'

const VISIBLE_COUNT = 3

export function Awards() {
  const [expanded, setExpanded] = useState(false)
  const visibleAwards = expanded ? awards : awards.slice(0, VISIBLE_COUNT)

  return (
    <section className="awards section">
      <motion.div
        className="container awards__head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerZoom}
      >
        <motion.div variants={headerEyebrow}>
          <span className="eyebrow">
            <span className="eyebrow__marker" aria-hidden="true" />
            <motion.span className="eyebrow__line" variants={headerLine} aria-hidden="true" />
            <ScrambleText as="span" text="Awards" />
          </span>
        </motion.div>
        <motion.h2 className="awards__title" variants={headerTitle}>
          <RevealText text="Recognition for work that delivers, not just looks good." />
        </motion.h2>
        <motion.p className="awards__sub" variants={headerSub}>
          —— We take pride in projects that perform in the real world and get noticed by the
          right people.
        </motion.p>
      </motion.div>

      <div className="container awards__highlight-row">
        <motion.p
          className="awards__highlight"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          Create® was named <strong>Best Creative Agency 2025</strong> by the Wobbly Awards®
        </motion.p>
        <button
          type="button"
          className="awards__toggle"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Show less' : 'More Awards'}
        </button>
      </div>

      <div className="container awards__table">
        <div className="awards__table-head">
          <span>Award</span>
          <span>Category</span>
          <span>Year</span>
        </div>
        <AnimatePresence initial={false}>
          {visibleAwards.map((award) => (
            <motion.div
              className="award-row"
              key={award.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="award-row__main">
                <span className="award-row__name">{award.name}</span>
                <span className="award-row__category">{award.category}</span>
                <span className="award-row__year">{award.year}</span>
              </div>
              <p className="award-row__description">{award.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
