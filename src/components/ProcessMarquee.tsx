import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
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
    float: 10 + rand(6) * 22,
    duration: 4 + rand(7) * 5,
    delay: rand(8) * 4,
  }
})

export function ProcessMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  // alternating parallax depths so the phrases drift past each other while pinned
  const y0 = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [-46, 46])
  const y3 = useTransform(scrollYProgress, [0, 1], [46, -46])
  const parallaxYs = [y0, y1, y2, y3]

  return (
    <section className="process-marquee section" ref={sectionRef}>
      <div className="process-marquee__bg">
        <div className="process-marquee__droplets" aria-hidden="true">
          {DROPLETS.map((d, i) => (
            <motion.span
              key={i}
              className="process-marquee__droplet"
              style={{
                left: `${d.left}%`,
                top: `${d.top}%`,
                width: d.size,
                height: d.size,
                filter: `blur(${d.blur}px)`,
              }}
              animate={{
                y: [0, -d.float, 0],
                opacity: [d.opacity * 0.6, d.opacity, d.opacity * 0.6],
              }}
              transition={{
                duration: d.duration,
                delay: d.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      <div className="process-marquee__stack">
        {phrases.map((phrase, i) => (
          <motion.div key={phrase} style={{ y: parallaxYs[i] }}>
            <motion.p
              className={`process-marquee__phrase ${i === 2 ? 'is-accent' : ''}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              {phrase}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
