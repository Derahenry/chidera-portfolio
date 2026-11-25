import { projects } from '../data/projects'
import { SectionHeading } from '../components/SectionHeading'
import { FeaturedProject } from '../components/projects/FeaturedProject'
import { ProjectCard } from '../components/projects/ProjectCard'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
      <SectionHeading
        id="projects-title"
        index="01"
        label="Selected work"
        title={
          <>
            Things I have <em className="text-accent">shipped</em>.
          </>
        }
        intro="A live product, a store for a paying client and a university app. Each one solves a specific problem for specific people."
      />

      <div className="grid gap-6 md:grid-cols-5 md:gap-8">
        {projects.map((project, index) =>
          project.size === 'featured' ? (
            <div key={project.slug} className="md:col-span-5">
              <FeaturedProject project={project} index={index} />
            </div>
          ) : (
            <ProjectCard key={project.slug} project={project} index={index} />
          ),
        )}
      </div>
    </section>
  )
}
