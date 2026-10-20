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
