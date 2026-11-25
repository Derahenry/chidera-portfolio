import type { Variants } from 'motion/react'

// Shared animation language: one easing curve, a few durations, reusable variants.
export const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease } },
}

/** Text that slides up from behind a mask. Pair with an overflow-hidden parent. */
export const lineUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Default viewport settings for scroll reveals: animate once, slightly before fully in view. */
export const inView = { once: true, margin: '0px 0px -12% 0px' } as const
