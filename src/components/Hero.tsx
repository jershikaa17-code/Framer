import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Link } from 'react-router-dom'
import { CharReveal } from '../animations/CharReveal'
import { ScatterText } from '../animations/ScatterText'
import { Counter } from '../animations/Counter'
import { useLiveClock } from '../hooks/useLiveClock'
import { EASE_OUT, springSnappy } from '../animations/variants'
import { Showreel } from './Showreel'
import './cta-area.css'
import './hero.css'

const MotionLink = motion.create(Link)

const arrow = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <path
      d="M7 17 17 7M17 7H9M17 7v8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Four-beat load-in:
//   1. the photo (2s hold, then its own 1.5s CSS fade/scale — see .hero__bg)
//   2. just the "Our time / UTC−8 Los Angeles" block
//   3. the "See work" / "Let's chat" buttons (sliding up from below)
//   4. everything else (headline, stat, "Create\Studio" and its coordinate
//      markers, the showreel, the two statement lines — which scatter in
//      character-by-character)
//
// On top of that, a single shared `exitProgress` MotionValue (0 at the top
// of the page, 1 once the hero has fully scrolled past) drives a SCROLL-EXIT
// on a second, inner wrapper per block via the `style` prop only — never
// mixed with the entrance `animate`/CSS-transition on the same element, so
// the two mechanisms never fight over the same `transform`. Large typography
// moves and clips out fastest; smaller text moves less; the coordinate
// markers scatter per character (see ScatterText); the photo barely moves.
const IMAGE_DELAY_MS = 2000
const TIER_TIME = 2
const TIER_CTA = 2.3
const TIER_REST = 2.6

// Deterministic small per-character jitter, reused for the wordmark's
// scroll-exit fragmentation (see FragmentChars below) — same idea as
// ScatterText's JITTER table, kept local since it's only used here.
const FRAGMENT_JITTER = [
  { x: -1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: -1 },
  { x: 1, y: 1 },
  { x: -1, y: 1 },
  { x: 1, y: -1 },
]

// Splits text into characters that drift apart, rotate and fade as the page
// scrolls — driven purely by `style` MotionValues on a dedicated inner span
// per character, kept off the CSS-transition-driven entrance above it (same
// safe-separation pattern as ScatterText/ScatterCharExit).
function FragmentChars({ text, exitProgress, startIndex = 0 }: { text: string; exitProgress?: MotionValue<number>; startIndex?: number }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <FragmentChar key={startIndex + i} ch={ch} index={startIndex + i} exitProgress={exitProgress} />
      ))}
    </>
  )
}

function FragmentChar({ ch, index, exitProgress }: { ch: string; index: number; exitProgress?: MotionValue<number> }) {
  const j = FRAGMENT_JITTER[index % FRAGMENT_JITTER.length]
  const fallback = useTransform(() => 0)
  const source = exitProgress ?? fallback
  const x = useTransform(source, [0.05, 0.75], [0, j.x * 90])
  const y = useTransform(source, [0.05, 0.75], [0, j.y * 70 - 60])
  const rotate = useTransform(source, [0.05, 0.75], [0, j.x * 40])
  const opacity = useTransform(source, [0.05, 0.5], [1, 0])

  if (!exitProgress) return <span>{ch === ' ' ? ' ' : ch}</span>

  return (
    <motion.span style={{ display: 'inline-block', x, y, rotate, opacity }}>
      {ch === ' ' ? ' ' : ch}
    </motion.span>
  )
}

