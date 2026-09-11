export interface WhisperSection {
  heading: string
  paragraphs: string[]
}

export interface WhisperArticle {
  slug: string
  title: string
  author: string
  role: string
  date: string
  excerpt: string
  cover: string
  /** Optional video cover — used in place of the static `cover` image when a
   * post calls for motion (e.g. the automotive piece, matching its own
   * "cinematic videos replaced photo grids" point). `cover` still doubles as
   * the video's poster frame and as the thumbnail on article listing cards. */
  coverVideo?: string
  leadIn: string
  body: WhisperSection[]
}

// Body content shared by several articles on the reference site itself —
// reproduced as-is rather than inventing unique copy those articles never had.
const automotiveBody: WhisperSection[] = [
  {
    heading: 'The Digital Test Drive',
    paragraphs: [
      'Car buyers no longer visit dealerships first—they visit websites. The moment they land on a brand’s page, they expect movement, sound, and emotion.',
      'A modern automotive site should feel like a test drive. The light should shift, reflections should change, and motion should hint at power. Good design doesn’t just present a car—it brings it to life.',
    ],
  },
  {
    heading: 'What Makes Digital Automotive Experiences Work',
    paragraphs: [
      'The most successful car brands use digital platforms to trigger curiosity and confidence.',
      'They combine: 3D configurators that let users explore every detail, smooth transitions that mimic motion and precision, cinematic storytelling connecting performance with lifestyle, and sound and texture through subtle animation and video pacing.',
      'These cues build trust before a single word about specs or horsepower appears.',
    ],
  },
  {
    heading: 'Emotion Over Engineering',
    paragraphs: [
      'Numbers alone don’t sell cars anymore. Experience does. Buyers want to feel how the brand fits into their lives, not just how fast it accelerates.',
      'Design choices—like shadow, contrast, and layout—should express the same intent as the car itself. A minimal electric model needs clean, silent motion.',
      'A performance brand deserves sharp transitions and tension in its typography.',
      'Digital design becomes a mirror of engineering philosophy.',
    ],
  },
  {
    heading: 'Turning Interaction Into Intention',
    paragraphs: [
      'When visitors start playing with the site—zooming, rotating, customizing—they begin to imagine ownership.',
      'That’s where conversion starts.',
      'Key features that drive engagement: instant visual feedback when changing color or trim, personalized recommendations based on previous choices, integrated dealer locators for one-click test-drive booking, and responsive design that keeps every interaction smooth on mobile.',
      'Each action moves the visitor one step closer to making a real decision.',
    ],
  },
  {
    heading: 'From Showcase to Relationship',
    paragraphs: [
      'We helped an automotive client move from static catalog pages to a fully interactive platform. Instead of listing models, we built a story around design philosophy and user control.',
      'Cinematic videos replaced photo grids. Performance metrics became animations that react to scroll. The interface felt engineered—just like the product.',
      'The results spoke clearly: more engagement, longer session times, and higher direct inquiries.',
    ],
  },
  {
    heading: 'The Road Ahead',
    paragraphs: [
      'Automotive brands that treat their sites as living spaces—not showrooms—win trust faster. Because the modern customer doesn’t start with a brochure; they start with a feeling.',
      'Every scroll, highlight, and reflection should say one thing:',
      'This is what it feels like to drive it.',
    ],
  },
]

