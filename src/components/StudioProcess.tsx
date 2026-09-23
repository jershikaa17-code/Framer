import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { ScrambleText } from '../animations/ScrambleText'
import {
  headerZoom,
  headerEyebrow,
  headerTitle,
  headerSub,
  headerLine,
  fadeUp,
  staggerContainer,
} from '../animations/variants'
import './studio-process.css'

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

const steps = [
  {
    index: '01',
    title: 'Discover and define',
    text: 'We start with a focused workshop to clarify goals, audiences, and metrics — delivering a sharp brief and shared timeline of record.',
  },
  {
    index: '02',
    title: 'Concept and creative direction',
    text: 'We explore options, pressure-test top ideas, and align quickly with visual check-ins — so momentum starts early.',
  },
  {
    index: '03',
    title: 'Design and prototype',
    text: 'We turn concepts into tangible experiences. Interactive prototypes speed decisions, with feedback cycles built in and documented.',
  },
  {
    index: '04',
    title: 'Build and launch',
    text: 'Our design and dev ship together — clear sprints, no surprises, and a launch plan for QA, accessibility, and performance.',
  },
]

export function StudioProcess() {
  return (
    <section className="studio-process section">
      <motion.div
        className="container studio-process__head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerZoom}
      >
        <motion.div variants={headerEyebrow}>
          <span className="eyebrow">
            <span className="eyebrow__marker" aria-hidden="true" />
            <motion.span className="eyebrow__line" variants={headerLine} aria-hidden="true" />
            <ScrambleText as="span" text="How we work" />
          </span>
        </motion.div>
        <motion.h2 className="studio-process__title" variants={headerTitle}>
          <RevealText text="How We Work" />
        </motion.h2>
        <motion.p className="studio-process__sub" variants={headerSub}>
          Every project moves through clear stages where design, development, and communication
          stay aligned.
        </motion.p>
      </motion.div>

      <div className="container studio-process__grid">
        <motion.div
          className="studio-process__media"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.15)}
        >
          <motion.img
            variants={fadeUp}
            src={`${import.meta.env.BASE_URL}assets/process-office-1.jpg`}
            alt="Spacious modern office with large windows, indoor plants, and people working at shared desks."
            loading="lazy"
          />
          <motion.img
            variants={fadeUp}
            src={`${import.meta.env.BASE_URL}assets/process-office-2.jpeg`}
            alt="Team collaborating in a modern office with computers and laptops on a shared desk."
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="studio-process__steps"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.08)}
        >
          {steps.map((step) => (
            <motion.div className="studio-process-step" key={step.index} variants={fadeUp}>
              <div className="studio-process-step__head">
                <span className="studio-process-step__title">{step.title}</span>
                <span className="studio-process-step__index">/{step.index}</span>
              </div>
              <p className="studio-process-step__text">{step.text}</p>
            </motion.div>
          ))}

          <motion.div variants={fadeUp}>
            <Link to="/work" className="studio-process__cta">
              <span className="studio-process__cta-icon">{arrowIcon}</span>
              Explore Case Studies
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
