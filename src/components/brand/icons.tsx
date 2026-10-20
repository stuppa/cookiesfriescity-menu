'use client'

// ⚑ Iconos aproximados a los del mock (trazo a mano). Reemplázalos por los oficiales si existen.
import type { ReactNode, SVGProps } from 'react'
import type { CategoryId } from '@/data/menu'

type P = SVGProps<SVGSVGElement>

function Svg({ children, ...p }: P & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...p}
    >
      {children}
    </svg>
  )
}

const dot = (cx: number, cy: number, r = 0.95) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />

const category: Record<CategoryId, ReactNode> = {
  cookies: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9 2.6 2.6 0 0 1-3-2.6A2.6 2.6 0 0 1 15 6.5 2.6 2.6 0 0 1 12 3z" />
      {[dot(8.5, 9), dot(9, 14.8, 1.1), dot(13.3, 11.6), dot(15.6, 15.4, 1.1), dot(12.4, 17.6, 0.8)]}
    </>
  ),
  calientes: (
    <>
      <path d="M4 10.5h12.5v3.8a5.2 5.2 0 0 1-5.2 5.2H9.2A5.2 5.2 0 0 1 4 14.3z" />
      <path d="M16.5 11.4h1.3a2.3 2.3 0 0 1 0 4.6h-1.6" />
      <path d="M8.2 7.6c-.7-.9.7-1.8 0-2.8M11.6 7.6c-.7-.9.7-1.8 0-2.8M15 7.6c-.7-.9.7-1.8 0-2.8" />
    </>
  ),
  frias: (
    <>
      <path d="M5.6 8.4h12.8M6.2 8.4c0-1.5 1-2.6 2.6-2.6h6.4c1.6 0 2.6 1.1 2.6 2.6" />
      <path d="m7 8.4 1.3 11.7a1.2 1.2 0 0 0 1.2 1h5a1.2 1.2 0 0 0 1.2-1L17 8.4M7.7 13.4h8.6" />
      <path d="m12.8 5.8 1.4-3.6 2.6.6" />
    </>
  ),
  frappes: (
    <>
      <path d="M6.2 10.4h11.6M7 10.4a5 5 0 0 1 10 0" />
      <path d="m7.3 10.4 1.1 9.9a1.2 1.2 0 0 0 1.2 1.1h4.8a1.2 1.2 0 0 0 1.2-1.1l1.1-9.9" />
      <path d="M12 5.4V2.6l2.4-.6M8.6 14.6h6.8" />
    </>
  ),
  snacks: (
    <>
      <path d="M8 11V4.6M10.7 11V3.2M13.3 11V3.8M16 11V5.2" />
      <path d="M5.4 10.4c2.2 1.4 4.4 2 6.6 2s4.4-.6 6.6-2l-1.7 10.1a1.2 1.2 0 0 1-1.2 1H8.3a1.2 1.2 0 0 1-1.2-1z" />
    </>
  ),
  bites: (
    <>
      <path d="m12 2.8 8 4.4v9.6l-8 4.4-8-4.4V7.2z" />
      <path d="m4 7.2 8 4.4 8-4.4M12 11.6v9.6" />
      {[dot(12, 7.2), dot(7.3, 12.4), dot(9.5, 16.4), dot(16.7, 12.4), dot(14.5, 16.4)]}
    </>
  ),
  helado: (
    <>
      <path d="M6.8 11.2a5.2 5.2 0 1 1 10.4 0z" />
      <path d="m7.6 11.2 4.4 10.2 4.4-10.2M9.6 14.4l3.6 2.8M10.8 17.4l2.6-2.4" />
    </>
  ),
}

export function CategoryIcon({ id, ...p }: P & { id: CategoryId }) {
  return <Svg {...p}>{category[id]}</Svg>
}

export const ArrowUpRight = (p: P) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Svg>
)

export const ArrowRight = (p: P) => (
  <Svg strokeWidth={2.2} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export const MenuIcon = (p: P) => (
  <Svg strokeWidth={2.2} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)

export const CloseIcon = (p: P) => (
  <Svg strokeWidth={2.2} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const CheckIcon = (p: P) => (
  <Svg strokeWidth={3} {...p}>
    <path d="m5 12.5 4.2 4L19 7" />
  </Svg>
)

export const PinIcon = (p: P) => (
  <Svg strokeWidth={0} {...p}>
    <path fill="currentColor" d="M12 22s-7-6.4-7-12.2a7 7 0 1 1 14 0C19 15.6 12 22 12 22z" />
    <circle cx="12" cy="9.8" r="2.7" fill="var(--color-cream)" />
  </Svg>
)

export const InstagramIcon = (p: P) => (
  <Svg strokeWidth={2.2} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5.2" />
    <circle cx="12" cy="12" r="4.2" />
    {dot(17.3, 6.7, 1.2)}
  </Svg>
)

export const TikTokIcon = (p: P) => (
  <Svg strokeWidth={0} {...p}>
    <path
      fill="currentColor"
      d="M13.2 2.6h3.3c.3 2.3 1.7 3.9 4.1 4.1v3.3c-1.5 0-2.9-.4-4.1-1.2v6.4a6.1 6.1 0 1 1-6.1-6.1h.9v3.4a2.8 2.8 0 1 0 1.9 2.7z"
    />
  </Svg>
)

export const FacebookIcon = (p: P) => (
  <Svg strokeWidth={0} {...p}>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      fill="var(--color-cream)"
      d="M13.3 22v-7.5h2.5l.4-2.9h-2.9V9.8c0-.8.3-1.4 1.5-1.4h1.5V5.8c-.3 0-1.1-.1-2.1-.1-2.2 0-3.6 1.3-3.6 3.7v2.2H8.2v2.9h2.4V22z"
    />
  </Svg>
)

export const WhatsAppIcon = (p: P) => (
  <Svg strokeWidth={1.9} {...p}>
    <path d="m3.4 20.6 1.3-4.3a8.7 8.7 0 1 1 3.3 3.1z" />
    <path
      fill="currentColor"
      stroke="none"
      d="M9.1 7.6c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.1.7l-.5.6c-.1.1-.1.3 0 .5.6 1.1 1.5 2 2.6 2.6.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.7-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3-.2.6-.5.8-.6.4-1.4.5-2.1.3-2.7-.8-4.8-2.9-5.6-5.6-.2-.8-.1-1.5.3-2z"
    />
  </Svg>
)

