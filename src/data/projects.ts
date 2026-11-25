// All projects live here. To add one, append an object to `projects`.
// Components read this file only, so no component changes are needed.

export type ProjectLink = {
  label: string
  href: string
  kind: 'live' | 'repo'
}

export type ScreenImage = { src: string; alt: string }

export type ProjectMedia =
  | { kind: 'screens'; images: ScreenImage[] }
  // Coded illustrations live in components/illustrations and are looked up by id.
  | { kind: 'illustration'; id: 'events'; caption: string }

export type ProjectFact = { value: string; label: string }

export type CaseStudy = {
  problem: string
  built: string[]
  how: string[]
  stack: string[]
}

export type Project = {
  slug: string
  name: string
  tagline: string
  period: string
  /** featured = full width with case study, standard = wide card, compact = small card */
  size: 'featured' | 'standard' | 'compact'
  summary: string
  role: string
  tech: string[]
  links: ProjectLink[]
  media?: ProjectMedia
  facts?: ProjectFact[]
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: 'dera',
    name: 'DERA',
    tagline: 'Buy Now Pay Later debt tracker',
    period: 'June to November 2026',
    size: 'featured',
    summary:
      'One place for every Buy Now Pay Later plan. DERA shows what is left to pay, what is due this week and when each payment lands, then helps you plan and ask for more time when money is tight.',
    role: 'I defined the product and directed the build using Claude Code, an AI coding tool.',
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Groq', 'Web Push', 'PWA', 'Vitest'],
    links: [
      { label: 'Try the live demo', href: 'https://dera-alpha.vercel.app/?demo', kind: 'live' },
      { label: 'View the code', href: 'https://github.com/Derahenry/dera', kind: 'repo' },
    ],
    media: {
      kind: 'screens',
      images: [
        {
          src: '/assets/dera-1.jpg',
          alt: 'DERA home screen showing £320.65 left to pay, £59.99 due this week, four active plans and a detected Clearpay purchase.',
        },
        {
          src: '/assets/dera-2.jpg',
          alt: 'DERA payment calendar for November 2026 with due dates marked and an overdue Zilch payment listed below.',
        },
        {
          src: '/assets/dera-3.jpg',
          alt: 'DERA insights screen with a wellbeing score of 53 out of 100 broken down into paying on time, how much you owe and progress so far.',
        },
        {
          src: '/assets/dera-4.jpg',
          alt: 'DERA message screen for asking a provider for more time, a pause or smaller payments, with reasons to choose from.',
        },
        {
          src: '/assets/dera-5.jpg',
          alt: 'DERA home screen in dark mode.',
        },
      ],
    },
    facts: [
      { value: 'About 4,800', label: 'lines of code' },
      { value: '15', label: 'pull requests' },
      { value: '27', label: 'automated tests' },
      { value: '5 of 5', label: 'tables with row level security' },
    ],
    caseStudy: {
      problem:
        'Klarna, Clearpay, PayPal Pay in 3 and Zilch each only show their own plans. Students with plans across several providers lose track of the total they owe and when it is due.',
      built: [
        'A dashboard of what is left to pay and what is due this week',
        'A payment calendar and a monthly repayment plan',
        'A wellbeing score that shows how things are going',
        'AI that reads a pasted purchase email and offers a card to add. Only the extracted details are stored, never the email',
        'An AI letter asking a provider for more time or smaller payments',
        'Push reminders at 9am UK time, three days before and on the due date',
        'A demo mode that needs no sign up',
      ],
      how: [
        'Supabase handles sign in and stores data in Postgres, with row level security on all 5 tables so each user can only reach their own rows.',
        'The AI features call Groq from a server side Edge Function, so the key never reaches the browser. Each user is limited to 30 requests a day.',
        'Scheduled jobs send Web Push reminders, which arrive even when the app is closed. It installs on a phone as a PWA.',
        '27 Vitest tests run in GitHub Actions CI. The app is hosted on Vercel.',
      ],
      stack: [
        'React 19',
        'Vite',
        'Tailwind CSS',
        'Supabase Auth',
        'PostgreSQL',
        'Row level security',
        'Edge Functions',
        'Scheduled jobs',
        'Groq',
        'Web Push',
        'PWA',
        'Vercel',
        'Vitest',
        'GitHub Actions',
      ],
    },
  },
  {
    slug: 'getfitwithfaith',
    name: 'GetFitWithFaith',
    tagline: 'Shopify store for a faith and fitness brand',
    period: 'September to November 2026',
    size: 'standard',
    summary:
      'Freelance client work. I built event ticketing in Liquid that spots past events by date, greys them out, sorts them below upcoming ones and hides the buy button, so the client can add events with no code. I also wrote a light and dark mode toggle with no flash on load, a scroll reveal that respects reduced motion and a daily countdown.',
    role: 'Freelance web developer. I also shot the photos and video for the site.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    links: [{ label: 'Visit the store', href: 'https://getfitwithfaith.com', kind: 'live' }],
    media: {
      kind: 'illustration',
      id: 'events',
      caption: 'Illustration of how the ticketing logic orders events. Not a screenshot of the store.',
    },
    facts: [
      { value: '11', label: 'tickets sold for the 31 October 2026 event' },
      { value: '£175', label: 'net sales from that event' },
    ],
  },
  {
    slug: 'carelink',
    name: 'CareLink',
    tagline: 'Android welfare check-in app',
    period: 'Second year university project (CSY2091)',
    size: 'compact',
    summary:
      'An Android app that coordinates welfare check-ins between different user roles, built with the MVVM pattern and a local SQLite database. Assessed at 70%.',
    role: 'University project.',
    tech: ['Kotlin', 'Jetpack Compose', 'MVVM', 'SQLite'],
    links: [{ label: 'View the code', href: 'https://github.com/Derahenry/CareLink', kind: 'repo' }],
  },
]
