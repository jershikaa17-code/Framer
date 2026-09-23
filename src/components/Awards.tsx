import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { awards } from '../data/awards'
import { headerZoom, headerTitle, headerSub, fadeUp } from '../animations/variants'
import './awards.css'

const VISIBLE_COUNT = 3

const arrow = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path
      d="M4 12h16M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function Awards() {
  const [expanded, setExpanded] = useState(false)
  const visibleAwards = expanded ? awards : awards.slice(0, VISIBLE_COUNT)

  return (
    <section className="awards section">
      <div className="container awards__in">
        <motion.div
          className="awards__intro"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerZoom}
        >
          <motion.h2 className="awards__title" variants={headerTitle}>
            <RevealText text="Awards" />
          </motion.h2>
          <motion.p className="awards__statement" variants={headerSub}>
            Recognition for work that delivers, not just looks good.
          </motion.p>
          <motion.p className="awards__sub" variants={headerSub}>
            We take pride in projects that perform in the real world and get noticed by the right
            people.
          </motion.p>
          <motion.img
            className="awards__img"
            src={`${import.meta.env.BASE_URL}assets/award.avif`}
            alt="Wobbly Awards 2025 — Best Creative Agency"
            variants={fadeUp}
          />
          <motion.p className="awards__note" variants={headerSub}>
            Create® was named Best Creative Agency 2025 by the{' '}
            <span className="awards__note-accent">Wobbly Awards®</span>
          </motion.p>
          <motion.button
            type="button"
            className="awards__toggle"
            variants={headerSub}
            onClick={() => setExpanded((v) => !v)}
          >
            <span className="awards__toggle-icon">{arrow}</span>
            {expanded ? 'Show less' : 'More Awards'}
          </motion.button>
        </motion.div>

        <div className="awards__table">
          <div className="awards__table-head">
            <p>Award</p>
            <p>Category</p>
            <p>Year</p>
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
                <div>
                  <p className="award-row__name">{award.name}</p>
                  <p className="award-row__description">{award.description}</p>
                </div>
                <p className="award-row__category">{award.category}</p>
                <p className="award-row__year">{award.year}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
