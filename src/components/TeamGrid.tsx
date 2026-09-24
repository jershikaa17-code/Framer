import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { team } from '../data/team'
import { headerZoom, headerTitle, headerSub, staggerContainer, fadeUp } from '../animations/variants'
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

const mailIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const xIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <path d="M4 4l16 16M20 4 4 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const instagramIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
)

const linkedinIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M7.5 10.5v5.5M7.5 7.5v.01M11.5 16v-3.5c0-1.1.9-2 2-2s2 .9 2 2V16"
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
        <div className="team-grid__head-row">
          <motion.h2 className="team-grid__title" variants={headerTitle}>
            <RevealText text="Get to know the team behind the work. Makers, thinkers, and problem-solvers." />
          </motion.h2>
          <motion.p className="team-grid__sub" variants={headerSub}>
            We&rsquo;re a happy creative bunch who take ideas seriously. Just not ourselves.
          </motion.p>
        </div>
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
            <div className="team-card__img-wrap">
              <img src={`${import.meta.env.BASE_URL}${member.image}`} alt={member.name} loading="lazy" />
              <div className="team-card__scrim" aria-hidden="true" />
              {member.kpi && (
                <div className="team-card__kpi">
                  <span className="team-card__kpi-value">{member.kpi.value}</span>
                  <span className="team-card__kpi-label">{member.kpi.label}</span>
                </div>
              )}
              <div className="team-card__body">
                <p className="team-card__name">{member.name}</p>
                <p className="team-card__role">{member.role}</p>
                <div className="team-card__socials">
                  <a href="#" aria-label={`Email ${member.name}`}>
                    {mailIcon}
                  </a>
                  <a href="#" aria-label={`${member.name} on X`}>
                    {xIcon}
                  </a>
                  <a href="#" aria-label={`${member.name} on Instagram`}>
                    {instagramIcon}
                  </a>
                  <a href="#" aria-label={`${member.name} on LinkedIn`}>
                    {linkedinIcon}
                  </a>
                </div>
              </div>
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
