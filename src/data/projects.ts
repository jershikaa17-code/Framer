export interface Project {
  index: string
  title: string
  category: string
  stack: string[]
  year: string
  image: string
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'Aurelis Beach Resort',
    category: 'Hospitality branding and website',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cloudflare CDN'],
    year: '2025',
    image: 'assets/project-aurelis.jpg',
  },
  {
    index: '02',
    title: 'Blackwell Motors',
    category: 'Automotive digital transformation',
    stack: ['React', 'WebGL', 'Node.js', 'AWS Lambda', 'OpenAI Embeddings'],
    year: '2025',
    image: 'assets/project-blackwell.jpg',
  },
  {
    index: '03',
    title: 'Aspen® 877',
    category: 'E-Mobility brand launch',
    stack: ['Framer', 'Next.js', 'GSAP', 'WebGL', 'Meta Ads integration'],
    year: '2025',
    image: 'assets/project-aspen.jpg',
  },
]
