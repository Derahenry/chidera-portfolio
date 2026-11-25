import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, inView } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  variants?: Variants
  as?: 'div' | 'li' | 'article'
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, variants = fadeUp, as = 'div' }: RevealProps) {
  const Component = motion[as]
  return (
    <Component className={className} variants={variants} initial="hidden" whileInView="show" viewport={inView}>
      {children}
    </Component>
  )
}
