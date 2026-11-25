import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import type { ScreenImage } from '../../data/projects'

// Alternating vertical offsets give the row of phones a gentle parallax on wide screens.
const depth = [40, -30, 55, -20, 35]

function Phone({ image, index, progress }: { image: ScreenImage; index: number; progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion()
  const amount = reduceMotion ? 0 : depth[index % depth.length]
  const y = useTransform(progress, [0, 1], [amount, -amount])

  return (
    <motion.figure
      style={{ y }}
      className="w-[62vw] max-w-[240px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
    >
      <div className="overflow-hidden rounded-[1.6rem] border border-line bg-raised p-1.5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]">
        <div className="overflow-hidden rounded-[1.2rem]">
          <img
            src={image.src}
            alt={image.alt}
            width={375}
            height={812}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </motion.figure>
  )
}

export function PhoneScreens({ images }: { images: ScreenImage[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <div ref={ref} className="relative">
      <div
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-10 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:snap-none md:gap-5 md:overflow-visible md:px-10 md:py-16"
        style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` }}
        role="list"
        aria-label="DERA screenshots"
        tabIndex={0}
      >
        {images.map((image, index) => (
          <div role="listitem" key={image.src} className="contents">
            <Phone image={image} index={index} progress={scrollYProgress} />
          </div>
        ))}
      </div>
      <p className="mt-1 text-center font-mono text-[0.7rem] tracking-wide text-subtle md:hidden" aria-hidden="true">
        Swipe to see more screens
      </p>
    </div>
  )
}
