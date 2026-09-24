import { motion } from 'motion/react'
import { RevealText } from '../animations/RevealText'
import { awards } from '../data/awards'
import { headerZoom, headerTitle, headerSub, fadeUp } from '../animations/variants'
import './awards.css'

const home = import.meta.env.BASE_URL

const arrow = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path
      d="M4 12h16M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const sparkleIcon = (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
    <path
      d="M 3.795 8.946 C 3.306 6.774 2.049 6.018 0 6.663 C 0.489 8.835 1.746 9.591 3.795 8.946 Z M 2.915 6.726 C 3.586 4.756 2.799 3.548 0.539 3.079 C -0.132 5.048 0.655 6.256 2.915 6.726 Z M 3.507 0 C 1.514 1.101 1.233 2.443 2.661 4.053 C 4.654 2.953 4.935 1.611 3.508 0.001 Z M 10.205 8.946 C 10.694 6.774 11.951 6.018 14 6.663 C 13.511 8.835 12.255 9.591 10.205 8.946 Z M 11.085 6.726 C 10.414 4.756 11.201 3.548 13.462 3.079 C 14.133 5.048 13.346 6.256 11.086 6.726 Z M 10.493 0 C 12.486 1.101 12.767 2.443 11.339 4.053 C 9.346 2.952 9.065 1.61 10.492 0.001 Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(1 1.5)"
    />
    <path
      d="M 6.764 1.111 C 8.023 2.17 9.418 2.282 10.679 0.958 C 7.852 -2.009 4.029 2.764 7.328 3.848 M 3.981 1.111 C 2.698 2.17 1.286 2.282 0 0.958 C 2.665 -1.786 6.712 2.256 3.417 3.848"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2.661 10.652)"
    />
  </svg>
)

// clipPath ids need to be unique per row since this icon repeats in the list
const chevronIcon = (uid: string) => (
  <svg viewBox="0 0 339 339" width="16" height="16" fill="none">
    <defs>
      <clipPath id={`chevron-outer-${uid}`}>
        <path fill="#fff" d="M0 0h339v339H0z" />
      </clipPath>
      <clipPath id={`chevron-inner-${uid}`}>
        <path fill="#fff" d="M74 26h192v288H74z" />
      </clipPath>
    </defs>
    <g clipPath={`url(#chevron-outer-${uid})`}>
      <g clipPath={`url(#chevron-inner-${uid})`}>
        <path
          fill="currentColor"
          d="M172 218a2 2 0 0 0-2 2v89.172c0 1.781-2.154 2.674-3.414 1.414l-92-92a2 2 0 0 1-.586-1.414V124a2 2 0 0 1 2-2h94L77.414 29.414c-1.26-1.26-.367-3.414 1.414-3.414H264a2 2 0 0 1 2 2v92a2 2 0 0 1-2 2h-94l92.586 92.586c1.26 1.26.367 3.414-1.414 3.414z"
        />
      </g>
    </g>
  </svg>
)

const fullscreenIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
)

function bulletIconAt(i: number) {
  const kind = i % 3
  if (kind === 0) return sparkleIcon
  if (kind === 1) return chevronIcon(`row-${i}`)
  return fullscreenIcon
}

export function Awards() {
  return (
    <section className="awards section">
      <div className="container awards__in">
        <motion.div
          className="awards__intro"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerZoom}
        >
          <motion.h2 className="awards__title" variants={headerTitle}>
            <RevealText text="Awards" />
          </motion.h2>
          <motion.p className="awards__statement" variants={headerSub}>
            Recognition for work that delivers, not just looks good.
          </motion.p>
          <motion.p className="awards__sub" variants={headerSub}>
            We take pride in projects that perform in the real world and get noticed by the right
            people.
          </motion.p>
          <motion.img
            className="awards__img"
            src={`${home}assets/award.avif`}
            alt="Wobbly Awards 2025 — Best Creative Agency"
            variants={fadeUp}
          />
          <motion.p className="awards__note" variants={headerSub}>
            Create® was named Best Creative Agency 2025 by the{' '}
            <span className="awards__note-accent">Wobbly Awards®</span>
          </motion.p>
          <motion.button type="button" className="awards__toggle" variants={headerSub}>
            <span className="awards__toggle-icon">{arrow}</span>
            More Awards
          </motion.button>
        </motion.div>

        <div className="awards__table">
          <div className="awards__table-head">
            <p>Award</p>
            <p>Category</p>
            <p>Year</p>
          </div>
          {awards.map((award, i) => (
            <motion.div
              className="award-row"
              key={award.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div>
                <p className="award-row__name">
                  <span className="award-row__icon" aria-hidden="true">
                    {bulletIconAt(i)}
                  </span>
                  {award.name}
                </p>
                <p className="award-row__description">{award.description}</p>
              </div>
              <p className="award-row__category">{award.category}</p>
              <p className="award-row__year">{award.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
