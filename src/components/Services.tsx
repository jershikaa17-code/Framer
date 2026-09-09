import { motion } from 'motion/react'
import { services } from '../data/services'
import { fadeUp } from '../animations/variants'
import './services.css'

export function Services() {
  return (
    <section className="services section" id="services">
      <div className="container services__head">
        <span className="eyebrow">// 00.06°</span>
        <h2 className="services__wordmark">
          services<span className="services__dot" />
        </h2>
        <p className="services__sub">What we do best, and what your next project needs most.</p>
      </div>

      <div className="container services__list">
        {services.map((service, i) => (
          <motion.div
            className="service-row"
            key={service.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ delay: (i % 2) * 0.08 }}
          >
            <div className="service-row__tab">
              <span className="service-row__category">{service.category}</span>
              <span className="service-row__index">/{service.index}</span>
            </div>

            <h3 className="service-row__title">{service.title}</h3>

            <div className="service-row__content">
              <div className="service-row__media">
                <img src={service.image} alt={service.title} loading="lazy" />
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
