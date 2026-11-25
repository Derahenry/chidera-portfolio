import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, inView, stagger } from '../lib/motion'

type SectionHeadingProps = {
  index: string
  label: string
  title: ReactNode
  intro?: ReactNode
  id?: string
}

/** Numbered section header: "01 / Projects" over a large serif title. */
export function SectionHeading({ index, label, title, intro, id }: SectionHeadingProps) {
  return (
    <motion.header
      className="mb-12 md:mb-16"
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      <motion.p variants={fadeUp} className="eyebrow flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line" />
        <span>{label}</span>
      </motion.p>
      <motion.h2
        id={id}
        variants={fadeUp}
        className="mt-5 max-w-3xl font-serif text-[2.6rem] leading-[1.02] tracking-[-0.01em] text-paper sm:text-6xl"
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </motion.p>
      )}
    </motion.header>
  )
}
