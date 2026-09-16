'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const logos = [
  'Northwind',
  'Velvet & Co',
  'Orbit Labs',
  'Marrow',
  'Fieldstone',
  'Kestrel',
  'Halcyon',
  'Vantage Point',
]

export function RotatingLogo() {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % logos.length), 2600)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <div className="relative ml-auto h-[30px] w-[140px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={logos[index]}
          className="absolute inset-0 flex items-center justify-end font-display text-lg font-medium text-white"
          initial={reduceMotion ? false : { y: 14, filter: 'blur(6px)', opacity: 0 }}
          animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
          exit={{ y: -14, filter: 'blur(6px)', opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          {logos[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
