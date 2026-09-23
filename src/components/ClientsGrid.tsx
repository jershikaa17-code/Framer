import { motion } from 'motion/react'
import { partnerLogos } from '../data/clients'
import { headerTitle, headerSub, staggerContainer, fadeUp } from '../animations/variants'
import './clients-grid.css'

export function ClientsGrid() {
  return (
    <section className="clients-grid section">
      <div className="container clients-grid__head">
        <motion.h2
          className="clients-grid__title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerTitle}
        >
          Clients &amp; Partners
        </motion.h2>
        <motion.p
          className="clients-grid__sub"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerSub}
        >
          Brands who trusted us to help shape their next chapter.
        </motion.p>
      </div>

      <motion.div
        className="container clients-grid__list"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.05)}
      >
        {partnerLogos.map((logo) => (
          <motion.div className="clients-grid__item" key={logo.name} variants={fadeUp}>
            <img
              src={`${import.meta.env.BASE_URL}${logo.image}`}
              alt={logo.name}
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
