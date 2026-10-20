import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { category, cookieBox, cookieSingle, dips, extras, mxn, packages, plus } from '@/data/menu'
import { CheckIcon } from './brand/icons'
import { Doodle } from './brand/doodles'
import { Mascot } from './brand/mascot'
import { Starburst, YumBadge } from './brand/sticker'
import { PriceCard } from './price-card'
import { ArrowCircle, wrap } from './ui'

const card = 'relative overflow-hidden rounded-card shadow-[0_14px_30px_-22px_rgb(30_26_22/0.35)]'
const box = `${cookieBox.cookies} galletas y ${cookieBox.dips} dip`
/** Fila que entra en cascada cuando su tarjeta se revela. */
const row = (i: number) => ({ 'data-row': true, style: { '--i': i } as CSSProperties })

// El DOM sigue el orden de mobile; en md/xl el grid lo reacomoda como el bento del mock.
// --d escalona las tarjetas de una misma fila según su columna.
export function MenuGrid() {
  return (
    <section id="menu" aria-labelledby="menu-title" className={`${wrap} grid grid-cols-1 gap-4 pt-4 pb-10 md:grid-cols-12 lg:pt-5`}>
      <h2 id="menu-title" className="sr-only">
        Menú
      </h2>
      <Lift className="md:hidden">
        <CookiesPromo />
      </Lift>
      <Lift className="md:order-1 md:col-span-6 xl:col-span-4">
        <PriceCard cat={category('calientes')} />
      </Lift>
      <Lift className="md:order-2 md:col-span-6 md:[--d:90ms] xl:col-span-4">
        <PriceCard cat={category('frias')} />
      </Lift>
      <Lift className="md:order-4 md:col-span-6 md:[--d:90ms] xl:col-span-4 xl:[--d:0ms]">
        <PriceCard cat={category('frappes')} />
      </Lift>
      <Lift className="md:order-5 md:col-span-6 md:[--d:90ms] xl:col-span-4">
        <PriceCard cat={category('snacks')} />
      </Lift>
      <Lift className="md:order-7 md:col-span-6 md:[--d:90ms] xl:col-span-5 xl:[--d:0ms]">
        <PriceCard cat={category('bites')} />
      </Lift>
      <Lift className="md:order-8 md:col-span-6 xl:col-span-4 xl:[--d:90ms]">
        <PriceCard cat={category('helado')} />
      </Lift>
      <Lift className="md:order-3 md:col-span-6 md:row-span-2 xl:col-span-4 xl:row-span-1 xl:[--d:180ms]">
        <CookiesCard />
      </Lift>
      <Lift className="md:order-6 md:col-span-6 xl:col-span-4 xl:[--d:180ms]">
        <PackagesCard />
      </Lift>
      <Lift className="md:order-9 md:col-span-6 md:[--d:90ms] xl:col-span-3 xl:[--d:180ms]">
        <ExtrasCard />
      </Lift>
    </section>
  )
}

/** Celda del bento: ubica la tarjeta y le da el hover lift / feedback al tocar. */
function Lift({ className, children }: { className: string; children: ReactNode }) {
  return <div className={`lift ${className} [&>*]:h-full`}>{children}</div>
}

/** Mobile: primera tarjeta, rosa, con la cajita de cookie fries. */
function CookiesPromo({ className = '' }: { className?: string }) {
  return (
    <article data-cat="cookies" data-reveal="card" aria-labelledby="cookies-promo-title" className={`${card} bg-pink p-5 ${className}`}>
      <header className="flex items-start justify-between">
        <h3 id="cookies-promo-title" className="font-display text-[1.9rem] leading-none font-black uppercase">
          Cookies
        </h3>
        <ArrowCircle />
      </header>
      <p className="mt-2 max-w-[17rem] text-[0.95rem] leading-snug text-ink-soft" {...row(1)}>
        Tu cajita incluye {box}. Puedes combinar {cookieBox.combine} sabores.
        <span className="sr-only"> Precio {mxn(cookieBox.price)}.</span>
      </p>
      <div className="relative mt-2 ml-[16%] aspect-[212/176] w-[80%]" {...row(3)}>
        {/* ⚑ Placeholder: foto de la cajita */}
        <Image
          src="/images/cajita-cookie-fries.webp"
          alt="Cajita Cookie Fries llena de galletas en barra"
          fill
          sizes="80vw"
          className="object-cover [mask-image:radial-gradient(closest-side,#000_78%,transparent)]"
        />
        <YumBadge data-pop className="absolute top-[26%] right-[-4%] w-[22%] rotate-[8deg]" />
        <span data-pop className="absolute right-[-8%] bottom-[-8%] w-[40%] [--d:0.25s]">
          <Starburst lines={[mxn(cookieBox.price)]} fill="var(--color-butter)" size={30} className="sticker-wobble w-full" />
        </span>
        <Mascot className="mascot-pop absolute bottom-[-6%] left-[-26%] w-[46%]" />
      </div>
      <Doodle name="heart" className="absolute top-[52%] left-[6%] w-8 -rotate-12 text-coral" />
    </article>
  )
}

