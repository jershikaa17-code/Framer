export interface LegalSection {
  heading: string
  paragraphs: string[]
}

export interface LegalPageContent {
  slug: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export const legalPages: LegalPageContent[] = [
  {
    slug: 'terms',
    title: 'Terms of Service',
    updated: 'Last updated January 2026',
    intro:
      'These terms cover how you can use this site and what to expect when you work with Create® Studio. By browsing the site or engaging us for a project, you agree to the points below.',
    sections: [
      {
        heading: 'Using this site',
        paragraphs: [
          'This website and its content are provided for general information about our studio, our work, and our services. You’re welcome to browse, share links to it, and reach out about a project.',
          'You may not copy, resell, or republish the site’s design, code, or case-study content as your own. Client names, project imagery, and results shared here belong to us or our clients and are shown with permission.',
        ],
      },
      {
        heading: 'Project engagements',
        paragraphs: [
          'Any paid work — a website, brand identity, or campaign — is governed by the specific proposal or contract signed for that engagement, which takes precedence over this general page.',
          'Timelines, pricing, and deliverables shown on our Pricing page are indicative starting points, not binding quotes. Final scope is confirmed once we understand a project in detail.',
        ],
      },
      {
        heading: 'Changes to these terms',
        paragraphs: [
          'We may update this page from time to time as the studio grows. Material changes will be reflected in the "last updated" date above.',
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    updated: 'Last updated January 2026',
    intro:
      'This page explains what information we collect through this site, how we use it, and the choices you have. We keep this deliberately short — we only collect what we need to run the studio and respond to you.',
    sections: [
      {
        heading: 'What we collect',
        paragraphs: [
          'When you submit our contact form or newsletter signup, we collect the details you provide — typically your name, email, company, and message.',
          'Like most sites, we collect basic analytics (pages visited, general location, device type) to understand how the site is used and to keep it fast and reliable.',
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'Contact and newsletter details are used only to respond to your enquiry or send the updates you signed up for. We do not sell your information to third parties.',
          'Analytics data is used in aggregate to improve the site and is not tied back to an individual unless you’ve also contacted us directly.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'You can ask us to remove your contact details or unsubscribe from the newsletter at any time by emailing hello@create.com.',
        ],
      },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    updated: 'Last updated January 2026',
    intro:
      'A short note on how to read the content across this site, particularly the results and figures shown in our case studies.',
    sections: [
      {
        heading: 'Case studies and results',
        paragraphs: [
          'Metrics referenced in our work section (conversion lifts, engagement increases, and similar figures) reflect outcomes for the specific client and campaign described, measured over the periods stated. Results vary by industry, starting point, and market conditions, and past performance for one client is not a guarantee of similar results for another.',
        ],
      },
      {
        heading: 'General information',
        paragraphs: [
          'Content on this site — including blog-style "Whispers" articles — is shared for general interest and reflects our own perspective at the time of writing. It isn’t formal legal, financial, or technical advice for your specific situation.',
        ],
      },
    ],
  },
]
