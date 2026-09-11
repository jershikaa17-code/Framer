import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { ScrambleText } from '../animations/ScrambleText'
import { team } from '../data/team'
import {
  headerZoom,
  headerEyebrow,
  headerTitle,
  headerSub,
  headerLine,
  staggerContainer,
  fadeUp,
} from '../animations/variants'
import './team-grid.css'

export function TeamGrid() {
  return (
    <section className="team-grid section">
      <motion.div
        className="container team-grid__head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerZoom}
      >
        <motion.div variants={headerEyebrow}>
          <span className="eyebrow">
            <span className="eyebrow__marker" aria-hidden="true" />
            <motion.span className="eyebrow__line" variants={headerLine} aria-hidden="true" />
            <ScrambleText as="span" text="we are" />
          </span>
        </motion.div>
        <motion.h2 className="team-grid__title" variants={headerTitle}>
          <RevealText text="Amazing group of designers, developers, and strategists." />
        </motion.h2>
        <motion.p className="team-grid__sub" variants={headerSub}>
          —— Get to know the team behind the work. Makers, thinkers, and problem-solvers who take
          ideas seriously, just not themselves.
        </motion.p>
      </motion.div>

      <motion.div
        className="container team-grid__list"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.06)}
      >
        {team.map((member, i) => (
          <motion.div className="team-card" key={member.name} variants={fadeUp} transition={{ delay: (i % 4) * 0.04 }}>
            <span className="team-card__index">// {String(i + 1).padStart(2, '0')}</span>
            <div className="team-card__img-wrap">
              <img src={member.image} alt={member.name} loading="lazy" />
            </div>
            <div className="team-card__body">
              <p className="team-card__name">{member.name}</p>
              <p className="team-card__role">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
