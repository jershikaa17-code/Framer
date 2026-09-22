import { useState } from 'react'
import { motion } from 'motion/react'
import { faqItems } from '../data/faq'
import { RevealText } from '../animations/RevealText'
import {
  FRAMER_SPRING,
  headerZoom,
  headerEyebrow,
  headerTitle,
  headerSub,
  staggerContainer,
  fadeUp,
} from '../animations/variants'
import './faq.css'

const plusIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const arrowIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path
      d="M4 12h16M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq section">
      <div className="container faq__layout">
        <motion.div
          className="faq__head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerZoom}
        >
          <motion.span className="eyebrow" variants={headerEyebrow}>
            FAQ
          </motion.span>
          <motion.h2 className="faq__title" variants={headerTitle}>
            <RevealText text="Clearing doubts and concerns" />
          </motion.h2>
          <motion.p className="faq__sub" variants={headerSub}>
            Explore the most common questions about working with Create, all in one place.
          </motion.p>

          <div className="faq__contact">
            <p className="faq__contact-lead">Book a quick chat and we&rsquo;ll walk you through how we do things.</p>
            <div className="faq__contact-person">
              <img
                src={`${import.meta.env.BASE_URL}assets/lynn-bergmann.avif`}
                alt=""
                className="faq__contact-avatar"
                loading="lazy"
              />
              <div>
                <p className="faq__contact-name">Lynn Bergmann</p>
                <p className="faq__contact-role">Project Manager</p>
              </div>
            </div>
            <a href="#contact" className="faq__contact-cta">
              Book a call {arrowIcon}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="faq__list"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.05)}
        >
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.question} variants={fadeUp}>
                <button
                  className="faq-item__header"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-item__question">{item.question}</span>
                  <motion.span
                    className="faq-item__toggle"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={FRAMER_SPRING}
                  >
                    {plusIcon}
                  </motion.span>
                </button>

                <div className="faq-item__body">
                  <div className="faq-item__body-inner">
                    <p className="faq-item__answer">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
