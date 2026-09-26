import { useEffect, useRef } from 'react'
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

  const statementImageRef = useRef<HTMLDivElement>(null)
  const statementTextRef = useRef<HTMLHeadingElement>(null)
  const statementTextOverlayRef = useRef<HTMLSpanElement>(null)
  const statementSubRef = useRef<HTMLParagraphElement>(null)
  const statementSubOverlayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const imageNode = statementImageRef.current
    if (!imageNode) return

    const pairs: [React.RefObject<HTMLElement | null>, React.RefObject<HTMLElement | null>][] = [
      [statementTextRef, statementTextOverlayRef],
      [statementSubRef, statementSubOverlayRef],
    ]

    let ticking = false

    // As the image scrolls up behind the pinned text, reveal the image-filled
    // copy of each line only for the portion of it the image has actually
    // reached (bottom-up), instead of flipping the whole line at once.
    const update = () => {
      ticking = false
      const imageTop = imageNode.getBoundingClientRect().top

      for (const [textRef, overlayRef] of pairs) {
        const textNode = textRef.current
        const overlayNode = overlayRef.current
        if (!textNode || !overlayNode) continue

        const rect = textNode.getBoundingClientRect()
        const progress = rect.height > 0 ? Math.min(1, Math.max(0, (rect.bottom - imageTop) / rect.height)) : 0
        const stop = `${progress * 100}%`
        const mask = `linear-gradient(to top, black 0%, black ${stop}, transparent ${stop}, transparent 100%)`
        overlayNode.style.maskImage = mask
        overlayNode.style.webkitMaskImage = mask
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [slug])

  if (!project) return <Navigate to="/work" replace />

  const otherProjects = projects.filter((p) => p.slug !== slug)

  const hasDetailContent = Boolean(project.subTagline)

  // Aurelis-only: stacks each top-level section as a pinned, full-viewport
  // "page" that the next section scrolls up and covers, cloning the layered
  // scroll feel of the reference site.
  const stackClassName = (base: string) => (project.stackedScroll ? `${base} work-detail__stack-page` : base)
  const stackStyle = (index: number, extra?: React.CSSProperties): React.CSSProperties | undefined =>
    project.stackedScroll ? { ...extra, zIndex: index } : extra

  return (
    <main className="work-detail">
      {hasDetailContent ? (
        <section
          className={stackClassName('work-detail__hero work-detail__hero--split section')}
          style={stackStyle(1)}
        >
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
          className={stackClassName('work-detail__client-panel')}
          style={stackStyle(2)}
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
        <section className={stackClassName('work-detail__statement section')} style={stackStyle(3)}>
          <div className="container">
            <motion.span
              className="work-detail__statement-ticks"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              aria-hidden="true"
            />
          </div>
          <div className="work-detail__statement-sticky">
            <div className="container">
              <div className="work-detail__statement-row">
                <motion.h2
                  ref={statementTextRef}
                  className="work-detail__statement-text"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={fadeUp}
                >
                  <span>{project.positioningStatement}</span>
                  <span
                    ref={statementTextOverlayRef}
                    className="work-detail__statement-text-overlay"
                    style={{
                      backgroundImage: `url(${import.meta.env.BASE_URL}${project.heroImage ?? project.image})`,
                    }}
                    aria-hidden="true"
                  >
                    {project.positioningStatement}
                  </span>
                </motion.h2>
                <motion.p
                  ref={statementSubRef}
                  className="work-detail__statement-sub"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={fadeUp}
                >
                  <span>{project.subTagline}</span>
                  <span
                    ref={statementSubOverlayRef}
                    className="work-detail__statement-text-overlay"
                    style={{
                      backgroundImage: `url(${import.meta.env.BASE_URL}${project.heroImage ?? project.image})`,
                    }}
                    aria-hidden="true"
                  >
                    {project.subTagline}
                  </span>
                </motion.p>
              </div>
            </div>
          </div>
          {(project.heroImage ?? project.image) && (
            <div className="work-detail__statement-image" ref={statementImageRef}>
              <img src={`${import.meta.env.BASE_URL}${project.heroImage ?? project.image}`} alt="" />
            </div>
          )}
        </section>
      )}

      {hasDetailContent && project.stackedScroll ? (
        <>
          <section className={stackClassName('work-detail__story section')} style={stackStyle(4)}>
            <div className="container">
              <motion.div
                className="work-detail__block work-detail__block--no-top-border"
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

              <motion.span
                className="work-detail__long-ticks"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                aria-hidden="true"
              />
            </div>
          </section>

          <section className={stackClassName('work-detail__story section')} style={stackStyle(5)}>
            <div className="container">
              <motion.div
                className={`work-detail__block work-detail__block--no-top-border ${project.challengeImage ? 'work-detail__block--media' : ''}`}
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
            </div>
          </section>

          <section className={stackClassName('work-detail__story section')} style={stackStyle(6)}>
            <div className="container">
              <motion.div
                className="work-detail__block work-detail__block--no-top-border"
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
                  <motion.div className="work-detail__gallery-item" variants={fadeUp}>
                    <img src={`${import.meta.env.BASE_URL}${project.galleryImages[0]}`} alt="" />
                  </motion.div>
                  <div className="work-detail__gallery-stack">
                    {project.galleryImages.slice(1).map((src) => (
                      <motion.div className="work-detail__gallery-item" key={src} variants={fadeUp}>
                        <img src={`${import.meta.env.BASE_URL}${src}`} alt="" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.span
                className="work-detail__statement-ticks"
                style={{ marginTop: 0 }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                aria-hidden="true"
              />
            </div>

            <motion.div
              className="work-detail__villa-showcase"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <img src={`${import.meta.env.BASE_URL}assets/project-aurelis.jpg`} alt="" />
              <img
                className="work-detail__villa-showcase-invert"
                src={`${import.meta.env.BASE_URL}assets/project-aurelis.jpg`}
                alt=""
                aria-hidden="true"
              />
            </motion.div>
          </section>
        </>
      ) : (
        <section className={stackClassName('work-detail__story section')} style={stackStyle(4)}>
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

                <motion.span
                  className="work-detail__long-ticks"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={fadeUp}
                  aria-hidden="true"
                />

                <motion.div
                  className={`work-detail__block work-detail__block--no-top-border ${project.challengeImage ? 'work-detail__block--media' : ''}`}
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
                    <motion.div className="work-detail__gallery-item" variants={fadeUp}>
                      <img src={`${import.meta.env.BASE_URL}${project.galleryImages[0]}`} alt="" />
                    </motion.div>
                    <div className="work-detail__gallery-stack">
                      {project.galleryImages.slice(1).map((src) => (
                        <motion.div className="work-detail__gallery-item" key={src} variants={fadeUp}>
                          <img src={`${import.meta.env.BASE_URL}${src}`} alt="" />
                        </motion.div>
                      ))}
                    </div>
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
      )}

      <section className={stackClassName('work-detail__results section')} style={stackStyle(7)}>
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

      <section
        className={stackClassName('work-detail__credits section')}
        style={stackStyle(
          8,
          project.creditsImage
            ? {
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.35)), url(${import.meta.env.BASE_URL}${project.creditsImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }
            : undefined,
        )}
      >
        <div className="container work-detail__credits-grid">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeLeft}
          >
            <h2 className="work-detail__giant">Credits</h2>
            <p className="work-detail__credits-copy">
              A close collaboration between Create’s design, content, and motion teams.
            </p>
            <p className="work-detail__credits-copy">
              The project blended storytelling and digital luxury, shaping every detail from early concepts to
              launch execution.
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
                  <p className="credit-row__name">{member.name}</p>
                  <p className="credit-row__role">{credit.role ?? member.role}</p>
                  <div className="credit-row__divider" aria-hidden="true">
                    <span className="credit-row__stripes" />
                    <span className="credit-row__line" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className={stackClassName('case-studies section')} style={stackStyle(9)}>
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
