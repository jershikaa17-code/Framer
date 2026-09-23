export interface TeamMember {
  name: string
  role: string
  image: string
  /** KPI badge shown on the card — only set for members the reference site itself gives one. */
  kpi?: { value: string; label: string }
}

export const team: TeamMember[] = [
  {
    name: 'Tobias Neumann',
    role: 'Founder & CEO',
    image: 'assets/team/tobias-neumann.avif',
    kpi: { value: '97%', label: 'Projects delivered on time under his oversight.' },
  },
  {
    name: 'Amelia Cross',
    role: 'Head of Strategy',
    image: 'assets/team/amelia-cross.jpg',
    kpi: { value: '89%', label: 'Campaigns hit or exceeded client KPIs.' },
  },
  {
    name: 'Sofia Reyes',
    role: 'Chief Creative Officer',
    image: 'assets/team/sofia-reyes.jpg',
    kpi: { value: '120+', label: 'Brand identities launched across industries.' },
  },
  {
    name: 'Lucas Marino',
    role: 'Technical Director',
    image: 'assets/team/lucas-marino.jpg',
    kpi: { value: '3.4x', label: 'Faster site performance vs industry average.' },
  },
  {
    name: 'Fredrik Hansen',
    role: 'Head of Projects',
    image: 'assets/team/fredrik-hansen.jpg',
  },
  {
    name: 'Naomi Chen',
    role: 'Client Services Director',
    image: 'assets/team/naomi-chen.jpg',
  },
  {
    name: 'Inès Laurent',
    role: 'Campaign Strategist',
    image: 'assets/team/ines-laurent.jpg',
  },
  {
    name: 'Magnus Bjørnsen',
    role: 'Design Director',
    image: 'assets/team/magnus-bjornsen.jpeg',
  },
]
