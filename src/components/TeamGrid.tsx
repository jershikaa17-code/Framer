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

const arrowIcon = (
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

export function TeamGrid() {
  return (
    <>
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
            <ScrambleText as="span" text="The team" />
          </span>
        </motion.div>
        <motion.h2 className="team-grid__title" variants={headerTitle}>
          <RevealText text="Get to know the team behind the work. Makers, thinkers, and problem-solvers." />
        </motion.h2>
        <motion.p className="team-grid__sub" variants={headerSub}>
          —— We&rsquo;re a happy creative bunch who take ideas seriously. Just not ourselves.
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
              <img src={`${import.meta.env.BASE_URL}${member.image}`} alt={member.name} loading="lazy" />
              {member.kpi && (
                <div className="team-card__kpi">
                  <span className="team-card__kpi-value">{member.kpi.value}</span>
                  <span className="team-card__kpi-label">{member.kpi.label}</span>
                </div>
              )}
            </div>
            <div className="team-card__body">
              <p className="team-card__name">{member.name}</p>
              <p className="team-card__role">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>

    <section className="team-grid__leadership">
      <motion.div
        className="container team-grid__leadership-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.1)}
      >
        <motion.p className="team-grid__leadership-title" variants={fadeUp}>
          Our leadership team involved from{' '}
          <span>first kickoff to final delivery.</span>
        </motion.p>

        <motion.div className="team-grid__leadership-discover" variants={fadeUp}>
          <p className="team-grid__leadership-heading">Discover team Create®</p>
          <p className="team-grid__leadership-text">
            Meet the people, culture, and energy that keep our work sharp and our days fun.
          </p>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="team-grid__leadership-cta"
          >
            <span className="team-grid__leadership-cta-icon">{arrowIcon}</span>
            Follow us on LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </section>
    </>
  )
}
