import { Hero } from './Hero'
import { Showreel } from './Showreel'
import './hero-cluster.css'

// Intro/TimeLocation/CTA now render as scroll-linked chapters inside
// Hero.tsx's own pinned frame (see the note there), so this cluster no
// longer needs its own separate background — Hero owns the only photo.
export function HeroCluster() {
  return (
    <div className="hero-cluster">
      <div className="hero-cluster__content">
        <Hero />
      </div>

      <Showreel />
    </div>
  )
}
