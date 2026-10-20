import { Fragment } from 'react'
import { site } from '@/data/site'
import { Doodle } from './brand/doodles'
import { Logo } from './brand/logo'
import { wrap } from './ui'

export function Marquee() {
  const row = (
    <span className="flex shrink-0 items-center gap-6 pr-6">
      {site.tagline.map((w) => (
        <Fragment key={w}>
          <span>{w}</span>
          <span className="text-[0.55em]">●</span>
        </Fragment>
      ))}
    </span>
  )
  // Decorativo: el tagline real está en el footer.
  return (
    <div aria-hidden="true" className="overflow-hidden bg-coral py-3 font-display text-[1.6rem] leading-none font-black whitespace-nowrap uppercase lg:py-4 lg:text-[2rem]">
      <div className="marquee flex w-max">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10">
      <div className={`${wrap} relative flex flex-col items-center gap-7 py-10 text-center lg:flex-row lg:justify-between lg:gap-6 lg:py-6`}>
        <a href={site.nav[0].href} aria-label={`${site.name}, inicio`}>
          <Logo className="text-[2.2rem] lg:text-[1.6rem]" />
        </a>
        <nav aria-label="Pie de página">
          <ul className="flex flex-col gap-3 lg:flex-row lg:gap-11">
            {site.nav.map((l) => (
              <li key={l.label}>
                <a href={l.href} aria-current={l.current ? 'page' : undefined} className="relative inline-block py-1 text-[0.95rem] font-semibold tracking-[0.1em] uppercase lg:text-[0.72rem]">
                  {l.label}
                  {l.current && <Doodle name="squiggle" className="absolute -bottom-1 left-1/2 w-[110%] -translate-x-1/2 text-coral" strokeWidth={4.5} />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-[0.95rem] text-ink-soft lg:text-[0.72rem] lg:tracking-[0.1em] lg:text-ink lg:uppercase">{site.tagline.join(' • ')}</p>

        <Doodle name="heart" className="absolute top-[34%] left-[10%] w-8 -rotate-12 text-coral lg:hidden" />
        <Doodle name="heart" className="absolute top-[52%] left-[22%] w-7 rotate-6 text-coral lg:hidden" />
        <Doodle name="heart" className="absolute top-[30%] right-[12%] w-9 rotate-12 text-coral lg:hidden" />
        <Doodle name="slashes" className="absolute top-[50%] right-[14%] w-8 text-coral lg:hidden" />
      </div>
    </footer>
  )
}
