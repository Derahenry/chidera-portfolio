import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Download } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { ease } from '../lib/motion'
import { useActiveSection } from '../lib/useActiveSection'

const sectionIds = navItems.map((item) => item.id)

export function Nav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionIds)
  const { scrollY } = useScroll()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Hide the bar while scrolling down, bring it back on any scroll up.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 24)
    setHidden(latest > previous && latest > 160)
  })

  // Mobile menu: lock page scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      toggle?.focus()
    }
  }, [open])

  // Close the menu if the screen grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const onChange = () => query.matches && setOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          scrolled || open ? 'border-b border-line/70 bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease }}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        >
          <a href="#home" className="group flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-full border border-line font-serif text-[0.95rem] italic text-accent transition-colors duration-300 group-hover:border-accent"
            >
              cn
            </span>
            <span className="text-[0.95rem] font-medium tracking-tight">{profile.name}</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                        isActive ? 'text-paper' : 'text-muted hover:text-paper'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-raised"
                          transition={{ duration: 0.5, ease }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
            <a
              href={profile.cv.href}
              download={profile.cv.fileName}
              className="group ml-3 inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-sm text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              CV
              <Download aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="relative -mr-2 grid size-11 place-items-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-paper transition-transform duration-500 ease-out-expo ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-paper transition-transform duration-500 ease-out-expo ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-10 pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {navItems.map((item, index) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-serif text-5xl text-paper"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.6, ease, delay: 0.05 + index * 0.06 }}
                  >
                    <span className="font-mono text-xs text-accent">0{index + 1}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href={`mailto:${profile.email}`} className="text-paper">
                {profile.email}
              </a>
              <a href={profile.linkedin.href} target="_blank" rel="noopener noreferrer">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={profile.cv.href} download={profile.cv.fileName} className="inline-flex items-center gap-2">
                Download CV <Download aria-hidden="true" className="size-3.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
