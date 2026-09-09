export interface PricingPlan {
  index: string
  eyebrow: string
  name: string
  audience: string
  price: string
  wasPrice: string
  description: string
  features: string[]
  highlights: string[]
  timeline: string
  image: string
}

export const pricingPlans: PricingPlan[] = [
  {
    index: '01',
    eyebrow: 'Core',
    name: 'Starter Plan',
    audience: 'For startups and first launches',
    price: '$2,800',
    wasPrice: '$3,500',
    description: 'Simple, fast, and effective, so you can focus on growing your business.',
    features: [
      'Brand & Identity starter kit',
      'Website design (core pages)',
      'Standard revisions',
      'SEO setup essentials',
      'Unlimited stock images',
      'Native source files included',
      'Final handoff files',
    ],
    highlights: [
      'Clear milestones from start to finish',
      'We keep you in the loop',
      'Feedback built into the process',
    ],
    timeline: '2-3 weeks',
    image: '/assets/pricing-core.jpg',
  },
  {
    index: '02',
    eyebrow: 'Studio',
    name: 'Advanced Plan',
    audience: 'For growing teams and serious builds',
    price: '$6,500',
    wasPrice: '$8,000',
    description:
      'A complete package with flexibility, advanced design, and the support you need to grow faster.',
    features: [
      'Extended Branding',
      'Full website design',
      'UX flows & product design',
      'Unlimited revisions',
      'Advanced SEO & content',
      'Priority support response',
      'Final handoff',
    ],
    highlights: [
      'Deeper design coverage for complex needs',
      'Unlimited adjustments before launch',
      'Faster responses when you need us most',
    ],
    timeline: '4-6 weeks',
    image: '/assets/pricing-studio.jpg',
  },
  {
    index: '03',
    eyebrow: 'Scale',
    name: 'Growth Plan',
    audience: 'For established teams and long-term growth',
    price: '$12,000',
    wasPrice: '$15,000',
    description:
      'Strategy, design, and dedicated support for complex projects that demand scalability and polish.',
    features: [
      'End-to-end brand strategy',
      'Large-scale website & CMS',
      'Advanced UX & product design',
      'Dedicated senior managers',
      'Advanced micro-interactions',
      'Optimization & support',
      'Enterprise-level handoff',
    ],
    highlights: [
      'Scalable solutions designed for growth',
      'Dedicated manager guiding every stage with integrations',
      'Long-term support beyond launch',
    ],
    timeline: '6–8 weeks',
    image: '/assets/pricing-scale.jpg',
  },
]
