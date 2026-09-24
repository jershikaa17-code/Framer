export interface ProjectStat {
  value: string
  label: string
}

export interface ProjectCredit {
  name: string
  /** Overrides the person's site-wide role (src/data/team.ts) for this project's credit line. */
  role?: string
}

export interface Project {
  index: string
  slug: string
  title: string
  client: string
  category: string
  stack: string[]
  year: string
  /** Static hero/thumbnail photo. Optional when `video` is set instead. */
  image?: string
  /** Looping video used in place of a static photo (e.g. Numeriq Fashion). */
  video?: string
  logo: string
  releaseDate: string
  tags: string[]
  tagline: string
  /** Second, shorter line shown under the title in the detail-page hero. */
  subTagline?: string
  /** Uppercase category chips overlaid on the detail-page hero photo. */
  heroTags?: string[]
  /** Detail-page hero cover photo; falls back to `image` when absent. */
  heroImage?: string
  briefTitle?: string
  briefBody?: string
  challengeTitle?: string
  solutionTitle?: string
  challenge: string
  approach: string
  result: string
  resultHeadline: string
  stats: ProjectStat[]
  /** Cross-referenced against src/data/team.ts for the case study's credits block. */
  credits: ProjectCredit[]
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
    heroImage: 'assets/aurelis-hero.avif',
    logo: 'assets/aurelis-logo.svg',
    releaseDate: 'August 21, 2025',
    tags: ['Brand & Identity', 'Responsive Web Design', 'Strategy'],
    tagline: 'An immersive digital presence for a modern beach resort.',
    subTagline: 'From discovery to booking in three effortless steps.',
    heroTags: ['Brand-Identity', 'UI-UX-Design', 'Development'],
    briefTitle: 'Build a premium resort identity and digital platform.',
    briefBody:
      'Create® was tasked with developing a brand identity, cinematic booking website, hospitality content, and marketing assets that positioned Aurelis as a destination in its own right.',
    challengeTitle: 'Cut through the sameness of luxury hospitality online.',
    challenge:
      'Resort websites often feel interchangeable: polished imagery, generic slogans, and predictable booking flows. Aurelis needed a brand and platform that felt distinctive, evoking exclusivity and anticipation without leaning on clichés.',
    solutionTitle: 'Turn the website into a destination experience.',
    approach:
      'We designed a geometric, sunset-inspired identity and a digital platform that acted as an introduction to the resort itself. Visitors explored villas in detail, previewed curated itineraries, and experienced cinematic footage of the coastline. Typography and motion were deliberate, designed to echo architectural precision and ocean rhythm.',
    result:
      'The project was featured in Travel+Leisure Digital Awards 2025, cementing Aurelis’ standing among global resorts.',
    resultHeadline: 'A launch that turned interest into bookings.',
    stats: [
      { value: '+55%', label: 'Direct bookings' },
      { value: '4:10 min', label: 'Avg. session' },
      { value: '90%+', label: 'Occupancy' },
      { value: 'up 23%', label: 'New Guests' },
    ],
    credits: [
      { name: 'Amelia Cross', role: 'Head of Strategy' },
      { name: 'Inès Laurent', role: 'Client Services Director' },
      { name: 'Lucas Marino', role: 'Lead Engineer' },
    ],
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
    logo: 'assets/blackwell-logo.svg',
    releaseDate: 'June 25, 2025',
    tags: ['Digital Campaigns', 'Development', 'AI Systems'],
    tagline: 'Driving the next era of electric mobility',
    subTagline: 'Reimagining a heritage brand for the EV generation',
    heroTags: ['User-Research', 'UI-UX-Design', 'Product-Design', 'AI-Systems', 'Development', 'Animation-Motion'],
    briefTitle: 'Rebrand and launch Blackwell’s first EV line.',
    briefBody:
      'Create® was commissioned to overhaul Blackwell’s brand identity, design a digital platform with 3D configurators, and create a campaign that connected tradition with future-facing sustainability.',
    challengeTitle: 'Balance heritage with innovation.',
    challenge:
      'Legacy automakers often lean too heavily on history when entering EV markets, making them appear slow. At the same time, abandoning heritage risked alienating long-time customers. Blackwell needed to reposition without contradiction, convincing both loyalists and new buyers.',
    solutionTitle: 'Create a visual and digital system that signals motion and progress.',
    approach:
      'We streamlined Blackwell’s brand identity into a sharper, kinetic system. The website introduced interactive configurators and range simulations, while campaign storytelling fused historical milestones with EV innovation. The central line “Drive Forward” became a bridge between tradition and progress.',
    result:
      'The 3D configurator achieved a 74% completion rate, far exceeding the industry average. The launch was spotlighted in Adweek’s Top Automotive Launches 2025.',
    resultHeadline: 'Blackwell entered the EV market with authority.',
    stats: [
      { value: '25,000 units', label: 'EV pre-orders exceeded' },
      { value: '76%', label: 'Configurator' },
      { value: '4.5M+', label: 'Video views' },
      { value: '+118%', label: 'Engagement' },
    ],
    credits: [
      { name: 'Tobias Neumann' },
      { name: 'Naomi Chen', role: 'Campaign Strategist' },
      { name: 'Elias Novak', role: 'Interaction Designer' },
    ],
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
    logo: 'assets/clients/lindholm.svg',
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
    credits: [{ name: 'Inès Laurent' }, { name: 'Magnus Bjørnsen' }, { name: 'Fredrik Hansen' }],
  },
  {
    index: '04',
    slug: 'monolith-architecture',
    title: 'Monolith Architecture',
    client: 'Monolith Architecture',
    category: 'Architecture studio rebrand and digital platform',
    stack: ['Next.js', 'Three.js', 'Sanity CMS', 'Framer Motion', 'Vercel'],
    year: '2024',
    image: 'assets/process-building.avif',
    logo: 'assets/clients/monolith.svg',
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
    credits: [{ name: 'Amelia Cross' }, { name: 'Magnus Bjørnsen' }, { name: 'Naomi Chen' }],
  },
  {
    index: '05',
    slug: 'numeriq-fashion',
    title: 'Numeriq Fashion',
    client: 'Numeriq',
    category: 'Fashion brand and campaign launch',
    stack: ['Next.js', 'Shopify', 'Three.js', 'Framer Motion', 'Cloudflare CDN'],
    year: '2025',
    video: 'assets/numeriq.mp4',
    logo: 'assets/clients/numeriq.svg',
    releaseDate: 'September 12, 2025',
    tags: ['Brand & Identity', 'Digital Campaigns', 'Animation & Motion'],
    tagline: 'A label system and a campaign built to travel.',
    challenge:
      'Numeriq had a strong runway presence but no digital identity to match — past campaigns lived and died on social platforms with nothing of its own to link back to.',
    approach:
      'We built a modular label system and a motion-led campaign site that could reskin itself per drop, giving the brand a permanent home while keeping each release feeling distinct.',
    result:
      'The campaign site became the primary landing page for every subsequent drop, cutting paid traffic costs as organic and direct visits took over.',
    resultHeadline: 'A brand system built to move as fast as the label does.',
    stats: [
      { value: '3.4x', label: 'Organic traffic growth' },
      { value: '52%', label: 'Lower paid acquisition cost' },
      { value: '3 weeks', label: 'Per-drop turnaround' },
    ],
    credits: [{ name: 'Sofia Reyes' }, { name: 'Inès Laurent' }, { name: 'Lucas Marino' }],
  },
]
