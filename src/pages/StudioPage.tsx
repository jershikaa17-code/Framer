import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { TeamGrid } from '../components/TeamGrid'
import { StudioProcess } from '../components/StudioProcess'
import { ClientsGrid } from '../components/ClientsGrid'
import { Achievements } from '../components/Achievements'
import { Awards } from '../components/Awards'
import { InspireCTA } from '../components/InspireCTA'
import { RevealText } from '../animations/RevealText'
import { ScrollLitWords } from '../animations/ScrollLitWords'
import {
  fadeUp,
  staggerContainer,
  headerZoom,
  headerEyebrow,
  headerTitle,
  headerSub,
  headerLine,
  clipReveal,
} from '../animations/variants'
import '../components/studio-page.css'

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
  return (
    <main className="studio-page">
      <section className="studio-hero section">
        <motion.div
          className="studio-hero__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerZoom}
        >
          <motion.div className="studio-hero__media" variants={clipReveal}>
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
              variants={staggerContainer(0.12, 0.3)}
            >
              <motion.span variants={fadeUp}>we listen.</motion.span>
              <motion.span variants={fadeUp}>we imagine.</motion.span>
              <motion.span className="studio-hero__tagline-accent" variants={fadeUp}>
                we create.
              </motion.span>
            </motion.div>
          </motion.div>

          <div className="studio-hero__content">
            <motion.div variants={headerEyebrow}>
              <span className="eyebrow">
                <span className="eyebrow__marker" aria-hidden="true" />
                <motion.span className="eyebrow__line" variants={headerLine} aria-hidden="true" />
              </span>
            </motion.div>
            <motion.h1 className="studio-hero__title" variants={headerTitle}>
              <RevealText text="The Studio" />
            </motion.h1>
            <motion.h6 className="studio-hero__lead" variants={headerSub}>
              We help ambitious teams turn good ideas into strong digital experiences and products.
            </motion.h6>
          </div>
        </motion.div>
      </section>

      <section className="studio-mission section">
        <div className="container studio-mission__inner">
          <ScrollLitWords
            className="studio-mission__statement"
            text="Every project is personal to us, shaped by real conversations, thoughtful decisions, and the belief that great work comes from collaboration, not hierarchy."
          />
        </div>
      </section>

      <section className="studio-we section">
        <motion.div
          className="studio-we__media"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={clipReveal}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/studio-we.avif`}
            alt="Two Create® teammates working together at a desk."
          />
        </motion.div>

        <motion.div
          className="studio-we__content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
        >
          <motion.p className="studio-we__card" variants={fadeUp}>
            Create® design, build, and launch digital products that connect clarity with
            character.
          </motion.p>

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
            Amazing group of designers, developers, and strategists who enjoy the process as much
            as the final product.
          </motion.p>
        </motion.div>
      </section>

      <TeamGrid />
      <StudioProcess />
      <ClientsGrid />

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
