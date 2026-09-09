import { motion } from 'motion/react'
import { EASE_OUT } from '../animations/variants'
import './process-marquee.css'

const phrases = ['we listen', 'we imagine', 'we create', 'beautiful things']

const DROPLETS = Array.from({ length: 70 }).map((_, i) => {
  const rand = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453
    return x - Math.floor(x)
  }
  const size = 5 + rand(1) * 32
  return {
    left: rand(2) * 100,
    top: rand(3) * 100,
    size,
    blur: rand(4) * 2.2,
    opacity: 0.1 + rand(5) * 0.24,
  }
})

export function ProcessMarquee() {
  return (
    <section className="process-marquee section">
      <div className="process-marquee__bg">
        <div className="process-marquee__droplets" aria-hidden="true">
          {DROPLETS.map((d, i) => (
            <span
              key={i}
              className="process-marquee__droplet"
              style={{
                left: `${d.left}%`,
                top: `${d.top}%`,
                width: d.size,
                height: d.size,
                filter: `blur(${d.blur}px)`,
                opacity: d.opacity,
              }}
            />
          ))}
        </div>
      </div>

      <div className="process-marquee__stack">
        {phrases.map((phrase, i) => (
          <motion.p
            className={`process-marquee__phrase ${i === 2 ? 'is-accent' : ''}`}
            key={phrase}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            {phrase}
          </motion.p>
        ))}
      </div>
    </section>
  )
}
