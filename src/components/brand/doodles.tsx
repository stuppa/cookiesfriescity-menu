'use client'

// ⚑ Doodles a mano aproximados. Cada uno es un solo <path pathLength=1> para poder "dibujarlo".
import type { CSSProperties } from 'react'

const doodles = {
  heart: ['0 0 40 36', 'M20.5 31C9.5 23 3.5 16.5 5.2 9.8 6.8 3.6 14.8 2.8 19.6 9.6 23.4 2.6 32.4 2.4 34.6 8.6 37 15.4 31 22.6 19.4 30.4'],
  star: ['0 0 40 40', 'M20 4 24.1 14.3 35.2 15.1 26.7 22.2 29.4 32.9 20 27 10.6 32.9 13.3 22.2 4.8 15.1 15.9 14.3 20.8 5.6'],
  rays: ['0 0 40 32', 'M8 27 13 15M20.5 25 20 7M33 27 28 15'],
  slashes: ['0 0 32 32', 'M7 21 19 7M13 28 26 13'],
  sparkle: ['0 0 40 40', 'M20 5v9M20 26v9M5 20h9M26 20h9M9.5 9.5l5 5M25.5 25.5l5 5M30.5 9.5l-5 5M14.5 25.5l-5 5'],
  dashes: ['0 0 32 36', 'M6 6 14 12M4 18h12M6 30l8-6'],
  arrow: ['0 0 40 34', 'M37 5C26 5 14 11 10.5 27M4.5 20.5 10 28.5l7-5.5'],
  arrowUp: ['0 0 44 36', 'M40 30C30 35 14 31 9.5 14M4 20l5.5-7.5 7 5'],
  squiggle: ['0 0 78 14', 'M3 9c6-6 12-6 18-1s12 5 18 0 12-5 18 0 12 5 18-1'],
  bolt: ['0 0 34 36', 'M17 3 8 19h9l-6 14 17-20h-9l6-10'],
} as const

export type DoodleName = keyof typeof doodles

export function Doodle({
  name,
  className,
  strokeWidth = 3,
  delay,
}: {
  name: DoodleName
  className?: string
  strokeWidth?: number
  /** Retraso del trazo en el hero (las demás se dibujan al revelar su tarjeta). */
  delay?: string
}) {
  const [viewBox, d] = doodles[name]
  return (
    <svg
      viewBox={viewBox}
      className={className}
      style={delay ? ({ '--dd': delay } as CSSProperties) : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} pathLength={1} className="doodle-path" />
    </svg>
  )
}
