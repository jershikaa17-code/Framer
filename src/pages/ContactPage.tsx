import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { InspireCTA } from '../components/InspireCTA'
import { RevealText } from '../animations/RevealText'
import { headerZoom, headerTitle, headerSub, fadeUp, EASE_OUT } from '../animations/variants'
import '../components/contact-page.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Wipes up from the bottom edge as the hero scrolls into view, rather than
// just fading/scaling in with the rest of `.contact-page__hero`.
const heroImgReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: EASE_OUT } },
}

interface FormState {
  name: string
  company: string
  email: string
  message: string
}

const initialState: FormState = { name: '', company: '', email: '', message: '' }

export function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (error) setError('')
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) {
      setError('Let us know your name and a short message.')
      return
    }
    if (!EMAIL_RE.test(form.email)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <main className="contact-page">
      <section className="contact-page__intro section">
        <div className="contact-page__grid">
          <motion.div
            className="contact-page__hero"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerZoom}
          >
            <motion.img
              className="contact-page__hero-img"
              src={`${import.meta.env.BASE_URL}assets/contact-hero.avif`}
              alt=""
              variants={heroImgReveal}
            />
            <div className="contact-page__hero-scrim" />

            <div className="contact-page__hero-content">
              <motion.h1 className="contact-page__title" variants={headerTitle}>
                <RevealText text="Thinking about your next move?" />
              </motion.h1>
              <motion.p className="contact-page__sub" variants={headerSub}>
                Let&rsquo;s discuss how Create® can help make it real.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="contact-page__form-wrap"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <p className="contact-page__form-heading">Let&rsquo;s talk!</p>
            <p className="contact-page__form-sub">We&rsquo;d love to hear from you and your team.</p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.p
                  key="success"
                  className="contact-page__success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  Thanks — your message is in. We&rsquo;ll be in touch shortly.
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  className="contact-page__form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  noValidate
                >
                  <div className="contact-page__field">
                    <input
                      id="contact-name"
                      type="text"
                      placeholder=" "
                      value={form.name}
                      onChange={update('name')}
                    />
                    <label htmlFor="contact-name">Your name</label>
                  </div>
                  <div className="contact-page__field">
                    <input
                      id="contact-company"
                      type="text"
                      placeholder=" "
                      value={form.company}
                      onChange={update('company')}
                    />
                    <label htmlFor="contact-company">Company</label>
                  </div>
                  <div className="contact-page__field">
                    <input
                      id="contact-email"
                      type="email"
                      placeholder=" "
                      value={form.email}
                      onChange={update('email')}
                      aria-invalid={Boolean(error)}
                    />
                    <label htmlFor="contact-email">Email</label>
                  </div>
                  <div className="contact-page__field">
                    <textarea
                      id="contact-message"
                      placeholder=" "
                      value={form.message}
                      onChange={update('message')}
                      rows={4}
                    />
                    <label htmlFor="contact-message">Your message</label>
                  </div>
                  <button type="submit">Submit →</button>
                </motion.form>
              )}
            </AnimatePresence>
            {error && <p className="contact-page__error">{error}</p>}
            <p className="contact-page__legal">
              By submitting, you agree to our <a href="#">Terms & Service.</a>
            </p>
          </motion.div>
        </div>
      </section>

      <InspireCTA />
    </main>
  )
}
