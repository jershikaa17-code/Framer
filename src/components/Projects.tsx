import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { projects, type Project } from '../data/projects'
import {
  fadeUp,
  imgHover,
  scrimHover,
  staggerContainer,
  clipReveal,
  FRAMER_SPRING,
} from '../animations/variants'
import { RevealText } from '../animations/RevealText'
import './projects.css'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])

  return (
    <motion.a
      ref={cardRef}
      href="#work"
      className="project-card"
      data-cursor="View case study"
      data-cursor-icon="arrow"
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      transition={{ delay: index * 0.05 }}
    >
      <motion.div
        className="project-card__img-wrap"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={clipReveal}
      >
        <motion.div className="project-card__img-inner" style={{ y: imgY }}>
          <motion.img
            className="project-card__img"
            src={project.image}
            alt={project.title}
            loading="lazy"
            variants={imgHover}
          />
        </motion.div>
      </motion.div>
      <motion.div className="project-card__scrim" variants={scrimHover} />

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
    </motion.a>
  )
}

export function Projects() {
  return (
    <section className="projects section" id="work">
      <div className="container projects__head">
        <div>
          <span className="eyebrow">// 00.05°</span>
          <h2 className="projects__title">
            <RevealText text="Selected work" />
          </h2>
        </div>
        <a href="#work" className="projects__more">
          2017–2025 · More projects →
        </a>
      </div>

      <div className="projects__list">
        {projects.map((project, i) => (
          <ProjectCard project={project} index={i} key={project.title} />
        ))}
      </div>
    </section>
  )
}
