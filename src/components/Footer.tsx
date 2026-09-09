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

      <div className="container footer__bottom">
        <p>© 2026 Create Studio — All work, all rights.</p>
        <p>Built with React, Vite & Framer Motion</p>
      </div>
    </footer>
  )
}
