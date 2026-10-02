import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { pricingPlans } from '../data/pricing'
import { RevealText } from '../animations/RevealText'
import {
  fadeUp,
  FRAMER_SPRING,
  headerZoom,
  headerEyebrow,
  headerTitle,
  headerSub,
} from '../animations/variants'
import './pricing.css'

const barsIcon = (
  <span className="pricing-card__bars" aria-hidden="true">
    <span />
    <span />
    <span />
    <span />
  </span>
)

const checkIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
    <path d="m8 12.5 2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const plusIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const clockIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const simpleIcon = (
  <svg viewBox="0 0 16 16" width="18" height="18" fill="var(--color-text-muted)" aria-hidden="true">
    <path d="M 7.5 0 C 3.365 0 0 3.365 0 7.5 C 0 11.635 3.365 15 7.5 15 C 11.635 15 15 11.635 15 7.5 C 15 3.365 11.635 0 7.5 0 Z M 5.156 3.75 C 5.933 3.75 6.563 4.38 6.563 5.156 C 6.563 5.933 5.933 6.563 5.156 6.563 C 4.38 6.563 3.75 5.933 3.75 5.156 C 3.75 4.38 4.38 3.75 5.156 3.75 Z M 9.844 11.25 C 9.067 11.25 8.438 10.62 8.438 9.844 C 8.438 9.067 9.067 8.438 9.844 8.438 C 10.62 8.438 11.25 9.067 11.25 9.844 C 11.25 10.62 10.62 11.25 9.844 11.25 Z M 10.975 5.35 L 5.35 10.975 C 5.175 11.152 4.936 11.251 4.688 11.251 C 4.439 11.251 4.2 11.152 4.025 10.975 C 3.659 10.609 3.659 10.016 4.025 9.65 L 9.65 4.025 C 9.885 3.781 10.234 3.683 10.561 3.769 C 10.889 3.855 11.145 4.111 11.231 4.439 C 11.317 4.766 11.219 5.115 10.975 5.35 Z" />
  </svg>
)

const planBadgeIcon = (
  <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
    <g transform="translate(.5 .5)">
      <path
        fill="#5c6063"
        d="M0 5.07c0-.703 0-1.055.104-1.368.093-.277.243-.531.442-.744.224-.242.533-.41 1.151-.746L4.251.817C5.308.242 5.837-.047 6.269.006c.377.046.717.248.938.557.254.354.254.956.254 2.161v5.263c0 .703 0 1.054-.105 1.367a1.98 1.98 0 0 1-.441.744c-.226.242-.534.41-1.151.746L3.209 12.239c-1.056.576-1.585.865-2.017.812a1.32 1.32 0 0 1-.939-.557C0 12.139 0 11.537 0 10.332Z"
      />
      <path
        fill="#888d92"
        transform="translate(3.73 1.017)"
        d="M0 5.07c0-.703 0-1.055.104-1.368.093-.277.243-.531.442-.744.224-.242.533-.41 1.151-.746L4.251.818C5.308.242 5.837-.047 6.269.006c.377.046.717.248.938.557.254.354.254.956.254 2.161v5.263c0 .703 0 1.054-.105 1.367a1.98 1.98 0 0 1-.441.744c-.226.242-.534.41-1.151.746L3.209 12.238c-1.056.577-1.585.865-2.017.812a1.32 1.32 0 0 1-.939-.557C0 12.139 0 11.537 0 10.332Z"
      />
      <path
        fill="#d5d7de"
        transform="translate(7.461 2.035)"
        d="M0 5.07c0-.703 0-1.055.104-1.368.093-.277.243-.531.443-.744.224-.242.533-.41 1.15-.746L4.251.818C5.308.242 5.837-.047 6.269.006c.377.046.718.248.939.557.253.354.253.956.253 2.161v5.263c0 .703 0 1.054-.105 1.367a1.98 1.98 0 0 1-.441.744c-.226.242-.534.41-1.151.746L3.209 12.238c-1.056.577-1.585.865-2.017.812a1.32 1.32 0 0 1-.938-.557C0 12.139 0 11.537 0 10.332V5.069Z"
      />
    </g>
  </svg>
)

