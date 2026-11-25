// Personal details used across the site. Edit here, not in components.

// Files in public/ are served under the site's base path (see vite.config.ts).
const base = import.meta.env.BASE_URL

export const profile = {
  name: 'Chidera Nwokolo',
  role: 'Software Engineering Student',
  location: 'Northampton, UK',
  availability: 'Looking for a placement or graduate role',
  email: 'nwokolohenryjr8@gmail.com',
  github: { label: 'github.com/Derahenry', href: 'https://github.com/Derahenry' },
  linkedin: { label: 'in/chidera-nwokolo', href: 'https://www.linkedin.com/in/chidera-nwokolo/' },
  cv: { href: `${base}assets/Chidera_Nwokolo_CV.pdf`, fileName: 'Chidera_Nwokolo_CV.pdf' },
  deraDemo: 'https://dera-alpha.vercel.app/?demo',
} as const

export type NavItem = { id: string; label: string }

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
