import { motion } from 'motion/react'
import { useLiveClock } from '../hooks/useLiveClock'
import { fadeUp } from '../animations/variants'
import './time-location.css'

export function TimeLocation() {
  const time = useLiveClock()

  return (
    <section className="time-loc section">
      <motion.div
        className="container time-loc__inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
      >
        <span className="eyebrow">// 00.03°</span>
        <p className="time-loc__row">
          <span className="time-loc__label">Our time</span>
          <span className="time-loc__clock">{time}</span>
        </p>
        <p className="time-loc__zone">UTC−8 · Los Angeles</p>
      </motion.div>
    </section>
  )
}
