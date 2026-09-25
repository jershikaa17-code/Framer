import { useRef } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { TeamGrid } from '../components/TeamGrid'
import { StudioProcess } from '../components/StudioProcess'
import { ClientsGrid } from '../components/ClientsGrid'
import { Achievements } from '../components/Achievements'
import { Awards } from '../components/Awards'
import { InspireCTA } from '../components/InspireCTA'
import { RevealText } from '../animations/RevealText'
import { CharReveal } from '../animations/CharReveal'
import { ScrollLitWords } from '../animations/ScrollLitWords'
import type { Variants } from 'motion/react'
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  headerZoom,
  headerTitle,
  headerSub,
  clipReveal,
  EASE_OUT,
} from '../animations/variants'
import '../components/studio-page.css'

// Studio hero sequencing: the copy outside the photo (title + lead) uses the
// shared clipReveal/headerTitle/headerSub timings as-is (they animate first,
// starting at t=0). The photo itself is held back until that copy has
// settled, then the "we listen / we imagine" lines inside the photo wait for
// the photo to finish revealing before they simply fade in, and "we create."
// types in letter by letter right after.
const heroImageReveal: Variants = {
  hidden: clipReveal.hidden,
  show: {
    ...clipReveal.show,
    transition: { duration: 1.1, ease: EASE_OUT, delay: 1.3 },
  },
}
const HERO_IMAGE_DONE = 2.4
const HERO_CREATE_DELAY = 2.9

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

const caseCards = [
  {
    badge: 'Aurelis',
    logo: 'assets/aurelis-logo.svg',
    slug: 'aurelis-beach-resort',
    title: 'Aurelis Beach Resort',
    sub: 'Hospitality branding and website',
    desc: 'Build a premium resort identity and digital platform.',
    image: 'assets/project-aurelis.jpg',
  },
  {
    badge: 'Blackwell',
    logo: 'assets/blackwell-logo.svg',
    slug: 'blackwell-motors',
    title: 'Blackwell Motors',
    sub: 'Automotive digital transformation',
    desc: 'Rebrand and launch Blackwell’s first EV line.',
    image: 'assets/project-blackwell.jpg',
  },
  {
    badge: 'Aspen',
    logo: 'assets/clients/lindholm.svg',
    slug: 'lindholm-aspen-877',
    title: 'Aspen® 877',
    sub: 'E-Mobility brand launch',
    desc: 'Launch Aspen® 877 with identity, website, and campaign.',
    image: 'assets/project-aspen.jpg',
  },
  {
    badge: 'Monolith',
    logo: 'assets/clients/monolith.svg',
    slug: 'monolith-architecture',
    title: 'Monolith Architecture',
    sub: 'Architecture studio rebrand and digital platform',
    desc: 'Redefine the brand and digital presence.',
    image: 'assets/process-building.jpg',
  },
  {
    badge: 'Numeriq',
    logo: 'assets/clients/numeriq.svg',
    title: 'Numeriq Fashion',
    sub: 'Fashion brand and campaign launch',
    desc: 'A label system and a campaign built to travel.',
    video: 'assets/numeriq.mp4',
  },
] as const

