import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE_OUT } from './variants'

interface PricingAccordionProps {
  open: boolean
  children: ReactNode
  className?: string
}

// Height-animated accordion body: measures the content's natural height via
// ResizeObserver and animates `height` between 0 and that value with
// Motion's `animate` — never `display:none`, so content stays in the a11y
// tree and layout never snaps. Height is one of the few layout properties
// worth animating directly (per the reference's own pricing accordion);
// everything else on the page sticks to transform/opacity.
export function PricingAccordion({ open, children, className = '' }: PricingAccordionProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      setHeight(entries[0].contentRect.height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      className={className}
      style={{ overflow: 'hidden', willChange: 'height' }}
      initial={false}
      animate={{ height: open ? height : 0 }}
      transition={shouldReduceMotion ? { duration: 0.001 } : { duration: 0.6, ease: EASE_OUT }}
      aria-hidden={!open}
    >
      <div ref={innerRef}>{children}</div>
    </motion.div>
  )
}
