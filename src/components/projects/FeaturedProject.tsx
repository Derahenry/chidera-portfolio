import { motion } from 'motion/react'
import type { Project } from '../../data/projects'
import { fadeUp, inView, stagger } from '../../lib/motion'
import { Reveal } from '../Reveal'
import { Tag } from '../Tag'
import { PhoneScreens } from './PhoneScreens'
import { ProjectLinks } from './ProjectLinks'

/** Full width card with screenshots, key facts and a short case study. */
export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const { caseStudy } = project
  const headingId = `project-${project.slug}`

  return (
    <article aria-labelledby={headingId} className="group">
      <Reveal className="overflow-hidden rounded-[2rem] border border-line bg-surface">
        {/* Header */}
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-14">
          <div>
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
              <span>Featured</span>
              <span aria-hidden="true">·</span>
              <span>{project.period}</span>
            </p>
            <h3 id={headingId} className="mt-5 font-serif text-6xl leading-none tracking-tight sm:text-7xl">
              {project.name}
            </h3>
            <p className="mt-3 text-lg text-paper/90">{project.tagline}</p>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <p className="leading-relaxed text-muted">{project.summary}</p>
            <p className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-paper/90">
              <span className="eyebrow mb-1 block">My role</span>
              {project.role}
            </p>
            <ProjectLinks links={project.links} projectName={project.name} />
          </div>
        </div>

        {/* Screens */}
        {project.media?.kind === 'screens' && (
          <div className="border-y border-line bg-ink/40">
            <PhoneScreens images={project.media.images} />
          </div>
        )}

        {/* Facts */}
        {project.facts && (
          <motion.dl
            className="grid grid-cols-2 border-b border-line md:grid-cols-4"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            {project.facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                variants={fadeUp}
                className={`flex flex-col-reverse gap-1 p-6 sm:p-8 ${i % 2 === 1 ? 'border-l border-line' : ''} ${
                  i >= 2 ? 'border-t border-line md:border-t-0' : ''
                } ${i === 2 ? 'md:border-l' : ''}`}
              >
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="font-serif text-3xl text-paper sm:text-4xl">{fact.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        )}

        {/* Case study */}
        {caseStudy && (
          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12 lg:p-14">
            <CaseBlock title="The problem" className="lg:col-span-4">
              <p className="leading-relaxed text-muted">{caseStudy.problem}</p>
            </CaseBlock>
            <CaseBlock title="What I built" className="lg:col-span-8">
              <ul className="grid gap-x-8 gap-y-3 text-[0.95rem] leading-relaxed text-muted sm:grid-cols-2">
                {caseStudy.built.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CaseBlock>
            <CaseBlock title="How it works" className="md:col-span-2 lg:col-span-8">
              <ol className="grid gap-5 sm:grid-cols-2">
                {caseStudy.how.map((item, i) => (
                  <li key={item} className="flex gap-4 text-[0.95rem] leading-relaxed text-muted">
                    <span className="font-mono text-xs leading-[1.9] text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </CaseBlock>
            <CaseBlock title="Stack" className="md:col-span-2 lg:col-span-4">
              <ul className="flex flex-wrap gap-2" aria-label={`${project.name} stack`}>
                {caseStudy.stack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </ul>
            </CaseBlock>
          </div>
        )}
      </Reveal>
    </article>
  )
}

function CaseBlock({ title, className = '', children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <Reveal className={className}>
      <h4 className="eyebrow mb-4 text-paper/80">{title}</h4>
      {children}
    </Reveal>
  )
}
