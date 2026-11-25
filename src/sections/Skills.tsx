import { motion } from 'motion/react'
import { skillGroups } from '../data/skills'
import { SectionHeading } from '../components/SectionHeading'
import { fadeUp, inView, stagger } from '../lib/motion'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeading id="skills-title" index="03" label="Skills" title="What I work with." />

        <motion.dl
          className="border-t border-line"
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              className="group grid gap-3 border-b border-line py-6 transition-colors duration-500 hover:bg-surface/60 sm:grid-cols-[14rem_1fr] sm:gap-8 sm:px-4 md:py-7"
            >
              <dt className="eyebrow pt-1 transition-colors duration-300 group-hover:text-accent">{group.title}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-2 gap-y-1 text-xl text-paper sm:text-2xl">
                  {group.items.map((item, index) => (
                    <li key={item}>
                      {item}
                      {index < group.items.length - 1 && (
                        <span aria-hidden="true" className="ml-2 text-line">
                          /
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
