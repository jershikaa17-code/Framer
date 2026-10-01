import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import '../components/footer.css'
import './newsletter.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const navigate = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Studio', href: '/studio' },
  { label: 'Whispers', href: '/whispers' },
  { label: 'Contact', href: '/contact' },
]

const links = [
  { label: 'Terms of service', href: '/terms' },
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: '404', href: '/404' },
  { label: 'More templates', href: '/templates' },
]

const social = [
  { label: 'X', full: 'X' },
  { label: 'Li', full: 'LinkedIn' },
  { label: 'IG', full: 'Instagram' },
  { label: 'FB', full: 'Facebook' },
  { label: 'WA', full: 'WhatsApp' },
]

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const reduceMotion = useReducedMotion()

  // The section sits with a large negative margin so it structurally
  // overlaps the section before it, then a clip-path wipe tied to its own
  // scroll-into-view progress reveals it from the bottom up — so it looks
  // like a physical layer rising to cover what's behind it, rather than
  // just fading or popping in. No position:sticky/fixed anywhere: once the
  // wipe finishes (its own top edge reaching the viewport top), it's fully
  // revealed and simply continues in normal document flow.
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  })
  const clipTop = useTransform(scrollYProgress, [0, 1], ['100%', '0%'])
  const clipPath = useTransform(clipTop, (v) => `inset(${v} 0% 0% 0%)`)

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
    <motion.section ref={sectionRef} className="newsletter section" style={{ clipPath }}>
      <div className="container newsletter__row">
        <div className="newsletter__inner">
          <div className="newsletter__left">
            <div className="newsletter__heading-row">
              <h2 className="newsletter__title">
                <RevealText text="Keep you in" />
                <RevealText text="the loop." delay={0.1} />
              </h2>
              <svg className="newsletter__dots" viewBox="0 0 400 400" aria-hidden="true">
                {Array.from({ length: 200 }, (_, i) => {
                  const angle = (i * 137.508 + 68) * (Math.PI / 180)
                  const radius = Math.sqrt(i + 1) * 13.4
                  const cx = 200 + Math.cos(angle) * radius
                  const cy = 200 + Math.sin(angle) * radius
                  const delay = `${i * 0.015}s`

                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={reduceMotion ? 3 : 5}
                      fill="var(--color-accent)"
                      opacity={reduceMotion ? 0.7 : 0}
                    >
                      {!reduceMotion && (
                        <>
                          <animate
                            attributeName="r"
                            values="1.5;7;1.5"
                            dur="3s"
                            begin={delay}
                            repeatCount="indefinite"
                            calcMode="spline"
                            keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.4;1;0.4"
                            dur="3s"
                            begin={delay}
                            repeatCount="indefinite"
                            calcMode="spline"
                            keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
                          />
                        </>
                      )}
                    </circle>
                  )
                })}
              </svg>
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

        <div className="footer__col newsletter__nav-col newsletter__nav-col--navigate">
          <p className="footer__heading">Navigate</p>
          <ul>
            {navigate.map((item) => (
              <li key={item.label}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col newsletter__nav-col newsletter__nav-col--links">
          <p className="footer__heading">Links</p>
          <ul>
            {links.map((item) => (
              <li key={item.label}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container newsletter__social-row">
        <p className="footer__heading newsletter__social-label">Follow us on socials</p>
        <div className="footer__social">
          {social.map((item) => (
            <a key={item.label} href="#" aria-label={`Create Studio on ${item.full}`}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
