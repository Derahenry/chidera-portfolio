import { ArrowUpRight } from 'lucide-react'
import type { ProjectLink } from '../../data/projects'
import { GithubIcon } from '../Icons'

export function ProjectLinks({ links, projectName }: { links: ProjectLink[]; projectName: string }) {
  if (links.length === 0) return null
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 text-sm text-paper transition-colors duration-300 hover:text-accent"
          >
            {link.kind === 'repo' ? (
              <GithubIcon className="size-4" />
            ) : (
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            )}
            <span className="underline decoration-line underline-offset-[6px] transition-colors group-hover/link:decoration-accent">
              {link.label}
            </span>
            <span className="sr-only">
              {' '}
              for {projectName} (opens in a new tab)
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              strokeWidth={1.75}
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
