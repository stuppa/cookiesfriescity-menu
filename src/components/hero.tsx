import Image from 'next/image'
import { type CSSProperties, Fragment } from 'react'
import { Doodle } from './brand/doodles'
import { Mascot } from './brand/mascot'
import { Starburst } from './brand/sticker'
import { Button } from './button'
import { HandNote, wrap } from './ui'

const words = [['Galletas,'], ['Café', 'y'], ['Buenos'], ['Momentos']]
const photo = 'object-cover object-[12%_50%] lg:object-center'
const sizes = '(min-width: 1024px) 60vw, 100vw'

export function Hero() {
  let i = 0
  return (
    <section
      data-hero
      data-loop
      aria-labelledby="hero-title"
      className={`hero ${wrap} grid pt-4 pb-7 [grid-template-areas:'title'_'sub'_'photo'_'cta'] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:pt-0 lg:pb-9 lg:[grid-template-areas:'copy_photo']`}
    >
      <div className="max-lg:contents lg:relative lg:z-10 lg:pr-8 lg:pl-8 lg:[grid-area:copy]">
        <h1
          id="hero-title"
          className="relative font-display text-[clamp(2.6rem,12.4vw,4.4rem)] leading-[0.92] font-black uppercase [grid-area:title] max-lg:origin-bottom-left max-lg:-rotate-[5deg] max-lg:pl-6 lg:text-[clamp(3.6rem,5.4vw,5.4rem)]"
        >
          <Doodle name="slashes" className="absolute top-[0.25em] left-0 w-[0.5em] text-coral lg:-left-[0.6em]" strokeWidth={3.5} />
          {words.map((line, l) => (
            <span key={l} className="block">
              {line.map((w, k) => (
                <Fragment key={w}>
                  {k > 0 && ' '}
                  <span className="hero-word" style={{ '--i': i++ } as CSSProperties}>
                    {w}
                  </span>
                </Fragment>
              ))}
              {l === words.length - 1 && (
                <Doodle name="heart" className="ml-[0.15em] inline-block w-[0.5em] -translate-y-[0.35em]" strokeWidth={4} delay="1.1s" />
              )}
            </span>
          ))}
          <Doodle name="sparkle" className="absolute top-[-0.15em] right-[2%] w-[0.5em] text-coral lg:top-[0.05em] lg:right-[8%] lg:w-[0.45em]" strokeWidth={3.5} delay="1.2s" />
          <Doodle name="slashes" className="absolute top-[0.45em] right-[0%] w-[0.38em] text-coral lg:right-[4%]" strokeWidth={3.5} delay="1.3s" />
        </h1>

        <p className="hero-sub mt-3 max-w-[15.5rem] text-[0.95rem] leading-snug text-ink-soft [grid-area:sub] max-lg:origin-left max-lg:-rotate-[5deg] max-lg:pl-6 lg:mt-6 lg:max-w-[24rem] lg:text-[1.2rem] lg:text-ink">
          Cookies, cafés, frappés y snacks en un solo lugar. Combina, disfruta, repite.
          <Doodle name="heart" className="ml-1 inline-block w-3.5 -translate-y-px lg:hidden" strokeWidth={4} delay="1.2s" />
        </p>

        <div className="hero-cta relative mt-6 flex justify-center [grid-area:cta] lg:mt-8 lg:justify-start">
          <Doodle name="slashes" className="absolute top-1 -left-10 hidden w-8 text-coral lg:block" strokeWidth={3.5} delay="1.4s" />
          <Button href="#menu">
            Ver <span className="hidden lg:inline">nuestro</span> menú
          </Button>
        </div>
      </div>

      <div className="relative mt-5 [grid-area:photo] lg:mt-0 lg:bleed-r">
        {/* ⚑ Dos capas para animarlas por separado. Fotos reales: hero-bebidas.webp (fondo)
            y hero-galletas.webp (galletas con fondo transparente, mismo encuadre). */}
        <div className="hero-photo relative aspect-[1.28] overflow-hidden rounded-[1.75rem] md:aspect-[1.7] lg:aspect-[638/362] lg:rounded-l-[3.5rem] lg:rounded-r-none">
          <div className="hero-float absolute inset-[-4%]">
            <div data-parallax="4" className="absolute inset-0">
              <Image
                src="/images/hero-bebidas.webp"
                alt="Frappés de matcha, caramelo y fresa en vasos Cookie Fries"
                fill
                loading="eager"
                fetchPriority="high"
                sizes={sizes}
                className={photo}
              />
            </div>
            <div data-parallax="-2" className="absolute inset-0">
              <div className="hero-cookies absolute inset-0">
                <Image
                  src="/images/hero-galletas.webp"
                  alt="Galletas de chispas, chocolate y red velvet"
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes={sizes}
                  className={photo}
                />
              </div>
            </div>
          </div>
        </div>

        <Doodle name="rays" className="absolute top-[11%] left-[16%] w-[6%] -rotate-[25deg] max-lg:hidden" delay="1.3s" />
        <Doodle name="rays" className="absolute top-[1%] left-[52%] w-[6%] rotate-[8deg] max-lg:top-[-7%] max-lg:left-[40%] max-lg:w-[9%]" delay="1.4s" />
        <Doodle name="dashes" className="absolute top-[68%] left-[3%] w-[4%] -scale-x-100 max-lg:hidden" delay="1.5s" />

        <HandNote className="top-[3%] left-[66%] hidden w-[26%] -rotate-[13deg] text-[clamp(1rem,1.55vw,1.5rem)] lg:block">
          El
          <br />
          match
          <br />
          perfecto
          <Doodle name="heart" className="ml-[0.2em] inline-block w-[0.8em]" strokeWidth={4} delay="1.5s" />
        </HandNote>
        <Doodle name="arrow" className="absolute top-[8%] left-[57%] hidden w-[8%] lg:block" delay="1.6s" />

        <span className="hero-sticker absolute top-[18%] left-[75%] hidden w-[26%] rotate-[10deg] lg:block">
          <Starburst lines={['Café', 'Galletas', 'Snacks', 'Y más']} className="sticker-wobble w-full" />
        </span>
        <span className="hero-sticker absolute top-[-27%] right-[-2%] w-[39%] rotate-[8deg] md:top-[-30%] md:w-[26%] lg:hidden">
          <Starburst lines={['Un', 'match', 'perfecto']} heart size={14} className="sticker-wobble w-full" />
        </span>

        <div data-parallax="-10" className="absolute right-[-4%] bottom-[-9%] w-[38%] md:w-[28%] lg:top-[47%] lg:right-auto lg:bottom-auto lg:left-[63%] lg:w-[33%]">
          <Mascot className="hero-mascot w-full" />
        </div>
      </div>
    </section>
  )
}
