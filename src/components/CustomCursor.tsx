import { useEffect, useRef, useState } from 'react'
import './custom-cursor.css'

type CursorIcon = 'arrow' | 'play' | 'none'

const arrowIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path
      d="M7 17 17 7M17 7H9M17 7v8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const playIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [label, setLabel] = useState('')
  const [icon, setIcon] = useState<CursorIcon>('none')
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
      if (el) {
        setActive(true)
        setLabel(el.dataset.cursor ?? '')
        setIcon((el.dataset.cursorIcon as CursorIcon) ?? 'none')
      } else {
        setActive(false)
      }
    }

    let raf: number
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
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
    <div ref={dotRef} className={`custom-cursor ${active ? 'is-active' : ''}`} aria-hidden="true">
      <span>
        {icon === 'arrow' && <i className="custom-cursor__icon">{arrowIcon}</i>}
        {icon === 'play' && <i className="custom-cursor__icon">{playIcon}</i>}
        {label}
      </span>
    </div>
  )
}
