export interface Award {
  name: string
  category: string
  year: string
  description: string
}

export const awards: Award[] = [
  {
    name: 'Wobbly Awards 2025',
    category: 'Best Creative Agency',
    year: '2025',
    description:
      'Recognized for overall excellence in digital design, execution, and innovation across multiple projects.',
  },
  {
    name: 'wowwwards',
    category: 'Site of the Day',
    year: '2025',
    description:
      "Honoured for visual direction, interactive storytelling, and technical performance on the resort's digital experience.",
  },
  {
    name: 'Framer Design Awards',
    category: 'Site of the Month',
    year: '2024',
    description:
      'Honoured for balanced structure, high usability, and strong visual identity across multiple layouts.',
  },
  {
    name: 'Black Dot Design /BDD',
    category: 'Best Product Design',
    year: '2024',
    description:
      'Celebrated for seamless user experience, motion design, and brand-led e-mobility launch.',
  },
  {
    name: 'Digital Agency of the Year 2024',
    category: 'Innovation & UI Excellence',
    year: '2024',
    description:
      'Recognised for blending structure, storytelling, and digital craft in a minimalist architectural showcase.',
  },
  {
    name: 'Framer Design Excellence',
    category: 'Product & Marketing',
    year: '2024',
    description:
      'Recognized for elevating product storytelling with motion-led interactions and precise visual flow.',
  },
]
