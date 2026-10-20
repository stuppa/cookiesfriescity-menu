import type Lenis from 'lenis'

type Gsap = { gsap: typeof import('gsap').gsap; ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger }

let gsapReady: Promise<Gsap> | undefined

/** GSAP + ScrollTrigger bajo demanda (no entran en el bundle inicial). */
export function loadGsap() {
  gsapReady ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger)
    return { gsap, ScrollTrigger }
  })
  return gsapReady
}

let lenis: Lenis | null = null
export const setLenis = (l: Lenis | null) => {
  lenis = l
}

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/** Alto de lo que queda fijo arriba: header + barra de categorías. */
function stickyOffset() {
  const header = document.querySelector<HTMLElement>('[data-header]')
  const bar = document.getElementById('category-bar')
  return (header?.offsetHeight ?? 0) + (bar?.offsetHeight ?? 0) + 8
}

/** Primer elemento visible con ese id o data-cat (algunas tarjetas existen distinto en mobile y desktop). */
function findTarget(id: string) {
  return [...document.querySelectorAll<HTMLElement>(`[id="${CSS.escape(id)}"], [data-cat="${CSS.escape(id)}"]`)].find((el) => el.getClientRects().length > 0)
}

export function scrollToId(id: string) {
  const el = findTarget(id)
  if (!el) return false
  const top = el.getBoundingClientRect().top + window.scrollY - stickyOffset()
  if (lenis) lenis.scrollTo(top, { duration: 1.1 })
  else window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  history.replaceState(null, '', `#${id}`)
  return true
}
