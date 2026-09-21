import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { whispers } from '../data/whispers'
import { RevealText } from '../animations/RevealText'
import { InspireCTA } from '../components/InspireCTA'
import { LazyCoverImage } from '../components/LazyCoverImage'
import { useFitText } from '../hooks/useFitText'
import { useInViewOnce } from '../hooks/useInViewOnce'
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from '../animations/variants'
import '../components/whispers-page.css'

const intro = [
  'Studio projects and case studies',
  'Notes on design and process',
  'Ideas, insights, and inspiration',
]

const [featuredArticle, ...gridArticles] = whispers

const searchIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m20 20-4.4-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export function WhispersPage() {
  const [query, setQuery] = useState('')
  const { ref: wordmarkRef, fontSize: wordmarkSize } = useFitText<HTMLSpanElement>()
  const [wordmarkTextRef, wordmarkRevealed] = useInViewOnce<HTMLSpanElement>(0.3)

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return gridArticles
    return gridArticles.filter((article) => article.title.toLowerCase().includes(q))
  }, [query])

  return (
    <main className="whispers-page">
      <div className="whispers-hero-stage">
        <section className="whispers-hero section">
          <div className="container">
            <div className="whispers-hero__dash-row" aria-hidden="true">
              <span className="whispers-hero__dash" />
              <span className="whispers-hero__dash-line" />
            </div>
            <h1 className="whispers-hero__wordmark">
              <span
                className="whispers-hero__wordmark-inner"
                ref={wordmarkRef}
                style={wordmarkSize ? { fontSize: wordmarkSize } : undefined}
              >
                <span
                  ref={wordmarkTextRef}
                  className={`whispers-hero__wordmark-text ${wordmarkRevealed ? 'is-revealed' : ''}`}
                >
                  whispers
                </span>
                <span className="whispers-hero__dot" aria-hidden="true" />
              </span>
            </h1>

            <div className="whispers-hero__row">
              <p className="whispers-hero__tagline">Articles, notes on creativity, strategy and the work behind it.</p>
              <ul className="whispers-hero__list">
                {intro.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">+</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="whispers-hero__dashes" aria-hidden="true" />
          </div>
        </section>
      </div>

      <section className="whispers-featured">
        <div className="container">
          <motion.div
            className="whispers-featured__sticky"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <Link
              to={`/whispers/${featuredArticle.slug}`}
              className="whispers-featured__card"
              data-cursor="Read article"
              data-cursor-icon="arrow"
            >
              <LazyCoverImage
                className="whispers-featured__img"
                src={`${import.meta.env.BASE_URL}${featuredArticle.cover}`}
                alt={featuredArticle.title}
              />
              <div className="whispers-featured__scrim" />

              <div className="whispers-featured__meta">
                <div className="whispers-featured__author-col">
                  <span className="whispers-featured__author">
                    {featuredArticle.author}
                    <em>{featuredArticle.role}</em>
                  </span>
                  <h2 className="whispers-featured__title">{featuredArticle.title}</h2>
                </div>
                <span className="whispers-featured__date">{featuredArticle.date}</span>
              </div>

              <p className="whispers-featured__excerpt">{featuredArticle.excerpt}</p>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="whispers-list container">
        <div className="whispers-list__intro">
          <motion.h2
            className="whispers-list__heading"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeLeft}
          >
            <RevealText text="From small sparks to big ideas." />
            <span className="whispers-list__tag" aria-hidden="true">
              <img src={`${import.meta.env.BASE_URL}assets/whispers/tag-icon.svg`} alt="" width={20} height={20} />
            </span>
          </motion.h2>

          <motion.form
            className="whispers-search"
            onSubmit={(e) => e.preventDefault()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeRight}
          >
            <span className="whispers-search__icon" aria-hidden="true">
              {searchIcon}
            </span>
            <input
              type="text"
              className="whispers-search__input"
              placeholder="Search articles"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search articles"
            />
          </motion.form>
        </div>

        {filteredArticles.length === 0 ? (
          <p className="whispers-list__empty">No articles match that search yet — try another title.</p>
        ) : (
          <motion.div
            className="whispers-list__grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.08)}
          >
            {filteredArticles.map((article) => (
              <motion.div key={article.slug} variants={fadeUp}>
                <Link
                  to={`/whispers/${article.slug}`}
                  className="whisper-card"
                  data-cursor="Read article"
                  data-cursor-icon="arrow"
                >
                  <div className="whisper-card__img-wrap">
                    <LazyCoverImage src={`${import.meta.env.BASE_URL}${article.cover}`} alt={article.title} />
                    <div className="whisper-card__scrim" />
                  </div>
                  <div className="whisper-card__meta">
                    <div className="whisper-card__author-col">
                      <span className="whisper-card__author">
                        {article.author}
                        <em>{article.role}</em>
                      </span>
                      <h2 className="whisper-card__title">{article.title}</h2>
                    </div>
                    <span className="whisper-card__date">{article.date}</span>
                  </div>

                  <p className="whisper-card__excerpt">{article.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <InspireCTA />
    </main>
  )
}
