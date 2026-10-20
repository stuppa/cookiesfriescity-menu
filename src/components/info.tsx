import Image from 'next/image'
import { site } from '@/data/site'
import { PinIcon, WhatsAppIcon, socialIcon } from './brand/icons'
import { Doodle } from './brand/doodles'
import { Mascot, MascotPin } from './brand/mascot'
import { Button, wrap } from './ui'

const h2 = 'font-display text-[1.9rem] leading-none font-black uppercase lg:text-[1.35rem]'

// Mobile: Visítanos → ¿Craving? → Síguenos → Más que galletas. Desktop: una franja Visítanos | Síguenos | ¿Craving?
export function Info() {
  return (
    <section
      aria-label="Visítanos y contacto"
      className={`${wrap} grid gap-6 pb-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,0.62fr)] lg:items-center lg:gap-8 lg:pb-8`}
    >
      <Visit />
      <Craving />
      <Social />
      <About />
    </section>
  )
}

function Visit() {
  return (
    <div
      id="visitanos"
      data-reveal="card"
      className="grid gap-5 md:col-span-2 md:grid-cols-2 lg:col-span-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-6"
    >
      <div className="relative flex flex-col items-start md:col-span-2 lg:order-2 lg:col-span-1 lg:pl-11">
        <PinIcon className="absolute top-0 left-0 hidden size-9 text-coral lg:block" />
        <h2 className={h2}>Visítanos</h2>
        <p className="mt-2 text-[1.05rem] leading-snug text-ink-soft lg:hidden">Te esperamos en nuestro café para disfrutar de todas las delicias.</p>
        <address className="order-last mt-5 flex gap-3 text-[0.95rem] leading-snug not-italic lg:order-none lg:mt-2 lg:text-[0.9rem]">
          <PinIcon className="size-6 shrink-0 lg:hidden" />
          <span>
            {site.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </address>
        <Button href={site.mapsUrl} external variant="outline" className="mt-4 lg:mt-4 lg:h-11 lg:px-5 lg:text-[0.85rem]">
          Cómo llegar
        </Button>
        <Doodle name="dashes" className="absolute top-[52%] right-[6%] w-7 rotate-[-30deg] lg:hidden" />
      </div>

      <div className="relative aspect-[2] overflow-hidden rounded-[1.75rem] md:aspect-auto lg:order-1 lg:aspect-[1.9] lg:rounded-l-none lg:rounded-r-[3rem] lg:bleed-l">
        <div data-parallax="5" className="absolute inset-x-0 -inset-y-[8%]">
          {/* ⚑ Placeholder: foto del local */}
          <Image src="/images/local-interior.webp" alt="Interior del café Cookie Fries City con barra rosa y plantas" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />
        </div>
        <Doodle name="star" className="absolute bottom-[34%] left-[3%] w-8 text-paper max-lg:hidden" />
      </div>

      <a
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver la ubicación en Google Maps"
        className="relative block aspect-[1.3] overflow-hidden rounded-[1.75rem] bg-[#ebe9de] lg:hidden"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 [background-image:repeating-linear-gradient(28deg,transparent_0_38px,#fbfaf5_38px_44px),repeating-linear-gradient(-62deg,transparent_0_52px,#fbfaf5_52px_57px),repeating-linear-gradient(100deg,transparent_0_110px,#f4f2ea_110px_122px)]"
        />
        <MascotPin className="absolute top-[14%] left-[30%] w-[19%]" />
        <span aria-hidden="true" className="absolute top-[42%] left-[57%] -rotate-[10deg] font-hand text-[1.35rem] leading-none uppercase">
          Aquí
          <br />
          estamos
        </span>
        <Doodle name="arrowUp" className="absolute top-[58%] left-[46%] w-[18%]" />
      </a>
    </div>
  )
}

function Craving() {
  return (
    <div id="contacto" data-reveal="card" className="relative min-h-[17.5rem] overflow-hidden rounded-card bg-pink p-6 lg:order-3 lg:min-h-0 lg:p-5">
      <h2 className={h2}>¿Craving?</h2>
      <p className="mt-2 max-w-[13rem] text-[1rem] leading-snug text-ink-soft lg:max-w-[11rem] lg:text-[0.82rem]">Haz tu pedido por mensaje o ven directo al café.</p>
      <Button
        href={site.whatsappUrl}
        external
        variant="outline"
        arrow={false}
        icon={<WhatsAppIcon className="size-6 lg:size-5" />}
        className="mt-5 lg:mt-3 lg:h-11 lg:px-4 lg:text-[0.85rem]"
      >
        Escríbenos
      </Button>
      <Mascot className="mascot-pop absolute right-[-6%] bottom-[-10%] w-[52%] max-w-[14rem] lg:hidden" />
      <Doodle name="heart" className="absolute top-[12%] right-[8%] w-7 rotate-12 text-coral lg:top-[18%] lg:right-[10%]" />
      <Doodle name="heart" className="absolute top-[22%] right-[20%] w-5 -rotate-12 text-coral lg:top-[52%] lg:right-[6%] lg:w-9" />
      <Doodle name="star" className="absolute bottom-6 left-7 w-10 text-coral lg:hidden" />
    </div>
  )
}

function Social() {
  const photos = site.socialPhotos
  return (
    <div
      data-reveal="card"
      className="relative lg:order-2 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-3 lg:border-l lg:border-ink/25 lg:pl-8 lg:[--d:90ms]"
    >
      <div>
        <h2 className={h2}>Síguenos</h2>
        <p className="mt-2 max-w-[16rem] text-[1.05rem] leading-snug text-ink-soft lg:max-w-[13rem] lg:text-[0.8rem]">Galletas, bebidas, promos y más en nuestras redes.</p>
        <ul className="mt-4 flex gap-5 lg:mt-3 lg:gap-3">
          {site.socials.map((s) => {
            const Icon = socialIcon[s.name as keyof typeof socialIcon]
            return (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid size-11 place-items-center lg:size-8">
                  <Icon className="size-10 lg:size-7" />
                </a>
              </li>
            )
          })}
        </ul>
        <ul className="mt-2 hidden gap-1.5 lg:flex">
          {photos.slice(0, 2).map((p) => (
            <Photo key={p.src} {...p} className="aspect-square w-14" />
          ))}
        </ul>
      </div>
      <ul className="hidden gap-1.5 lg:flex">
        {[photos[2], photos[4], photos[3]].map((p) => (
          <Photo key={p.src} {...p} className="aspect-[0.68] w-[3.9rem]" />
        ))}
      </ul>
      <ul className="mt-5 grid grid-cols-4 gap-2 lg:hidden">
        {photos.slice(0, 4).map((p) => (
          <Photo key={p.src} {...p} className="aspect-[0.62]" />
        ))}
      </ul>
      <Doodle name="heart" className="absolute top-[6%] right-[16%] w-7 rotate-12 text-coral lg:hidden" />
      <Doodle name="heart" className="absolute top-[30%] right-[4%] w-10 -rotate-6 text-coral lg:hidden" />
    </div>
  )
}

function Photo({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <li className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* ⚑ Placeholder: fotos de redes */}
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 64px, 25vw" className="object-cover" />
    </li>
  )
}

function About() {
  return (
    <article
      id="nosotros"
      data-reveal="card"
      aria-labelledby="nosotros-title"
      className="relative min-h-[23rem] overflow-hidden rounded-card text-paper md:col-span-2 lg:hidden"
    >
      <div data-parallax="6" className="absolute inset-x-0 -inset-y-[8%]">
        {/* ⚑ Placeholder: foto de galletas */}
        <Image src="/images/mas-que-galletas.webp" alt="" fill sizes="100vw" className="object-cover object-right" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(52_33_19/0.9)_35%,rgb(52_33_19/0.45)_65%,transparent)]" />
      <div className="relative max-w-[64%] p-6">
        <h2 id="nosotros-title" className="font-display text-[2.3rem] leading-[0.95] font-black uppercase">
          Más que galletas
        </h2>
        <p className="mt-3 text-[0.92rem] leading-snug">
          Somos un spot para los que aman lo dulce, el café y los buenos momentos. Creamos combinaciones únicas, con ingredientes de calidad y un
          ambiente que se siente como en casa.
        </p>
        <Button href={site.aboutUrl} className="mt-6">
          Conoce más
        </Button>
      </div>
      <Doodle name="heart" className="absolute top-[12%] right-[22%] w-9 text-paper" />
      <Doodle name="heart" className="absolute bottom-[5%] left-[58%] w-8 rotate-12 text-paper" />
    </article>
  )
}