export function StudioPage() {
  const missionSentinelRef = useRef<HTMLDivElement>(null)

  return (
    <main className="studio-page">
      <div className="studio-stack">
      <section className="studio-hero section">
        <motion.div
          className="studio-hero__grid"
          initial="hidden"
          animate="show"
          variants={headerZoom}
        >
          <motion.div className="studio-hero__media" variants={heroImageReveal}>
            <img
              src={`${import.meta.env.BASE_URL}assets/studio-hero.jpg`}
              alt="The Create® team gathered around a table, collaborating."
            />
            <div className="studio-hero__scrim" aria-hidden="true" />
            <motion.div
              className="studio-hero__tagline"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={staggerContainer(0.15, HERO_IMAGE_DONE)}
            >
              <motion.span variants={fadeIn}>we listen.</motion.span>
              <motion.span variants={fadeIn}>we imagine.</motion.span>
              <CharReveal
                text="we create."
                as="span"
                className="studio-hero__tagline-accent"
                offset={22}
                stagger={0.05}
                delay={HERO_CREATE_DELAY}
              />
              <span className="studio-hero__ticks studio-hero__ticks--media" aria-hidden="true" />
            </motion.div>
          </motion.div>

          <div className="studio-hero__content">
            <div className="studio-hero__content-top">
              <div className="studio-hero__accent" aria-hidden="true">
                <span className="studio-hero__accent-line" />
                <span className="studio-hero__accent-bar" />
              </div>
              <motion.h1 className="studio-hero__title" variants={headerTitle}>
                <RevealText text="The Studio" />
              </motion.h1>
            </div>

            <div className="studio-hero__content-bottom">
              <motion.h6 className="studio-hero__lead" variants={headerSub}>
                We help ambitious teams turn good ideas into strong digital experiences and products.
              </motion.h6>
              <span className="studio-hero__ticks studio-hero__ticks--content" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </section>

      <div ref={missionSentinelRef} aria-hidden="true" style={{ height: 0 }} />
      <section className="studio-mission section">
        <div className="container studio-mission__inner">
          <ScrollLitWords
            className="studio-mission__statement"
            text="Every project is personal to us, shaped by real conversations, thoughtful decisions, and the belief that great work comes from collaboration, not hierarchy."
            sentinelRef={missionSentinelRef}
          />
        </div>
      </section>

      <section className="studio-we section">
        <div className="studio-we__media">
          <img
            src={`${import.meta.env.BASE_URL}assets/studio-we.avif`}
            alt="Two Create® teammates working together at a desk."
          />
        </div>

        <motion.div
          className="studio-we__content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
        >
          <motion.p className="studio-we__card" variants={fadeUp}>
            <video
              className="studio-we__card-loop"
              src={`${import.meta.env.BASE_URL}assets/loop.mp4`}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            Create® design, build, and launch digital products that connect clarity with
            character.
          </motion.p>

          <div className="studio-we__stamp-group">
            <div className="studio-we__stamp">
              <motion.h2 className="studio-we__h" variants={fadeUp}>
                we are
              </motion.h2>
              <motion.h2 className="studio-we__h" variants={fadeUp}>
                <span className="studio-we__accent">
                  create<sup>®</sup>
                </span>
              </motion.h2>
            </div>

            <motion.p className="studio-we__p" variants={fadeUp}>
              Amazing group of designers, developers, and strategists who enjoy the process as
              much as the final product.
            </motion.p>
          </div>
        </motion.div>
      </section>

      <TeamGrid />
      </div>
      <StudioProcess />

      <div className="studio-stack-2">
        <section className="studio-band section">
          <span className="studio-process__ticks" aria-hidden="true" />
          <div className="studio-process__clip">
            <video
              src={`${import.meta.env.BASE_URL}assets/replace.mp4`}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <span className="studio-process__ticks" aria-hidden="true" />
        </section>
        <ClientsGrid />
      </div>

      <section className="partner-cta section">
        <motion.div
          className="container partner-cta__inner"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <div>
            <h2 className="partner-cta__title">Be our next partner</h2>
            <p className="partner-cta__sub">
              We&rsquo;re open to new ideas, conversations, and collaborations. Let&rsquo;s find
              what we can build together.
            </p>
          </div>
          <Link to="/contact" className="partner-cta__link">
            Book an intro call {arrow}
          </Link>
        </motion.div>
      </section>

      <Achievements />
      <Awards />

      <section className="case-studies section">
        <div className="container">
          <motion.h2
            className="case-studies__title"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerTitle}
          >
            case studies
          </motion.h2>

          <motion.ul
            className="case-studies__list"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.08)}
          >
            {caseCards.map((card) => (
              <motion.li key={card.badge} variants={fadeUp}>
                {'video' in card ? (
                  <div className="case-card">
                    <video
                      src={`${import.meta.env.BASE_URL}${card.video}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <span className="case-card__in">
                      <img
                        className="case-card__badge"
                        src={`${import.meta.env.BASE_URL}${card.logo}`}
                        alt={card.badge}
                      />
                      <h3 className="case-card__title">{card.title}</h3>
                      <p className="case-card__sub">{card.sub}</p>
                      <span className="case-card__rule" aria-hidden="true" />
                      <p className="case-card__desc">{card.desc}</p>
                    </span>
                  </div>
                ) : (
                  <Link to={`/work/${card.slug}`} className="case-card">
                    <img src={`${import.meta.env.BASE_URL}${card.image}`} alt={card.title} loading="lazy" />
                    <span className="case-card__in">
                      <img
                        className="case-card__badge"
                        src={`${import.meta.env.BASE_URL}${card.logo}`}
                        alt={card.badge}
                      />
                      <h3 className="case-card__title">{card.title}</h3>
                      <p className="case-card__sub">{card.sub}</p>
                      <span className="case-card__rule" aria-hidden="true" />
                      <p className="case-card__desc">{card.desc}</p>
                    </span>
                  </Link>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <InspireCTA />
    </main>
  )
}
