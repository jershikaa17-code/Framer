import { useLocation } from 'react-router-dom'
import './book-call.css'

const arrow = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <path
      d="M4 12h16M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function BookCall() {
  const { pathname } = useLocation()
  // The Home and Whispers pages already have their own "Book an intro call"
  // CTA inside InspireCTA, right above where this band would render — skip
  // the duplicate there.
  if (pathname === '/whispers' || pathname === '/') return null

  return (
    <section className="book-call section" id="contact">
      <div className="container">
        <a href="mailto:hello@create.com" className="book-call__cta">
          Book an intro call {arrow}
        </a>
      </div>
    </section>
  )
}
