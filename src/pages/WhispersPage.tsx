import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { whispers } from '../data/whispers'
import { RevealText } from '../animations/RevealText'
import { fadeUp, staggerContainer } from '../animations/variants'
import '../components/whispers-page.css'

const intro = [
  'Studio projects and case studies',
  'Notes on design and process',
  'Ideas, insights, and inspiration',
]

export function WhispersPage() {
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
        </div>
      </section>

      <section className="whispers-list container">
        <motion.div
          className="whispers-list__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.08)}
        >
          {whispers.map((article) => (
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
                <h2 className="whisper-card__title">{article.title}</h2>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
