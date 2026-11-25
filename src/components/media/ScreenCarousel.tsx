import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { ScreenImage } from '../../data/projects'
import { ease } from '../../lib/motion'

const AUTOPLAY_MS = 3200
const GAP = 14

type ScreenCarouselProps = {
  images: ScreenImage[]
  label: string
  onOpen: (index: number) => void
}

/**
 * Phone screenshot carousel for small screens. Glides to the next screen on its own,
 * pauses while you press and hold, and can be swiped back and forth.
 * Tapping the centred screen opens it in the lightbox.
 */
export function ScreenCarousel({ images, label, onOpen }: ScreenCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const x = useMotionValue(0)
  const [width, setWidth] = useState(0)
  const [index, setIndex] = useState(0)
  const [holding, setHolding] = useState(false)
  const [paused, setPaused] = useState(false)
  const inView = useInView(containerRef, { amount: 0.5 })
  const reduceMotion = useReducedMotion()
  const count = images.length

  // Track the available width so slide sizes adapt to the card.
  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const slideWidth = Math.min(width * 0.62, 250)
  const step = slideWidth + GAP
  const offsetFor = useCallback((i: number) => (width - slideWidth) / 2 - i * step, [width, slideWidth, step])

  // Glide the track to the current slide.
  useEffect(() => {
    if (!width) return
    const controls = animate(x, offsetFor(index), reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 30 })
    return () => controls.stop()
  }, [index, width, offsetFor, x, reduceMotion])

  // Autoplay: only while visible, not held, not paused, and not for people who prefer less motion.
  const autoplay = inView && !holding && !paused && !reduceMotion && width > 0 && count > 1
  useEffect(() => {
    if (!autoplay) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [autoplay, index, count])

  const goTo = (i: number) => setIndex(((i % count) + count) % count)

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} screenshots`}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') goTo(index + 1)
        if (event.key === 'ArrowLeft') goTo(index - 1)
      }}
    >
      <div
        ref={containerRef}
        className="overflow-hidden py-3"
        onPointerDown={() => setHolding(true)}
        onPointerUp={() => setHolding(false)}
        onPointerCancel={() => setHolding(false)}
        onPointerLeave={() => setHolding(false)}
      >
        <motion.ul
          className="flex"
          style={{ x, gap: GAP }}
          drag={count > 1 ? 'x' : false}
          dragConstraints={{ left: offsetFor(count - 1), right: offsetFor(0) }}
          dragElastic={0.15}
          onDragStart={() => {
            dragging.current = true
          }}
          onDragEnd={(_, info) => {
            // Work out how many slides the swipe covered, counting a quick flick as one more.
            const moved = -(info.offset.x + info.velocity.x * 0.15)
            const delta = Math.abs(moved) < step * 0.2 ? 0 : Math.sign(moved) * Math.max(1, Math.round(Math.abs(moved) / step))
            const next = Math.min(count - 1, Math.max(0, index + delta))
            if (next === index) {
              animate(x, offsetFor(index), { type: 'spring', stiffness: 220, damping: 30 })
            } else {
              setIndex(next)
            }
            window.setTimeout(() => {
              dragging.current = false
            }, 0)
          }}
        >
          {images.map((image, i) => {
            const active = i === index
            return (
              <motion.li
                key={image.src}
                className="shrink-0"
                style={{ width: slideWidth || undefined }}
                animate={{ scale: active ? 1 : 0.86, opacity: active ? 1 : 0.45 }}
                transition={{ duration: 0.5, ease }}
                aria-hidden={!active}
              >
                <button
                  type="button"
                  tabIndex={active ? 0 : -1}
                  aria-label={active ? `View larger: ${image.alt}` : `Show screenshot ${i + 1}`}
                  className="block w-full cursor-zoom-in rounded-[1.4rem] border border-line bg-raised p-1.5 text-left shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]"
                  onClick={() => {
                    if (dragging.current) return
                    if (active) onOpen(i)
                    else goTo(i)
                  }}
                >
                  <img
                    src={image.src}
                    alt=""
                    width={375}
                    height={812}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="pointer-events-none block h-auto w-full select-none rounded-[1.05rem]"
                  />
                </button>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>

      {/* Controls */}
      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous screenshot"
            className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-paper/50 hover:text-paper"
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className="grid h-6 place-items-center px-0.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ease-out-expo ${
                    i === index ? 'w-5 bg-accent' : 'w-1.5 bg-line'
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next screenshot"
            className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-paper/50 hover:text-paper"
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-paper/50 hover:text-paper"
            >
              {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
            </button>
          )}
        </div>
      )}
      <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-wider text-subtle" aria-hidden="true">
        Tap to enlarge. Hold to pause
      </p>
    </div>
  )
}
