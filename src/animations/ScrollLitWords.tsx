import { Fragment, useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import './scroll-lit-words.css'

interface ScrollLitWordsProps {
  text: string
  className?: string
  /**
   * Element to measure scroll progress from instead of the paragraph itself.
   * Needed when this component sits inside a `position: sticky` ancestor —
   * once that ancestor pins, the paragraph's own `getBoundingClientRect()`
   * freezes solid (see the identical issue documented in Services.tsx), so
   * the "lit" calculation would stop updating for as long as it stays
   * pinned. A sentinel kept in normal flow just before the sticky ancestor
   * never freezes, so pass a ref to one here when that applies.
   */
  sentinelRef?: RefObject<HTMLElement | null>
}

// Recreates the reference site's word-by-word "lights up as you scroll" effect
// on its studio statement — a pure function of scroll position (not an
// IntersectionObserver/once trigger), so it lights AND unlights on the way
// back up. Formula matches the reference exactly: a "run" distance of
// 55% viewport height plus the paragraph's own height, mapped from how far
// the paragraph has travelled past 78% of the viewport, to a word count.
export function ScrollLitWords({ text, className = '', sentinelRef }: ScrollLitWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const p = ref.current
    if (!p) return
    const words = Array.from(p.querySelectorAll<HTMLSpanElement>('.scroll-lit-words__w'))
    let raf = 0

    const frame = () => {
      raf = 0
      const r = (sentinelRef?.current ?? p).getBoundingClientRect()
      const vh = window.innerHeight
      const run = Math.max(1, vh * 0.55 + r.height)
      const lit = Math.round(((vh * 0.78 - r.top) / run) * words.length)
      for (let i = 0; i < words.length; i++) {
        words[i].classList.toggle('on', i < lit)
      }
    }
    const tick = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    window.addEventListener('scroll', frame, { passive: true })
    window.addEventListener('resize', tick)
    frame()

    return () => {
      window.removeEventListener('scroll', frame)
      window.removeEventListener('resize', tick)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const words = text.split(' ')

  return (
    <p ref={ref} className={`scroll-lit-words ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="scroll-lit-words__w" aria-hidden="true">
            {word}
          </span>
          {i !== words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  )
}
