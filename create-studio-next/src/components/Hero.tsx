'use client'

import { Fragment, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { RotatingLogo } from './RotatingLogo'
import { RollButton } from './RollButton'
import { ShowreelModule } from './ShowreelModule'
import { HeroWordmark } from './HeroWordmark'
import { HeroStageB } from './HeroStageB'
import { LiveClock } from './LiveClock'
import { Counter } from './Counter'

const EASE = [0.16, 1, 0.3, 1] as const

function HeadlineWord({ word, delay, accent }: { word: string; delay: number; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden align-top">
      <motion.span
        className="inline-block"
        initial={{ y: '110%', filter: 'blur(10px)', opacity: 0 }}
        animate={{ y: '0%', filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {word}
        {accent ? <span className="text-accent">.</span> : null}
      </motion.span>
    </span>
  )
}

const headlineLines = [
  ['Digital', 'experiences', 'that'],
  ['connect,', 'scale', 'and'],
  ['perform'],
]

function Headline() {
  let i = 0
  return (
    <h1 className="max-w-[540px] font-display text-[clamp(28px,3.8vw,43.2px)] font-medium leading-[1] tracking-[-0.05em] text-white">
      {headlineLines.map((line, li) => (
        <span className="block" key={li}>
          {line.map((word, wi) => {
            const delay = 0.25 + i * 0.055
            i += 1
            const isLast = li === headlineLines.length - 1 && wi === line.length - 1
            return (
              <Fragment key={word}>
                <HeadlineWord word={word} delay={delay} accent={isLast} />
                {wi !== line.length - 1 ? ' ' : ''}
              </Fragment>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

// The dark hero canvas ends in a soft organic curve rather than a hard
// edge — a light-colored SVG wave laid over the very bottom of the sticky
// viewport, in the same color as the section that follows.
function OrganicEdge() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[120px] w-full"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,70 C 240,110 480,30 720,55 C 960,80 1200,20 1440,60 L1440,120 L0,120 Z"
        fill="#F2F2F2"
      />
    </svg>
  )
}

export function Hero() {
  const outerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })

  const springCfg = { stiffness: 90, damping: 25 }
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '12%']), springCfg)
  const bgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.08]), springCfg)
  const wordmarkY = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, -80]), springCfg)
  const wordmarkOpacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.25]), springCfg)
  const columnY = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, -40]), springCfg)
  const columnOpacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springCfg)
  const showreelRule = useTransform(scrollYProgress, [0, 0.35], [0, 1])

  const stageAGroupOpacity = useTransform(scrollYProgress, [0.38, 0.5], [1, 0])
  const stageBOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1])

  return (
    <section ref={outerRef} className="relative h-[200svh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden" data-cursor>
        <motion.div
          className="absolute inset-0 z-0"
          style={reduceMotion ? undefined : { y: bgY, scale: bgScale }}
        >
          <motion.video
            className="h-full w-full object-cover"
            src="/assets/hero.mp4"
            poster="/assets/showreel.jpg"
            autoPlay
            muted
            loop
            playsInline
            initial={reduceMotion ? false : { opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(20,20,20,.55) 0%, rgba(20,20,20,.15) 40%, rgba(20,20,20,.75) 100%)',
            }}
          />
        </motion.div>

        <motion.div
          className="relative z-20 h-full px-5 md:px-10 lg:px-[100px]"
          style={{ opacity: stageAGroupOpacity }}
        >
          <motion.div
            className="absolute left-5 top-[58px] md:left-10 md:top-[90px] lg:left-[100px]"
            style={reduceMotion ? undefined : { y: columnY, opacity: columnOpacity }}
          >
            <motion.span
              className="mb-8 block font-mono-label text-[10.24px] tracking-[-0.4096px] text-white"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: [0, 1, 0.3, 1] }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              {'// 00.01°'}
            </motion.span>
            <Headline />
          </motion.div>

          <motion.div
            className="absolute right-5 top-[58px] text-right md:right-10 md:top-[90px] lg:right-[100px]"
            style={reduceMotion ? undefined : { y: columnY, opacity: columnOpacity }}
          >
            <span className="block font-display text-[64px] font-bold leading-none tracking-[-0.05em] text-accent">
              <Counter value={120} suffix="+" delay={0.55} duration={1.4} />
            </span>
            <motion.p
              className="mt-2 font-mono-label text-base leading-[1.3] text-white"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.85 }}
            >
              Quietly making noise for
              <br />
              brands worldwide
            </motion.p>
            <div className="mt-4">
              <RotatingLogo />
            </div>
          </motion.div>

          <motion.span
            className="absolute left-5 top-[220px] font-mono-label text-[10.24px] tracking-[-0.4096px] text-white md:left-10 md:top-[300px] lg:left-[100px] lg:top-[345px]"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: [0, 1, 0.3, 1] }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            {'// 00.02°'}
          </motion.span>

          <div className="absolute bottom-10 left-5 max-w-[420px] md:left-10 lg:left-[100px]">
            <motion.p
              className="font-mono-label text-base leading-[1.3] text-white"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              A design studio trusted by startups and
              <br />
              leading brands.
              <br />
              We create stories people remember.
            </motion.p>
            <motion.div
              className="mt-6 flex flex-wrap gap-6"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25 }}
            >
              <motion.div
                initial={reduceMotion ? false : { scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.25 }}
              >
                <RollButton href="/work" variant="outline">
                  SEE WORK
                </RollButton>
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : { scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.35 }}
              >
                <RollButton href="/contact" variant="solid">
                  LET&apos;S CHAT
                </RollButton>
              </motion.div>
            </motion.div>

            <div className="mt-8">
              <LiveClock />
            </div>
          </div>

          <motion.div
            className="absolute bottom-10 right-5 md:right-10 lg:right-[100px]"
            initial={reduceMotion ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <ShowreelModule ruleProgress={showreelRule} />
          </motion.div>
        </motion.div>

        <HeroWordmark y={wordmarkY} opacity={wordmarkOpacity} />

        <HeroStageB opacity={stageBOpacity} />

        <OrganicEdge />
      </div>
    </section>
  )
}
