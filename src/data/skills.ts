// Skills shown on the site. Only list what is true.

export type SkillGroup = { title: string; items: string[] }

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', items: ['JavaScript', 'HTML', 'CSS', 'Kotlin'] },
  { title: 'Frontend', items: ['React', 'Tailwind CSS'] },
  { title: 'Backend and data', items: ['Supabase', 'PostgreSQL'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'Vitest', 'Shopify (Liquid)'] },
  { title: 'Other', items: ['Building with Claude Code', 'Customer service', 'Communication and teamwork'] },
]
