import { Hero } from './Hero'
import './hero-cluster.css'

// Hero is a single self-contained composition now (headline, wordmark,
// stat, time block and the showreel preview all live inside it), so this
// wrapper is just a thin shell around it.
export function HeroCluster() {
  return (
    <div className="hero-cluster">
      <Hero />
    </div>
  )
}