export const whispers: WhisperArticle[] = [
  {
    slug: 'rethinking-product-design-with-intelligence',
    title: 'Rethinking Product Design with Intelligence',
    author: 'Lucas Marino',
    role: 'Technical Director',
    date: 'Jul 30, 2025',
    excerpt:
      'A look at how AI can be integrated into products and workflows to create smarter, scalable, long-term solutions.',
    cover: 'assets/whispers/rethinking-product-design.png',
    leadIn:
      'A SaaS product team approached us with an AI add-on. The challenge was to rethink AI not as a widget but as a foundation for smarter systems.',
    body: automotiveBody,
  },
  {
    slug: 'architecture-in-the-digital-age',
    title: 'Architecture in the Digital Age',
    author: 'Mark Miller',
    role: 'Creative Lead',
    date: 'Jul 20, 2025',
    excerpt:
      'Why architecture firms must move beyond static galleries and build digital platforms that capture ambition and authority.',
    cover: 'assets/whispers/architecture-digital-age.jpg',
    leadIn:
      'An architecture studio wanted its online presence to feel as ambitious as its buildings. The challenge was to move beyond static portfolios and reflect authority and vision.',
    body: [
      {
        heading: 'Digital Presence as Structure',
        paragraphs: [
          'Architecture communicates through space, proportion, and material. Its digital presence should do the same.',
          'A firm’s website isn’t just a portfolio; it’s a reflection of process, ambition, and clarity. The challenge today is to create platforms that feel as intentional as the buildings they represent.',
        ],
      },
      {
        heading: 'Beyond Static Portfolios',
        paragraphs: [
          'Too many architecture websites are still flat galleries of images and awards. They show the work but not the thinking behind it.',
          'Firms that stand out approach their digital space like a design project of its own: purpose-driven navigation that mirrors spatial flow, typography and grids inspired by architectural order, interactive case studies showing how ideas evolve, and balanced rhythm between visuals and negative space.',
          'Every layout decision should have the same discipline as a floor plan.',
        ],
      },
      {
        heading: 'Capturing Scale Through Story',
        paragraphs: [
          'A photograph can’t express the full experience of space, but storytelling can. Through pacing, transitions, and narrative, a website can capture how a project feels to inhabit.',
          'Short texts beside long visuals. Diagrams next to lived-in photography. Movement that guides the viewer as if they were walking through a space.',
          'These techniques let ambition and scale come through, even on a screen.',
        ],
      },
      {
        heading: 'Turning Design Philosophy Into User Flow',
        paragraphs: [
          'An architecture site should teach visitors how a studio thinks, not just what it builds.',
          'Ways to translate philosophy into experience: case studies with sketches and process imagery, scroll-based storytelling showing concept to completion, light and motion used to express atmosphere, and layered content that reveals detail gradually.',
          'Visitors should feel the same curiosity online that they would stepping into a finished building.',
        ],
      },
      {
        heading: 'A Platform That Reflects Authority',
        paragraphs: [
          'We redesigned an architecture studio’s site that once felt cold and outdated. By applying their design values to digital form, the result became both editorial and architectural.',
          'Modular grids replaced generic templates. Type and spacing followed real-world proportions. Motion slowed down to create balance and pause. The site no longer displayed projects—it framed them.',
          'Time on page nearly doubled, and new business inquiries grew significantly.',
        ],
      },
      {
        heading: 'Building Reputation Digitally',
        paragraphs: [
          'A well-designed platform strengthens credibility. It shows discipline, taste, and control—qualities that define good architecture itself. The firms leading this shift understand one thing: digital presentation is now part of architectural practice.',
          'When your website feels like your studio’s built work—structured, intentional, and human—it doesn’t just showcase design. It proves it.',
        ],
      },
    ],
  },
  {
    slug: 'designing-trust-why-digital-brands-win-with-simplicity',
    title: 'Designing Trust: Why Digital Brands Win with Simplicity',
    author: 'Jordan Ellis',
    role: 'UX Strategist',
    date: 'Oct 8, 2025',
    excerpt:
      'In an age of information overload, clarity builds credibility. Here’s how brands can design digital experiences that earn trust through simplicity, structure, and restraint.',
    cover: 'assets/whispers/designing-trust.jpg',
    leadIn:
      'As brands compete for attention, design often becomes louder, busier, and harder to trust. The most effective digital experiences now do the opposite—they strip away noise. Simplicity isn’t minimalism for its own sake. It’s a strategy for earning user confidence and loyalty.',
    body: automotiveBody,
  },
  {
    slug: 'digital-identities-across-cultures',
    title: 'Digital Identities Across Cultures',
    author: 'Edward Bright',
    role: 'Marketing Lead',
    date: 'Jul 25, 2025',
    excerpt:
      'How fashion brands like Numeriq blend raw street energy with high-fashion polish in their online presence.',
    cover: 'assets/whispers/digital-identities.png',
    leadIn:
      'Numeriq approached us to redefine their online presence. The challenge was balancing raw street energy with high-fashion polish across cultures.',
    body: automotiveBody,
  },
  {
    slug: 'how-automotive-brands-win-online',
    title: 'How Automotive Brands Win Online',
    author: 'Jordan Ellis',
    role: 'UX Strategist',
    date: 'Dec 7, 2025',
    excerpt:
      'Exploring how carmakers use interactive tools, storytelling, and configurators to create digital experiences as compelling as test drives.',
    cover: 'assets/whispers/automotive.jpg',
    coverVideo: 'assets/hero.mp4',
    leadIn:
      'An automotive brand asked us to build a digital showroom. The challenge was giving customers an online experience that could rival the thrill of being behind the wheel.',
    body: automotiveBody,
  },
  {
    slug: 'the-future-of-e-mobility-marketing-from-lindholm',
    title: 'The Future of E-Mobility Marketing from Lindholm',
    author: 'Matthew Parker',
    role: 'Head of Product',
    date: 'Jul 15, 2025',
    excerpt:
      'What launching an e-bike brand teaches us about positioning, culture, and standing out in a crowded mobility market.',
    cover: 'assets/whispers/e-mobility.jpeg',
    leadIn:
      'Lindholm launched Aspen® 877, a new e-bike. The challenge was positioning it as both a lifestyle product and a piece of cutting-edge mobility tech.',
    body: [
      {
        heading: 'Riding the Change',
        paragraphs: [
          'E-mobility isn’t just about new technology—it’s about a new culture. Riders no longer see e-bikes as gadgets but as symbols of independence and sustainability.',
          'When we helped launch Aspen® 877, the challenge wasn’t selling specs. It was building a brand that riders could identify with. The focus shifted from features to lifestyle—from performance to purpose.',
        ],
      },
      {
        heading: 'Positioning in a Crowded Market',
        paragraphs: [
          'The mobility space is full of look-alike products and identical claims. Standing out requires clarity and tone, not louder noise.',
          'What separates a strong brand from the rest: a distinct story that connects with real riders, visual identity rooted in lifestyle, not just mechanics, cultural alignment with sustainability and freedom, and community presence through local events and authentic voices.',
          'The brand that feels genuine wins more trust than the one shouting for attention.',
        ],
      },
      {
        heading: 'Designing for Belief, Not Just Buying',
        paragraphs: [
          'Aspen® 877 wasn’t launched as another e-bike—it was introduced as an idea. The design language reflected the balance between urban minimalism and outdoor resilience.',
          'Instead of heavy branding, we used simplicity and contrast. Black-and-white visuals suggested confidence. Clear typography gave it a technical, grounded edge.',
          'The result felt aspirational yet believable—something riders could see themselves in.',
        ],
      },
      {
        heading: 'Turning Launch into Momentum',
        paragraphs: [
          'Launching a product is one thing. Building a movement around it is another.',
          'We focused on tools that kept the conversation alive: interactive product pages showing the bike in motion, short films capturing riders in real environments, user-generated content that rewarded participation, and performance tracking dashboards connecting users post-purchase.',
          'Marketing stopped being a campaign and became an ecosystem.',
        ],
      },
      {
        heading: 'From Product to Culture',
        paragraphs: [
          'What made Aspen® 877 resonate wasn’t just design—it was timing and authenticity. We didn’t position it as a tech object but as part of a lifestyle where design, mobility, and mindset intersect.',
          'It invited people to see themselves not as customers but as early adopters of a cleaner, smarter way of moving.',
          'That shift—from product to culture—is what gives e-mobility brands staying power.',
        ],
      },
      {
        heading: 'What E-Mobility Brands Can Learn',
        paragraphs: [
          'Technology will keep changing, but emotion remains the real differentiator.',
          'The brands that lead will: speak to identity, not just function, build trust through storytelling, not advertising, and use design as proof of purpose, not decoration.',
          'The future of mobility isn’t faster—it’s more human.',
        ],
      },
    ],
  },
  {
    slug: 'why-hospitality-brands-need-digital-experiences-that-feel-like-destinations',
    title: 'Why Hospitality Brands Need Digital Experiences That Feel Like Destinations',
    author: 'Samuel Laronde',
    role: 'Marketing Lead',
    date: 'Oct 7, 2025',
    excerpt:
      'How resorts and hotels can design websites that mirror the exclusivity and atmosphere of their physical spaces.',
    cover: 'assets/whispers/hospitality.png',
    leadIn:
      'A five-star resort wanted its website to do more than show amenities. The challenge was to translate the sense of place into a digital experience that gave visitors a taste of arrival before booking.',
    body: [
      {
        heading: 'Guests Don’t Just Browse—They Experience',
        paragraphs: [
          'Before booking, guests are already imagining.',
          'They picture the view from the balcony, the sound of the lobby, the warmth of light through the windows.',
          'A hospitality website should create that same anticipation. When design, tone, and pacing reflect the property, visitors begin to feel part of it before they ever arrive.',
        ],
      },
      {
        heading: 'Design That Feels Like Place',
        paragraphs: [
          'A hotel’s digital presence should express the same emotion as its architecture. The goal isn’t to describe but to evoke.',
          'Clean layouts, cinematic visuals, and calm transitions mirror the atmosphere of real-world hospitality. Authentic photography and natural colour tones do more than show spaces—they carry emotion.',
        ],
      },
      {
        heading: 'Adding a Personal Touch',
        paragraphs: [
          'Hospitality is personal, and a website should feel the same. Guests should sense care in how information is revealed and how easy it is to explore.',
          'Interactive tools can help: smart booking flows that remember user preferences, and guided visual tours that replace static galleries.',
          'When navigation feels intuitive, it mirrors how great service feels effortless.',
        ],
      },
      {
        heading: 'Turning Atmosphere Into Results',
        paragraphs: [
          'We worked with a coastal resort whose site looked polished but lacked warmth. The redesign focused on emotion rather than decoration.',
          'Real moments replaced stock photos. Soft transitions replaced heavy animations. Muted tones created calm.',
          'After launch, direct bookings grew by 22%, and visitors stayed 40% longer. Emotion became performance.',
        ],
      },
      {
        heading: 'Where Brands Often Slip',
        paragraphs: [
          'Many hotels still rely on brochure-style websites—dense, static, and over-explained.',
          'Common issues: stock visuals that feel disconnected, text that informs but doesn’t inspire, and interfaces that focus on data, not emotion.',
          'Luxury isn’t about showing more—it’s about showing just enough.',
        ],
      },
      {
        heading: 'What Guests Remember',
        paragraphs: [
          'Every detail on your site tells a story—the typography, the pacing, the silence between sections. When those details feel intentional, visitors recognise the same quality that defines your hospitality.',
          'Your website becomes more than a marketing tool. It becomes the first step in your guest experience.',
        ],
      },
    ],
  },
]

export function getWhisperBySlug(slug: string | undefined) {
  return whispers.find((w) => w.slug === slug)
}
