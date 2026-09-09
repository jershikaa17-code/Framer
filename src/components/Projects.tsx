import { motion } from 'motion/react'
import { projects } from '../data/projects'
import { fadeUp } from '../animations/variants'
import { RevealText } from '../animations/RevealText'
import './projects.css'

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
          <motion.a
            href="#work"
            className="project-card"
            key={project.title}
            data-cursor="View case study"
            data-cursor-icon="arrow"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
            transition={{ delay: i * 0.05 }}
          >
            <img className="project-card__img" src={project.image} alt={project.title} loading="lazy" />
            <div className="project-card__scrim" />

            <div className="project-card__mark">{project.title.split(' ')[0]}</div>
            <div className="project-card__dashes" aria-hidden="true">
              {Array.from({ length: 24 }).map((_, d) => (
                <span key={d} />
              ))}
            </div>

            <div className="project-card__stack">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <span className="project-card__year">YR/ {project.year}</span>

            <div className="project-card__center">
              <h3>{project.title}</h3>
              <p>{project.category}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
