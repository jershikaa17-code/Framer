import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'motion/react'
import { EASE_OUT } from './variants'

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function Counter({ value, suffix = '', duration = 1.6, className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, value, duration])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      {display}
      {suffix}
    </motion.span>
  )
}
