import { motion } from 'motion/react'
import { SectionHeading } from '../components/SectionHeading'
import { fadeUp, inView, stagger } from '../lib/motion'

const principles = [
  { title: 'Start with the problem', body: 'Every project begins with something real people struggle with, not a list of features.' },
  { title: 'Ship, then improve', body: 'A working app in someone’s hands teaches more than a perfect plan.' },
  { title: 'Care about the details', body: 'The first screen, the timing of a reminder and what happens to someone’s data all matter.' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
        <SectionHeading
          id="about-title"
          index="02"
          label="About"
          title={
            <>
              Useful software, built <em className="text-accent">properly</em>.
            </>
          }
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            <motion.p variants={fadeUp}>
              <span className="text-paper">I like building things people can actually use.</span> DERA came from
              seeing students juggle several Buy Now Pay Later apps without knowing what they owed in total. So I
              built one place that shows it all, put it live, and made a demo anyone can try without signing up.
            </motion.p>
            <motion.p variants={fadeUp}>
              On DERA I defined the product and directed the build using Claude Code, an AI coding tool. I decided
              what to build, how it should behave and how data should be protected, then shipped it through 15 pull
              requests with automated tests and CI. On GetFitWithFaith I wrote the Liquid and JavaScript myself for
              a paying client.
            </motion.p>
            <motion.p variants={fadeUp}>
              I study Software Engineering at the University of Northampton and work shifts alongside my degree,
              behind the bar at Northampton Saints Stadium and as an SIA licensed door supervisor. Those jobs taught
              me to stay calm when it gets busy and to talk to anyone. I am now looking for a placement or graduate
              role where I can learn from a strong team and keep shipping.
            </motion.p>
          </motion.div>

          <motion.ol
            className="lg:col-span-5"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            aria-label="How I work"
          >
            {principles.map((item, index) => (
              <motion.li key={item.title} variants={fadeUp} className="border-t border-line py-6 last:border-b">
                <div className="flex gap-5">
                  <span className="font-mono text-xs leading-7 text-accent">0{index + 1}</span>
                  <div>
                    <h3 className="text-lg text-paper">{item.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{item.body}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
