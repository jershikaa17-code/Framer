import { motion, useReducedMotion } from 'motion/react'
import './logo-marquee.css'

interface LogoMarqueeProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  variant?: 'light' | 'dark'
}

export function LogoMarquee({
  items,
  speed = 32,
  direction = 'left',
  variant = 'dark',
}: LogoMarqueeProps) {
  const track = [...items, ...items]
  const reduceMotion = useReducedMotion()

  return (
    <div className={`logo-marquee logo-marquee--${variant}`}>
      <div className="logo-marquee__fade logo-marquee__fade--left" />
      <motion.div
        className="logo-marquee__track"
        animate={
          reduceMotion
            ? undefined
            : { x: direction === 'right' ? ['-50%', '0%'] : ['0%', '-50%'] }
        }
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((item, i) => (
          <span className="logo-marquee__item" key={i}>
            {item}
          </span>
        ))}
      </motion.div>
      <div className="logo-marquee__fade logo-marquee__fade--right" />
    </div>
  )
}
