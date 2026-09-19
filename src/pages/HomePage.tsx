import { HeroCluster } from '../components/HeroCluster'
import { ProcessMarquee } from '../components/ProcessMarquee'
import { Projects } from '../components/Projects'
import { CaseStudyTeaser } from '../components/CaseStudyTeaser'
import { Performance } from '../components/Performance'
import { ClientMarquee } from '../components/ClientMarquee'
import { Services } from '../components/Services'
import { ServicesOverview } from '../components/ServicesOverview'
import { HowWeWork } from '../components/HowWeWork'
import { TrustGrid } from '../components/TrustGrid'
import { Pricing } from '../components/Pricing'
import { Testimonial } from '../components/Testimonial'
import { WhispersTeaser } from '../components/WhispersTeaser'
import { GetTemplateCta } from '../components/GetTemplateCta'

export function HomePage() {
  return (
    <main>
      <HeroCluster />
      <ProcessMarquee />
      <Projects />
      <Performance />
      <ClientMarquee />
      <Services />
      <div className="process-glow-wrap">
        <img
          className="process-glow-wrap__bg"
          src={`${import.meta.env.BASE_URL}assets/process-glow.jpg`}
          alt=""
          aria-hidden="true"
        />
        <HowWeWork />
        <ServicesOverview />
      </div>
      <CaseStudyTeaser />
      <TrustGrid />
      <Pricing />
      <Testimonial />
      <WhispersTeaser />
      <GetTemplateCta />
    </main>
  )
}
