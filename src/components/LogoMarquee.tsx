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
  const reduceMotion = useReducedMotion()
  const groupIndexes = [0, 1, 2]

  return (
    <div className={`logo-marquee logo-marquee--${variant}`}>
      <div className="logo-marquee__fade logo-marquee__fade--left" />
      <motion.div
        className="logo-marquee__track"
        animate={
          reduceMotion
            ? undefined
            : { x: direction === 'right' ? ['-33.333333%', '0%'] : ['0%', '-33.333333%'] }
        }
        transition={{ duration: speed, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
        style={{ width: 'max-content' }}
      >
        {groupIndexes.map((groupIndex) => (
          <div
            className="logo-marquee__group"
            key={groupIndex}
            aria-hidden={groupIndex !== 0}
          >
            {items.map((item, itemIndex) =>
              item.image ? (
                <span
                  className="logo-marquee__item logo-marquee__item--img"
                  key={`${groupIndex}-${item.name}-${itemIndex}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${item.image}`}
                    alt={groupIndex === 0 ? item.name : ''}
                    loading="lazy"
                  />
                </span>
              ) : (
                <span
                  className="logo-marquee__item"
                  key={`${groupIndex}-${item.name}-${itemIndex}`}
                >
                  {item.name}
                </span>
              ),
            )}
          </div>
        ))}
      </motion.div>
      <div className="logo-marquee__fade logo-marquee__fade--right" />
    </div>
  )
}
