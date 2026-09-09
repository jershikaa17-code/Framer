import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { scaleReveal, FRAMER_SPRING } from '../animations/variants'
import { ScrambleText } from '../animations/ScrambleText'
import './showreel.css'

export function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <section className="showreel">
      <div className="showreel__head">
        <ScrambleText as="span" className="eyebrow" text="Showreel" />
        <span className="showreel__rule" />
        <span className="showreel__year-tag">{'\\2026'}</span>
      </div>

      <motion.div
        className="showreel__frame"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={scaleReveal}
      >
        <video
          ref={videoRef}
          className="showreel__video"
          src="/assets/hero.mp4"
          poster="/assets/showreel.jpg"
          autoPlay
          muted
          loop
          playsInline
          onEnded={() => setIsPlaying(false)}
        />
        <div className="showreel__overlay" />
        <button
          className="showreel__play"
          data-cursor={isPlaying ? 'Pause' : 'Play showreel'}
          data-cursor-icon={isPlaying ? 'pause' : 'play'}
          aria-label={isPlaying ? 'Pause showreel' : 'Play showreel'}
          onClick={togglePlay}
        >
          {!isPlaying && (
            <motion.span
              className="showreel__play-ring"
              aria-hidden="true"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <motion.span
            className="showreel__play-icon"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            transition={FRAMER_SPRING}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.span>
        </button>
      </motion.div>
    </section>
  )
}
