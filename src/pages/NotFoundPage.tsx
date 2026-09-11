import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { fadeUp, staggerContainer } from '../animations/variants'
import '../components/not-found.css'

export function NotFoundPage() {
  return (
    <main className="not-found">
      <section className="not-found__hero section">
        <motion.div
          className="container not-found__inner"
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1)}
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            <span className="eyebrow__marker" aria-hidden="true" />
            404
          </motion.span>
          <motion.h1 className="not-found__title" variants={fadeUp}>
            <RevealText text="This page took a wrong turn." />
          </motion.h1>
          <motion.p className="not-found__sub" variants={fadeUp}>
            The page you’re looking for doesn’t exist, moved, or never made it past a draft.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link to="/" className="not-found__cta">
              Back to home →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
