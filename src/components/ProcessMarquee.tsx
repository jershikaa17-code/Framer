import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
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
    blur: rand(4) * 1.4,
    opacity: 0.14 + rand(5) * 0.3,
    float: 8 + rand(6) * 16,
    duration: 4 + rand(7) * 5,
    delay: rand(8) * 4,
  }
})

// Each line's "center" sits at an evenly-spaced point along the section's own
// scroll progress. As progress passes that point the line is fully visible
// and stationary; moving away from it (either direction) carries the line
// off-screen at exactly the rate the user is scrolling — a typography
// conveyor rather than a scripted, one-shot entrance.
//
// Scale is deliberately asymmetric (matches the reference: each line's own
// exported appear-state shows it starting at scale(3-4) and settling to
// scale(1)) — a dramatic zoom-out as a line arrives from below, then a much
// gentler shrink as it continues past center and exits upward.
function useLineMotion(progress: MotionValue<number>, index: number, total: number, reduceMotion: boolean) {
  const center = (index + 0.5) / total

  const transform = useTransform(progress, (p) => {
    if (reduceMotion) return 'none'
    const local = p - center
    const travelVh = local * total * 100
    const scale =
      local < 0
        ? 1 + Math.min(-local / 0.25, 1) * 2.2
        : 1 - Math.min(local / 0.3, 1) * 0.15
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
                height: d.height,
                borderRadius: d.radius,
                filter: `blur(${d.blur}px)`,
                ['--droplet-rot' as string]: `${d.rotate}deg`,
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
