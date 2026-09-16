import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { whispers } from '../data/whispers'
import { RevealText } from '../animations/RevealText'
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

const featuredSlugs = [
  'rethinking-product-design-with-intelligence',
  'digital-identities-across-cultures',
  'architecture-in-the-digital-age',
  'the-future-of-e-mobility-marketing-from-lindholm',
  'how-automotive-brands-win-online',
]

export function WhispersTeaser() {
  const featured = featuredSlugs
    .map((slug) => whispers.find((w) => w.slug === slug))
    .filter((w): w is (typeof whispers)[number] => Boolean(w))

  return (
    <section className="whispers-teaser section">
      <div className="container whispers-teaser__head">
        <motion.div
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

        <motion.div
          className="whispers-teaser__blog"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
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
      </div>

      <motion.div
        className="container whispers-teaser__grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.06)}
      >
        {featured.map((article) => (
          <motion.div key={article.slug} variants={fadeUp}>
            <Link to={`/whispers/${article.slug}`} className="whisper-card">
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
              <h3 className="whisper-card__title">{article.title}</h3>
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
