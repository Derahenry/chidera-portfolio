import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import type { ScreenImage } from '../../data/projects'
import { Lightbox } from '../media/Lightbox'
import { ScreenCarousel } from '../media/ScreenCarousel'

// Alternating vertical offsets give the row of phones a gentle parallax on wide screens.
const depth = [40, -30, 55, -20, 35]

type PhoneProps = {
  image: ScreenImage
  index: number
  progress: MotionValue<number>
  onOpen: (index: number) => void
}

function Phone({ image, index, progress, onOpen }: PhoneProps) {
  const reduceMotion = useReducedMotion()
  const amount = reduceMotion ? 0 : depth[index % depth.length]
  const y = useTransform(progress, [0, 1], [amount, -amount])

  return (
    <motion.li style={{ y }}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`View larger: ${image.alt}`}
        className="group/phone block w-full cursor-zoom-in overflow-hidden rounded-[1.6rem] border border-line bg-raised p-1.5 text-left shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] transition-colors duration-300 hover:border-paper/30"
      >
        <span className="block overflow-hidden rounded-[1.2rem]">
          <img
            src={image.src}
            alt=""
            width={375}
            height={812}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full transition-transform duration-700 ease-out-expo group-hover/phone:scale-[1.04]"
          />
        </span>
      </button>
    </motion.li>
  )
}

/** DERA's screenshot strip: parallax row on wide screens, autoplay carousel on phones. */
export function PhoneScreens({ images, label }: { images: ScreenImage[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <div ref={ref}>
      <ul
        className="hidden gap-5 px-10 py-16 md:grid"
        style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` }}
        aria-label={`${label} screenshots`}
      >
        {images.map((image, index) => (
          <Phone key={image.src} image={image} index={index} progress={scrollYProgress} onOpen={setOpen} />
        ))}
      </ul>

      <div className="py-8 md:hidden">
        <ScreenCarousel images={images} label={label} onOpen={setOpen} />
      </div>

      <Lightbox images={images} index={open} label={label} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </div>
  )
}
