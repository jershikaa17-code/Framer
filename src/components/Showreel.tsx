import { useRef, useState } from 'react'
import { motion, type MotionStyle } from 'motion/react'
import { EASE_OUT, FRAMER_SPRING } from '../animations/variants'
import { ScrambleText } from '../animations/ScrambleText'
import './showreel.css'

export function Showreel({ delay = 0, exitStyle }: { delay?: number; exitStyle?: MotionStyle }) {
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
    <motion.section className="showreel" id="showreel" style={exitStyle}>
      <div className="showreel__head">
        <ScrambleText as="span" className="eyebrow" text="Showreel" />
        <span className="showreel__rule" />
        <span className="showreel__year-tag">{'\\2026'}</span>
      </div>

      <motion.div
        className="showreel__frame"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: EASE_OUT, delay }}
      >
        <video
          ref={videoRef}
          className="showreel__video"
          src={`${import.meta.env.BASE_URL}assets/hero.mp4`}
          poster={`${import.meta.env.BASE_URL}assets/showreel.jpg`}
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

      <p className="showreel__caption">
        <span className="showreel__caption-marker" aria-hidden="true" />
        Best Digital Campaign, Wobbly Awards
      </p>
    </motion.section>
  )
}
