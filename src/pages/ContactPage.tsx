import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { InspireCTA } from '../components/InspireCTA'
import { RevealText } from '../animations/RevealText'
import { ScrambleText } from '../animations/ScrambleText'
import {
  headerZoom,
  headerEyebrow,
  headerTitle,
  headerSub,
  headerLine,
  fadeUp,
} from '../animations/variants'
import '../components/contact-page.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
        <div className="container contact-page__grid">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerZoom}
          >
            <motion.div variants={headerEyebrow}>
              <span className="eyebrow">
                <span className="eyebrow__marker" aria-hidden="true" />
                <motion.span className="eyebrow__line" variants={headerLine} aria-hidden="true" />
                <ScrambleText as="span" text="Contact" />
              </span>
            </motion.div>
            <motion.h1 className="contact-page__title" variants={headerTitle}>
              <RevealText text="Thinking about your next move?" />
            </motion.h1>
            <motion.p className="contact-page__sub" variants={headerSub}>
              —— Let&rsquo;s discuss how Create® can help make it real.
            </motion.p>
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
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={update('name')}
                    aria-label="Your name"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={form.company}
                    onChange={update('company')}
                    aria-label="Company"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={update('email')}
                    aria-label="Email"
                    aria-invalid={Boolean(error)}
                  />
                  <textarea
                    placeholder="Your message"
                    value={form.message}
                    onChange={update('message')}
                    aria-label="Your message"
                    rows={4}
                  />
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
