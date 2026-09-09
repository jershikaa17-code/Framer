import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { EASE_OUT } from '../animations/variants'
import { Hero } from './Hero'
import { Intro } from './Intro'
import { TimeLocation } from './TimeLocation'
import { CTAArea } from './CTAArea'
import { Showreel } from './Showreel'
import './hero-cluster.css'

export function HeroCluster() {
  const clusterRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: clusterRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <div className="hero-cluster" ref={clusterRef}>
      <div className="hero-cluster__bg">
        <motion.div
          className="hero-cluster__bg-inner"
          style={{ y: bgY }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        >
          <video
            src="/assets/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        </motion.div>
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
