import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { getWhisperBySlug, whispers } from '../data/whispers'
import { fadeUp, staggerContainer } from '../animations/variants'
import '../components/whisper-article.css'

export function WhisperArticlePage() {
  const { slug } = useParams()
  const article = getWhisperBySlug(slug)
  const introRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ['start end', 'start start'],
  })
  const introY = useTransform(introProgress, [0, 1], [0, shouldReduceMotion ? 0 : -120])

  if (!article) return <Navigate to="/whispers" replace />

  const related = whispers.filter((w) => w.slug !== article.slug).slice(0, 6)

  return (
    <main className="whisper-article">
      <article className="whisper-article__head">
        <div className="whisper-article__hero-stage">
          <div className="container whisper-article__hero">
            <div className="whisper-article__hero-text">
              <p className="whisper-article__date">{article.date}</p>
              <h1 className="whisper-article__title">{article.title}</h1>
              <div className="whisper-article__byline">
                <span>{article.author}</span>
                <span>{article.role}</span>
              </div>
            </div>

            <div className="whisper-article__cover">
              {article.coverVideo ? (
                <video
                  src={`${import.meta.env.BASE_URL}${article.coverVideo}`}
                  poster={`${import.meta.env.BASE_URL}${article.cover}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={article.title}
                />
              ) : (
                <img src={`${import.meta.env.BASE_URL}${article.cover}`} alt={article.title} />
              )}
            </div>
          </div>
        <motion.div
          ref={introRef}
          className="container whisper-article__intro"
          style={{ y: introY }}
        >
          <p className="whisper-article__lead">{article.leadIn}</p>
        </motion.div>
        </div>

        {article.bodyImage && (
          <div className="whisper-article__intro-img-wrap">
            <img src={`${import.meta.env.BASE_URL}${article.bodyImage}`} alt="" />
          </div>
        )}

        <div className="container whisper-article__content">
          <div className="whisper-article__excerpt-col">
            <p className="whisper-article__excerpt">{article.excerpt}</p>
          </div>

          <div className="whisper-article__body">
            {article.body.map((section) => (
              <section key={section.heading}>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </article>

      <div className="whisper-article__reference-band">
        <a className="whisper-article__template-badge" href="/contact">
          <img src={`${import.meta.env.BASE_URL}assets/hero-portrait.png`} alt="" />
          <span>
            <strong>Get Template</strong>
            <small>See what's inside</small>
          </span>
        </a>
      </div>

      <section className="whisper-article__more container">
        <h2>more whispers</h2>
        <motion.div
          className="whisper-article__more-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.06)}
        >
          {related.map((item) => (
            <motion.div key={item.slug} variants={fadeUp}>
              <Link to={`/whispers/${item.slug}`} className="whisper-related-card">
                <div className="whisper-related-card__img-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${item.cover}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                <span className="whisper-related-card__author">
                  {item.author} — {item.date}
                </span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
