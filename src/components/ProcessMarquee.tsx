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
  const isBig = size > 9
  // Backlit macro water droplets read as glossy, near-black orbs with a
  // small bright catch-light (the specular reflection of the light source)
  // sitting off-centre toward whichever way that drop happens to face —
  // never dead-centre, or every drop looks like the same flat sticker.
  const highlightX = 20 + rand(16) * 30
  const highlightY = 16 + rand(17) * 26
  const highlightSize = 55 + rand(19) * 30
  const highlightStrength = 0.75 + rand(20) * 0.25
  // A touch of warm/cool variance across drops, the way refracted light
  // temperature shifts slightly from one droplet to the next.
  const warmth = rand(21)
  return {
    left: rand(2) * 100,
    top: rand(3) * 100,
    size,
    height: size * (rand(10) < 0.5 ? 1 : squish),
    rotate: rand(11) * 360,
    radius: `${40 + rand(12) * 30}% ${40 + rand(13) * 30}% ${40 + rand(14) * 30}% ${40 + rand(15) * 30}%`,
    // Small marks read as solid dots; only the bigger drops are large enough
    // for the eye to register a hollow ring, so only they get a ring-inner.
    ringInner: isBig ? Math.min(38, (size - 9) * 1.8) : 0,
    blur: rand(4) * 1.4,
    opacity: 0.26 + rand(5) * 0.4,
    float: 8 + rand(6) * 16,
    duration: 4 + rand(7) * 5,
    delay: rand(8) * 4,
    highlightX,
    highlightY,
    highlightSize,
    highlightStrength,
    ink: warmth > 0.5 ? '32, 26, 22' : '16, 20, 26',
    castShadow: isBig,
  }
})

// A second, much smaller set of large foreground drops — the ones that read
// as sitting on the glass in front of the words, not scattered in the haze
// behind them. Fewer, bigger, sharper: real macro photography only keeps a
// handful of drops in crisp focus at a time, everything else falls to soft
// bokeh (that's the DROPLETS field above). Each one gets backdrop-filter
// blur so it visibly refracts whatever phrase happens to sit behind it,
// which flat gradients alone can't fake.
const GLASS_DROPLETS = Array.from({ length: 16 }).map((_, i) => {
  const rand = (n: number) => {
    const x = Math.sin((i + 500) * 12.9898 + n * 78.233) * 43758.5453
    return x - Math.floor(x)
  }
  const size = 24 + rand(1) * 56
  const squish = 0.6 + rand(2) * 0.34
  return {
    left: 6 + rand(5) * 88,
    top: 8 + rand(6) * 84,
    size,
    height: size * squish,
    radius: `${42 + rand(8) * 26}% ${42 + rand(9) * 26}% ${42 + rand(10) * 26}% ${42 + rand(11) * 26}%`,
    highlightX: 22 + rand(3) * 28,
    highlightY: 16 + rand(4) * 26,
    shadeX: 62 + rand(15) * 22,
    shadeY: 64 + rand(16) * 24,
    drift: 6 + rand(14) * 12,
    duration: 6 + rand(13) * 5,
    delay: rand(12) * 5,
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
                filter: d.castShadow
                  ? `blur(${d.blur}px) drop-shadow(0 1px 1.5px rgba(10, 10, 12, 0.18))`
                  : `blur(${d.blur}px)`,
                ['--droplet-rot' as string]: `${d.rotate}deg`,
                ['--ring-inner' as string]: `${d.ringInner}%`,
                ['--hl-x' as string]: `${d.highlightX}%`,
                ['--hl-y' as string]: `${d.highlightY}%`,
                ['--hl-size' as string]: `${d.highlightSize}%`,
                ['--hl-strength' as string]: d.highlightStrength,
                ['--ink' as string]: d.ink,
              }}
              animate={{
                y: [0, -d.float, 0],
                opacity: [d.opacity * 0.75, d.opacity, d.opacity * 0.75],
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

        <div className="process-marquee__glass" aria-hidden="true">
          {GLASS_DROPLETS.map((d, i) => (
            <motion.span
              key={i}
              className="process-marquee__glass-drop"
              style={{
                left: `${d.left}%`,
                top: `${d.top}%`,
                width: d.size,
                height: d.height,
                borderRadius: d.radius,
                ['--hl-x' as string]: `${d.highlightX}%`,
                ['--hl-y' as string]: `${d.highlightY}%`,
                ['--shade-x' as string]: `${d.shadeX}%`,
                ['--shade-y' as string]: `${d.shadeY}%`,
              }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -d.drift, 0], x: [0, d.drift * 0.25, 0] }
              }
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
