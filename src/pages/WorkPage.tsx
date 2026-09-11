import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { projects } from '../data/projects'
import { ProjectCard } from '../components/Projects'
import { WorkFilter } from '../components/WorkFilter'
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
import '../components/work-page.css'

export function WorkPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('__all__')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesQuery = q === '' || project.title.toLowerCase().includes(q)
      const matchesCategory = category === '__all__' || project.tags.includes(category)
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  return (
    <main className="work-page">
      <section className="work-page__intro section">
        <motion.div
          className="container work-page__head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerZoom}
        >
          <motion.div variants={headerEyebrow}>
            <span className="eyebrow">
              <span className="eyebrow__marker" aria-hidden="true" />
              <motion.span className="eyebrow__line" variants={headerLine} aria-hidden="true" />
              <ScrambleText as="span" text="Selected work" />
            </span>
          </motion.div>
          <motion.h1 className="work-page__title" variants={headerTitle}>
            <RevealText text="Alongside the result, you'll see the process behind our projects." />
          </motion.h1>
          <motion.p className="work-page__sub" variants={headerSub}>
            —— Each project began with a challenge and delivered measurable results. Discover how
            we turn complex problems into clear solutions.
          </motion.p>

          <motion.div variants={headerSub}>
            <WorkFilter
              query={query}
              onQueryChange={setQuery}
              category={category}
              onCategoryChange={setCategory}
            />
          </motion.div>
        </motion.div>

        <div className="container work-page__list">
          {filtered.length === 0 ? (
            <motion.p
              className="work-page__empty"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
            >
              No projects match that search yet — try another name or category.
            </motion.p>
          ) : (
            filtered.map((project, i) => (
              <div className="work-page__item" key={project.title}>
                <div className="work-page__release">
                  <span>Release date</span>
                  <span>{project.releaseDate}</span>
                </div>
                <ProjectCard project={project} index={i} />
              </div>
            ))
          )}
        </div>
      </section>

      <InspireCTA />
    </main>
  )
}
