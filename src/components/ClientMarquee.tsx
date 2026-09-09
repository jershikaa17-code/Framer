import { LogoMarquee } from './LogoMarquee'
import { clientLogos } from '../data/clients'
import './client-marquee.css'

export function ClientMarquee() {
  return (
    <section className="client-marquee section">
      <p className="client-marquee__tagline container">
        Brands who are part of our success story
      </p>

      <div className="client-marquee__rows">
        <LogoMarquee items={clientLogos} speed={34} direction="left" variant="dark" />
      </div>
    </section>
  )
}
