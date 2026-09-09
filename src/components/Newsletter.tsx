import { useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import './newsletter.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section className="newsletter section">
      <div className="container newsletter__inner">
        <div className="newsletter__left">
          <div className="newsletter__heading-row">
            <h2 className="newsletter__title">
              <RevealText text="Keep you in the loop." />
            </h2>
            <span className="newsletter__dots" aria-hidden="true">
              {Array.from({ length: 48 }).map((_, i) => {
                const angle = i * 137.508 // golden-angle spiral
                const radius = 3 + Math.sqrt(i) * 5.6
                return (
                  <span
                    key={i}
                    style={{ transform: `rotate(${angle}deg) translate(${radius}px)` }}
                  />
                )
              })}
            </span>
          </div>
          <p className="newsletter__sub">
            Get the latest news, insights directly to your inbox. <span>*</span>
          </p>
        </div>

        <div className="newsletter__form-wrap">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.p
                key="success"
                className="newsletter__success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                You're in — watch your inbox for studio news.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                className="newsletter__form"
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                noValidate
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  aria-label="Email address"
                  aria-invalid={Boolean(error)}
                />
                <button type="submit">Join our newsletter →</button>
              </motion.form>
            )}
          </AnimatePresence>
          {error && <p className="newsletter__error">{error}</p>}
          <p className="newsletter__legal">
            By submitting, you agree to our <a href="#">Terms & Service.</a>
            <br />
            <span>*</span> No spam, just awesome updates.
          </p>
        </div>
      </div>
    </section>
  )
}
