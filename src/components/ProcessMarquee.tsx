import { useInViewOnce } from '../hooks/useInViewOnce'
import './process-marquee.css'

const phrases = ['we listen', 'we imagine', 'we create', 'beautiful things']

// Each phrase is `position: sticky` at its own (progressively lower) `top`
// offset — see .process-marquee__phrase:nth-child(n) in the CSS — so once it
// scrolls up to its slot it locks there and stays on screen for the rest of
// the section, while the next phrase keeps scrolling up beneath it and locks
// into its own slot below. That's what makes "we listen" stay put instead of
// scrolling away once "we imagine" arrives: real stacking, not a crossfade.
//
// The reveal is a plain IntersectionObserver (useInViewOnce) + CSS
// transition class toggle — NOT Framer Motion's whileInView/animate, and
// NOT a continuous useScroll/useTransform tied to the element's own
// bounding-rect position. Both were tried first and are broken here for the
// same underlying reason documented on useInViewOnce itself: Motion's
// animate-driven values can get permanently stuck at their hidden state
// when a nearby node in the same tree carries a style-driven MotionValue —
// this section sits next to a sticky, video-backed background, which
// reliably triggered exactly that (phrases stuck invisible, or in
// "beautiful things"'s case, frozen mid-zoom and overlapping "we create").
// A plain observer + CSS transition sidesteps the conflict entirely.
function Line({ phrase, index }: { phrase: string; index: number }) {
  const [ref, revealed] = useInViewOnce<HTMLParagraphElement>(0.4)

  return (
    <p
      ref={ref}
      className={`process-marquee__phrase ${index === 2 ? 'is-accent' : ''} ${revealed ? 'is-revealed' : ''}`}
    >
      <span className="process-marquee__phrase-inner">{phrase}</span>
    </p>
  )
}

export function ProcessMarquee() {
  return (
    <section className="process-marquee section">
      <div className="process-marquee__bg">
        <video
          className="process-marquee__rain"
          src="assets/rain.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        <div className="process-marquee__scrim" aria-hidden="true" />
      </div>

      <div className="process-marquee__stack">
        <div className="process-marquee__lines">
          {phrases.map((phrase, i) => (
            <Line key={phrase} phrase={phrase} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
