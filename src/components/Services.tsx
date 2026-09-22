import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue } from 'motion/react'
import { services, type Service } from '../data/services'
import { headerZoom, headerTitle, headerSub, imgHover } from '../animations/variants'
import { useInViewOnce } from '../hooks/useInViewOnce'
import './services.css'

// Each `.service-row` is `position: sticky; top: 0`, so as you scroll, the
// next row rises up from below and covers the current one before it too
// pins (see the comment in services.css). Framer's `useScroll` computes
// progress from the target's own live geometry, which freezes solid the
// moment a sticky element actually pins (its rect stops changing) — so it
// gets stuck rather than continuing to track scroll.
//
// A once-on-mount snapshot of the row's document top (`getBoundingClientRect().top
// + window.scrollY`) doesn't work either — it goes stale the instant anything
// above this row changes height after mount (a lazy image, a web font swap,
// another section's own scroll-triggered reveal), permanently throwing off
// every later progress calculation for the row's whole lifetime. Instead, a
// zero-height sentinel sits in normal flow right before the sticky row and
// is re-measured on every scroll tick — since it's never sticky, its rect
// never freezes and never goes stale, so pin progress stays correct no
// matter what shifts elsewhere on the page.
function ServiceRow({ service, isLast }: { service: Service; isLast?: boolean }) {
  const rowRef = useRef<HTMLDivElement | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  const [revealRef, revealed] = useInViewOnce<HTMLDivElement>(0.3)

  const pinProgress = useMotionValue(0)
  // Only the text dissolves as the next row covers this one — blurring the
  // photo as well produced a visible seam where its own clipped/transformed
  // layer met the rest of the group. Fading opacity toward 0 reads as the
  // text fading to white, since the page background is white.
  const coverBlur = useTransform(pinProgress, [0.45, 1], ['blur(0px)', 'blur(12px)'])
  const coverFade = useTransform(pinProgress, [0.45, 1], [1, 0])

  useEffect(() => {
    const sentinel = sentinelRef.current
    const row = rowRef.current
    if (!sentinel || !row) return
    const onScroll = () => {
      const height = row.offsetHeight
      const raw = -sentinel.getBoundingClientRect().top / height
      pinProgress.set(Math.min(1, Math.max(0, raw)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pinProgress])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 0 }} />
      <div className="service-row" ref={rowRef}>
        <motion.div className="service-row__blur-group" whileHover="hover">
          <motion.div className="service-row__fade" style={{ filter: coverBlur, opacity: coverFade }}>
            <div className="service-row__tab">
              <span className="service-row__category">{service.category}</span>
              <span className="service-row__index">/{service.index}</span>
            </div>

            <h3 className="service-row__title">{service.title}</h3>
          </motion.div>

          <div className="service-row__content">
            <div ref={revealRef} className={`service-row__media ${revealed ? 'is-revealed' : ''}`}>
              <motion.div className="service-row__media-inner" style={{ y: imgY }}>
                <motion.img
                  src={`${import.meta.env.BASE_URL}${service.image}`}
                  alt={service.title}
                  loading="lazy"
                  variants={imgHover}
                />
              </motion.div>
            </div>
            <motion.div className="service-row__fade" style={{ filter: coverBlur, opacity: coverFade }}>
              <p className="service-row__desc">{service.description}</p>
              <ul className="service-row__capabilities">
                {service.capabilities.map((cap) => (
                  <li key={cap}>
                    <span>+</span>
                    {cap}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
        {isLast && <div className="service-row__lines" aria-hidden="true" />}
      </div>
    </>
  )
}

export function Services() {
  return (
    <section className="services section" id="services">
      <motion.div
        className="container services__head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerZoom}
      >
        <motion.h2 className="services__wordmark" variants={headerTitle}>
          services
        </motion.h2>
        <motion.p className="services__sub" variants={headerSub}>
          What we do best, and what your next project needs most.
        </motion.p>
      </motion.div>

      <div className="container services__list">
        {services.map((service, i) => (
          <ServiceRow service={service} isLast={i === services.length - 1} key={service.title} />
        ))}
      </div>
    </section>
  )
}
