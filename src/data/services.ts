export interface Service {
  index: string
  title: string
  category: string
  description: string
  capabilities: string[]
  image: string
}

export const services: Service[] = [
  {
    index: '01',
    category: 'Foundation',
    title: 'Brand Identity',
    description:
      'The foundation of every project — how your brand looks, feels, and communicates.',
    capabilities: [
      'Positioning and messaging frameworks',
      'Visual identity systems',
      'Brand guidelines for consistent use',
      'Digital-first brand systems',
      'Branded assets across campaigns and touchpoints',
    ],
    image: 'assets/service-brand.jpg',
  },
  {
    index: '02',
    category: 'Growth',
    title: 'Strategy',
    description:
      'Clear direction backed by insight and planning to move from idea to execution.',
    capabilities: [
      'Market and audience research',
      'Product and campaign strategy',
      'User journey mapping',
      'Roadmaps and rollout planning',
      'Workshops and alignment sessions',
    ],
    image: 'assets/service-strategy.png',
  },
  {
    index: '03',
    category: 'Creative',
    title: 'Design & Innovation',
    description:
      'From first concepts to polished products that people want to use and share.',
    capabilities: [
      'UX and UI design',
      'Prototyping and user testing',
      'Digital product and service design',
      'Iteration and validation',
      'Launch planning and support',
    ],
    image: 'assets/service-creative.png',
  },
  {
    index: '04',
    category: 'Smart AI',
    title: 'AI Systems',
    description: 'Practical applications of AI to unlock smarter products and workflows.',
    capabilities: [
      'Define AI vision and roadmap',
      'Intelligent experience design',
      'Prototyping and proof-of-concepts',
      'Integration into platforms and workflows',
      'Team enablement and training',
    ],
    image: 'assets/service-ai.jpg',
  },
  {
    index: '05',
    category: 'Discoverable',
    title: 'SEO',
    description: 'Data-driven visibility that turns search traffic into real opportunity.',
    capabilities: [
      'Technical site audit',
      'Keyword research and content strategy',
      'On-page and metadata optimisation',
      'Link-building and authority growth',
      'Performance tracking and reporting',
    ],
    image: 'assets/service-seo.jpg',
  },
  {
    index: '06',
    category: 'Build',
    title: 'Development',
    description:
      'Turning ideas and designs into scalable, functional, and reliable digital products.',
    capabilities: [
      'Web and app development',
      'CMS integration and setup',
      'E-commerce builds and optimisation',
      'Custom feature development',
      'Ongoing technical support',
    ],
    image: 'assets/service-digital.png',
  },
]
