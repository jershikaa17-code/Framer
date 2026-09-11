import { Navigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { legalPages } from '../data/legal'
import { RevealText } from '../animations/RevealText'
import { fadeUp, staggerContainer } from '../animations/variants'
import '../components/legal-page.css'

export function LegalPage() {
  const { slug } = useParams()
  const page = legalPages.find((p) => p.slug === slug)

  if (!page) return <Navigate to="/404" replace />

  return (
    <main className="legal-page">
      <section className="legal-page__hero section">
        <div className="container">
          <span className="eyebrow">
            <span className="eyebrow__marker" aria-hidden="true" />
            {page.updated}
          </span>
          <h1 className="legal-page__title">
            <RevealText text={page.title} />
          </h1>
          <p className="legal-page__intro">{page.intro}</p>
        </div>
      </section>

      <section className="legal-page__body section">
        <motion.div
          className="container legal-page__sections"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.08)}
        >
          {page.sections.map((section) => (
            <motion.div className="legal-section" key={section.heading} variants={fadeUp}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  )
}
