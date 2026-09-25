import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { WorkFilter } from '../components/WorkFilter'
import { InspireCTA } from '../components/InspireCTA'
import { RevealText } from '../animations/RevealText'
import { headerZoom, headerTitle, headerSub, fadeUp } from '../animations/variants'
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
          animate="show"
          variants={headerZoom}
        >
          <motion.h1 className="work-page__title" variants={headerTitle}>
            <RevealText text="selected work" viewTrigger={false} />
          </motion.h1>

          <div className="work-page__head-row">
            <div className="work-page__head-copy">
              <motion.h6 className="work-page__lead" variants={headerSub}>
                Alongside the result, you&rsquo;ll see the process behind our project.
              </motion.h6>
              <motion.p className="work-page__sub" variants={headerSub}>
                Each project began with a challenge and delivered measurable results. Discover how
                we turn complex problems into clear solutions.
              </motion.p>
              <motion.span className="work-page__ticks" variants={headerSub} aria-hidden="true" />
            </div>

            <motion.div variants={headerSub}>
              <WorkFilter
                query={query}
                onQueryChange={setQuery}
                category={category}
                onCategoryChange={setCategory}
              />
            </motion.div>
          </div>
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
            filtered.map((project) => (
              <motion.div
                key={project.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <Link
                  to={`/work/${project.slug}`}
                  className="work-row"
                  data-cursor="View case study"
                  data-cursor-icon="arrow"
                >
                  <div className="work-row__panel">
                    <img className="work-row__logo" src={`${import.meta.env.BASE_URL}${project.logo}`} alt={project.client} />
                    <span className="work-row__hairline" aria-hidden="true" />
                    <span className="work-row__accent" aria-hidden="true" />
                    <div className="work-row__heading">
                      <h3 className="work-row__title">{project.title}</h3>
                      <p className="work-row__category">{project.category}</p>
                    </div>
                    <span className="work-row__divider" aria-hidden="true" />
                    <p className="work-row__tagline">{project.tagline}</p>
                  </div>
                  <div className="work-row__media">
                    <div className="work-row__reveal">
                      <div className="work-row__reveal-date">
                        <span className="work-row__date-label">Release date</span>
                        <span className="work-row__date-value">{project.releaseDate}</span>
                      </div>
                    </div>
                    {project.video ? (
                      <video
                        className="work-row__img"
                        src={`${import.meta.env.BASE_URL}${project.video}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        className="work-row__img"
                        src={`${import.meta.env.BASE_URL}${project.image}`}
                        alt={project.title}
                        loading="lazy"
                      />
                    )}
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      <InspireCTA />
    </main>
  )
}
