'use client'

import { useReducedMotion, useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import type { PointerEvent, ReactNode } from 'react'
import { ArrowUpRight } from './brand/icons'

const spring = { stiffness: 260, damping: 18, mass: 0.6 }

/** Botón-píldora: flecha que se desliza en hover, efecto magnético con mouse y squash al presionar. */
export function Button({
  href,
  children,
  variant = 'solid',
  size = 'md',
  icon,
  arrow = true,
  external = false,
  className = '',
  ...rest
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md'
  icon?: ReactNode
  arrow?: boolean
  external?: boolean
  className?: string
  'data-hearts'?: boolean
}) {
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)
  const still = useReducedMotion()

  const pull = (e: PointerEvent<HTMLAnchorElement>) => {
    if (still || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const release = () => {
    x.set(0)
    y.set(0)
  }

  const look = variant === 'solid' ? 'bg-coral' : 'bg-paper ring-2 ring-coral ring-inset'
  const dims = size === 'sm' ? 'h-10 gap-2 px-4 text-[0.8rem]' : 'h-12 gap-3 px-6 text-[0.95rem] lg:h-14 lg:px-7 lg:text-base'
  const arrowSize = size === 'sm' ? 'size-4' : 'size-5'

  return (
    <m.a
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...rest}
      style={{ x, y }}
      onPointerMove={pull}
      onPointerLeave={release}
      whileTap={{ scaleX: 1.06, scaleY: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      className={`group inline-flex items-center justify-center rounded-full font-display font-extrabold tracking-wide whitespace-nowrap text-ink uppercase ${look} ${dims} ${className}`}
    >
      {icon}
      <span>{children}</span>
      {arrow && (
        <span aria-hidden="true" className={`relative overflow-hidden ${arrowSize}`}>
          <ArrowUpRight className="absolute inset-0 size-full transition-[translate] duration-300 ease-out group-hover:translate-x-full group-hover:-translate-y-full" />
          <ArrowUpRight className="absolute inset-0 size-full -translate-x-full translate-y-full transition-[translate] duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </m.a>
  )
}
