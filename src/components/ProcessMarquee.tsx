import { useInViewOnce } from '../hooks/useInViewOnce'
import './process-marquee.css'

const phrases = ['we listen', 'we imagine', 'we create', 'beautiful things']

// Each phrase lives in its own `.process-marquee__slot` — a separate sticky
// containing block, not one shared by all four. Slots overlap via negative
// margin so the phrases still lock into a shared on-screen stack in
// appearance order, but each slot is progressively taller than the last, so
// each phrase's own sticky range ends at a different scroll position: once
// the stack is complete, continuing to scroll releases "we listen" first
// (its slot ends soonest), then "we imagine", then "we create", then
// "beautiful things" last, right as the section ends — a peel-off, not a
// simultaneous cut into whatever follows.
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
    <div className={`process-marquee__slot process-marquee__slot--${index + 1}`}>
      <p
        ref={ref}
        className={`process-marquee__phrase ${index === 2 ? 'is-accent' : ''} ${revealed ? 'is-revealed' : ''}`}
      >
        <span className="process-marquee__phrase-inner">{phrase}</span>
      </p>
    </div>
  )
}

export function ProcessMarquee() {
  return (
    <section className="process-marquee section">
      <div className="process-marquee__bg">
        <video
          className="process-marquee__rain"
          src={`${import.meta.env.BASE_URL}assets/rain.mp4`}
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
