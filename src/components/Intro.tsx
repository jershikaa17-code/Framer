import { motion } from 'motion/react'
import { fadeUp } from '../animations/variants'
import './intro.css'

export function Intro() {
  return (
    <section className="intro section" id="studio">
      <div className="container intro__inner">
        <span className="eyebrow">// 00.02°</span>

        <motion.h2
          className="intro__wordmark"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="intro__wordmark-accent">Create</span>
          <span className="intro__wordmark-slash">\</span>
          Studio
        </motion.h2>

        <motion.div
          className="intro__statements"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
        >
          <p className="intro__statement intro__statement--muted">
            A design studio trusted by startups and leading brands.
          </p>
          <p className="intro__statement">We create stories people remember.</p>
        </motion.div>
      </div>
    </section>
  )
}
