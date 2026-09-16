import { CharReveal } from '../animations/CharReveal'
import './intro.css'

// Rendered as a scroll-linked chapter inside Hero.tsx's pinned frame now —
// visibility/entrance is driven entirely by the wrapping `.hero__chapter`'s
// scroll-linked opacity/y there, so this no longer animates itself in on
// scroll-into-view.
export function Intro() {
  return (
    <section className="intro section" id="studio">
      <div className="container intro__inner">
        <span className="eyebrow">
          <CharReveal text="// 00.02°" />
        </span>

        <h2 className="intro__wordmark">
          <span className="intro__wordmark-accent">Create</span>
          <span className="intro__wordmark-slash">\</span>
          Studio
        </h2>

        <div className="intro__statements">
          <p className="intro__statement intro__statement--muted">
            A design studio trusted by startups and leading brands.
          </p>
          <p className="intro__statement">We create stories people remember.</p>
        </div>
      </div>
    </section>
  )
}
