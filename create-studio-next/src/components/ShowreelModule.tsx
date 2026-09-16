'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type MotionValue } from 'framer-motion'

const rewindIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M11 18V6l-8.5 6 8.5 6Zm10 0V6l-8.5 6 8.5 6Z" />
  </svg>
)
const pauseIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
  </svg>
)
const forwardIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M2 18V6l8.5 6L2 18Zm10 0V6l8.5 6-8.5 6Z" />
  </svg>
)

export function ShowreelModule({ ruleProgress }: { ruleProgress: MotionValue<number> }) {
  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <div className="w-[min(548px,100%)]">
        <div className="mb-2 flex items-center gap-3 font-mono-label text-[13px] text-white">
          <span>Showreel</span>
          <span className="relative h-px flex-1 bg-white/30">
            <motion.span
              className="absolute inset-y-0 left-0 origin-left bg-accent"
              style={{ scaleX: reduceMotion ? 1 : ruleProgress }}
            />
          </span>
          <span>{'\\2026'}</span>
        </div>

        <motion.div
          layoutId="showreel-card"
          className="relative aspect-[548/321] w-full cursor-pointer overflow-hidden rounded-lg"
          data-cursor
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setOpen(true)}
          animate={{ scale: hover && !open ? 1.02 : 1 }}
          transition={{ duration: 0.3 }}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <video
            className="h-full w-full object-cover"
            src="/assets/hero.mp4"
            poster="/assets/showreel.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
          <AnimatePresence>
            {hover && !open && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center gap-6 bg-black/20 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  className="text-white"
                  aria-label="Rewind"
                  onClick={(e) => e.stopPropagation()}
                >
                  {rewindIcon}
                </button>
                <button
                  className="text-white"
                  aria-label={paused ? 'Play' : 'Pause'}
                  onClick={(e) => {
                    e.stopPropagation()
                    setPaused((p) => !p)
                  }}
                >
                  {pauseIcon}
                </button>
                <button
                  className="text-white"
                  aria-label="Forward"
                  onClick={(e) => e.stopPropagation()}
                >
                  {forwardIcon}
                </button>
                <span className="absolute bottom-3 left-3 font-display text-base text-white">
                  Showreel 2025
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-2 flex items-center gap-2 font-mono-label text-[13px] text-white"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.1 }}
        >
          <span aria-hidden="true">◍</span>
          <span>Best Digital Campaign, Wobbly Awards</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              layoutId="showreel-card"
              className="relative aspect-video w-[92vw] max-w-5xl overflow-hidden rounded-lg"
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                className="h-full w-full object-cover"
                src="/assets/hero.mp4"
                autoPlay
                loop
                playsInline
                controls
              />
            </motion.div>
            <button
              className="absolute right-6 top-6 font-mono-label text-sm text-white"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
