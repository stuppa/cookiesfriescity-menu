import type { ReactNode } from 'react'
import type { Tone } from '@/data/menu'
import { ArrowRight } from './brand/icons'
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
