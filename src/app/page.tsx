import { CategoryNav } from '@/components/category-nav'
import { Footer, Marquee } from '@/components/footer'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Info } from '@/components/info'
import { MenuGrid } from '@/components/menu-grid'
import { PageEffects } from '@/components/providers'

export default function Page() {
  return (
    <>
      <span id="top-sentinel" aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-12 w-px" />
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <CategoryNav />
        <MenuGrid />
        <Info />
        <Marquee />
      </main>
      <Footer />
      <PageEffects />
    </>
  )
}