export function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion())
  const time = useLiveClock()
  const heroRef = useRef<HTMLElement | null>(null)

  const [bgVisible, setBgVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setBgVisible(true), IMAGE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const rise = (delay: number, y = 24) =>
    shouldReduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE_OUT, delay },
        }

  const { scrollYProgress: exitProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const largeExitY = useTransform(exitProgress, [0, 1], [0, -160])
  const largeExitOpacity = useTransform(exitProgress, [0.12, 0.62], [1, 0])
  const smallExitY = useTransform(exitProgress, [0, 1], [0, -80])
  const smallExitOpacity = useTransform(exitProgress, [0.08, 0.5], [1, 0])
  const bgExitScale = useTransform(exitProgress, [0, 1], [1, 1.05])

  const largeExitStyle = shouldReduceMotion ? {} : { y: largeExitY, opacity: largeExitOpacity }
  const smallExitStyle = shouldReduceMotion ? {} : { y: smallExitY, opacity: smallExitOpacity }
  const bgExitStyle = shouldReduceMotion ? {} : { scale: bgExitScale }
  const charExitProgress = shouldReduceMotion ? undefined : exitProgress

  // "let's create" rises from underneath the wordmark on the SAME
  // exitProgress value that fragments it, so the two feel like one
  // synchronized transition rather than two independent scroll effects.
  // It starts pushed well below the hero's own bottom edge — clipped
  // entirely out of view by `.hero`'s overflow: hidden — so it genuinely
  // travels up from off-screen rather than just drifting a few pixels.
  const emergeOpacity = useTransform(exitProgress, [0.15, 0.85], [0, 1])
  const emergeY = useTransform(exitProgress, [0.1, 0.95], [420, 0])
  const emergeStyle = shouldReduceMotion ? { opacity: 1 } : { opacity: emergeOpacity, y: emergeY }

  return (
    <section id="top" className="hero" ref={heroRef}>
      <div className={`hero__bg ${bgVisible ? 'is-visible' : ''}`} aria-hidden="true">
        <motion.div className="hero__bg-scroll" style={bgExitStyle}>
          <img src={`${import.meta.env.BASE_URL}assets/hero-portrait.png`} alt="" />
        </motion.div>
      </div>
      <div className="hero__tint" aria-hidden="true" />

      <div className="hero__stage">
        <motion.div className="hero__emerge" style={emergeStyle} aria-hidden="true">
          <span className="hero__emerge-title">let's create</span>
        </motion.div>

        <motion.div className="hero__coord" style={smallExitStyle}>
          <motion.span className="eyebrow eyebrow--coord" {...rise(TIER_REST)}>
            <span className="eyebrow__line" aria-hidden="true" />
            <CharReveal text="// 00.01°" />
          </motion.span>
        </motion.div>

        <motion.div className="hero__headline-mask" style={largeExitStyle}>
          <motion.div {...rise(TIER_REST)}>
            <h1 className="hero__headline">
              Digital experiences that
              <br />
              connect, scale and perform<span className="hero__headline-dot">.</span>
            </h1>
          </motion.div>
        </motion.div>

        <motion.div className="hero__stat" style={smallExitStyle}>
          <motion.div {...rise(TIER_REST)}>
            <span className="hero__stat-number">
              <Counter value={120} suffix="+" duration={1.4} />
            </span>
            <p className="hero__stat-label">Quietly making noise for brands worldwide</p>
          </motion.div>
        </motion.div>

        <motion.div className="hero__wordmark-eyebrow" style={smallExitStyle}>
          <motion.span className="eyebrow eyebrow--coord" {...rise(TIER_REST, 40)}>
            <span className="eyebrow__line" aria-hidden="true" />
            // 00.02°
          </motion.span>
        </motion.div>

        <motion.div className="hero__wordmark" style={largeExitStyle}>
          <motion.div {...rise(TIER_REST, 40)}>
            <h2 className="hero__wordmark-title">
              <span className="hero__wordmark-accent">
                <FragmentChars text="Create" exitProgress={charExitProgress} startIndex={0} />
              </span>
              <span className="hero__wordmark-slash">
                <FragmentChars text="\" exitProgress={charExitProgress} startIndex={6} />
              </span>
              <FragmentChars text="Studio" exitProgress={charExitProgress} startIndex={7} />
            </h2>
          </motion.div>
        </motion.div>

        <motion.div className="hero__statements-eyebrow" style={smallExitStyle}>
          <motion.span className="eyebrow eyebrow--coord" {...rise(TIER_REST)}>
            <span className="eyebrow__line" aria-hidden="true" />
            // 00.03°
          </motion.span>
        </motion.div>

        <div className="hero__statements">
          <div className="hero__wordmark-statements">
            <p className="hero__wordmark-statement hero__wordmark-statement--muted">
              <ScatterText
                text="A design studio trusted by startups and leading brands."
                delay={TIER_REST}
                exitProgress={charExitProgress}
              />
            </p>
            <p className="hero__wordmark-statement">
              <ScatterText
                text="We create stories people remember."
                delay={TIER_REST + 0.15}
                exitProgress={charExitProgress}
              />
            </p>
          </div>

          <motion.div style={smallExitStyle}>
            <motion.div className="hero__timeinfo" {...rise(TIER_TIME)}>
              <p className="hero__timeinfo-row">
                <span className="hero__timeinfo-label">Our time</span>
                <span className="hero__timeinfo-clock">{time}</span>
              </p>
              <p className="hero__timeinfo-zone">UTC−8 Los Angeles</p>
            </motion.div>
          </motion.div>

          <motion.div style={smallExitStyle}>
            <motion.div className="hero__cta" {...rise(TIER_CTA, 48)}>
              <MotionLink
                to="/work"
                className="cta-pill cta-pill--accent"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={springSnappy}
              >
                See work <span className="cta-pill__icon">{arrow}</span>
              </MotionLink>
              <MotionLink
                to="/contact"
                className="cta-pill cta-pill--white"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={springSnappy}
              >
                Let's chat <span className="cta-pill__icon">{arrow}</span>
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>

        <Showreel delay={TIER_REST} exitStyle={smallExitStyle} />
      </div>
    </section>
  )
}
