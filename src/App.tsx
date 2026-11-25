import { MotionConfig } from 'motion/react'
import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    // reducedMotion="user" turns transform animations off for people who ask for less motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to projects
      </a>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </MotionConfig>
  )
}
