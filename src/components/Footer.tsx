import { Link } from 'react-router-dom'
import { useInViewOnce } from '../hooks/useInViewOnce'
import './footer.css'

const navigate = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Studio', href: '/studio' },
  { label: 'Whispers', href: '/whispers' },
  { label: 'Contact', href: '/contact' },
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
                <Link to={item.href}>{item.label}</Link>
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
          <div className="footer__left">
            <div className="footer__rule" />

            <p className="footer__tagline">
              Digital experiences that connect,
              <br />
              scale and perform.
            </p>

            <div className="footer__wordmark">
              <span className="footer__wordmark-accent">Create</span>
              <span className="footer__wordmark-slash">\</span>
              <span className="footer__wordmark-studio">Studio</span>
            </div>

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
              <p>
                A creative agency for design, strategy, marketing,
                <br />
                and scalable premium websites.
              </p>
            </div>

            <p className="footer__copyright">© 2026 Create Studio — All work, all rights.</p>

            <div className="footer__rule footer__rule--credit" />
            <div className="footer__credit">
              <span>React + Vite</span>
              <span>Framer Motion</span>
            </div>
          </div>

          <div className="footer__contact-grid">
            <div className="footer__contact-column">
              <div className="footer__contact-block">
                <p className="footer__label">Offline</p>
                <div className="footer__small-rule" />
                <p>
                  Create Studio LLC.
                  <br />
                  8 Sunset Blvd, Office 5
                  <br />
                  Los Angeles, CA 90026
                </p>
              </div>

              <div className="footer__contact-block footer__contact-block--phone">
                <p className="footer__label">Phone</p>
                <div className="footer__small-rule" />
                <p className="footer__phone">
                  <a href="tel:+13105550165">(310) 555-0165</a>
                </p>
              </div>
            </div>

            <div className="footer__contact-column">
              <div className="footer__contact-block">
                <p className="footer__label">Online</p>
                <div className="footer__small-rule" />
                <a className="footer__email" href="mailto:hello@create.com">
                  hello@create.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
