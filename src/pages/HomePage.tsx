import { HeroCluster } from '../components/HeroCluster'
import { ProcessMarquee } from '../components/ProcessMarquee'
import { Projects } from '../components/Projects'
import { Performance } from '../components/Performance'
import { ClientMarquee } from '../components/ClientMarquee'
import { Services } from '../components/Services'
import { HowWeWork } from '../components/HowWeWork'
import { Pricing } from '../components/Pricing'
import { Testimonial } from '../components/Testimonial'
import { BookCall } from '../components/BookCall'
import { Newsletter } from '../components/Newsletter'

export function HomePage() {
  return (
    <main>
      <HeroCluster />
      <ProcessMarquee />
      <Projects />
      <Performance />
      <ClientMarquee />
      <Services />
      <HowWeWork />
      <Pricing />
      <Testimonial />
      <BookCall />
      <Newsletter />
    </main>
  )
}
