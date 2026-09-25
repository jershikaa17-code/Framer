import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { projects } from '../data/projects'
import { team } from '../data/team'
import { InspireCTA } from '../components/InspireCTA'
import { RevealText } from '../animations/RevealText'
import { Counter } from '../animations/Counter'
import { fadeUp, fadeLeft, staggerContainer } from '../animations/variants'
import '../components/work-detail.css'
import '../components/studio-page.css'

function parseStatValue(raw: string): { value: number; suffix: string } {
  const match = raw.match(/^(-?\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { value: 0, suffix: raw }
  return { value: Number(match[1]), suffix: match[2] }
}

export function WorkDetailPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/work" replace />

  const otherProjects = projects.filter((p) => p.slug !== slug)

  const hasDetailContent = Boolean(project.subTagline)

  return (
    <main className="work-detail">
      {hasDetailContent ? (
        <section className="work-detail__hero work-detail__hero--split section">
          <div className="work-detail__hero-split">
            <div className="work-detail__hero-copy-wrap">
              <motion.div
                className="work-detail__hero-copy"
                initial="hidden"
                animate="show"
                variants={staggerContainer(0.08)}
              >
                <motion.div className="work-detail__hero-divider" variants={fadeUp} aria-hidden="true">
                  <span className="work-detail__hero-divider-bar" />
                  <span className="work-detail__hero-divider-line" />
                </motion.div>
                <motion.p className="work-detail__tagline-top" variants={fadeUp}>
                  {project.tagline}
                </motion.p>
                <motion.h1 className="work-detail__title" variants={fadeUp}>
                  <RevealText text={project.title} viewTrigger={false} />
                </motion.h1>
              </motion.div>
            </div>

            <motion.div
              className="work-detail__cover work-detail__cover--full"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
            >
              <img src={`${import.meta.env.BASE_URL}${project.heroImage ?? project.image}`} alt={project.title} />
              {project.heroTags && (
                <div className="work-detail__hero-tags">
                  {project.heroTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="work-detail__hero section">
          <div className="container work-detail__hero-head">
            <motion.div initial="hidden" animate="show" variants={staggerContainer(0.08)}>
              <motion.span className="eyebrow" variants={fadeUp}>
                <span className="eyebrow__marker" aria-hidden="true" />
                {project.category}
              </motion.span>
              <motion.h1 className="work-detail__title" variants={fadeUp}>
                <RevealText text={project.title} viewTrigger={false} />
              </motion.h1>
              <motion.p className="work-detail__tagline" variants={fadeUp}>
                {project.tagline}
              </motion.p>
            </motion.div>

            <motion.div className="work-detail__meta" initial="hidden" animate="show" variants={fadeUp}>
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
            className={`work-detail__cover ${project.slug === 'blackwell-motors' ? 'work-detail__cover--portrait' : ''}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          >
            {project.video ? (
              <video
                src={`${import.meta.env.BASE_URL}${project.video}`}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img src={`${import.meta.env.BASE_URL}${project.heroImage ?? project.image}`} alt={project.title} />
            )}
            {project.heroTags && (
              <div className="work-detail__hero-tags">
                {project.heroTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
            {project.slug === 'blackwell-motors' && (
              <img
                src={`${import.meta.env.BASE_URL}assets/blackwell-logo.svg`}
                alt="Blackwell"
                className="work-detail__cover-logo"
                draggable={false}
              />
            )}
          </motion.div>
        </section>
      )}

      {hasDetailContent ? (
        <motion.div
          className="work-detail__client-panel"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
        >
          <motion.div className="work-detail__client-info" variants={fadeUp}>
            <img src={`${import.meta.env.BASE_URL}${project.logo}`} alt={project.client} />
            <p className="work-detail__client-name">{project.title}</p>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="work-detail__live-link">
                <span className="work-detail__live-arrow" aria-hidden="true">
                  →
                </span>
                Visit Live Site
              </a>
            )}
          </motion.div>

          <motion.div className="work-detail__client-meta" variants={fadeUp}>
            <div className="work-detail__client-meta-item">
              <span className="work-detail__meta-label">Project Type</span>
              <p className="work-detail__meta-value">{project.category}</p>
            </div>
            <div className="work-detail__client-meta-item">
              <span className="work-detail__meta-label">Released</span>
              <p className="work-detail__meta-value">{project.releaseDate}</p>
            </div>
            <div className="work-detail__client-meta-item">
              <span className="work-detail__meta-label">Technology</span>
              {project.stack.map((tech) => (
                <p className="work-detail__meta-value" key={tech}>
                  {tech}
                </p>
              ))}
            </div>
            {project.timeframe && (
              <div className="work-detail__client-meta-item">
                <span className="work-detail__meta-label">Timeframe</span>
                <p className="work-detail__meta-value">{project.timeframe}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="work-detail__client-band"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <img src={`${import.meta.env.BASE_URL}${project.logo}`} alt={project.client} />
          <span>{project.title}</span>
        </motion.div>
      )}

      {hasDetailContent && project.positioningStatement && (
        <section className="work-detail__statement section">
          <div className="container">
            <motion.span
              className="work-detail__statement-ticks"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              aria-hidden="true"
            />
            <div className="work-detail__statement-row">
              <motion.h2
                className="work-detail__statement-text"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                {project.positioningStatement}
              </motion.h2>
              <motion.p
                className="work-detail__statement-sub"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                {project.subTagline}
              </motion.p>
            </div>
          </div>
        </section>
      )}

      <section className="work-detail__story section">
        <div className="container">
          {hasDetailContent ? (
            <>
              <motion.div
                className="work-detail__block"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                <h2 className="work-detail__giant">Brief</h2>
                <div>
                  <h3 className="work-detail__block-sub">{project.briefTitle}</h3>
                  <p className="work-detail__block-body">{project.briefBody}</p>
                </div>
              </motion.div>

              <motion.div
                className={`work-detail__block ${project.challengeImage ? 'work-detail__block--media' : ''}`}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                {project.challengeImage && (
                  <div className="work-detail__block-media">
                    <img src={`${import.meta.env.BASE_URL}${project.challengeImage}`} alt="" />
                  </div>
                )}
                <div>
                  <h2 className="work-detail__giant">Challenge</h2>
                  <h3 className="work-detail__block-sub">{project.challengeTitle}</h3>
                  <p className="work-detail__block-body">{project.challenge}</p>
                </div>
              </motion.div>

              <motion.div
                className="work-detail__block"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                <h2 className="work-detail__giant">Solution</h2>
                <div>
                  <h3 className="work-detail__block-sub">{project.solutionTitle}</h3>
                  <p className="work-detail__block-body">{project.approach}</p>
                </div>
              </motion.div>

              {project.galleryImages && (
                <motion.div
                  className="work-detail__gallery"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={staggerContainer(0.1)}
                >
                  {project.galleryImages.map((src) => (
                    <motion.div className="work-detail__gallery-item" key={src} variants={fadeUp}>
                      <img src={`${import.meta.env.BASE_URL}${src}`} alt="" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          ) : (
            <div className="work-detail__story-grid">
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
          )}
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
            <motion.h2 className="work-detail__giant" variants={fadeUp}>
              Results
            </motion.h2>
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
            <h2 className="work-detail__giant">Credits</h2>
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
            {project.credits.map((credit) => {
              const member = team.find((t) => t.name === credit.name)
              if (!member) return null
              return (
                <motion.div className="credit-row" key={credit.name} variants={fadeUp}>
                  <img src={`${import.meta.env.BASE_URL}${member.image}`} alt={member.name} />
                  <div>
                    <p className="credit-row__name">{member.name}</p>
                    <p className="credit-row__role">{credit.role ?? member.role}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="case-studies section">
        <div className="container">
          <motion.h2
            className="case-studies__title"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            more projects
          </motion.h2>

          <motion.ul
            className="case-studies__list"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.08)}
          >
            {otherProjects.map((p) => (
              <motion.li key={p.slug} variants={fadeUp}>
                <Link to={`/work/${p.slug}`} className="case-card">
                  {p.video ? (
                    <video
                      src={`${import.meta.env.BASE_URL}${p.video}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={`${import.meta.env.BASE_URL}${p.heroImage ?? p.image}`}
                      alt={p.title}
                      loading="lazy"
                    />
                  )}
                  <span className="case-card__in">
                    <img className="case-card__badge" src={`${import.meta.env.BASE_URL}${p.logo}`} alt={p.client} />
                    <h3 className="case-card__title">{p.title}</h3>
                    <p className="case-card__sub">{p.category}</p>
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <InspireCTA />
    </main>
  )
}
