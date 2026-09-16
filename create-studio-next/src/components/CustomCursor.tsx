'use client'

import { useEffect, useRef, useState } from 'react'

// A 12px dot that follows the pointer with a light lerp, hidden on touch
// devices. `[data-cursor]` elements (buttons, hovers) hide the native
// cursor via CSS in globals.css.
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [isTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  )

  useEffect(() => {
    if (isTouch) return

    const pos = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const el = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]')
      setActive(Boolean(el))
    }

    let raf: number
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.25
      pos.y += (target.y - pos.y) * 0.25
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 rounded-full bg-white mix-blend-difference transition-transform duration-150 ${
        active ? 'scale-[2.2]' : 'scale-100'
      }`}
    />
  )
}
