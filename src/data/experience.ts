// Timeline entries, newest first.

export type TimelineEntry = {
  period: string
  title: string
  place: string
  kind: 'education' | 'software' | 'work'
  note?: string
}

export const timeline: TimelineEntry[] = [
  {
    period: '2027 (expected)',
    title: 'BSc (Hons) Software Engineering',
    place: 'University of Northampton',
    kind: 'education',
  },
  {
    period: 'Nov 2026 to present',
    title: 'Door Supervisor (SIA licensed)',
    place: 'Zero hours contract',
    kind: 'work',
    note: 'Checking customers on entry, keeping queues safe and handling conflict calmly.',
  },
  {
    period: 'Sep 2026 to present',
    title: 'Freelance web developer',
    place: 'GetFitWithFaith',
    kind: 'software',
    note: 'Custom Shopify store with event ticketing in Liquid.',
  },
  {
    period: 'Jun to Nov 2026',
    title: 'Built DERA',
    place: 'Personal project',
    kind: 'software',
    note: 'Buy Now Pay Later debt tracker, live with a no sign up demo.',
  },
  {
    period: 'Oct 2025 to present',
    title: 'Till Operator and Bartender',
    place: 'Northampton Saints Stadium (via agency)',
    kind: 'work',
    note: 'Serving at the bar and tills on busy match days and events.',
  },
  {
    period: 'Dec 2024 to Apr 2026',
    title: 'Replenishment Assistant',
    place: 'Tesco',
    kind: 'work',
  },
]
