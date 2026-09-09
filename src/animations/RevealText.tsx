import { Fragment } from 'react'
import { motion } from 'motion/react'
import { EASE_OUT } from './variants'
import './reveal-text.css'

interface RevealTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
  amount?: number
}

export function RevealText({
  text,
  as = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
  once = true,
  amount = 0.6,
}: RevealTextProps) {
  const words = text.split(' ')
  const Tag = motion[as] as typeof motion.span

  return (
    <Tag
      className={`reveal-text ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="reveal-text__mask">
            <motion.span
              className="reveal-text__word"
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 0.85, ease: EASE_OUT } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i !== words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
