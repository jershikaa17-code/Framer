import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { whispers } from '../data/whispers'
import { RevealText } from '../animations/RevealText'
import { LazyCoverImage } from './LazyCoverImage'
import { fadeUp, fadeLeft, staggerContainer } from '../animations/variants'
import '../components/whispers-page.css'
import './whispers-teaser.css'

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

const categories = [
  'Studio projects and case studies',
  'Notes on design and process',
  'Ideas, insights, and inspiration',
]

// Overrides the shared article cover for this teaser's own grid only — the
// default landscape photo leaves a dead-black gap at the bottom in these
// squarer cards, so home page gets a tighter crop of the same shot.
const coverOverrides: Record<string, string> = {
  'digital-identities-across-cultures': 'assets/whispers/digital-identities-home.png',
}

const featuredSlugs = [
  'rethinking-product-design-with-intelligence',
  'digital-identities-across-cultures',
  'architecture-in-the-digital-age',
  'the-future-of-e-mobility-marketing-from-lindholm',
  'how-automotive-brands-win-online',
]

// Jordan Ellis's card runs larger (spans 2 grid columns) and, combined with
// being last in the order above, lands alone on its own row below the rest.
const largeCardSlugs = new Set(['how-automotive-brands-win-online'])

export function WhispersTeaser() {
  const featured = featuredSlugs
    .map((slug) => whispers.find((w) => w.slug === slug))
    .filter((w): w is (typeof whispers)[number] => Boolean(w))
  const [spotlightArticle, ...restArticles] = featured
  // Edward Bright's card runs full-width, alone in its own row, directly
  // below the intro spotlight — the two cards that used to sit beside it
  // (Mark Miller, Matthew Parker) move down into the regular grid.
  const featuredGridArticle = restArticles.find((a) => a.slug === 'digital-identities-across-cultures')
  const gridArticles = restArticles.filter((a) => a.slug !== 'digital-identities-across-cultures')

  return (
    <section className="whispers-teaser section">
      <motion.div
        className="container whispers-teaser__intro"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeLeft}
      >
        <span className="eyebrow">
          <span className="eyebrow__marker" aria-hidden="true" />
          Whispers
        </span>
        <h2 className="whispers-teaser__title">
          <RevealText text="What bubbles up needs to be shared" />
        </h2>
        <p className="whispers-teaser__sub">
          From new launches to design explorations and team experiments, this is where ideas
          take shape and stories unfold.
        </p>
      </motion.div>

      <div className="container whispers-teaser__spotlight">
        <motion.div
          className="whispers-teaser__blog"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <img
            className="whispers-teaser__blog-bg"
            src={`${import.meta.env.BASE_URL}assets/whispers/teaser-thumb.avif`}
            alt=""
            loading="lazy"
          />
          <div className="whispers-teaser__blog-scrim" aria-hidden="true" />
          <span className="whispers-teaser__blog-dash" aria-hidden="true" />
          <p className="whispers-teaser__blog-title">Whispers — Blog. From small sparks to big ideas.</p>
          <p className="whispers-teaser__blog-sub">Articles, notes on creativity, strategy and making things work.</p>
          <ul className="whispers-teaser__categories">
            {categories.map((item) => (
              <li key={item}>
                <span aria-hidden="true">+</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {spotlightArticle && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <Link
              to={`/whispers/${spotlightArticle.slug}`}
              className="whisper-card whispers-teaser__spotlight-card"
            >
              <div className="whisper-card__img-wrap">
                <LazyCoverImage
                  src={`${import.meta.env.BASE_URL}${spotlightArticle.cover}`}
                  alt={spotlightArticle.title}
                />
                <div className="whisper-card__scrim" />
              </div>
              <div className="whisper-card__meta">
                <span className="whisper-card__author">
                  {spotlightArticle.author}
                  <em>{spotlightArticle.role}</em>
                </span>
                <span className="whisper-card__date">{spotlightArticle.date}</span>
              </div>
              <h3 className="whisper-card__title">{spotlightArticle.title}</h3>
              <p className="whisper-card__excerpt">{spotlightArticle.excerpt}</p>
            </Link>
          </motion.div>
        )}
      </div>

      {featuredGridArticle && (
        <motion.div
          className="container whispers-teaser__featured-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <Link to={`/whispers/${featuredGridArticle.slug}`} className="whisper-card whispers-teaser__featured-card">
            <div className="whisper-card__img-wrap">
              <LazyCoverImage
                src={`${import.meta.env.BASE_URL}${coverOverrides[featuredGridArticle.slug] ?? featuredGridArticle.cover}`}
                alt={featuredGridArticle.title}
              />
              <div className="whisper-card__scrim" />
            </div>
            <div className="whisper-card__meta">
              <span className="whisper-card__author">
                {featuredGridArticle.author}
                <em>{featuredGridArticle.role}</em>
              </span>
              <span className="whisper-card__date">{featuredGridArticle.date}</span>
            </div>
            <h3 className="whisper-card__title">{featuredGridArticle.title}</h3>
            <p className="whisper-card__excerpt">{featuredGridArticle.excerpt}</p>
          </Link>
        </motion.div>
      )}

      <motion.div
        className="container whispers-teaser__grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.06)}
      >
        {gridArticles.map((article) => (
          <motion.div
            key={article.slug}
            className={largeCardSlugs.has(article.slug) ? 'whispers-teaser__grid-item--large' : undefined}
            variants={fadeUp}
          >
            <Link to={`/whispers/${article.slug}`} className="whisper-card">
              <div className="whisper-card__img-wrap">
                <LazyCoverImage
                  src={`${import.meta.env.BASE_URL}${coverOverrides[article.slug] ?? article.cover}`}
                  alt={article.title}
                />
                <div className="whisper-card__scrim" />
              </div>
              <div className="whisper-card__meta">
                <span className="whisper-card__author">
                  {article.author}
                  <em>{article.role}</em>
                </span>
                <span className="whisper-card__date">{article.date}</span>
              </div>
              <h3 className="whisper-card__title">{article.title}</h3>
              <p className="whisper-card__excerpt">{article.excerpt}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="container whispers-teaser__more">
        <Link to="/whispers" className="whispers-teaser__more-link">
          More Whispers {arrow}
        </Link>
      </div>
    </section>
  )
}
