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
        transition={{ duration: speed, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
        style={{ width: 'max-content' }}
      >
        {track.map((item, i) => {
          const key = `${item.name}-${i}`

          return item.image ? (
            <span className="logo-marquee__item logo-marquee__item--img" key={key}>
              <img src={`${import.meta.env.BASE_URL}${item.image}`} alt={item.name} loading="lazy" />
            </span>
          ) : (
            <span className="logo-marquee__item" key={key}>
              {item.name}
            </span>
          )
        })}
      </motion.div>
      <div className="logo-marquee__fade logo-marquee__fade--right" />
    </div>
  )
}