/** Desktop: tarjeta "Cookies" con panel de dips. Mobile: "Un match perfecto" (los dips van en Extras). */
function CookiesCard({ className = '' }: { className?: string }) {
  const flavors = cookieBox.flavors.length
  return (
    <article id="cookies" data-cat="cookies" data-reveal="card" aria-labelledby="cookies-title" className={`${card} flex flex-col bg-lime ${className}`}>
      <div className="relative flex flex-1 flex-col p-5 pb-3 lg:p-6 lg:pb-3">
        <h3 id="cookies-title" className="relative w-fit font-display text-[clamp(1.3rem,6.3vw,1.7rem)] leading-none font-black uppercase md:text-[2.5rem]">
          <span className="md:hidden">Un match perfecto</span>
          <span className="max-md:hidden">Cookies</span>
          <Doodle name="squiggle" className="absolute -bottom-3 left-0 w-[115%] text-coral max-md:hidden" strokeWidth={4} />
        </h3>
        <YumBadge data-pop className="absolute top-2.5 right-2.5 w-14 rotate-6 md:top-3 md:right-3 md:w-16 lg:top-4 lg:right-4 lg:w-[4.75rem]" />

        <p className="mt-3 font-display text-[1.25rem] leading-[1.05] font-extrabold uppercase md:mt-6 md:text-[1.3rem]" {...row(0)}>
          Tu cajita incluye
          <br />
          {box}
        </p>
        <p className="mt-1 text-[0.85rem] text-ink-soft" {...row(1)}>
          Puedes combinar {cookieBox.combine} sabores*
        </p>

        <div className="relative mt-3 flex">
          <ul className="w-[50%] shrink-0 space-y-1.5 pb-2">
            {cookieBox.flavors.map((f, i) => (
              <li key={f} className="flex items-center gap-2.5 text-[0.95rem]" {...row(i + 2)}>
                <span className="grid size-[1.15rem] shrink-0 place-items-center rounded-full bg-coral">
                  <CheckIcon className="size-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="relative flex-1">
            <p className="relative -mt-3 text-right font-display text-[3.2rem] leading-none font-black lg:-mt-6 lg:text-[3.6rem]">
              <span className="sr-only">Precio </span>
              <span data-pop className="inline-block origin-right">
                {mxn(cookieBox.price)}
              </span>
              <Doodle name="dashes" className="absolute top-[18%] right-[-1.1rem] w-4 text-ink" strokeWidth={2.5} />
            </p>
            <Doodle name="rays" className="absolute top-[-2.6rem] right-[3.2rem] w-8 rotate-12" strokeWidth={2.5} />
          </div>
        </div>

        <div
          className="relative -mt-[5rem] ml-auto aspect-[165/160] w-[50%] max-w-[16rem] md:mt-auto md:w-[60%] md:-translate-y-2 xl:-mt-12"
          {...row(flavors + 2)}
        >
          {/* ⚑ Placeholder: foto de la cajita */}
          <Image
            src="/images/cajita-galletas.webp"
            alt="Cajita Cookie Fries con galletas de chispas y red velvet"
            fill
            sizes="(min-width: 1024px) 16vw, 50vw"
            className="object-cover [mask-image:radial-gradient(closest-side,#000_80%,transparent)]"
          />
        </div>
        <Mascot className="mascot-pop absolute bottom-[-0.5rem] left-[22%] w-[28%] md:w-[34%] lg:left-[20%] lg:w-[30%]" />
        <Doodle name="star" className="absolute bottom-5 left-4 w-8 text-coral md:hidden" />
      </div>

      <div className="rounded-t-card bg-pink px-5 pt-4 pb-5 max-md:hidden lg:px-6">
        <h4 className="flex items-baseline gap-3" {...row(flavors + 3)}>
          <span className="font-display text-[1.7rem] font-black uppercase">Dips</span>
          <span className="text-[0.85rem]">*Dip extra {mxn(dips.extraPrice)}*</span>
        </h4>
        <DipsList bullets from={flavors + 4} />
        <p className="mx-auto mt-4 w-fit rounded-full bg-paper px-6 py-2.5 font-display text-[1rem] font-extrabold uppercase" {...row(flavors + 8)}>
          Cookie individual {mxn(cookieSingle)}
        </p>
      </div>
    </article>
  )
}

function DipsList({ bullets = false, from = 0 }: { bullets?: boolean; from?: number }) {
  return (
    <ul
      className={`relative mt-2 grid grid-flow-col grid-rows-3 gap-x-6 gap-y-1 text-[0.875rem] leading-snug lg:text-[0.92rem] ${bullets ? '' : 'before:absolute before:inset-y-0 before:left-1/2 before:w-0.5 before:bg-coral'}`}
    >
      {dips.items.map((d, i) => (
        <li key={d.name} className={bullets ? "before:mr-2.5 before:content-['•']" : ''} {...row(from + (i % 3))}>
          {d.name}
          {d.extra && <span className="ml-2 font-bold text-coral-ink">{plus(d.extra)}</span>}
        </li>
      ))}
    </ul>
  )
}

function PackagesCard({ className = '' }: { className?: string }) {
  return (
    <article id="paquetes" data-reveal="card" aria-labelledby="paquetes-title" className={`${card} min-h-[20rem] bg-butter p-5 md:min-h-[15.5rem] lg:p-6 ${className}`}>
      <header className="flex items-start justify-between gap-3">
        <h3 id="paquetes-title" className="font-display text-[1.85rem] leading-none font-black uppercase lg:text-[2.05rem]">
          Paquetes –{' '}
          <span data-pop className="inline-block">
            {mxn(packages.price)}
          </span>
        </h3>
        <ArrowCircle solid className="md:hidden" />
      </header>
      <p className="mt-4 font-bold" {...row(1)}>
        Incluye:
      </p>
      <ul className="mt-2 space-y-1.5 text-[0.95rem]">
        {packages.includes.map((item, i) => (
          <li key={item.text} className="flex items-center gap-2.5" {...row(i + 2)}>
            <svg viewBox="0 0 20 18" className="w-4 shrink-0 fill-coral md:hidden" aria-hidden="true">
              <path d="M10 17C3.5 12 .5 8.6 1.2 5 2 1.4 6.6.6 10 4.6 13.4.6 18 1.4 18.8 5c.7 3.6-2.3 7-8.8 12z" />
            </svg>
            <span className="size-1.5 shrink-0 rounded-full bg-ink max-md:hidden" aria-hidden="true" />
            <span>
              {item.text}
              {item.detail && <span className="ml-1 text-[0.75rem]">{item.detail}</span>}
            </span>
          </li>
        ))}
      </ul>
      <Mascot variant="flag" className="mascot-pop absolute right-[3%] bottom-[-5%] w-[46%] max-w-[15rem] lg:w-[46%]" />
      <Doodle name="star" className="absolute bottom-5 left-5 w-9 text-coral" />
      <Doodle name="rays" className="absolute top-[38%] right-[9%] w-8 rotate-[30deg] text-coral max-md:hidden" />
    </article>
  )
}

function ExtrasCard({ className = '' }: { className?: string }) {
  return (
    <article
      id="extras"
      data-reveal="card"
      aria-labelledby="extras-title"
      className={`relative rounded-card bg-pink p-5 md:flex md:flex-col md:justify-center lg:px-6 ${className}`}
    >
      <Doodle name="heart" className="absolute -top-5 -left-1.5 w-11 -rotate-12 text-coral max-md:hidden" />
      <header className="flex items-start justify-between gap-3 md:sr-only">
        <h3 id="extras-title" className="font-display text-[1.75rem] leading-none font-black uppercase">
          Extras<span className="md:hidden"> y Dips</span>
        </h3>
        <ArrowCircle />
      </header>

      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_24%] items-center gap-2 md:hidden">
        <div>
          <DipsList from={1} />
          <p className="mt-1 text-[0.8rem] text-ink-soft" {...row(4)}>
            *Dip extra {mxn(dips.extraPrice)}*
          </p>
        </div>
        <div className="relative aspect-[88/96]" {...row(2)}>
          {/* ⚑ Placeholder: foto del dip */}
          <Image src="/images/dip-nutella.webp" alt="Vasito de dip de Nutella" fill sizes="30vw" className="object-cover [mask-image:radial-gradient(closest-side,#000_80%,transparent)]" />
        </div>
      </div>

      <ul className="space-y-2 text-[0.85rem] tracking-wide uppercase max-md:mt-4 max-md:border-t-2 max-md:border-coral/40 max-md:pt-3 lg:space-y-2.5 lg:text-[0.9rem]">
        {extras.map((e, i) => (
          <li key={e.name} className="flex justify-between gap-3" {...row(i + 5)}>
            <span>{e.name}</span>
            <span className="tabular-nums">{e.addon ? plus(e.price) : mxn(e.price)}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 w-fit rounded-full bg-paper px-6 py-2.5 font-display text-[1rem] font-extrabold uppercase md:hidden" {...row(9)}>
        Cookie individual {mxn(cookieSingle)}
      </p>
    </article>
  )
}
