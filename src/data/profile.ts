// Personal details used across the site. Edit here, not in components.

export const profile = {
  name: 'Chidera Nwokolo',
  role: 'Software Engineering Student',
  location: 'Northampton, UK',
  availability: 'Looking for a placement or graduate role',
  email: 'nwokolohenryjr8@gmail.com',
  phone: '07919 307460',
  phoneHref: 'tel:+447919307460',
  github: { label: 'github.com/Derahenry', href: 'https://github.com/Derahenry' },
  cv: { href: '/assets/Chidera_Nwokolo_CV.pdf', fileName: 'Chidera_Nwokolo_CV.pdf' },
  deraDemo: 'https://dera-alpha.vercel.app/?demo',
  // LinkedIn is intentionally left out. Add { label, href } here and in Contact if needed.
} as const

export type NavItem = { id: string; label: string }

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
