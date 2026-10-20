import { CategoryNav } from '@/components/category-nav'
import { Footer, Marquee } from '@/components/footer'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Info } from '@/components/info'
import { MenuGrid } from '@/components/menu-grid'

export default function Page() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <CategoryNav />
        <MenuGrid />
        <Info />
        <Marquee />
      </main>
      <Footer />
    </>
  )
}
