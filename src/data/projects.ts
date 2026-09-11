export interface Project {
  index: string
  title: string
  category: string
  stack: string[]
  year: string
  image: string
  releaseDate: string
  tags: string[]
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'Aurelis Beach Resort',
    category: 'Hospitality branding and website',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cloudflare CDN'],
    year: '2025',
    image: 'assets/project-aurelis.jpg',
    releaseDate: 'August 21, 2025',
    tags: ['Brand & Identity', 'Responsive Web Design', 'Strategy'],
  },
  {
    index: '02',
    title: 'Blackwell Motors',
    category: 'Automotive digital transformation',
    stack: ['React', 'WebGL', 'Node.js', 'AWS Lambda', 'OpenAI Embeddings'],
    year: '2025',
    image: 'assets/project-blackwell.jpg',
    releaseDate: 'June 25, 2025',
    tags: ['Digital Campaigns', 'Development', 'AI Systems'],
  },
  {
    index: '03',
    title: 'Aspen® 877',
    category: 'E-Mobility brand launch',
    stack: ['Framer', 'Next.js', 'GSAP', 'WebGL', 'Meta Ads integration'],
    year: '2025',
    image: 'assets/project-aspen.jpg',
    releaseDate: 'June 19, 2025',
    tags: ['UI/UX Design', 'Animation & Motion', 'Digital Campaigns'],
  },
  {
    index: '04',
    title: 'Monolith Architecture',
    category: 'Architecture studio rebrand and digital platform',
    stack: ['Next.js', 'Three.js', 'Sanity CMS', 'Framer Motion', 'Vercel'],
    year: '2024',
    image: 'assets/process-building.jpg',
    releaseDate: 'March 14, 2024',
    tags: ['Brand & Identity', 'UI/UX Design', 'Content'],
  },
]
