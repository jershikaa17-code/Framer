import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { fadeUp, scaleReveal } from '../animations/variants'
import { reviews } from '../data/reviews'
import { TestimonialMarquee } from './TestimonialMarquee'
import './testimonial.css'

const starIcon = (
  <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
    <path d="M10 0l2.6 6.6L20 7.2l-5.4 4.6L16.2 20 10 15.8 3.8 20l1.6-8.2L0 7.2l7.4-.6z" />
  </svg>
)

export function Testimonial() {
  const spotlight = reviews[0]

  return (
    <section className="testimonial section" id="whispers">
      <motion.div
        className="container testimonial__head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <span className="eyebrow">What our clients say</span>
        <h2 className="testimonial__title">
          <RevealText text="Partnerships that last, results that stick." />
        </h2>
        <p className="testimonial__sub">
          From kickoff to launch, brands trust us to stay close, adapt fast, and deliver without
          any drama.
        </p>

        <div className="testimonial__rating">
          <span className="testimonial__stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{starIcon}</span>
            ))}
          </span>
          <span className="testimonial__score">
            5 / 5 <span className="testimonial__reviews-count">(98 reviews)</span>
          </span>
          <span className="testimonial__backed">
            Backed by feedback from <strong>120+</strong> brands we&rsquo;ve worked with.
          </span>
          <a href="#contact" className="testimonial__write">
            Write a review
          </a>
        </div>
      </motion.div>

      <div className="container testimonial__spotlight">
        <span className="testimonial__watermark" aria-hidden="true">
          Spotlight
        </span>

        <motion.div
          className="testimonial__portrait"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={scaleReveal}
        >
          <img src={spotlight.avatar} alt={spotlight.name} />
        </motion.div>

        <motion.div
          className="testimonial__quote-block"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <span className="testimonial__date">{spotlight.date}</span>
          <p className="testimonial__quote">&ldquo;{spotlight.quote}&rdquo;</p>
          <p className="testimonial__name">{spotlight.name}</p>
          <p className="testimonial__role">
            {spotlight.role} · {spotlight.company}
          </p>
        </motion.div>
      </div>

      <TestimonialMarquee items={reviews} speed={55} />
    </section>
  )
}
