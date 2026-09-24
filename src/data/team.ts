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
  },
  {
    name: 'Amelia Cross',
    role: 'Head of Strategy',
    image: 'assets/team/amelia-cross.jpg',
  },
  {
    name: 'Sofia Reyes',
    role: 'Chief Creative Officer',
    image: 'assets/team/sofia-reyes.jpg',
  },
  {
    name: 'Lucas Marino',
    role: 'Technical Director',
    image: 'assets/team/lucas-marino.jpg',
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
  {
    name: 'Elias Novak',
    role: 'Interaction Designer',
    image: 'assets/team/lucas-marino.jpg',
  },
]
