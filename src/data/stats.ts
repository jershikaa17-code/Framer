export interface Stat {
  index: string
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { index: '01', value: 86, suffix: '+', label: 'Projects shipped' },
  { index: '02', value: 80, suffix: '%', label: 'Repeat collaborations' },
  { index: '03', value: 32, suffix: '', label: 'Industry awards' },
  { index: '04', value: 89, suffix: '%', label: 'Client retention rate' },
]

export interface ProcessStage {
  index: string
  title: string
  description: string
}

export const processStages: ProcessStage[] = [
  {
    index: '01',
    title: 'Discovery',
    description:
      'We start by listening. Goals, challenges, and vision are mapped out clearly, setting the foundation for everything that follows.',
  },
  {
    index: '02',
    title: 'Strategy',
    description:
      'With insights in place, we define the roadmap. Positioning, priorities, and the best way to align design and execution.',
  },
  {
    index: '03',
    title: 'Design & Build',
    description:
      'Ideas take shape. From visuals to digital experiences, we design and develop with sharp attention to detail.',
  },
  {
    index: '04',
    title: 'Launch & Grow',
    description:
      'Delivery is just the beginning. We measure, refine, and scale to ensure your project continues to perform.',
  },
]
