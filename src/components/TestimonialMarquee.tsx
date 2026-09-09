import { motion, useReducedMotion } from 'motion/react'
import type { Review } from '../data/reviews'
import './testimonial-marquee.css'

interface TestimonialMarqueeProps {
  items: Review[]
  speed?: number
}

export function TestimonialMarquee({ items, speed = 55 }: TestimonialMarqueeProps) {
  const track = [...items, ...items]
  const reduceMotion = useReducedMotion()

  return (
    <div className="testimonial-marquee">
      <motion.div
        className="testimonial-marquee__track"
        animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((review, i) => (
          <article className="review-card" key={`${review.name}-${i}`}>
            <span className="review-card__date">{review.date}</span>
            <p className="review-card__quote">&ldquo;{review.quote}&rdquo;</p>
            <div className="review-card__author">
              <img className="review-card__avatar" src={review.avatar} alt="" loading="lazy" />
              <div>
                <p className="review-card__name">{review.name}</p>
                <p className="review-card__role">
                  {review.role} · {review.company}
                </p>
              </div>
            </div>
          </article>
        ))}
      </motion.div>
    </div>
  )
}
