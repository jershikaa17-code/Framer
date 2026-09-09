import { motion } from 'motion/react'
import { services } from '../data/services'
import { headerZoom, headerEyebrow, headerTitle, headerSub, imgHover } from '../animations/variants'
import './services.css'

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
        <motion.span className="eyebrow" variants={headerEyebrow}>
          // 00.06°
        </motion.span>
        <motion.h2 className="services__wordmark" variants={headerTitle}>
          services<span className="services__dot" />
        </motion.h2>
        <motion.p className="services__sub" variants={headerSub}>
          What we do best, and what your next project needs most.
        </motion.p>
      </motion.div>

      <div className="container services__list">
        {services.map((service) => (
          <motion.div className="service-row" key={service.title} whileHover="hover">
            <div className="service-row__tab">
              <span className="service-row__category">{service.category}</span>
              <span className="service-row__index">/{service.index}</span>
            </div>

            <h3 className="service-row__title">{service.title}</h3>

            <div className="service-row__content">
              <div className="service-row__media">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  variants={imgHover}
                />
              </div>
              <p className="service-row__desc">{service.description}</p>
              <ul className="service-row__capabilities">
                {service.capabilities.map((cap) => (
                  <li key={cap}>
                    <span>+</span>
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
