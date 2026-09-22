import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { GatherText } from '../animations/GatherText'
import { team } from '../data/team'
import { staggerContainer, fadeUp, EASE_OUT } from '../animations/variants'
import './team-spotlight.css'

const leadership = team.slice(0, 4)

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

export function TeamSpotlight() {
  return (
    <section className="team-spotlight section" id="the-team">
      <div className="container team-spotlight__head">
        <span className="eyebrow">
          <span className="eyebrow__marker" aria-hidden="true" />
          <span className="eyebrow__line" aria-hidden="true" />
          <GatherText text="the team" delay={0} />
        </span>
        <h2 className="team-spotlight__title">
          <GatherText text="No serious faces. Real serious work." delay={0.18} />
        </h2>
        <p className="team-spotlight__sub">
          <GatherText
            text="—— We bring sharp strategy and bold ideas, without the stiff boardroom vibe. Professional where it counts, human where it matters."
            delay={0.42}
          />
        </p>
      </div>

      <motion.div
        className="container team-spotlight__grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.08)}
      >
        {leadership.map((member) => {
          // All cards share the same inward 3D tilt, straightening flat on hover.
          return (
            <motion.div
              className="team-spotlight-card"
              key={member.name}
              variants={fadeUp}
              style={{ transformPerspective: 1200, rotateY: 13.5 }}
              whileHover={{ rotateY: 0, transition: { duration: 0.5, ease: EASE_OUT } }}
            >
              <img
                className="team-spotlight-card__img"
                src={member.image}
                alt={member.name}
                loading="lazy"
              />
              <div className="team-spotlight-card__scrim" aria-hidden="true" />

              {member.kpi && (
                <div className="team-spotlight-card__kpi">
                  <span className="team-spotlight-card__kpi-tag">//KPI</span>
                  <span className="team-spotlight-card__kpi-value">{member.kpi.value}</span>
                  <span className="team-spotlight-card__kpi-label">{member.kpi.label}</span>
                </div>
              )}

              <div className="team-spotlight-card__body">
                <p className="team-spotlight-card__name">{member.name}</p>
                <p className="team-spotlight-card__role">{member.role}</p>
                <div className="team-spotlight-card__socials">
                  <a href="#" aria-label={`Email ${member.name}`}>
                    {mailIcon}
                  </a>
                  <a href="#" aria-label={`${member.name} on X`}>
                    {xIcon}
                  </a>
                  <a href="#" aria-label={`${member.name} on LinkedIn`}>
                    {linkedinIcon}
                  </a>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        className="container team-spotlight__footer"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <p className="team-spotlight__footer-title">
          Our leadership team involved from{' '}
          <span>first kickoff to final delivery.</span>
        </p>

        <p className="team-spotlight__footer-text">
          Every milestone checked, every detail reviewed, every client kept in the loop.
          That&rsquo;s how projects land sharp and on time.
        </p>

        <div className="team-spotlight__footer-discover">
          <Link to="/studio" className="team-spotlight__footer-heading">
            Discover team Create®
          </Link>
          <p className="team-spotlight__footer-text">
            Meet the people, culture, and energy that keep our work sharp and our days fun.
          </p>
          <a href="#" className="team-spotlight__footer-cta">
            <span className="team-spotlight__footer-cta-icon">{arrowIcon}</span>
            Follow us on LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  )
}
