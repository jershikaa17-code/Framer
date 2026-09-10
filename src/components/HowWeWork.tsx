import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { processStages, type ProcessStage } from '../data/stats'
import { RevealText } from '../animations/RevealText'
import { ScrambleText } from '../animations/ScrambleText'
import { useInViewOnce } from '../hooks/useInViewOnce'
import { headerZoom, headerEyebrow, headerTitle, headerSub, headerLine } from '../animations/variants'
import './how-we-work.css'

const images = ['assets/process-building.jpg', 'assets/project-blackwell.jpg']

function ProcessStageCard({ stage, image }: { stage: ProcessStage; image: string }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  const [revealRef, revealed] = useInViewOnce<HTMLDivElement>(0.3)

  return (
    <div className="process-stage" ref={stageRef}>
      <div ref={revealRef} className={`process-stage__image ${revealed ? 'is-revealed' : ''}`}>
        <motion.div className="process-stage__image-inner" style={{ y: imgY }}>
          <img src={image} alt="" loading="lazy" />
        </motion.div>
      </div>
      <div className="process-stage__body">
        <span className="process-stage__index">//{stage.index}</span>
        <h3>{stage.title}</h3>
        <p>{stage.description}</p>
      </div>
    </div>
  )
}

export function HowWeWork() {
  return (
    <section className="how-we-work section">
      <motion.div
        className="container how-we-work__head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerZoom}
      >
        <motion.div variants={headerEyebrow}>
          <span className="eyebrow">
            <span className="eyebrow__marker" aria-hidden="true" />
            <motion.span className="eyebrow__line" variants={headerLine} aria-hidden="true" />
            <ScrambleText as="span" text="How we work" />
          </span>
        </motion.div>
        <motion.h2 className="how-we-work__title" variants={headerTitle}>
          <RevealText text="The process behind our success" />
        </motion.h2>
        <motion.p className="how-we-work__sub" variants={headerSub}>
          —— We work with clarity, precision. Every step designed to move your project forward
          with confidence.
        </motion.p>
      </motion.div>

      <div className="container how-we-work__list">
        {processStages.map((stage, i) => (
          <ProcessStageCard stage={stage} image={images[i % images.length]} key={stage.index} />
        ))}
      </div>
    </section>
  )
}
