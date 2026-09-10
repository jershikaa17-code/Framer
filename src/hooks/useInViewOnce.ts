import { useEffect, useRef, useState, type RefObject } from 'react'

// IntersectionObserver-based "reveal once" trigger, deliberately NOT built on
// Framer Motion's whileInView/animate engine. That engine's animate-driven
// values can get permanently stuck at their `hidden` state when a nearby node
// in the same tree also carries a style-driven MotionValue (e.g. a scroll
// parallax `y`) — reliably reproduced across the image-reveal wrappers in
// this project. A plain observer + CSS-transition class toggle sidesteps the
// conflict entirely.
//
// Pass `watchRef` when the element you want the *class* on is itself clipped
// to zero area in its hidden state (e.g. `clip-path: inset(0 0 100% 0)` for a
// wipe reveal) — such an element never registers as intersecting, so nothing
// would ever flip it to visible. Point the observer at an unclipped ancestor
// instead (its ref, created with plain useRef) while still applying the
// returned `inView` boolean's class to the clipped element.
export function useInViewOnce<T extends HTMLElement>(amount = 0.2, watchRef?: RefObject<T>) {
  const internalRef = useRef<T>(null)
  const ref = watchRef ?? internalRef
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: amount }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [amount, ref])

  return [ref, inView] as const
}
