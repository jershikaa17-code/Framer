import { useLayoutEffect, useRef, useState, type RefObject } from 'react'

// Scales an element's font-size so its rendered width always exactly fills
// its block-level parent — used for the Whispers "whispers" wordmark, which
// spans edge-to-edge on the reference site regardless of viewport width. A
// vw-based clamp can only approximate that fill (font metrics vary per
// browser/platform); measuring the actual rendered width and solving for the
// font-size that matches the parent's width is exact and re-runs on resize.
//
// Measurement happens on an offscreen clone, never on the live element:
// repeatedly resizing the real node while Framer Motion's `whileInView`
// reveal is evaluating/animating it can leave that animation permanently
// stuck mid-transition (the same class of issue documented in
// useInViewOnce.ts), so the visible element's font-size is written exactly
// once, after the final size is known.
export function useFitText<T extends HTMLElement>(baseSize = 100) {
  const ref = useRef<T>(null)
  const [fontSize, setFontSize] = useState<number | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return

    const measureAt = (probe: HTMLElement, size: number) => {
      probe.style.fontSize = `${size}px`
      return probe.getBoundingClientRect().width
    }

    const fit = () => {
      const containerWidth = parent.clientWidth
      if (containerWidth <= 0) return

      const probe = el.cloneNode(true) as HTMLElement
      probe.style.position = 'absolute'
      probe.style.visibility = 'hidden'
      probe.style.pointerEvents = 'none'
      probe.style.left = '-9999px'
      probe.style.top = '0'
      document.body.appendChild(probe)

      let size = baseSize
      let width = measureAt(probe, size)
      if (width > 0) {
        size = (containerWidth / width) * size
        // Font rasterization isn't perfectly linear across sizes (hinting/
        // subpixel rounding), so one probe-and-scale pass can land a percent
        // or two off — a second pass against the now-close estimate converges
        // to an exact fill.
        width = measureAt(probe, size)
        if (width > 0) size = (containerWidth / width) * size
      }

      document.body.removeChild(probe)
      setFontSize(size)
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(parent)
    return () => observer.disconnect()
  }, [baseSize])

  return { ref: ref as RefObject<T>, fontSize }
}
