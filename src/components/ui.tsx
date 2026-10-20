import type { ReactNode } from 'react'
import type { Tone } from '@/data/menu'
import { ArrowRight, ArrowUpRight } from './brand/icons'
import { Doodle } from './brand/doodles'

export const wrap = 'mx-auto w-full max-w-[82.5rem] px-4 sm:px-6'

export const toneBg: Record<Tone, string> = {
  peach: 'bg-peach',
  mint: 'bg-mint',
  pink: 'bg-pink',
  butter: 'bg-butter',
  sky: 'bg-sky',
  lilac: 'bg-lilac',
}

export function Button({
  href,
  children,
  variant = 'solid',
  size = 'md',
  icon,
  arrow = true,
  external = false,
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md'
  icon?: ReactNode
  arrow?: boolean
  external?: boolean
  className?: string
}) {
  const look = variant === 'solid' ? 'bg-coral' : 'bg-paper ring-2 ring-coral ring-inset'
  const dims = size === 'sm' ? 'h-10 gap-2 px-4 text-[0.8rem]' : 'h-12 gap-3 px-6 text-[0.95rem] lg:h-14 lg:px-7 lg:text-base'
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className={`inline-flex items-center justify-center rounded-full font-display font-extrabold whitespace-nowrap uppercase tracking-wide text-ink ${look} ${dims} ${className}`}
    >
      {icon}
      <span>{children}</span>
      {arrow && <ArrowUpRight className={size === 'sm' ? 'size-4' : 'size-5'} />}
    </a>
  )
}

export function ArrowCircle({ solid = false, className = '' }: { solid?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-9 shrink-0 place-items-center rounded-full ${solid ? 'bg-coral text-ink' : 'bg-paper/60 text-coral-ink ring-2 ring-coral ring-inset'} ${className}`}
    >
      <ArrowRight className="size-4" />
    </span>
  )
}

/** Texto manuscrito decorativo (el contenido real está en los títulos y listas). */
export function HandNote({ children, heart = false, className = '' }: { children: ReactNode; heart?: boolean; className?: string }) {
  return (
    <p aria-hidden="true" className={`hand-note pointer-events-none absolute z-10 font-hand leading-[1.02] whitespace-pre text-ink uppercase ${className}`}>
      {children}
      {heart && <Doodle name="heart" className="mx-auto mt-1 block w-[1.3em]" strokeWidth={4} />}
    </p>
  )
}