const chatIcon = (
  <svg viewBox="0 0 16 16" className="pricing__book-chat" aria-hidden="true" fill="#fff">
    <path d="M 7 0 C 3.134 0 0 2.687 0 6 C 0 7.21 0.422 8.335 1.141 9.278 L 0.5 12 L 3.635 11.262 C 4.634 11.731 5.78 12 7 12 C 10.866 12 14 9.313 14 6 C 14 2.687 10.866 0 7 0 Z" />
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

const thumbItems = [
  {
    src: 'assets/pricing-scale-2.jpg',
    eyebrow: 'Core',
    audienceLines: ['For startups and first', 'launches'],
  },
  {
    src: 'assets/pricing-scale-3.jpg',
    eyebrow: 'Studio',
    audienceLines: ['For growing teams and', 'serious builds'],
  },
  {
    src: 'assets/pricing-scale.jpg',
    eyebrow: 'Scale',
    audienceLines: ['For established teams', 'and long-term growth'],
  },
]

function nextAvailability() {
  const d = new Date()
  d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7 || 7))
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function Pricing() {
  const [openIndex, setOpenIndex] = useState(0)
  const [thumbTick, setThumbTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setThumbTick((t) => t + 1)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="pricing section">
      <motion.div
        className="container pricing__long-run"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="pricing__simple">
          <p className="pricing__big-heading">
            {simpleIcon}
            Simple Pricing
          </p>
          <p className="pricing__simple-sub">
            Plans that scale with your project and give you room for unlimited creative
            opportunities.
          </p>
          <motion.div
            className="pricing__simple-thumb"
            initial={{ opacity: 0, y: 36, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={FRAMER_SPRING}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={thumbTick}
                src={`${import.meta.env.BASE_URL}${thumbItems[thumbTick % thumbItems.length].src}`}
                alt=""
                loading="lazy"
                style={{ zIndex: thumbTick }}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
            <AnimatePresence initial={false}>
              <motion.span
                key={`top-${thumbTick}`}
                className="pricing__simple-thumb-badge pricing__simple-thumb-badge--top"
                style={{ zIndex: thumbTick }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {thumbItems[thumbTick % thumbItems.length].audienceLines.map((line, i) => (
                  <span className="pricing__simple-thumb-badge-line" key={i}>
                    {line.toUpperCase()}
                  </span>
                ))}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence initial={false}>
              <motion.span
                key={`bottom-${thumbTick}`}
                className="pricing__simple-thumb-badge pricing__simple-thumb-badge--bottom"
                style={{ zIndex: thumbTick }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="pricing__simple-thumb-badge-icon" aria-hidden="true">
                  {planBadgeIcon}
                </span>
                {thumbItems[thumbTick % thumbItems.length].eyebrow.toUpperCase()}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          <p className="pricing__simple-caption">
            Pick a plan that grows with you and keeps creative costs predictable.
          </p>
          <a href="#contact" className="pricing__simple-cta">
            {arrowIcon} Explore plans
          </a>
        </div>

        <div className="pricing__long-run-copy">
          <p className="pricing__eyebrow-label">Built for the long run</p>
          <p className="pricing__big-heading">
            With You
            <br />
            Beyond Launch
          </p>
          <img
            src={`${import.meta.env.BASE_URL}assets/pricing-infinity.png`}
            alt=""
            className="pricing__long-run-infinity"
            loading="lazy"
          />
          <ul className="pricing__long-run-list">
            {['Ongoing support', 'Long-term partnership', 'Future-ready builds'].map((item) => (
              <li key={item}>
                {checkIcon}
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="pricing__long-run-book">
          <p className="pricing__eyebrow-label">Quick intro call, no strings attached.</p>
          <p className="pricing__big-heading">Let&rsquo;s chat or just say hello.</p>

          {chatIcon}

          <video
            src={`${import.meta.env.BASE_URL}assets/pricing-mascot.mp4`}
            className="pricing__book-mascot"
            autoPlay
            loop
            muted
            playsInline
          />

          <div className="pricing__book-panel">
            <p className="pricing__book-panel-label">
              {clockIcon} Next Availability
            </p>
            <p className="pricing__book-panel-date">from {nextAvailability()}.</p>
            <a href="#contact" className="pricing__book-panel-cta">
              <span className="pricing__book-panel-cta-icon">{arrowIcon}</span>
              Book now
            </a>
          </div>

          <span className="pricing__book-watermark" aria-hidden="true">
            <span className="pricing__book-watermark-text">
              create<sup className="pricing__book-watermark-reg">®</sup>
            </span>
          </span>
        </div>
      </motion.div>

      <motion.div
        className="container pricing__head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerZoom}
      >
        <motion.span className="eyebrow" variants={headerEyebrow}>
          // 00.07°
        </motion.span>
        <motion.h2 className="pricing__title" variants={headerTitle}>
          <RevealText text="Pick a plan that grows with you and keeps creative costs predictable." />
        </motion.h2>
        <motion.p className="pricing__sub" variants={headerSub}>
          —— Designed around your specs, each plan gives you clarity on scope, features, and cost
          so you can move forward with confidence.
        </motion.p>
        <div className="pricing__dashes" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </motion.div>

      <div className="container pricing__list">
        {pricingPlans.map((plan, i) => {
          const isOpen = openIndex === i
          return (
            <div className={`pricing-card ${isOpen ? 'is-open' : ''}`} key={plan.index}>
              <button
                className="pricing-card__header"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                {barsIcon}
                <span className="pricing-card__heading">
                  <span className="pricing-card__eyebrow">{plan.eyebrow}</span>
                  <span className="pricing-card__plan-name">{plan.name}</span>
                </span>
                <motion.span
                  className="pricing-card__toggle"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={FRAMER_SPRING}
                >
                  {plusIcon}
                </motion.span>
              </button>

              <div className="pricing-card__body">
                <div className="pricing-card__body-inner">
                  <motion.div
                    className="pricing-card__grid"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                  >
                    <div className="pricing-card__col">
                      <p className="pricing-card__audience">{plan.audience}</p>
                      <div className="pricing-card__price-row">
                        <span className="pricing-card__price">{plan.price}</span>
                        <span className="pricing-card__per">/project</span>
                      </div>
                      <div className="pricing-card__was-row">
                        <span>was {plan.wasPrice}</span>
                        <span className="pricing-card__save">SAVE 20%</span>
                      </div>
                      <div className="pricing-card__thumb">
                        <img src={`${import.meta.env.BASE_URL}${plan.image}`} alt="" loading="lazy" />
                      </div>
                      <p className="pricing-card__desc">{plan.description}</p>
                      <div className="pricing-card__mini-dashes" aria-hidden="true">
                        {Array.from({ length: 22 }).map((_, d) => (
                          <span key={d} />
                        ))}
                      </div>
                    </div>

                    <div className="pricing-card__col pricing-card__col--features">
                      <ul className="pricing-card__features">
                        {plan.features.map((f) => (
                          <li key={f}>
                            {checkIcon}
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pricing-card__col pricing-card__col--cta">
                      <ul className="pricing-card__highlights">
                        {plan.highlights.map((h) => (
                          <li key={h}>
                            <span>+</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      <a href="#contact" className="pricing-card__cta">
                        Get started {arrowIcon}
                      </a>
                      <div className="pricing-card__timeline">
                        {clockIcon}
                        <span>Timeline</span>
                        <span>{plan.timeline}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="container pricing__expert">
        <p className="pricing__expert-title">Ask our expert</p>
        <p className="pricing__expert-sub">
          Schedule a quick call, and we'll walk you through our flexible plans.
        </p>
        <div className="pricing__expert-person">
          <img
            src={`${import.meta.env.BASE_URL}assets/maggie-winslow.avif`}
            alt=""
            className="pricing__expert-avatar"
            loading="lazy"
          />
          <div>
            <p className="pricing__expert-name">Maggie Winslow</p>
            <p className="pricing__expert-role">Project Operations Manager</p>
          </div>
        </div>
        <a href="#contact" className="pricing__expert-cta" aria-label="Book a call">
          {arrowIcon}
        </a>
      </div>
    </section>
  )
}
