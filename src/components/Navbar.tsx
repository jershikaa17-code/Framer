import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navLinks } from '../data/nav'
import { EASE_OUT, springSnappy } from '../animations/variants'
import './navbar.css'

const menuCounts: Record<string, string> = { Work: '5', Whispers: '7' }

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        className={`navbar ${scrolled ? 'navbar--solid' : ''} ${open ? 'navbar--open' : ''}`}
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
      >
        <div className="navbar__inner container">
          <a href="#top" className="navbar__logo" onClick={closeMenu}>
            Create<span className="navbar__reg">®</span>
          </a>

          <nav className="navbar__links" aria-label="Primary" onMouseLeave={() => setHovered(null)}>
            {navLinks
              .filter((link) => link.label !== 'Contact')
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="navbar__link"
                  onMouseEnter={() => setHovered(link.label)}
                >
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
                </a>
              ))}
          </nav>

          <div className="navbar__actions">
            <motion.a
              href="#contact"
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
                    <motion.a
                      href={label === 'Home' ? '#top' : `#${label.toLowerCase()}`}
                      onClick={closeMenu}
                      whileHover={{ x: 12 }}
                      transition={springSnappy}
                    >
                      <span className="nav-overlay__index">0{i + 1}</span>
                      {label}
                    </motion.a>
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
