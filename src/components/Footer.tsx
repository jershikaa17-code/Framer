import { useInViewOnce } from '../hooks/useInViewOnce'
import './footer.css'

const navigate = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Whispers', href: '#whispers' },
  { label: 'Contact', href: '#contact' },
]

const links = ['Terms of service', 'Privacy policy', 'Disclaimer', '404', 'More templates']

const social = [
  { label: 'X', full: 'X' },
  { label: 'Li', full: 'LinkedIn' },
  { label: 'IG', full: 'Instagram' },
  { label: 'FB', full: 'Facebook' },
  { label: 'WA', full: 'WhatsApp' },
]

export function Footer() {
  const [brandRef, brandRevealed] = useInViewOnce<HTMLDivElement>(0.3)

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <p className="footer__heading">Navigate</p>
          <ul>
            {navigate.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <p className="footer__heading">Links</p>
          <ul>
            {links.map((item) => (
              <li key={item}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col footer__col--contact">
          <p className="footer__heading">Studio</p>
          <p>Los Angeles, CA 90026</p>
          <p>
            <a href="mailto:hello@create.com">hello@create.com</a>
          </p>
        </div>

        <div className="footer__col footer__col--social">
          <p className="footer__heading">Follow us on socials</p>
          <div className="footer__social">
            {social.map((item) => (
              <a key={item.label} href="#" aria-label={`Create Studio on ${item.full}`}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div ref={brandRef} className={`footer__brand ${brandRevealed ? 'is-revealed' : ''}`}>
        <div className="container footer__brand-grid">
          <div>
            <p className="footer__tagline">Digital experiences that connect, scale and perform.</p>

            <h2 className="footer__wordmark">
              <span className="footer__wordmark-accent">Create</span>
              <span className="footer__wordmark-slash">\</span>
              Studio
            </h2>

            <div className="footer__about">
              <video
                className="footer__avatar"
                src="assets/footer-avatar.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
              />
              <p>A design studio trusted by startups and leading brands.</p>
            </div>

            <p className="footer__copyright">© 2026 Create Studio — All work, all rights.</p>
          </div>

          <div className="footer__contact-grid">
            <div className="footer__contact-col">
              <p className="footer__heading">Offline</p>
              <p>Create Studio LLC.</p>
              <p>8 Sunset Blvd, Office 5</p>
              <p>Los Angeles, CA 90026</p>
            </div>
            <div className="footer__contact-col footer__contact-col--online">
              <p className="footer__heading">Online</p>
              <p>
                <a href="mailto:hello@create.com">hello@create.com</a>
              </p>
            </div>
            <div className="footer__contact-col footer__contact-col--phone">
              <p className="footer__heading">Phone</p>
              <p>
                <a href="tel:+13105550165">(310) 555-0165</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
