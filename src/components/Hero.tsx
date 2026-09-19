import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react'
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
// The two statement lines only start their character reveal once the
// "Our time / UTC−8 Los Angeles" block (TIER_TIME, 0.8s rise duration) has
// fully finished, per the requested reveal order.
const STATEMENTS_DELAY = 2.9

// The wordmark's scroll-exit is a hard horizontal wipe (see wordmarkClipPath
// in Hero() below) rather than a fade/translate or character-scatter — an
// invisible horizontal boundary sweeps down through the letterforms via
// clip-path, erasing them in place while the text itself never moves.

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

  const smallExitY = useTransform(exitProgress, [0, 1], [0, -80])
  const smallExitOpacity = useTransform(exitProgress, [0.08, 0.5], [1, 0])
  const bgExitScale = useTransform(exitProgress, [0, 1], [1, 1.05])

  const smallExitStyle = shouldReduceMotion ? {} : { y: smallExitY, opacity: smallExitOpacity }
  const bgExitStyle = shouldReduceMotion ? {} : { scale: bgExitScale }

  // The wordmark is erased by a hard horizontal boundary sweeping down
  // through the letterforms as the page scrolls, instead of fading or
  // translating — position stays fixed, only the clip mask moves. Starts
  // almost immediately once scrolling begins, same minimal dead-scroll
  // distance as the headline's wipe above.
  const wordmarkClipProgress = useTransform(exitProgress, [0.03, 0.43], [0, 100])
  const wordmarkClipPathRaw = useMotionTemplate`inset(${wordmarkClipProgress}% 0 0 0)`
  const wordmarkClipPath = shouldReduceMotion ? undefined : wordmarkClipPathRaw

  // "Digital experiences that…" is erased by the SAME kind of hard
  // horizontal wipe as the wordmark — never a fade or an upward translate
  // — and starts almost immediately once scrolling begins (barely any dead
  // scroll distance), since its own mount-entrance rise() is already long
  // finished (~3.4s after load) by the time a user actually starts
  // scrolling.
  const headlineClipProgress = useTransform(exitProgress, [0.03, 0.43], [0, 100])
  const headlineClipPathRaw = useMotionTemplate`inset(${headlineClipProgress}% 0 0 0)`
  const headlineClipPath = shouldReduceMotion ? undefined : headlineClipPathRaw
  // Same wipe, same [0.03, 0.43] timing, shared by everything else that
  // should vanish in sync with the headline/wordmark: both "// 00.0X°"
  // eyebrows below the fold, the two statement lines, the time/location
  // block, the CTA buttons, and the showreel — one clip motion value
  // reused as a style object rather than a patchwork of separate
  // fade/translate/dissolve exits.
  const uniformClipProgress = useTransform(exitProgress, [0.03, 0.43], [0, 100])
  const uniformClipPathRaw = useMotionTemplate`inset(${uniformClipProgress}% 0 0 0)`
  const uniformClipPath = shouldReduceMotion ? undefined : uniformClipPathRaw
  const uniformClipStyle = { clipPath: uniformClipPath, WebkitClipPath: uniformClipPath }
  // "// 00.02°" sits high enough on the page (top: ~250-410px) that normal
  // page scroll carries it behind the fixed navbar (z-index 200, 60px
  // tall) around exitProgress ~0.27-0.29 — well before the shared
  // [0.03, 0.43] wipe would finish, so it looked like it was getting cut
  // off/stuck instead of cleanly vanishing. Same 0.03 start as everything
  // else, just a shorter span so it fully completes before that point.
  const wordmarkEyebrowClipProgress = useTransform(exitProgress, [0.03, 0.22], [0, 100])
  const wordmarkEyebrowClipPathRaw = useMotionTemplate`inset(${wordmarkEyebrowClipProgress}% 0 0 0)`
  const wordmarkEyebrowClipPath = shouldReduceMotion ? undefined : wordmarkEyebrowClipPathRaw
  const wordmarkEyebrowClipStyle = { clipPath: wordmarkEyebrowClipPath, WebkitClipPath: wordmarkEyebrowClipPath }

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

        <div className="hero__headline-mask">
          <motion.div {...rise(TIER_REST)}>
            <motion.h1
              className="hero__headline"
              style={{ clipPath: headlineClipPath, WebkitClipPath: headlineClipPath }}
            >
              Digital experiences that
              <br />
              connect, scale and perform<span className="hero__headline-dot">.</span>
            </motion.h1>
          </motion.div>
        </div>

        <motion.div className="hero__stat" style={smallExitStyle}>
          <motion.div {...rise(TIER_REST)}>
            <span className="hero__stat-number">
              <Counter value={120} suffix="+" duration={1.4} />
            </span>
            <p className="hero__stat-label">Quietly making noise for brands worldwide</p>
          </motion.div>
        </motion.div>

        <motion.div className="hero__wordmark-eyebrow" style={wordmarkEyebrowClipStyle}>
          <motion.span className="eyebrow eyebrow--coord" {...rise(TIER_REST, 40)}>
            <span className="eyebrow__line" aria-hidden="true" />
            // 00.02°
          </motion.span>
        </motion.div>

        <div className="hero__wordmark">
          <motion.div {...rise(TIER_REST, 40)}>
            <motion.h2
              className="hero__wordmark-title"
              style={{ clipPath: wordmarkClipPath, WebkitClipPath: wordmarkClipPath }}
            >
              <span className="hero__wordmark-accent">Create</span>
              <span className="hero__wordmark-slash">\</span>
              Studio
            </motion.h2>
          </motion.div>
        </div>

        <motion.div className="hero__statements-eyebrow" style={uniformClipStyle}>
          <motion.span className="eyebrow eyebrow--coord" {...rise(TIER_REST)}>
            <span className="eyebrow__line" aria-hidden="true" />
            // 00.03°
          </motion.span>
        </motion.div>

        <div className="hero__statements">
          <motion.div className="hero__wordmark-statements" style={uniformClipStyle}>
            <p className="hero__wordmark-statement hero__wordmark-statement--muted">
              <ScatterText
                text="A design studio trusted by startups and leading brands."
                delay={STATEMENTS_DELAY}
              />
            </p>
            <p className="hero__wordmark-statement">
              <ScatterText
                text="We create stories people remember."
                delay={STATEMENTS_DELAY + 0.2}
              />
            </p>
          </motion.div>

          <motion.div style={uniformClipStyle}>
            <motion.div className="hero__timeinfo" {...rise(TIER_TIME)}>
              <p className="hero__timeinfo-row">
                <span className="hero__timeinfo-label">Our time</span>
                <span className="hero__timeinfo-clock">{time}</span>
              </p>
              <p className="hero__timeinfo-zone">UTC−8 Los Angeles</p>
            </motion.div>
          </motion.div>

          <motion.div style={uniformClipStyle}>
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

        <Showreel delay={TIER_REST} exitStyle={uniformClipStyle} />
      </div>
    </section>
  )
}
