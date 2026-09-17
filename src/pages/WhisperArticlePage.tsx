import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { getWhisperBySlug, whispers } from '../data/whispers'
import { fadeUp, staggerContainer } from '../animations/variants'
import '../components/whisper-article.css'

export function WhisperArticlePage() {
  const { slug } = useParams()
  const article = getWhisperBySlug(slug)
  const heroRef = useRef<HTMLDivElement>(null)
  const [revealPx, setRevealPx] = useState(0)

  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const desktop = window.matchMedia('(min-width: 810px)')
    const measure = () => setRevealPx(desktop.matches ? hero.getBoundingClientRect().height : 0)
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(hero)
    desktop.addEventListener('change', measure)
    return () => {
      observer.disconnect()
      desktop.removeEventListener('change', measure)
    }
  }, [slug])

  if (!article) return <Navigate to="/whispers" replace />

  const related = whispers.filter((w) => w.slug !== article.slug).slice(0, 6)
  const isArchitectureArticle = article.slug === 'architecture-in-the-digital-age'
  const isDesigningTrustArticle = article.slug === 'designing-trust-why-digital-brands-win-with-simplicity'
  const isDigitalIdentitiesArticle = article.slug === 'digital-identities-across-cultures'
  const isAutomotiveArticle = article.slug === 'how-automotive-brands-win-online'
  const isEMobilityArticle = article.slug === 'the-future-of-e-mobility-marketing-from-lindholm'
  const isHospitalityArticle = article.slug === 'why-hospitality-brands-need-digital-experiences-that-feel-like-destinations'
  const digitalIdentitiesBodyImage =
    'https://framerusercontent.com/images/MUes6djVoELSBp8bZJXuvaLqWo.jpg?width=5895&height=3930'
  const automotiveBodyImage =
    'https://framerusercontent.com/images/vlC5cynwnkTMOgb6eRbfiesKQGI.png?width=1984&height=2400'
  const eMobilityBodyImage =
    'https://framerusercontent.com/images/PdhWepXgamFlmYY1CPxHUdAyG5M.jpeg?width=2000&height=1333'
  const hospitalityBodyImage =
    'https://framerusercontent.com/images/2HCkRpGrDF2tktEvNZgmnnFRc.png?width=1600&height=2400'
  const assetUrl = (asset: string) =>
    asset.startsWith('http') ? asset : `${import.meta.env.BASE_URL}${asset}`
  const articleDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(article.date))

  return (
    <main className="whisper-article">
      <article className="whisper-article__head">
        <div className="whisper-article__hero-stage" style={{ height: revealPx ? revealPx * 2 : undefined }}>
          <div ref={heroRef} className="container whisper-article__hero">
            <div className="whisper-article__hero-text">
              <p className="whisper-article__date">{articleDate}</p>
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
                <img src={assetUrl(article.cover)} alt={article.title} />
              )}
            </div>
          </div>
        </div>

        <div
          className="container whisper-article__intro"
          style={{ marginTop: revealPx ? -revealPx : undefined }}
        >
          <p className="whisper-article__lead">{article.leadIn}</p>
        </div>

        {(article.bodyImage || isDesigningTrustArticle || isDigitalIdentitiesArticle || isAutomotiveArticle || isEMobilityArticle || isHospitalityArticle) && (
          <div className="whisper-article__intro-img-wrap">
            <img
              src={
                isDigitalIdentitiesArticle || isAutomotiveArticle || isEMobilityArticle || isHospitalityArticle
                  ? isAutomotiveArticle
                    ? automotiveBodyImage
                    : isEMobilityArticle
                      ? eMobilityBodyImage
                      : isHospitalityArticle
                        ? hospitalityBodyImage
                        : digitalIdentitiesBodyImage
                  : assetUrl(article.bodyImage || article.cover)
              }
              alt={isDesigningTrustArticle || isDigitalIdentitiesArticle || isAutomotiveArticle || isEMobilityArticle || isHospitalityArticle ? article.title : ''}
            />
          </div>
        )}

        {isArchitectureArticle && <div className="whisper-article__reference-band" aria-hidden="true" />}

        {isDesigningTrustArticle && (
          <div className="whisper-article__reference-band">
            <a className="whisper-article__template-badge" href="/contact">
              <img src={`${import.meta.env.BASE_URL}assets/hero-portrait.png`} alt="" />
              <span>
                <strong>Get Template</strong>
                <small>See what's inside</small>
              </span>
            </a>
          </div>
        )}

        {isDigitalIdentitiesArticle && (
          <div className="whisper-article__reference-band">
            <a className="whisper-article__template-badge" href="/contact">
              <img src={`${import.meta.env.BASE_URL}assets/hero-portrait.png`} alt="" />
              <span>
                <strong>Get Template</strong>
                <small>See what's inside</small>
              </span>
            </a>
          </div>
        )}

        {isEMobilityArticle && <div className="whisper-article__reference-band" aria-hidden="true" />}

        {isHospitalityArticle && <div className="whisper-article__reference-band" aria-hidden="true" />}

        {isAutomotiveArticle && <div className="whisper-article__reference-band" aria-hidden="true" />}

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

      {!isArchitectureArticle && !isDesigningTrustArticle && !isDigitalIdentitiesArticle && !isEMobilityArticle && !isHospitalityArticle && (
        <div className="whisper-article__reference-band">
          <a className="whisper-article__template-badge" href="/contact">
            <img src={`${import.meta.env.BASE_URL}assets/hero-portrait.png`} alt="" />
            <span>
              <strong>Get Template</strong>
              <small>See what's inside</small>
            </span>
          </a>
        </div>
      )}

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
              <Link
                to={`/whispers/${item.slug}`}
                className="whisper-related-card"
                data-cursor="Read article"
                data-cursor-icon="arrow"
              >
                <div className="whisper-related-card__img-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}${item.cover}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
                <div className="whisper-related-card__scrim" />

                <div className="whisper-related-card__meta">
                  <div className="whisper-related-card__author-col">
                    <span className="whisper-related-card__author">
                      {item.author}
                      <em>{item.role}</em>
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <span className="whisper-related-card__date">{item.date}</span>
                </div>

                <p className="whisper-related-card__excerpt">{item.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
