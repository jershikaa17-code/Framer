'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'

// Lenis drives its own rAF loop and updates the real document scroll
// position, so Framer Motion's `useScroll` (which listens to native
// scroll/resize) keeps working without any extra glue. Disabled on touch
// devices per spec — mobile keeps native scrolling.
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduceMotion) return

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
