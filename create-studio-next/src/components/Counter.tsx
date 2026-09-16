'use client'

import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

// Counts up once on mount (the hero is always above the fold, so a
// viewport check isn't needed the way it is for below-the-fold stats).
export function Counter({
  value,
  suffix = '',
  duration = 1.4,
  delay = 0,
}: {
  value: number
  suffix?: string
  duration?: number
  delay?: number
}) {
  const [display, setDisplay] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [value, duration, delay, reduceMotion])

  return (
    <>
      {display}
      {suffix}
    </>
  )
}
