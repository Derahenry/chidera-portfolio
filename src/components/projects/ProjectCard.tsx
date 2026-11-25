import type { Project } from '../../data/projects'
import { Reveal } from '../Reveal'
import { Tag } from '../Tag'
import { ProjectLinks } from './ProjectLinks'

/** Card for standard and compact projects. Layout adapts to the project's size and media. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const headingId = `project-${project.slug}`
  const compact = project.size === 'compact'

  return (
    <article aria-labelledby={headingId} className={compact ? 'md:col-span-2' : 'md:col-span-3'}>
      <Reveal className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-surface p-6 transition-colors duration-500 hover:border-paper/20 sm:p-8">
        <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span>{project.period}</span>
        </p>
        <h3 id={headingId} className={`mt-4 font-serif leading-none tracking-tight ${compact ? 'text-4xl' : 'text-5xl'}`}>
          {project.name}
        </h3>
        <p className="mt-2 text-paper/90">{project.tagline}</p>

        {project.media?.kind === 'screens' && (
          <ul className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-4" aria-label={`${project.name} screenshots`}>
            {project.media.images.map((image) => (
              <li
                key={image.src}
                className="overflow-hidden rounded-[0.9rem] border border-line bg-raised p-1 sm:rounded-[1.2rem] sm:p-1.5"
              >
                <div className="overflow-hidden rounded-[0.65rem] sm:rounded-[0.9rem]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={375}
                    height={812}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>

        {project.facts && (
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
            {project.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs leading-snug text-muted">{fact.label}</dt>
                <dd className="font-serif text-3xl text-paper">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-6 text-sm leading-relaxed text-paper/85">
          <span className="eyebrow mr-2">Role</span>
          {project.role}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
          {project.tech.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          {project.links.length > 0 ? (
            <ProjectLinks links={project.links} projectName={project.name} />
          ) : (
            <p className="text-sm text-subtle">Client work, so there is no public code.</p>
          )}
        </div>
      </Reveal>
    </article>
  )
}
