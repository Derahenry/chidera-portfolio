import { useState } from 'react'
import type { ScreenImage } from '../../data/projects'
import { Lightbox } from '../media/Lightbox'
import { ScreenCarousel } from '../media/ScreenCarousel'

/** Smaller screenshot set for standard cards: a row on wide screens, autoplay carousel on phones. */
export function ScreenStrip({ images, label }: { images: ScreenImage[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <ul
        className="hidden gap-4 md:grid"
        style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` }}
        aria-label={`${label} screenshots`}
      >
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`View larger: ${image.alt}`}
              className="group/shot block w-full cursor-zoom-in overflow-hidden rounded-[1.2rem] border border-line bg-raised p-1.5 text-left transition-colors duration-300 hover:border-paper/30"
            >
              <span className="block overflow-hidden rounded-[0.9rem]">
                <img
                  src={image.src}
                  alt=""
                  width={375}
                  height={812}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-700 ease-out-expo group-hover/shot:scale-[1.04]"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="md:hidden">
        <ScreenCarousel images={images} label={label} onOpen={setOpen} />
      </div>

      <Lightbox images={images} index={open} label={label} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </>
  )
}
