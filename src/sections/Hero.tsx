import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { profile } from '../data/profile'
import { ButtonLink } from '../components/Button'
import { ease, fadeUp, lineUp, stagger } from '../lib/motion'

// Headline split into lines so each can rise from behind its own mask.
const headline: { text: string; accent?: boolean }[][] = [
  [{ text: 'I build and ship' }],
  [{ text: 'real products', accent: true }, { text: '.' }],
]

const facts = [
  { label: 'Studying', value: 'BSc Software Engineering, 2027' },
  { label: 'Latest', value: 'DERA, live with a no sign up demo' },
  { label: 'Freelance', value: 'Shopify work for GetFitWithFaith' },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  // Content drifts up and fades slightly as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduceMotion ? 1 : 0.2])

  // Pointer spotlight on the dot field. Writes CSS variables directly, so React never re-renders.
  useEffect(() => {
    const section = sectionRef.current
    const spotlight = spotlightRef.current
    if (!section || !spotlight || reduceMotion) return
    let frame = 0
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        spotlight.style.setProperty('--mx', `${event.clientX - rect.left}px`)
        spotlight.style.setProperty('--my', `${event.clientY - rect.top}px`)
      })
    }
    section.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener('pointermove', onMove)
    }
  }, [reduceMotion])

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-field absolute inset-0" />
        <div ref={spotlightRef} className="dot-spotlight absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-16 pt-28 sm:px-8 md:pt-32"
      >
        <motion.div variants={stagger(0.12, 0.15)} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="flex items-start gap-3 text-sm text-muted">
            <span className="relative mt-1.5 flex size-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span>
              {profile.location}. {profile.availability}.
            </span>
          </motion.p>

          <motion.p variants={fadeUp} className="eyebrow mt-10">
            {profile.name} <span className="text-line">/</span> {profile.role}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-5 font-serif text-[3.4rem] leading-[0.95] tracking-[-0.02em] text-paper min-[400px]:text-[4rem] sm:text-[5.5rem] lg:text-[7.5rem]"
          >
            {headline.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={lineUp} className="block">
                  {line.map((part) =>
                    part.accent ? (
                      <em key={part.text} className="text-accent">
                        {part.text}
                      </em>
                    ) : (
                      <span key={part.text}>{part.text}</span>
                    ),
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p variants={fadeUp} className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            I'm Chidera, a Software Engineering student at the University of Northampton. I take an idea from a
            problem people actually have to a live app they can use. My latest is{' '}
            <span className="text-paper">DERA</span>, a debt tracker for students who use Buy Now Pay Later.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 min-[420px]:flex-row">
            <ButtonLink href="#projects" icon="down">
              Explore My Work
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline">
              Get In Touch
            </ButtonLink>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
            <ButtonLink href={profile.deraDemo} variant="text" icon="external">
              Try the DERA demo
            </ButtonLink>
            <ButtonLink href={profile.cv.href} download={profile.cv.fileName} variant="text" icon="download">
              Download CV
            </ButtonLink>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Fact strip along the bottom of the hero */}
      <motion.div
        className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease }}
      >
        <dl className="grid gap-4 border-t border-line pt-6 sm:grid-cols-3 sm:gap-8">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-baseline gap-4 sm:block">
              <dt className="eyebrow w-24 shrink-0 sm:w-auto">{fact.label}</dt>
              <dd className="text-sm text-paper/90 sm:mt-2">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
