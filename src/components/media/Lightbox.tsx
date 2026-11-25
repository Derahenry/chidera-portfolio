import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, animate, motion, useMotionValue, type Variants } from 'motion/react'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react'
import type { ScreenImage } from '../../data/projects'
import { ease } from '../../lib/motion'

const ZOOM = 2

type LightboxProps = {
  images: ScreenImage[]
  /** Index of the open image, or null when closed. */
  index: number | null
  label: string
  onClose: () => void
  onIndexChange: (index: number) => void
}

/**
 * Full screen viewer for screenshots. Swipe or use the arrows to move between images,
 * tap the image to zoom in and drag to look around. Rendered in a portal so parent
 * transforms (parallax, reveals) never affect its fixed positioning.
 */
export function Lightbox({ images, index, label, onClose, onIndexChange }: LightboxProps) {
  return createPortal(
    <AnimatePresence>
      {index !== null && (
        <LightboxDialog
          key="lightbox"
          images={images}
          index={index}
          label={label}
          onClose={onClose}
          onIndexChange={onIndexChange}
        />
      )}
    </AnimatePresence>,
    document.body,
  )
}

const slide: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 80 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
  exit: (direction: number) => ({ opacity: 0, x: direction * -80, transition: { duration: 0.3, ease } }),
}

function LightboxDialog({ images, index, label, onClose, onIndexChange }: LightboxProps & { index: number }) {
  const [zoomed, setZoomed] = useState(false)
  const [direction, setDirection] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const count = images.length
  const image = images[index]

  const go = useCallback(
    (step: number) => {
      setDirection(step)
      setZoomed(false)
      onIndexChange((index + step + count) % count)
    },
    [index, count, onIndexChange],
  )

  // Lock page scroll, focus the close button, and hand focus back when the viewer closes.
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  // Keyboard: Escape closes (or zooms out first), arrows move, Tab stays inside the dialog.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (zoomed) setZoomed(false)
        else onClose()
      } else if (event.key === 'ArrowRight') go(1)
      else if (event.key === 'ArrowLeft') go(-1)
      else if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose, zoomed])

  const iconButton =
    'grid size-11 place-items-center rounded-full border border-line bg-surface/80 text-paper transition-colors duration-300 hover:border-accent hover:text-accent'

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${label} screenshots`}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
    >
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
        <p className="eyebrow">
          {label} <span className="text-accent">{index + 1}</span> / {count}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={iconButton}
            onClick={() => setZoomed((value) => !value)}
            aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
            aria-pressed={zoomed}
          >
            {zoomed ? <ZoomOut aria-hidden="true" className="size-5" /> : <ZoomIn aria-hidden="true" className="size-5" />}
          </button>
          <button ref={closeRef} type="button" className={iconButton} onClick={onClose} aria-label="Close">
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      {/* Image stage. Clicking the empty area around the image closes the viewer. */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-4"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex max-h-full items-center justify-center"
          >
            <ZoomableImage image={image} zoomed={zoomed} onToggleZoom={() => setZoomed((v) => !v)} onSwipe={go} />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              className={`${iconButton} absolute left-6 top-1/2 hidden -translate-y-1/2 md:grid`}
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              className={`${iconButton} absolute right-6 top-1/2 hidden -translate-y-1/2 md:grid`}
              onClick={() => go(1)}
              aria-label="Next screenshot"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Bottom bar: caption and, on phones, the arrows */}
      <div className="relative z-10 flex items-center justify-between gap-3 px-4 pb-6 sm:px-6">
        {count > 1 && (
          <button type="button" className={`${iconButton} shrink-0 md:invisible`} onClick={() => go(-1)} aria-label="Previous screenshot">
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
        )}
        <div className="min-w-0 flex-1 text-center">
          <p className="mx-auto line-clamp-2 max-w-xl text-sm leading-snug text-muted">{image.alt}</p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider text-subtle" aria-hidden="true">
            {zoomed ? 'Drag to look around. Tap to zoom out' : 'Tap image to zoom. Swipe for the next one'}
          </p>
        </div>
        {count > 1 && (
          <button type="button" className={`${iconButton} shrink-0 md:invisible`} onClick={() => go(1)} aria-label="Next screenshot">
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        )}
      </div>
    </motion.div>
  )
}

function ZoomableImage({
  image,
  zoomed,
  onToggleZoom,
  onSwipe,
}: {
  image: ScreenImage
  zoomed: boolean
  onToggleZoom: () => void
  onSwipe: (step: number) => void
}) {
  const ref = useRef<HTMLImageElement>(null)
  const dragged = useRef(false)
  const pressStart = useRef<{ x: number; y: number } | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [size, setSize] = useState({ width: 0, height: 0 })

  // When zooming in, measure the unscaled size to limit panning to the image edges.
  // When zooming out, glide back to the centre.
  useEffect(() => {
    if (zoomed && ref.current) {
      setSize({ width: ref.current.offsetWidth, height: ref.current.offsetHeight })
    } else {
      animate(x, 0, { duration: 0.35, ease })
      animate(y, 0, { duration: 0.35, ease })
    }
  }, [zoomed, x, y])

  const panX = (size.width * (ZOOM - 1)) / 2
  const panY = (size.height * (ZOOM - 1)) / 2

  return (
    <motion.img
      ref={ref}
      src={image.src}
      alt={image.alt}
      width={375}
      height={812}
      draggable={false}
      style={{ x, y, touchAction: 'none' }}
      animate={{ scale: zoomed ? ZOOM : 1 }}
      transition={{ duration: 0.4, ease }}
      drag={zoomed ? true : 'x'}
      dragConstraints={zoomed ? { left: -panX, right: panX, top: -panY, bottom: panY } : { left: 0, right: 0 }}
      dragElastic={zoomed ? 0.1 : 0.5}
      dragSnapToOrigin={!zoomed}
      onDragStart={() => {
        dragged.current = true
      }}
      onDragEnd={(_, info) => {
        if (!zoomed && Math.abs(info.offset.x) > 70) onSwipe(info.offset.x < 0 ? 1 : -1)
      }}
      // A tap only counts when the pointer barely moved, so dragging or swiping never toggles zoom.
      onPointerDown={(event) => {
        dragged.current = false
        pressStart.current = { x: event.clientX, y: event.clientY }
      }}
      onPointerUp={(event) => {
        const start = pressStart.current
        pressStart.current = null
        if (!start || dragged.current) return
        if (Math.hypot(event.clientX - start.x, event.clientY - start.y) < 8) onToggleZoom()
      }}
      className={`block h-auto max-h-[calc(100svh-11rem)] w-auto max-w-[92vw] select-none rounded-2xl border border-line shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] ${
        zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
      }`}
    />
  )
}
