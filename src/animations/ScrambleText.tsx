import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

interface ScrambleTextProps {
  text: string
  as?: 'span' | 'p'
  className?: string
  duration?: number
  once?: boolean
}

export function ScrambleText({
  text,
  as = 'span',
  className = '',
  duration = 600,
  once = true,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once, amount: 0.6 })
  const [display, setDisplay] = useState(text)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isInView || (once && hasRun.current)) return
    hasRun.current = true

    const frameMs = 35
    const totalFrames = Math.ceil(duration / frameMs)
    let frame = 0

    const id = setInterval(() => {
      frame += 1
      const progress = frame / totalFrames
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            const revealAt = (i / text.length) * 0.7
            return progress > revealAt + 0.3 ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      if (frame >= totalFrames) {
        setDisplay(text)
        clearInterval(id)
      }
    }, frameMs)

    return () => clearInterval(id)
  }, [isInView, text, duration, once])

  const Tag = as
  return (
    <Tag ref={ref as React.Ref<never>} className={className} aria-label={text}>
      {display}
    </Tag>
  )
}
