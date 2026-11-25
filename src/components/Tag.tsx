import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line px-3 py-1 font-mono text-[0.72rem] tracking-wide text-muted">
      {children}
    </li>
  )
}
