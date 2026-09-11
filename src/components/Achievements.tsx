import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { ScrambleText } from '../animations/ScrambleText'
import { Counter } from '../animations/Counter'
import {
  headerZoom,
  headerEyebrow,
  headerTitle,
  headerSub,
  headerLine,
  statFade,
} from '../animations/variants'
import './achievements.css'

const arrow = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const achievementStats = [
  { index: '001', value: 48, suffix: '%', label: 'New clients onboarded' },
  { index: '002', value: 120, suffix: '%', label: 'Projects delivered' },
  { index: '003', value: 87, suffix: '%', label: 'Repeat collaborations' },
]

const home = import.meta.env.BASE_URL

export function Achievements() {
  return (
    <section className="achievements section">
      <div className="container achievements__grid">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerZoom}
        >
          <motion.div variants={headerEyebrow}>
            <span className="eyebrow">
              <span className="eyebrow__marker" aria-hidden="true" />
              <motion.span className="eyebrow__line" variants={headerLine} aria-hidden="true" />
              <ScrambleText as="span" text="Achievements" />
            </span>
          </motion.div>
          <motion.h2 className="achievements__title" variants={headerTitle}>
            <RevealText text="Achievements" />
          </motion.h2>
          <motion.p className="achievements__sub" variants={headerSub}>
            Since launch, Create® has partnered with forward-thinking brands and startups across
            design, technology, and strategy.
          </motion.p>
          <motion.p className="achievements__sub achievements__sub--muted" variants={headerSub}>
            Our work has grown from independent projects to large-scale collaborations, earning
            recognition for clarity, precision, and performance. We keep our process lean, our
            goals measurable, and our results visible.
          </motion.p>

          <motion.a
            href={`${home}#showreel`}
            className="achievements__showreel"
            variants={headerSub}
          >
            <span className="achievements__showreel-icon">{arrow}</span>
            Watch Showreel 2025
          </motion.a>
        </motion.div>

        <motion.div
          className="achievements__stats"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={statFade}
        >
          {achievementStats.map((stat) => (
            <div className="achievement-stat" key={stat.index}>
              <span className="achievement-stat__value">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="achievement-stat__label">{stat.label}</span>
              <div className="achievement-stat__bar">
                <span className="achievement-stat__bar-fill" />
                <span className="achievement-stat__bar-index">//{stat.index}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
