import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { projects, type Project } from '../data/projects'
import { fadeUp, scrimHover, staggerContainer, FRAMER_SPRING } from '../animations/variants'
import { useInViewOnce } from '../hooks/useInViewOnce'
import './projects.css'

const MotionLink = motion.create(Link)

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  // Watches cardRef (unclipped) rather than the img-wrap itself, since the
  // wrap's hidden state uses a clip-path that zeroes its visible area — such
  // an element never registers as intersecting on its own. See useInViewOnce.
  const [, revealed] = useInViewOnce(0.15, cardRef)

  return (
    <MotionLink
      ref={cardRef}
      to={`/work/${project.slug}`}
      className="project-card"
      data-cursor="View case study"
      data-cursor-icon="arrow"
      initial="hidden"
      animate={revealed ? 'show' : 'hidden'}
      whileHover="hover"
      variants={fadeUp}
      transition={{ delay: index * 0.05 }}
    >
      <div className={`project-card__img-wrap ${revealed ? 'is-revealed' : ''}`}>
        <img
          className="project-card__img"
          src={`${import.meta.env.BASE_URL}${project.image}`}
          alt={project.title}
          loading="lazy"
        />
      </div>
      <motion.div className="project-card__scrim" variants={scrimHover} />

      {project.slug === 'blackwell-motors' && (
        <img
          src={`${import.meta.env.BASE_URL}assets/blackwell-logo.svg`}
          alt="Blackwell"
          className="project-card__logo"
          draggable={false}
        />
      )}

      <div className="project-card__mark">{project.title.split(' ')[0]}</div>
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

export function Projects() {
  return (
    <section className="projects section" id="work">
      <div className="projects__list">
        {projects.map((project, i) => (
          <ProjectCard project={project} index={i} key={project.title} />
        ))}
      </div>
    </section>
  )
}
