import { motion } from 'motion/react'
import { processStages } from '../data/stats'
import { RevealText } from '../animations/RevealText'
import { fadeUp } from '../animations/variants'
import './how-we-work.css'

const images = ['/assets/process-building.jpg', '/assets/project-blackwell.jpg']

export function HowWeWork() {
  return (
    <section className="how-we-work section">
      <div className="container how-we-work__head">
        <span className="eyebrow">How we work</span>
        <h2 className="how-we-work__title">
          <RevealText text="The process behind our success" />
        </h2>
        <p className="how-we-work__sub">
          —— We work with clarity, precision. Every step designed to move your project forward
          with confidence.
        </p>
      </div>

      <div className="container how-we-work__list">
        {processStages.map((stage, i) => (
          <motion.div
            className="process-stage"
            key={stage.index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ delay: (i % 2) * 0.1 }}
          >
            <div className="process-stage__image">
              <img src={images[i % images.length]} alt="" loading="lazy" />
            </div>
            <div className="process-stage__body">
              <span className="process-stage__index">//{stage.index}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
