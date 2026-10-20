'use client'

import { LazyMotion, MotionConfig } from 'motion/react'
import { type ReactNode, useEffect } from 'react'
import { loadGsap, prefersReducedMotion, scrollToId, setLenis } from '@/lib/scroll'

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

    // Lenis + ScrollTrigger en el mismo loop; con reduced motion se queda el scroll nativo.
    let destroy = () => {}
    let cancelled = false
    if (!prefersReducedMotion()) {
      Promise.all([import('lenis'), loadGsap()]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
        if (cancelled) return
        const lenis = new Lenis()
        const raf = (time: number) => lenis.raf(time * 1000)
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)
        setLenis(lenis)
        destroy = () => {
          gsap.ticker.remove(raf)
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
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.removeAttribute('data-pending')
          e.target.setAttribute('data-inview', '')
          reveal.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
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

    // Parallax ligado al scroll: data-parallax="6" mueve ±6% dentro de su contenedor.
    let revert = () => {}
    let cancelled = false
    loadGsap().then(({ gsap }) => {
      if (cancelled) return
      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax)
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
