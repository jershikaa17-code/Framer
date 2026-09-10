import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { navLinks } from '../data/nav'
import { EASE_OUT, springSnappy } from '../animations/variants'
import './navbar.css'

const menuCounts: Record<string, string> = { Work: '5', Whispers: '7' }

// Section anchors only exist on the homepage — prefix with the base path so
// they still resolve correctly when clicked from a route like /whispers.
const home = import.meta.env.BASE_URL

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <motion.header
        className={`navbar ${open ? 'navbar--open' : ''}`}
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
      >
        <div className="navbar__inner container">
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            Create<span className="navbar__reg">®</span>
          </Link>

          <nav className="navbar__links" aria-label="Primary" onMouseLeave={() => setHovered(null)}>
            {navLinks
              .filter((link) => link.label !== 'Contact')
              .map((link) => {
                const isRoute = link.href.startsWith('/')
                const content = (
                  <>
                    {link.label}
                    {menuCounts[link.label] && (
                      <sup className="navbar__count">{menuCounts[link.label]}</sup>
                    )}
                    {hovered === link.label && (
                      <motion.span
                        className="navbar__hover-line"
                        layoutId="navbar-hover-line"
                        transition={springSnappy}
                      />
                    )}
                  </>
                )
                return isRoute ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="navbar__link"
                    onMouseEnter={() => setHovered(link.label)}
                  >
                    {content}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={`${home}${link.href}`}
                    className="navbar__link"
                    onMouseEnter={() => setHovered(link.label)}
                  >
                    {content}
                  </a>
                )
              })}
          </nav>

          <div className="navbar__actions">
            <motion.a
              href={`${home}#contact`}
              className="navbar__link navbar__link--contact"
              whileHover={{ x: 3 }}
              transition={springSnappy}
            >
              Contact
            </motion.a>
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
                {['Home', 'Work', 'Studio', 'Whispers', 'Contact'].map((label, i) => (
                  <motion.li
                    key={label}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE_OUT }}
                  >
                    {label === 'Whispers' ? (
                      <motion.div whileHover={{ x: 12 }} transition={springSnappy}>
                        <Link to="/whispers" onClick={closeMenu}>
                          <span className="nav-overlay__index">0{i + 1}</span>
                          {label}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.a
                        href={`${home}${label === 'Home' ? '#top' : `#${label.toLowerCase()}`}`}
                        onClick={closeMenu}
                        whileHover={{ x: 12 }}
                        transition={springSnappy}
                      >
                        <span className="nav-overlay__index">0{i + 1}</span>
                        {label}
                      </motion.a>
                    )}
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
