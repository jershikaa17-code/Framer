'use client'

import { useEffect, useRef } from 'react'

// Fixed, full-screen tiled noise, animated in 8 discrete steps at ~6fps for
// a "living grain" feel rather than a static texture. The noise pattern is
// generated once onto a small canvas and reused as a data-URL background
// (no external asset needed).
export function FilmGrain() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const imageData = ctx.createImageData(128, 128)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255)
      imageData.data[i] = v
      imageData.data[i + 1] = v
      imageData.data[i + 2] = v
      imageData.data[i + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)
    const url = canvas.toDataURL('image/png')

    const el = ref.current
    if (!el) return
    el.style.backgroundImage = `url(${url})`

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let step = 0
    const id = window.setInterval(() => {
      step = (step + 1) % 8
      const x = (step % 4) * 32
      const y = Math.floor(step / 4) * 32
      el.style.backgroundPosition = `${x}px ${y}px`
    }, 1000 / 6)

    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
      style={{ opacity: 0.06, mixBlendMode: 'overlay', backgroundSize: '128px 128px' }}
    />
  )
}
