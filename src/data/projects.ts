export interface ProjectStat {
  value: string
  label: string
}

export interface Project {
  index: string
  slug: string
  title: string
  client: string
  category: string
  stack: string[]
  year: string
  image: string
  releaseDate: string
  tags: string[]
  tagline: string
  challenge: string
  approach: string
  result: string
  resultHeadline: string
  stats: ProjectStat[]
  /** Names cross-referenced against src/data/team.ts for the case study's credits block. */
  credits: string[]
}

export const projects: Project[] = [
  {
    index: '01',
    slug: 'aurelis-beach-resort',
    title: 'Aurelis Beach Resort',
    client: 'Aurelis Hospitality Group',
    category: 'Hospitality branding and website',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cloudflare CDN'],
    year: '2025',
    image: 'assets/project-aurelis.jpg',
    releaseDate: 'August 21, 2025',
    tags: ['Brand & Identity', 'Responsive Web Design', 'Strategy'],
    tagline: 'A quiet-luxury resort brand built to feel like the view.',
    challenge:
      'Aurelis had the setting to compete with any resort in the region, but its booking site read like a generic listing page — heavy on rates, light on the feeling of actually being there. Most traffic was arriving through third-party travel sites, and direct bookings had stalled.',
    approach:
      'We rebuilt the brand around restraint: a slower-paced, photography-led site that let the property do the talking, paired with a simplified booking flow and a visual identity that could carry across print, signage, and social without losing its calm.',
    result:
      'Within two months of launch, direct bookings became the resort’s largest channel for the first time, easing pressure on commission-heavy travel platforms and giving the team first-party data on their own guests for the first time.',
    resultHeadline: 'A quiet brand that turned browsers into bookings.',
    stats: [
      { value: '2.4x', label: 'Direct booking increase' },
      { value: '38%', label: 'Lower OTA commission spend' },
      { value: '5 weeks', label: 'Concept to launch' },
    ],
    credits: ['Fredrik Hansen', 'Sofia Reyes', 'Naomi Chen'],
  },
  {
    index: '02',
    slug: 'blackwell-motors',
    title: 'Blackwell Motors',
    client: 'Blackwell Motors',
    category: 'Automotive digital transformation',
    stack: ['React', 'WebGL', 'Node.js', 'AWS Lambda', 'OpenAI Embeddings'],
    year: '2025',
    image: 'assets/project-blackwell.jpg',
    releaseDate: 'June 25, 2025',
    tags: ['Digital Campaigns', 'Development', 'AI Systems'],
    tagline: 'A digital showroom for Blackwell’s first electric line.',
    challenge:
      'Blackwell had built its reputation dealership-first, and its web presence was still a static spec sheet — fine for a combustion lineup with decades of trust behind it, but not enough to introduce an entirely new electric platform to a skeptical market.',
    approach:
      'We designed a configurator-led experience where visitors could explore trims and finishes in real time, backed by an AI assistant trained on Blackwell’s own spec data to answer the practical questions a salesperson would normally field in person.',
    result:
      'The configurator became the most-used feature on the site within its first week, and dealers reported customers arriving for test drives already having built their exact spec online.',
    resultHeadline: 'An electric launch that still felt like Blackwell.',
    stats: [
      { value: '61%', label: 'Longer average session' },
      { value: '3.1x', label: 'Configurator completions' },
      { value: '12%', label: 'Lift in test-drive bookings' },
    ],
    credits: ['Lucas Marino', 'Sofia Reyes', 'Fredrik Hansen'],
  },
  {
    index: '03',
    slug: 'lindholm-aspen-877',
    title: 'Aspen® 877',
    client: 'Lindholm',
    category: 'E-Mobility brand launch',
    stack: ['Framer', 'Next.js', 'GSAP', 'WebGL', 'Meta Ads integration'],
    year: '2025',
    image: 'assets/project-aspen.jpg',
    releaseDate: 'June 19, 2025',
    tags: ['UI/UX Design', 'Animation & Motion', 'Digital Campaigns'],
    tagline: 'Launching Lindholm’s e-bike into a crowded market.',
    challenge:
      'Lindholm was entering e-mobility a full product cycle behind established players, with no brand recognition to lean on. The launch needed to make Aspen® 877 feel inevitable from the first scroll, not like a late arrival.',
    approach:
      'We built the identity and the site in parallel — a motion-first launch page that mirrored the bike’s own engineering language, wired directly into the paid campaign so ad creative and landing experience never felt disconnected.',
    result:
      'Pre-order signups cleared Lindholm’s internal target well ahead of the campaign’s end date, and the lower cost per acquisition let the team extend the launch window instead of cutting it short.',
    resultHeadline: 'A launch that made a new brand feel established overnight.',
    stats: [
      { value: '3.2x', label: 'Pre-orders vs. target' },
      { value: '44%', label: 'Lower cost per acquisition' },
      { value: '6 weeks', label: 'Brief to launch' },
    ],
    credits: ['Inès Laurent', 'Magnus Bjørnsen', 'Fredrik Hansen'],
  },
  {
    index: '04',
    slug: 'monolith-architecture',
    title: 'Monolith Architecture',
    client: 'Monolith Architecture',
    category: 'Architecture studio rebrand and digital platform',
    stack: ['Next.js', 'Three.js', 'Sanity CMS', 'Framer Motion', 'Vercel'],
    year: '2024',
    image: 'assets/process-building.jpg',
    releaseDate: 'March 14, 2024',
    tags: ['Brand & Identity', 'UI/UX Design', 'Content'],
    tagline: 'A minimalist digital presence for a maximalist portfolio.',
    challenge:
      'Monolith’s built work spoke for itself, but the studio’s site — a dense PDF-style portfolio bolted onto a template — undersold every project before a visitor got past the homepage.',
    approach:
      'We designed an editorial case-study format built around large-format renders and restrained typography, backed by a CMS the studio’s own team could update between projects without touching code.',
    result:
      'Qualified project inquiries nearly tripled in the two quarters after launch, and the studio now turns new case studies around in days instead of commissioning a developer each time.',
    resultHeadline: 'A portfolio that finally matched the work inside it.',
    stats: [
      { value: '2.8x', label: 'Qualified project inquiries' },
      { value: '40%', label: 'Faster portfolio updates' },
      { value: '4 weeks', label: 'Design to handoff' },
    ],
    credits: ['Amelia Cross', 'Magnus Bjørnsen', 'Naomi Chen'],
  },
]
