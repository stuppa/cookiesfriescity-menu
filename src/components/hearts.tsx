'use client'

import * as m from 'motion/react-m'
import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/scroll'

type Heart = { id: number; x: number; y: number; dx: number; dy: number; rotate: number; scale: number }

let nextId = 0

/** Corazones que flotan al tocar cualquier elemento con data-hearts (ESCRÍBENOS, la mascota). */
export function Hearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest?.('[data-hearts]') || prefersReducedMotion()) return
      const burst = Array.from({ length: 7 }, (_, i) => ({
        id: nextId++,
        x: e.clientX,
        y: e.clientY,
        dx: (i - 3) * 16 + (Math.random() - 0.5) * 14,
        dy: -(80 + Math.random() * 70),
        rotate: (Math.random() - 0.5) * 70,
        scale: 0.7 + Math.random() * 0.6,
      }))
      const ids = new Set(burst.map((h) => h.id))
      setHearts((all) => [...all, ...burst])
      setTimeout(() => setHearts((all) => all.filter((h) => !ids.has(h.id))), 1300)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50">
      {hearts.map((h) => (
        <m.svg
          key={h.id}
          viewBox="0 0 20 18"
          className="absolute w-5 fill-coral"
          style={{ left: h.x - 10, top: h.y - 9 }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: [0, 1, 1, 0], scale: h.scale, x: h.dx, y: h.dy, rotate: h.rotate }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <path d="M10 17C3.5 12 .5 8.6 1.2 5 2 1.4 6.6.6 10 4.6 13.4.6 18 1.4 18.8 5c.7 3.6-2.3 7-8.8 12z" />
        </m.svg>
      ))}
    </div>
  )
}
