'use client'

import { useEffect, useRef } from 'react'
import { site } from '@/data/site'
import { Doodle } from './brand/doodles'
import { CloseIcon, MenuIcon } from './brand/icons'
import { Logo } from './brand/logo'
import { Button, wrap } from './ui'

export function Header() {
  const sheet = useRef<HTMLDivElement>(null)

  // Header compacto en cuanto el sentinel del tope sale de pantalla (sin listener de scroll).
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel) return
    const io = new IntersectionObserver(([e]) => document.documentElement.toggleAttribute('data-compact', !e.isIntersecting))
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  return (
    <header data-header className="sticky top-0 z-40 bg-cream">
      <div data-header-row className={`${wrap} flex h-[4.5rem] items-center gap-3 lg:grid lg:h-24 lg:grid-cols-[1fr_auto_1fr]`}>
        <a href={site.nav[0].href} aria-label={`${site.name}, inicio`} className="mr-auto">
          <Logo data-logo className="text-[1.55rem] lg:text-[2.05rem]" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-12">
            {site.nav.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-current={l.current ? 'page' : undefined}
                  className={`relative block py-2 text-[0.8rem] uppercase tracking-[0.1em] ${l.current ? 'font-black' : 'font-semibold'}`}
                >
                  {l.label}
                  {l.current && (
                    <Doodle name="squiggle" className="absolute -bottom-1.5 left-1/2 w-[115%] -translate-x-1/2 text-coral" strokeWidth={4.5} />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 lg:justify-self-end">
          <Button href={site.orderUrl} external size="sm" className="lg:h-12 lg:px-6 lg:text-[0.95rem]">
            Pide aquí
          </Button>
          <button popoverTarget="nav-mobile" aria-label="Abrir menú" className="grid size-11 place-items-center lg:hidden">
            <MenuIcon className="size-7" />
          </button>
        </div>
      </div>

      <div
        id="nav-mobile"
        ref={sheet}
        popover="auto"
        data-lenis-prevent
        className="m-0 size-full max-h-none max-w-none overscroll-contain border-0 bg-cream p-0 text-ink"
      >
        <div className={`${wrap} flex h-[4.5rem] items-center justify-between`}>
          <Logo className="text-[1.55rem]" />
          <button popoverTarget="nav-mobile" popoverTargetAction="hide" aria-label="Cerrar menú" className="grid size-11 place-items-center">
            <CloseIcon className="size-7" />
          </button>
        </div>
        <nav aria-label="Principal (móvil)" className={`${wrap} pt-8`}>
          <ul className="space-y-5">
            {site.nav.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-current={l.current ? 'page' : undefined}
                  onClick={() => sheet.current?.hidePopover()}
                  className="relative inline-block font-display text-4xl font-black uppercase"
                >
                  {l.label}
                  {l.current && <Doodle name="squiggle" className="absolute -bottom-2 left-0 w-full text-coral" strokeWidth={4} />}
                </a>
              </li>
            ))}
          </ul>
          <Button href={site.orderUrl} external className="mt-10">
            Pide aquí
          </Button>
        </nav>
      </div>
    </header>
  )
}
