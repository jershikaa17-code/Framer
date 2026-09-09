import './book-call.css'

const arrow = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <path
      d="M7 17 17 7M17 7H9M17 7v8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function BookCall() {
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
