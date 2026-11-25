import { motion } from 'motion/react'
import { ease, inView } from '../../lib/motion'

// A coded illustration of the GetFitWithFaith ticketing rule:
// upcoming events first with a buy button, past events greyed out below with no button.
// Event names are generic on purpose. This is not a screenshot of the store.
const events = [
  { day: 'Upcoming', name: 'Next event', past: false },
  { day: 'Upcoming', name: 'Following event', past: false },
  { day: 'Date passed', name: 'Earlier event', past: true },
  { day: 'Date passed', name: 'Earlier event', past: true },
]

export function EventsIllustration({ caption }: { caption: string }) {
  return (
    <figure className="flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-center gap-2 rounded-2xl border border-line bg-ink/60 p-4 sm:p-5">
        <div className="mb-1 flex items-center justify-between">
          <span className="eyebrow">Events</span>
          <span className="font-mono text-[0.65rem] text-subtle">sorted by date</span>
        </div>
        {events.map((event, index) => (
          <motion.div
            key={index}
            className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-500 ${
              event.past ? 'border-line/60 opacity-45' : 'border-line bg-surface group-hover:border-paper/25'
            }`}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: event.past ? 0.45 : 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.6, ease, delay: 0.1 + index * 0.08 }}
          >
            <div className="min-w-0">
              <p className={`truncate text-sm ${event.past ? 'text-muted line-through decoration-line' : 'text-paper'}`}>
                {event.name}
              </p>
              <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-subtle">{event.day}</p>
            </div>
            {event.past ? (
              <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wider text-subtle">Ended</span>
            ) : (
              <span className="shrink-0 rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink">Buy ticket</span>
            )}
          </motion.div>
        ))}
      </div>
      <figcaption className="mt-3 font-mono text-[0.68rem] leading-relaxed text-subtle">{caption}</figcaption>
    </figure>
  )
}
