import { motion, useReducedMotion } from 'motion/react'
import type { ClientLogo } from '../data/clients'
import './logo-marquee.css'

interface LogoMarqueeProps {
  items: ClientLogo[]
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
        {track.map((item, i) =>
          item.image ? (
            <span className="logo-marquee__item logo-marquee__item--img" key={i}>
              <img src={`${import.meta.env.BASE_URL}${item.image}`} alt={item.name} loading="lazy" />
            </span>
          ) : (
            <span className="logo-marquee__item" key={i}>
              {item.name}
            </span>
          ),
        )}
      </motion.div>
      <div className="logo-marquee__fade logo-marquee__fade--right" />
    </div>
  )
}
