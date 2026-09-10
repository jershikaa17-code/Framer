import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
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

// Each line's "center" sits at an evenly-spaced point along the section's own
// scroll progress. As progress passes that point the line is fully visible
// and stationary; moving away from it (either direction) carries the line
// off-screen at exactly the rate the user is scrolling — a typography
// conveyor rather than a scripted, one-shot entrance.
function useLineMotion(progress: MotionValue<number>, index: number, total: number, reduceMotion: boolean) {
  const center = (index + 0.5) / total

  const transform = useTransform(progress, (p) => {
    if (reduceMotion) return 'none'
    const local = p - center
    const travelVh = local * total * 100
    const scale = 1 - Math.min(Math.abs(local), 0.3) * 0.12
    return `translateY(${travelVh.toFixed(2)}vh) scale(${scale.toFixed(3)})`
  })

  const opacity = useTransform(progress, (p) => {
    const local = Math.abs(p - center)
    const fadeWidth = reduceMotion ? 0.5 : 0.24
    return Math.max(0, 1 - local / fadeWidth)
  })

  return { transform, opacity }
}

function Line({
  phrase,
  index,
  progress,
  reduceMotion,
}: {
  phrase: string
  index: number
  progress: MotionValue<number>
  reduceMotion: boolean
}) {
  const { transform, opacity } = useLineMotion(progress, index, phrases.length, reduceMotion)
  return (
    <p className={`process-marquee__phrase ${index === 2 ? 'is-accent' : ''}`}>
      <motion.span className="process-marquee__phrase-inner" style={{ transform, opacity }}>
        {phrase}
      </motion.span>
    </p>
  )
}

export function ProcessMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = Boolean(useReducedMotion())
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

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
        <div className="process-marquee__lines">
          {phrases.map((phrase, i) => (
            <Line
              key={phrase}
              phrase={phrase}
              index={i}
              progress={scrollYProgress}
              reduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
