'use client'

import { LazyMotion, MotionConfig } from 'motion/react'
import { type ReactNode, useEffect } from 'react'
import { loadGsap, prefersReducedMotion, scrollToId, setLenis, supportsScrollTimeline } from '@/lib/scroll'

const features = () => import('@/lib/motion-features').then((m) => m.default)

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Anclas internas (#menu, #cookies…): scroll suave con el offset del header y la barra.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const id = (e.target as Element).closest?.('a[href^="#"]')?.getAttribute('href')?.slice(1)
      if (id && scrollToId(id)) e.preventDefault()
    }
    document.addEventListener('click', onClick)

    // Lenis suaviza la rueda (el táctil queda nativo); con reduced motion se queda el scroll nativo.
    // lerp 0.15 (default 0.1): sigue suave pero se asienta en ~1/3 s en vez de ~1/2 s, sin sensación de arrastre.
    // ScrollTrigger solo se sincroniza si el parallax cayó al respaldo de GSAP.
    let destroy = () => {}
    let cancelled = false
    if (!prefersReducedMotion()) {
      Promise.all([import('lenis'), supportsScrollTimeline() ? null : loadGsap()]).then(([{ default: Lenis }, gsap]) => {
        if (cancelled) return
        const lenis = new Lenis({ lerp: 0.15, autoRaf: true })
        if (gsap) lenis.on('scroll', gsap.ScrollTrigger.update)
        setLenis(lenis)
        destroy = () => {
          lenis.destroy()
          setLenis(null)
        }
      })
    }

    return () => {
      cancelled = true
      document.removeEventListener('click', onClick)
      destroy()
    }
  }, [])

  return (
    <LazyMotion features={features} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

/**
 * Reveals, loops y parallax. Va al final de la página (no en el layout) para que su efecto
 * corra cuando la página ya hidrató y no toque el DOM antes que React.
 */
export function PageEffects() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    // Reveal: solo se oculta lo que arranca debajo del viewport, así nada parpadea al hidratar.
    // Arranca en cuanto asoma el primer pixel: la tarjeta nunca se ve como hueco vacío esperando su turno.
    const reveal = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.removeAttribute('data-pending')
        e.target.setAttribute('data-inview', '')
        reveal.unobserve(e.target)
      }
    })
    // En un frame aparte para no forzar layout justo al hidratar.
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        if (el.getBoundingClientRect().top <= innerHeight) return
        el.setAttribute('data-pending', '')
        reveal.observe(el)
      })
    })

    // Loops (flotación, mascota, marquee…) en pausa fuera de pantalla.
    const loops = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.toggleAttribute('data-paused', !e.isIntersecting)
    })
    document.querySelectorAll('[data-loop]').forEach((el) => loops.observe(el))

    // Parallax: data-parallax + [--parallax:6] mueve ±6% dentro de su contenedor. Lo hace el CSS (globals.css)
    // en el compositor; GSAP es el respaldo para navegadores sin scroll-driven animations.
    let revert = () => {}
    let cancelled = false
    if (!supportsScrollTimeline()) loadGsap().then(({ gsap }) => {
      if (cancelled) return
      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
          const amount = Number(getComputedStyle(el).getPropertyValue('--parallax'))
          const hero = el.closest('[data-hero]')
          gsap.fromTo(
            el,
            { yPercent: hero ? 0 : -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: { trigger: hero ?? el.parentElement, start: hero ? 'top top' : 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })
      revert = () => ctx.revert()
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      reveal.disconnect()
      loops.disconnect()
      revert()
    }
  }, [])

  return null
}
