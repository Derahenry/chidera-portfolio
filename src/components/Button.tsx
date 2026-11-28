import type { ReactNode } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Download } from 'lucide-react'

type Variant = 'primary' | 'outline' | 'text'
type Icon = 'right' | 'down' | 'external' | 'download'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: Variant
  icon?: Icon
  download?: string
  className?: string
  ariaLabel?: string
}

const icons = {
  right: ArrowRight,
  down: ArrowDown,
  external: ArrowUpRight,
  download: Download,
}

// Each icon nudges in the direction it points on hover.
const iconMotion: Record<Icon, string> = {
  right: 'group-hover:translate-x-0.5',
  down: 'group-hover:translate-y-0.5',
  external: 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
  download: 'group-hover:translate-y-0.5',
}

const variants: Record<Variant, string> = {
  primary:
    'h-12 px-6 rounded-full bg-accent text-ink hover:bg-paper font-medium',
  outline:
    'h-12 px-6 rounded-full border border-line text-paper hover:border-paper/60 hover:bg-raised font-medium',
  text: 'py-1 text-paper/90 hover:text-accent underline decoration-line underline-offset-[6px] hover:decoration-accent',
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  icon,
  download,
  className = '',
  ariaLabel,
}: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href)
  const IconComponent = icon ? icons[icon] : null

  return (
    <a
      href={href}
      download={download}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center justify-center gap-2 text-[0.95rem] transition-colors duration-300 ease-out-expo ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {IconComponent && (
        <IconComponent
          aria-hidden="true"
          className={`size-4 shrink-0 transition-transform duration-300 ease-out-expo ${iconMotion[icon!]}`}
          strokeWidth={1.75}
        />
      )}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  )
}
