import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { projects } from '../data/projects'
import { team } from '../data/team'
import { InspireCTA } from '../components/InspireCTA'
import { RevealText } from '../animations/RevealText'
import { Counter } from '../animations/Counter'
import { fadeUp, fadeLeft, staggerContainer } from '../animations/variants'
import '../components/work-detail.css'

function parseStatValue(raw: string): { value: number; suffix: string } {
  const match = raw.match(/^(-?\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { value: 0, suffix: raw }
  return { value: Number(match[1]), suffix: match[2] }
}

export function WorkDetailPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/work" replace />

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <main className="work-detail">
      <section className="work-detail__hero section">
        <div className="container work-detail__hero-head">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.08)}
          >
            <motion.span className="eyebrow" variants={fadeUp}>
              <span className="eyebrow__marker" aria-hidden="true" />
              {project.category}
            </motion.span>
            <motion.h1 className="work-detail__title" variants={fadeUp}>
              <RevealText text={project.title} />
            </motion.h1>
            <motion.p className="work-detail__tagline" variants={fadeUp}>
              {project.tagline}
            </motion.p>
          </motion.div>

          <motion.div
            className="work-detail__meta"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div>
              <span className="work-detail__meta-label">Client</span>
              <span className="work-detail__meta-value">{project.client}</span>
            </div>
            <div>
              <span className="work-detail__meta-label">Release date</span>
              <span className="work-detail__meta-value">{project.releaseDate}</span>
            </div>
            <div>
              <span className="work-detail__meta-label">Stack</span>
              <span className="work-detail__meta-value">{project.stack.join(', ')}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="container work-detail__cover"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
        >
          <img src={project.image} alt={project.title} />
        </motion.div>
      </section>

      <section className="work-detail__story section">
        <div className="container work-detail__story-grid">
          <motion.div
            className="work-detail__story-block"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="work-detail__story-index">// 01</span>
            <h2>The challenge</h2>
            <p>{project.challenge}</p>
          </motion.div>

          <motion.div
            className="work-detail__story-block"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="work-detail__story-index">// 02</span>
            <h2>The approach</h2>
            <p>{project.approach}</p>
          </motion.div>

        </div>
      </section>

      <section className="work-detail__results section">
        <div className="container work-detail__results-grid">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.1)}
          >
            <motion.span className="eyebrow" variants={fadeUp}>
              <span className="eyebrow__marker" aria-hidden="true" />
              Results
            </motion.span>
            <motion.h2 className="work-detail__results-title" variants={fadeUp}>
              <RevealText text={project.resultHeadline} />
            </motion.h2>
            <motion.p className="work-detail__results-copy" variants={fadeUp}>
              {project.result}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/whispers" className="work-detail__results-cta">
                Explore our Whispers Blog →
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="work-detail__stats-list"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.1)}
          >
            {project.stats.map((stat, i) => {
              const { value, suffix } = parseStatValue(stat.value)
              return (
                <motion.div className="work-stat" key={stat.label} variants={fadeUp}>
                  <span className="work-stat__value">
                    {Number.isFinite(value) && /^\d/.test(stat.value) ? (
                      <Counter value={value} suffix={suffix} />
                    ) : (
                      stat.value
                    )}
                  </span>
                  <span className="work-stat__label">{stat.label}</span>
                  <div className="work-stat__bar">
                    <span className="work-stat__bar-fill" />
                    <span className="work-stat__bar-index">//{String(i + 1).padStart(3, '0')}</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="work-detail__credits section">
        <div className="container work-detail__credits-grid">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeLeft}
          >
            <span className="eyebrow">
              <span className="eyebrow__marker" aria-hidden="true" />
              Credits
            </span>
            <h2 className="work-detail__credits-title">
              <RevealText text="Credits" />
            </h2>
            <p className="work-detail__credits-copy">
              Designed and produced by Create®’s studio team in partnership with {project.client}.
            </p>
          </motion.div>

          <motion.div
            className="work-detail__credits-list"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.1)}
          >
            {project.credits.map((name) => {
              const member = team.find((t) => t.name === name)
              if (!member) return null
              return (
                <motion.div className="credit-row" key={name} variants={fadeUp}>
                  <img src={member.image} alt={member.name} />
                  <div>
                    <p className="credit-row__name">{member.name}</p>
                    <p className="credit-row__role">{member.role}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="work-detail__next section">
        <Link to={`/work/${next.slug}`} className="container work-detail__next-link">
          <span className="work-detail__next-label">Next project</span>
          <h2>{next.title}</h2>
          <span className="work-detail__next-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </section>

      <InspireCTA />
    </main>
  )
}
