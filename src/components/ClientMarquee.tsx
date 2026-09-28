import { motion } from 'motion/react'
import { LogoMarquee } from './LogoMarquee'
import { clientLogos } from '../data/clients'
import { fadeUp, staggerContainer } from '../animations/variants'
import './client-marquee.css'

export function ClientMarquee() {
  return (
    <motion.section
      className="client-marquee section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer(0.15)}
    >
      <motion.p className="client-marquee__tagline container" variants={fadeUp}>
        Brands who are part of our success story
      </motion.p>

      <motion.div className="client-marquee__rows" variants={fadeUp}>
        <LogoMarquee items={clientLogos} speed={34} direction="left" variant="dark" />
      </motion.div>
    </motion.section>
  )
}
