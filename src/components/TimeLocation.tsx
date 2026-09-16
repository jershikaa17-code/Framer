import { useLiveClock } from '../hooks/useLiveClock'
import { CharReveal } from '../animations/CharReveal'
import './time-location.css'

// Rendered as a scroll-linked chapter inside Hero.tsx's pinned frame now —
// see the note in Intro.tsx.
export function TimeLocation() {
  const time = useLiveClock()

  return (
    <section className="time-loc section">
      <div className="container time-loc__inner">
        <span className="eyebrow">
          <CharReveal text="// 00.03°" />
        </span>
        <p className="time-loc__row">
          <span className="time-loc__label">Our time</span>
          <span className="time-loc__clock">{time}</span>
        </p>
        <p className="time-loc__zone">UTC−8 · Los Angeles</p>
      </div>
    </section>
  )
}
