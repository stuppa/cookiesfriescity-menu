'use client'

import * as m from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'
import { type CategoryId, categories } from '@/data/menu'
import { prefersReducedMotion } from '@/lib/scroll'
import { CategoryIcon } from './brand/icons'
import { toneBg, wrap } from './ui'

const order = categories.map((c) => c.id)

export function CategoryNav() {
  const [active, setActive] = useState<CategoryId>('cookies')
  const [barShown, setBarShown] = useState(false)
  const tiles = useRef<HTMLUListElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const clicked = useRef<CategoryId | null>(null)
  const lockUntil = useRef(0)

  // Scroll-spy: tarjetas que cruzan una línea al 28% del viewport (justo debajo de las barras fijas).
  useEffect(() => {
    const cards = [...document.querySelectorAll<HTMLElement>('[data-cat]')]
    const visible = new Set<HTMLElement>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target as HTMLElement)
          else visible.delete(e.target as HTMLElement)
        }
        if (performance.now() < lockUntil.current) return
        const ids = new Set([...visible].map((el) => el.dataset.cat as CategoryId))
        if (ids.size === 0) {
          // Arriba del menú vuelve a la primera categoría; abajo conserva la última.
          const first = cards.find((el) => el.getClientRects().length > 0)
          if (first && first.getBoundingClientRect().top > innerHeight / 2) setActive(order[0])
          return
        }
        setActive(clicked.current && ids.has(clicked.current) ? clicked.current : order.find((id) => ids.has(id))!)
      },
      { rootMargin: '-28% 0px -71% 0px' },
    )
    cards.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Mobile: la barra aparece cuando la grid de tiles ya pasó hacia arriba.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setBarShown(!e.isIntersecting && e.boundingClientRect.top < 0))
    if (tiles.current) io.observe(tiles.current)
    return () => io.disconnect()
  }, [])

  // Mantiene el chip activo a la vista dentro del carrusel (no al montar: ya está al inicio).
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const ul = list.current
    const chip = ul?.querySelector<HTMLElement>(`[data-chip="${active}"]`)
    if (!ul || !chip || ul.scrollWidth <= ul.clientWidth) return
    ul.scrollTo({ left: chip.offsetLeft - (ul.clientWidth - chip.offsetWidth) / 2, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [active])

  // Al tocar un chip se fija de inmediato y el spy espera a que termine el scroll suave.
  const select = (id: CategoryId, at: number) => {
    clicked.current = id
    lockUntil.current = at + 1000 // scroll suave de 0.8s + margen
    setActive(id)
  }

  return (
    <>
      <ul ref={tiles} aria-label="Categorías" className={`${wrap} flex flex-wrap justify-center gap-x-3 gap-y-3.5 pb-2 md:hidden`}>
        {categories.map((c) => (
          <li key={c.id} className="w-[calc((100%-2.25rem)/4)]">
            <a href={`#${c.id}`} onClick={(e) => select(c.id, e.timeStamp)} className="chip flex flex-col items-center gap-1.5 rounded-[1.1rem]">
              <span className={`grid h-[3.4rem] w-full place-items-center rounded-[1.1rem] ${toneBg[c.tone]}`}>
                <CategoryIcon id={c.id} className="size-7" />
              </span>
              <span className="text-[0.85rem] font-semibold">{c.short}</span>
            </a>
          </li>
        ))}
      </ul>

      <m.nav
        id="category-bar"
        aria-label="Categorías del menú"
        layoutRoot
        data-shown={barShown}
        className="z-30 bg-cream transition-[translate,transform,opacity,visibility] duration-300 max-md:invisible max-md:fixed max-md:inset-x-0 max-md:top-[4.5rem] max-md:-translate-y-full max-md:opacity-0 max-md:shadow-[0_10px_18px_-16px_rgb(30_26_22/0.5)] max-md:data-[shown=true]:visible max-md:data-[shown=true]:translate-y-0 max-md:data-[shown=true]:opacity-100 md:sticky md:top-[4.5rem] lg:top-24"
      >
        <m.ul ref={list} layoutScroll className={`${wrap} relative flex gap-2 overflow-x-auto py-2 [scrollbar-width:none] md:gap-2.5 md:py-2.5`}>
          {categories.map((c) => {
            const on = active === c.id
            return (
              <li key={c.id} data-chip={c.id} className="shrink-0 lg:flex-auto">
                <a
                  href={`#${c.id}`}
                  onClick={(e) => select(c.id, e.timeStamp)}
                  aria-current={on ? 'true' : undefined}
                  className={`chip flex h-10 items-center justify-center gap-2 rounded-full px-4 text-[0.85rem] font-semibold md:h-12 md:px-5 md:text-[0.92rem] lg:h-14 lg:gap-3 lg:text-[0.95rem] ${toneBg[c.tone]}`}
                >
                  {on && (
                    <m.span
                      layoutId="chip-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-coral"
                    />
                  )}
                  <CategoryIcon id={c.id} className="size-5 md:size-6 lg:size-7" />
                  <span className="lg:hidden">{c.short}</span>
                  <span className="max-lg:hidden">{c.label}</span>
                </a>
              </li>
            )
          })}
        </m.ul>
      </m.nav>
    </>
  )
}
