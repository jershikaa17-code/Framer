import { HeroCluster } from '../components/HeroCluster'
import { ProcessMarquee } from '../components/ProcessMarquee'
import { Projects } from '../components/Projects'
import { Performance } from '../components/Performance'
import { ClientMarquee } from '../components/ClientMarquee'
import { Services } from '../components/Services'
import { ServicesOverview } from '../components/ServicesOverview'
import { HowWeWork } from '../components/HowWeWork'
import { TrustGrid } from '../components/TrustGrid'
import { Pricing } from '../components/Pricing'
import { Testimonial } from '../components/Testimonial'

export function HomePage() {
  return (
    <main>
      <HeroCluster />
      <ProcessMarquee />
      <Projects />
      <Performance />
      <ClientMarquee />
      <Services />
      <ServicesOverview />
      <HowWeWork />
      <TrustGrid />
      <Pricing />
      <Testimonial />
    </main>
  )
}
