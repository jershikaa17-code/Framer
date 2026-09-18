import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { navLinks } from '../data/nav'
import { EASE_OUT, springSnappy } from '../animations/variants'
import './navbar.css'

const menuCounts: Record<string, string> = { Work: '5', Whispers: '7' }

const overlayLinks = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Studio', to: '/studio' },
  { label: 'Whispers', to: '/whispers' },
  { label: 'Contact', to: '/contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  // On the homepage, the navbar reveals alongside the hero's third stagger
  // tier (after the background image, then the stat/time-info blocks) —
  // everywhere else there's no hero sequence to wait on, so it appears fast.
  const navDelay = pathname === '/' ? 0.85 : 0.15

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    // Blurs everything except the navbar/overlay themselves (see the
    // `body.nav-menu-open` rule in navbar.css) so the page reads as
    // genuinely behind the menu layer while it's open.
    document.body.classList.toggle('nav-menu-open', open)
    return () => {
      document.documentElement.style.overflow = ''
      document.body.classList.remove('nav-menu-open')
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <motion.header
        className={`navbar ${open ? 'navbar--open' : ''}`}
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: navDelay }}
      >
        <div className="navbar__inner container">
          <nav className="navbar__links" aria-label="Primary">
            {navLinks
              .filter((link) => link.label !== 'Contact')
              .map((link) => (
                <Link key={link.label} to={link.href} className="navbar__link">
                  <span className="navbar__link-roll">
                    <span className="navbar__link-text navbar__link-text--base">{link.label}</span>
                    <span className="navbar__link-text navbar__link-text--hover" aria-hidden="true">
                      {link.label}
                    </span>
                  </span>
                  {menuCounts[link.label] && (
                    <sup className="navbar__count">{menuCounts[link.label]}</sup>
                  )}
                </Link>
              ))}
          </nav>

          <div className="navbar__actions">
            <Link to="/contact" className="navbar__link navbar__link--contact">
              <span className="navbar__link-roll">
                <span className="navbar__link-text navbar__link-text--base">Contact</span>
                <span className="navbar__link-text navbar__link-text--hover" aria-hidden="true">
                  Contact
                </span>
              </span>
            </Link>
            <button
              className="navbar__burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <div className="nav-overlay__inner container">
              <ul className="nav-overlay__list">
                {overlayLinks.map(({ label, to }, i) => (
                  <motion.li
                    key={label}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE_OUT }}
                  >
                    <motion.div whileHover={{ x: 12 }} transition={springSnappy}>
                      <Link to={to} onClick={closeMenu}>
                        <span className="nav-overlay__index">0{i + 1}</span>
                        {label}
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>

              <div className="nav-overlay__footer">
                <div className="nav-overlay__col">
                  <p className="eyebrow">Studio</p>
                  <p>Los Angeles, CA 90026</p>
                  <p>hello@create.com</p>
                </div>
                <div className="nav-overlay__col">
                  <p className="eyebrow">Follow</p>
                  <p>X / LinkedIn / Instagram</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
