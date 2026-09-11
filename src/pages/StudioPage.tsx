import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ProcessMarquee } from '../components/ProcessMarquee'
import { TeamGrid } from '../components/TeamGrid'
import { HowWeWork } from '../components/HowWeWork'
import { ClientMarquee } from '../components/ClientMarquee'
import { Achievements } from '../components/Achievements'
import { Awards } from '../components/Awards'
import { InspireCTA } from '../components/InspireCTA'
import { RevealText } from '../animations/RevealText'
import { fadeUp, staggerContainer } from '../animations/variants'
import { projects } from '../data/projects'
import '../components/studio-page.css'

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

export function StudioPage() {
  return (
    <main className="studio-page">
      <ProcessMarquee />

      <section className="studio-intro section">
        <motion.div
          className="container studio-intro__inner"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.08)}
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            <span className="eyebrow__marker" aria-hidden="true" />
            The Studio
          </motion.span>
          <motion.h2 className="studio-intro__title" variants={fadeUp}>
            <RevealText text="We help ambitious teams turn good ideas into strong digital experiences and products." />
          </motion.h2>
          <motion.div className="studio-intro__body" variants={fadeUp}>
            <p>
              Every project is personal to us, shaped by real conversations, thoughtful decisions,
              and the belief that great work comes from collaboration, not hierarchy.
            </p>
            <p>Create® design, build, and launch digital products that connect clarity with character.</p>
          </motion.div>
        </motion.div>
      </section>

      <TeamGrid />
      <HowWeWork />
      <ClientMarquee />

      <section className="partner-cta section">
        <motion.div
          className="container partner-cta__inner"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <div>
            <h2 className="partner-cta__title">Be our next partner</h2>
            <p className="partner-cta__sub">
              We&rsquo;re open to new ideas, conversations, and collaborations. Let&rsquo;s find
              what we can build together.
            </p>
          </div>
          <Link to="/contact" className="partner-cta__link">
            Book an intro call {arrow}
          </Link>
        </motion.div>
      </section>

      <Achievements />
      <Awards />

      <section className="case-studies section">
        <motion.div
          className="container"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.06)}
        >
          <motion.span className="eyebrow case-studies__eyebrow" variants={fadeUp}>
            case studies
          </motion.span>
          <div className="case-studies__list">
            {projects.map((project) => (
              <motion.div className="case-study-row" key={project.title} variants={fadeUp}>
                <h3>{project.title}</h3>
                <p className="case-study-row__category">{project.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <InspireCTA />
    </main>
  )
}
