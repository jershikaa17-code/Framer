import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { RevealText } from '../animations/RevealText'
import { fadeUp, fadeRight, imgHover } from '../animations/variants'
import './case-study-teaser.css'

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

export function CaseStudyTeaser() {
  const project = projects.find((p) => p.slug === 'blackwell-motors') ?? projects[0]

  return (
    <section className="case-study-teaser section">
      <div className="case-study-teaser__bg" aria-hidden="true" />
      <div className="container case-study-teaser__grid">
        <motion.div
          className="case-study-teaser__visual"
          initial="rest"
          whileHover="hover"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.img
            className="case-study-teaser__visual-img"
            src={`${import.meta.env.BASE_URL}${project.image}`}
            alt={project.title}
            variants={imgHover}
          />
          <div className="case-study-teaser__visual-scrim" aria-hidden="true" />
          <img
            className="case-study-teaser__visual-logo"
            src={`${import.meta.env.BASE_URL}assets/blackwell-logo.svg`}
            alt=""
            aria-hidden="true"
          />
          <span className="case-study-teaser__visual-title">{project.title}</span>
        </motion.div>

        <motion.p
          className="case-study-teaser__copy"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          Step inside one of our featured projects. From first brief to launch, follow the
          process that shows what makes Create® different.
        </motion.p>

        <motion.div
          className="case-study-teaser__sub"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeRight}
        >
          <h3>
            <RevealText text="Our process in motion" />
          </h3>
          <p>Explore a real case where strategy, design, and delivery lined up exactly as we work today.</p>

          <Link to="/work" className="case-study-teaser__cta">
            <span className="case-study-teaser__cta-icon">{arrow}</span>
            Explore Case Studies
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
