import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { fadeUp, scaleReveal } from '../animations/variants'
import './testimonial.css'

export function Testimonial() {
  return (
    <section className="testimonial section" id="whispers">
      <div className="container testimonial__grid">
        <div className="testimonial__heading">
          <span className="eyebrow">Whispers</span>
          <h2 className="testimonial__title">
            <RevealText text="Let us" /> <span className="testimonial__accent">inspire</span>{' '}
            <RevealText text="your next project" delay={0.15} />
          </h2>
        </div>

        <div className="testimonial__content">
          <motion.div
            className="testimonial__portrait"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={scaleReveal}
          >
            <img src="/assets/portrait-tobias.jpg" alt="Tobias Neumann, CEO of Create" />
          </motion.div>

          <motion.div
            className="testimonial__quote-block"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={fadeUp}
          >
            <p className="testimonial__quote">
              "We listen first, stay transparent, and deliver what we promise. Every project
              matters to us."
            </p>
            <p className="testimonial__name">Tobias Neumann</p>
            <p className="testimonial__role">CEO of Create®</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
