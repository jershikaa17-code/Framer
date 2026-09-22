import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { projects, type Project } from '../data/projects'
import { fadeUp, scrimHover, staggerContainer, FRAMER_SPRING } from '../animations/variants'
import { useInViewOnce } from '../hooks/useInViewOnce'
import './projects.css'

const MotionLink = motion.create(Link)

// These three cards' source photos are cropped hard by the shared card
// height — size them to `.project-card--fit`'s own aspect ratio instead.
const FIT_SLUGS = new Set(['aurelis-beach-resort', 'blackwell-motors', 'lindholm-aspen-877'])

// Same three cards also get a strong scroll-linked zoom on the home page:
// in as the card scrolls down through the viewport, back out as it scrolls
// back up — driven purely by scroll position, so reversing scroll reverses
// the zoom for free. Kept on the `<img>` itself, separate from the card's
// own entrance fade/hover variants, so the motion mechanisms never fight
// over the same element's transform.
const SCROLL_ZOOM_SLUGS = FIT_SLUGS

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  // Watches cardRef (unclipped) rather than the img-wrap itself, since the
  // wrap's hidden state uses a clip-path that zeroes its visible area — such
  // an element never registers as intersecting on its own. See useInViewOnce.
  const [, revealed] = useInViewOnce(0.15, cardRef)

  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  // Never dips below 1 — `cover` already fills the card at scale 1, so this
  // keeps the photo covering it edge-to-edge at every scroll position with
  // no border of the card's own background showing through.
  const imgZoom = useTransform(cardProgress, [0, 1], [1, 1.5])

  return (
    <MotionLink
      ref={cardRef}
      to={`/work/${project.slug}`}
      className={`project-card ${FIT_SLUGS.has(project.slug) ? 'project-card--fit' : ''}`}
      data-cursor="View case study"
      data-cursor-icon="arrow"
      initial="hidden"
      animate={revealed ? 'show' : 'hidden'}
      whileHover="hover"
      variants={fadeUp}
      transition={{ delay: index * 0.05 }}
    >
      {project.slug !== 'monolith-architecture' && (
        <div className={`project-card__img-wrap ${revealed ? 'is-revealed' : ''}`}>
          <motion.img
            className="project-card__img"
            src={`${import.meta.env.BASE_URL}${project.image}`}
            alt={project.title}
            loading="lazy"
            style={SCROLL_ZOOM_SLUGS.has(project.slug) ? { scale: imgZoom } : undefined}
          />
        </div>
      )}
      <motion.div className="project-card__scrim" variants={scrimHover} />

      {project.slug === 'blackwell-motors' && (
        <img
          src={`${import.meta.env.BASE_URL}assets/blackwell-logo.svg`}
          alt="Blackwell"
          className="project-card__logo"
          draggable={false}
        />
      )}

      <div className="project-card__mark">
        {project.slug === 'aurelis-beach-resort' ? (
          <img
            src={`${import.meta.env.BASE_URL}assets/aurelis-logo.svg`}
            alt={project.title}
            className="project-card__mark-logo"
            draggable={false}
          />
        ) : (
          project.title.split(' ')[0]
        )}
      </div>
      <div className="project-card__dashes" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, d) => (
          <span key={d} />
        ))}
      </div>

      <motion.div className="project-card__stack" variants={staggerContainer(0.05, 0.15)}>
        {project.stack.map((tech) => (
          <motion.span key={tech} variants={fadeUp}>
            {tech}
          </motion.span>
        ))}
      </motion.div>
      <motion.span className="project-card__year" variants={fadeUp} transition={{ delay: 0.15 }}>
        YR/ {project.year}
      </motion.span>

      <motion.div
        className="project-card__center"
        variants={{ rest: { y: 0 }, hover: { y: -6, transition: FRAMER_SPRING } }}
      >
        <h3>{project.title}</h3>
        <p>{project.category}</p>
      </motion.div>
    </MotionLink>
  )
}

const homeProjects = projects.filter((project) => project.slug !== 'monolith-architecture')

export function Projects() {
  return (
    <section className="projects section" id="work">
      <div className="projects__list">
        {homeProjects.map((project, i) => (
          <ProjectCard project={project} index={i} key={project.title} />
        ))}
      </div>
    </section>
  )
}
