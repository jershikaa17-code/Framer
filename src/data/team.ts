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
    image: 'https://framerusercontent.com/images/kRj0YuKJIE6hToAeq15afb9pH4.jpeg',
    kpi: { value: '89%', label: 'Campaigns hit or exceeded client KPIs.' },
  },
  {
    name: 'Sofia Reyes',
    role: 'Chief Creative Officer',
    image: 'https://framerusercontent.com/images/khgZBntViz424uxS4wjdwEmEk.jpeg',
    kpi: { value: '120+', label: 'Brand identities launched across industries.' },
  },
  {
    name: 'Lucas Marino',
    role: 'Technical Director',
    image: 'https://framerusercontent.com/images/4GI3J65Rp3grUuMh8lDptPl1pvw.jpg',
    kpi: { value: '3.4x', label: 'Faster site performance vs industry average.' },
  },
  {
    name: 'Fredrik Hansen',
    role: 'Head of Projects',
    image: 'https://framerusercontent.com/images/QsUAlw2uvcpXka3OIfBkMR7hIKg.jpg',
  },
  {
    name: 'Naomi Chen',
    role: 'Client Services Director',
    image: 'https://framerusercontent.com/images/5UFAIV7LuZuL88IK4WQLuUQcWaA.jpg',
  },
  {
    name: 'Inès Laurent',
    role: 'Campaign Strategist',
    image: 'https://framerusercontent.com/images/IXoZk0GX4b82wzbVdgUq07pXs.jpg',
  },
  {
    name: 'Magnus Bjørnsen',
    role: 'Design Director',
    image: 'https://framerusercontent.com/images/hq6inRzpOxpC9cXbuJkkv7SpnM.jpeg',
  },
]
