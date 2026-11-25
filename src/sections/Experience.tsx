import { motion, useReducedMotion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { timeline, type TimelineEntry } from '../data/experience'
import { SectionHeading } from '../components/SectionHeading'
import { fadeUp, inView } from '../lib/motion'

const kindLabel: Record<TimelineEntry['kind'], string> = {
  education: 'Education',
  software: 'Software',
  work: 'Work',
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()
  // The accent line grows down the timeline as you scroll through it.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeading
          id="experience-title"
          index="04"
          label="Experience and journey"
          title="Studying, building and working."
        />

        <ol ref={listRef} className="relative ml-1 sm:ml-0">
          <span aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-px bg-line sm:left-[13.5rem]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
            className="absolute bottom-2 left-0 top-2 w-px origin-top bg-accent sm:left-[13.5rem]"
          />
          {timeline.map((entry) => (
            <motion.li
              key={`${entry.period}-${entry.title}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="relative grid gap-1 pb-10 pl-7 last:pb-0 sm:grid-cols-[13.5rem_1fr] sm:gap-0 sm:pl-0"
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[0.45rem] size-[9px] -translate-x-1/2 rounded-full border sm:left-[13.5rem] ${
                  entry.kind === 'work' ? 'border-subtle bg-ink' : 'border-accent bg-accent'
                }`}
              />
              <p className="font-mono text-xs uppercase leading-6 tracking-wider text-subtle sm:pr-8">{entry.period}</p>
              <div className="sm:pl-10">
                <h3 className="text-lg text-paper sm:text-xl">{entry.title}</h3>
                <p className="mt-0.5 text-muted">
                  {entry.place}
                  <span className="sr-only">. {kindLabel[entry.kind]}.</span>
                </p>
                {entry.note && <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-subtle">{entry.note}</p>}
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-wider text-subtle">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" /> Education and software
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full border border-subtle" /> Work alongside my degree
          </span>
        </p>
      </div>
    </section>
  )
}
