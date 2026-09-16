import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { whispers } from '../data/whispers'
import { RevealText } from '../animations/RevealText'
import { InspireCTA } from '../components/InspireCTA'
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from '../animations/variants'
import '../components/whispers-page.css'

const intro = [
  'Studio projects and case studies',
  'Notes on design and process',
  'Ideas, insights, and inspiration',
]

const [featuredArticle, ...gridArticles] = whispers

const tagIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
    <path
      d="M12.6 3H19a2 2 0 0 1 2 2v6.4a2 2 0 0 1-.59 1.42l-8.4 8.4a2 2 0 0 1-2.82 0l-6.4-6.4a2 2 0 0 1 0-2.82l8.4-8.4A2 2 0 0 1 12.6 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" />
  </svg>
)

const searchIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m20 20-4.4-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export function WhispersPage() {
  const [query, setQuery] = useState('')

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return gridArticles
    return gridArticles.filter((article) => article.title.toLowerCase().includes(q))
  }, [query])

  return (
    <main className="whispers-page">
      <section className="whispers-hero section">
        <div className="container">
          <span className="eyebrow eyebrow--coord">// 00.07°</span>
          <h1 className="whispers-hero__wordmark">
            <span className="whispers-hero__wordmark-inner">
              <RevealText text="whispers" />
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
              <img
                className="whispers-featured__img"
                src={`${import.meta.env.BASE_URL}${featuredArticle.cover}`}
                alt={featuredArticle.title}
              />
              <div className="whispers-featured__scrim" />

              <div className="whispers-featured__meta">
                <span className="whispers-featured__author">
                  {featuredArticle.author}
                  <em>{featuredArticle.role}</em>
                </span>
                <span className="whispers-featured__date">{featuredArticle.date}</span>
              </div>

              <div className="whispers-featured__body">
                <h2 className="whispers-featured__title">{featuredArticle.title}</h2>
                <p className="whispers-featured__excerpt">{featuredArticle.excerpt}</p>
              </div>
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
              {tagIcon}
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
                    <img src={`${import.meta.env.BASE_URL}${article.cover}`} alt={article.title} loading="lazy" />
                    <div className="whisper-card__scrim" />
                  </div>
                  <div className="whisper-card__meta">
                    <span className="whisper-card__author">
                      {article.author}
                      <em>{article.role}</em>
                    </span>
                    <span className="whisper-card__date">{article.date}</span>
                  </div>
                  <h2 className="whisper-card__title">{article.title}</h2>
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
