import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { Hero } from './Hero'
import { Intro } from './Intro'
import { TimeLocation } from './TimeLocation'
import { CTAArea } from './CTAArea'
import { Showreel } from './Showreel'
import './hero-cluster.css'

export function HeroCluster() {
  const clusterRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [canHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  // Plain CSS transition for the background entrance (opacity + scale on load).
  // Motion's JS `animate` engine for this element was landing stuck at its
  // `initial` value in this Motion version no matter how the tree was shaped
  // (with/without a sibling `style`-driven transform, with/without useScroll,
  // nested or not) — a CSS class toggle sidesteps that entirely and is 100%
  // reliable for a plain one-shot mount transition like this.
  const [bgVisible, setBgVisible] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setBgVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const { scrollYProgress } = useScroll({
    target: clusterRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-7%', shouldReduceMotion ? '-7%' : '7%'])

  // Hero scroll-vanish for the visual: fully gone within roughly the hero's own
  // viewport height, not the whole (much taller) cluster's scroll range. A raw
  // `transform` string keeps this from fighting the entrance `animate` above.
  const visualVanishTransform = useTransform(
    scrollYProgress,
    [0, 0.2],
    ['translateY(0px) scale(1)', shouldReduceMotion ? 'translateY(0px) scale(1)' : 'translateY(-40px) scale(0.97)']
  )
  const visualVanishOpacity = useTransform(
    scrollYProgress,
    [0, 0.07, 0.15, 0.2],
    shouldReduceMotion ? [1, 1, 1, 1] : [1, 0.92, 0.3, 0]
  )

  // Subtle mouse-follow drift on the visual — desktop pointers only, smoothed
  // with a spring so it never snaps. A few px of parallax, never the whole page.
  const mouseX = useSpring(0, { stiffness: 60, damping: 20, mass: 0.6 })
  const mouseY = useSpring(0, { stiffness: 60, damping: 20, mass: 0.6 })
  const driftX = useTransform(mouseX, [-1, 1], [-6, 6])
  const driftY = useTransform(mouseY, [-1, 1], [-6, 6])

  useEffect(() => {
    if (!canHover || shouldReduceMotion) return
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [canHover, shouldReduceMotion, mouseX, mouseY])

  return (
    <div className="hero-cluster" ref={clusterRef}>
      <div className="hero-cluster__bg">
        <div className={`hero-cluster__bg-inner ${bgVisible ? 'is-visible' : ''}`}>
          <motion.div className="hero-cluster__bg-parallax" style={{ y: bgY }}>
            <motion.div
              className="hero-cluster__bg-vanish"
              style={{ transform: visualVanishTransform, opacity: visualVanishOpacity }}
            >
              <motion.div
                className="hero-cluster__bg-drift"
                style={canHover && !shouldReduceMotion ? { x: driftX, y: driftY } : undefined}
              >
                <img src="assets/hero-portrait.png" alt="" aria-hidden="true" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <div className="hero-cluster__tint" />
      </div>

      <div className="hero-cluster__content">
        <Hero />
        <Intro />
        <TimeLocation />
        <CTAArea />
      </div>

      <Showreel />
    </div>
  )
}
