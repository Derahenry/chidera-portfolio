import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUp, ArrowUpRight, Check, Copy, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { GithubIcon, LinkedinIcon } from '../components/Icons'
import { ButtonLink } from '../components/Button'
import { fadeUp, inView, lineUp, stagger } from '../lib/motion'

export function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const rows = [
    { label: 'GitHub', value: profile.github.label, href: profile.github.href, icon: GithubIcon, external: true },
    { label: 'LinkedIn', value: profile.linkedin.label, href: profile.linkedin.href, icon: LinkedinIcon, external: true },
    { label: 'CV', value: 'Download PDF', href: profile.cv.href, icon: Download, download: profile.cv.fileName },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-24 sm:px-8 md:pt-36">
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={inView}>
          <motion.p variants={fadeUp} className="eyebrow flex items-center gap-3">
            <span className="text-accent">05</span>
            <span aria-hidden="true" className="h-px w-8 bg-line" />
            <span>Contact</span>
          </motion.p>
          <h2
            id="contact-title"
            className="mt-6 font-serif text-[3.2rem] leading-[0.95] tracking-[-0.02em] sm:text-8xl lg:text-[8.5rem]"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={lineUp} className="block">
                Let’s build
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={lineUp} className="block">
                something <em className="text-accent">useful</em>.
              </motion.span>
            </span>
          </h2>
          <motion.p variants={fadeUp} className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
            I am looking for a placement or graduate software role. If you would like to talk about DERA or about
            a role, email is the quickest way to reach me.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={`mailto:${profile.email}`} icon="right">
              Email me
            </ButtonLink>
            <button
              type="button"
              onClick={copyEmail}
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-line px-5 text-[0.95rem] text-paper transition-colors duration-300 hover:border-paper/60 hover:bg-raised"
            >
              <span className="truncate">{profile.email}</span>
              {copied ? (
                <Check aria-hidden="true" className="size-4 shrink-0 text-accent" />
              ) : (
                <Copy aria-hidden="true" className="size-4 shrink-0 text-muted transition-colors group-hover:text-paper" />
              )}
              <span className="sr-only">Copy email address</span>
            </button>
            <span role="status" aria-live="polite" className="text-sm text-accent sm:ml-2">
              {copied ? 'Copied to clipboard' : ''}
            </span>
          </motion.div>
        </motion.div>

        <motion.ul
          className="mt-20 grid border-b border-line sm:grid-cols-3 sm:gap-x-10"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {rows.map((row) => {
            const Icon = row.icon
            return (
              <motion.li key={row.label} variants={fadeUp} className="border-t border-line">
                <a
                  href={row.href}
                  download={row.download}
                  {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 py-6 transition-colors duration-300 hover:text-accent"
                >
                  <span>
                    <span className="eyebrow block">{row.label}</span>
                    <span className="mt-1.5 block text-paper transition-colors group-hover:text-accent">{row.value}</span>
                  </span>
                  <span className="flex items-center gap-2 text-muted group-hover:text-accent">
                    <Icon aria-hidden="true" className="size-4" />
                    {row.external && (
                      <>
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </>
                    )}
                  </span>
                </a>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind
            CSS and Motion.
          </p>
          <a href="#home" className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-paper">
            Back to top
            <ArrowUp aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </footer>
    </section>
  )
}
