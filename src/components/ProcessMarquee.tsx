import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import './process-marquee.css'

const phrases = ['we listen', 'we imagine', 'we create', 'beautiful things']

const DROPLETS = Array.from({ length: 110 }).map((_, i) => {
  const rand = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453
    return x - Math.floor(x)
  }
  // Skewed toward small marks (most fine, a few larger) rather than an even
  // spread — closer to how real scattered water droplets read at a glance.
  const size = 3 + rand(1) * rand(1) * 30
  const squish = 0.55 + rand(9) * 0.45 // some marks read as slightly elongated, not perfect circles
  return {
    left: rand(2) * 100,
    top: rand(3) * 100,
    size,
    height: size * (rand(10) < 0.5 ? 1 : squish),
    rotate: rand(11) * 360,
    radius: `${40 + rand(12) * 30}% ${40 + rand(13) * 30}% ${40 + rand(14) * 30}% ${40 + rand(15) * 30}%`,
    // Small marks read as solid dots; only the bigger drops are large enough
    // for the eye to register a hollow ring, so only they get a ring-inner.
    ringInner: size > 9 ? Math.min(38, (size - 9) * 1.8) : 0,
    blur: rand(4) * 1.4,
    opacity: 0.14 + rand(5) * 0.3,
    float: 8 + rand(6) * 16,
    duration: 4 + rand(7) * 5,
    delay: rand(8) * 4,
  }
})

// Each phrase lives in normal document flow, spaced across the tall stack
// behind the pinned droplet background — matching the reference, where all
// four lines can be visible at once (stacked in reading order) rather than
// swapped one-at-a-time. Each line's own scroll progress (its own viewport
// entrance) drives a zoom-out-and-settle reveal, then stays put once shown.
function Line({ phrase, index, reduceMotion }: { phrase: string; index: number; reduceMotion: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'start 0.32'] })

  const transform = useTransform(scrollYProgress, (p) => {
    if (reduceMotion) return 'none'
    const scale = 3.4 - p * 2.4
    const travel = (1 - p) * 50
    return `translateY(${travel.toFixed(2)}px) scale(${scale.toFixed(3)})`
  })
  const opacity = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0, 1])

  return (
    <p ref={ref} className={`process-marquee__phrase ${index === 2 ? 'is-accent' : ''}`}>
      <motion.span className="process-marquee__phrase-inner" style={{ transform, opacity }}>
        {phrase}
      </motion.span>
    </p>
  )
}

export function ProcessMarquee() {
  const shouldReduceMotion = Boolean(useReducedMotion())

  return (
    <section className="process-marquee section">
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
                height: d.height,
                borderRadius: d.radius,
                filter: `blur(${d.blur}px)`,
                ['--droplet-rot' as string]: `${d.rotate}deg`,
                ['--ring-inner' as string]: `${d.ringInner}%`,
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
            <Line key={phrase} phrase={phrase} index={i} reduceMotion={shouldReduceMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}
