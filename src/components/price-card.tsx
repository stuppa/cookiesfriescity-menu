import Image from 'next/image'
import { type CSSProperties, Fragment } from 'react'
import { type Category, type CategoryId, mxn, plus, toppings } from '@/data/menu'
import { CategoryIcon } from './brand/icons'
import { Doodle } from './brand/doodles'
import { ArrowCircle, HandNote } from './ui'

// Detalles de composición por tarjeta, tal como en los mocks.
const look: Partial<Record<CategoryId, { card?: string; note?: string; photo?: string; compact?: boolean }>> = {
  calientes: { note: 'top-[4%] right-[1%] text-center -rotate-[9deg] lg:top-[12%] lg:right-[3%]' },
  frias: {
    card: 'max-lg:bg-[linear-gradient(170deg,#e4f0fa,var(--color-paper)_38%)]',
    note: 'top-[3%] right-[12%] text-center -rotate-[14deg] lg:top-[5%] lg:right-[10%]',
  },
  frappes: { card: 'bg-blush' },
  snacks: { note: 'top-[2%] right-[8%] text-center -rotate-[12deg]', photo: 'top-[44%]' },
  bites: { note: 'top-[26%] left-[2%] text-center -rotate-[18deg]', compact: true },
  helado: { note: 'top-[54%] left-[3%] -rotate-[14deg]', compact: true },
}

export function PriceCard({ cat, className = '' }: { cat: Category; className?: string }) {
  const l = look[cat.id] ?? {}
  return (
    <article
      id={cat.id}
      data-cat={cat.id}
      data-reveal="card"
      aria-labelledby={`${cat.id}-title`}
      className={`@container grid grid-cols-[minmax(0,1fr)_31%] grid-rows-[auto_1fr] overflow-hidden rounded-card supports-[animation-timeline:view()]:overflow-clip bg-paper shadow-[0_14px_30px_-22px_rgb(30_26_22/0.35)] ring-1 ring-ink/5 ${l.card ?? ''} ${className}`}
    >
      <header
        className={`flex items-center gap-3 px-5 pt-5 pb-3 lg:items-start lg:justify-start lg:pt-6 lg:pl-6 ${l.compact ? '' : 'col-span-2 justify-between lg:col-span-1'}`}
      >
        <h3 id={`${cat.id}-title`} className="font-display text-[1.75rem] leading-[0.95] font-black uppercase lg:text-[2rem]">
          {cat.label}
        </h3>
        <CategoryIcon id={cat.id} className="hidden size-11 shrink-0 lg:block" />
        <ArrowCircle className="lg:hidden" />
      </header>

      <div className="pr-3 pb-5 pl-5 lg:pl-6">
        <PriceTable cat={cat} />
        {cat.footnote && <p className="mt-3 font-display text-[0.82rem] leading-snug font-bold">{cat.footnote}</p>}
        {cat.toppings && (
          <p className="mt-2 text-[0.8rem] leading-snug text-ink-soft">
            <span className="font-bold text-ink">Toppings:</span>{' '}
            {toppings.map((t, i) => (
              <Fragment key={t.name}>
                {i > 0 && (i === toppings.length - 1 ? ' y ' : ', ')}
                {t.name}
                {t.extra && <span className="font-bold text-coral-ink"> {plus(t.extra)}</span>}
              </Fragment>
            ))}
          </p>
        )}
      </div>

      {cat.photo && (
        <div
          className={`relative col-start-2 mr-3 mb-3 lg:row-span-2 lg:row-start-1 lg:m-0 ${l.compact ? 'row-span-2 row-start-1 mt-3 lg:mt-0' : 'row-start-2'}`}
        >
          <div className={`absolute inset-x-0 bottom-0 overflow-hidden rounded-2xl lg:rounded-none ${l.photo ?? 'top-0'}`}>
            <div data-parallax className="absolute inset-x-0 -inset-y-[8%] [--parallax:6]">
              {/* ⚑ Placeholder: reemplaza el archivo por la foto real */}
              <Image src={cat.photo.src} alt={cat.photo.alt} fill sizes="(min-width: 1024px) 14vw, (min-width: 768px) 18vw, 34vw" className="object-cover" />
            </div>
          </div>
          {cat.tagline && (
            <HandNote heart className={`text-[clamp(0.6rem,3cqw,1.05rem)] ${l.note ?? ''}`}>
              {cat.tagline}
            </HandNote>
          )}
          {cat.id === 'frappes' && (
            <>
              <Doodle name="rays" className="absolute top-[3%] left-[-6%] w-[22%] -rotate-[30deg]" />
              <Doodle name="rays" className="absolute top-[2%] right-[2%] w-[20%] rotate-[25deg]" />
            </>
          )}
        </div>
      )}
    </article>
  )
}

function PriceTable({ cat }: { cat: Category }) {
  const cols = cat.sizes ? 2 : 1
  let i = 0
  const row = () => ({ 'data-row': true, style: { '--i': i++ } as CSSProperties })
  return (
    <table data-sizes={cat.sizes || undefined} className="prices w-full text-[0.875rem] leading-tight lg:text-[0.9rem] xl:text-[0.875rem]">
      <thead className={cat.sizes ? '' : 'sr-only'}>
        <tr>
          <th scope="col" className="sr-only">
            Producto
          </th>
          {cat.sizes ? (
            <>
              <PriceHead title="Chico">Ch</PriceHead>
              <PriceHead title="Grande">Gde</PriceHead>
            </>
          ) : (
            <th scope="col">Precio</th>
          )}
        </tr>
      </thead>
      <tbody>
        {cat.items?.map((item) => (
          <Fragment key={item.name}>
            <tr {...row()}>
              <th scope="row">
                {item.name}
                {item.detail && <span className="block text-[0.72rem] text-ink-soft">{item.detail}</span>}
              </th>
              {item.prices.map((p, i) => (
                <td key={i}>
                  {p === null ? (
                    <>
                      <span aria-hidden="true">-</span>
                      <span className="sr-only">No disponible</span>
                    </>
                  ) : (
                    mxn(p)
                  )}
                </td>
              ))}
            </tr>
            {item.options?.map((o) => (
              <tr key={o.name} {...row()}>
                <td colSpan={cols + 1} className="py-[2px] pl-5 text-[0.84rem] lg:text-[0.9rem]">
                  <span aria-hidden="true">• </span>
                  {o.name}
                  {o.extra && <span className="ml-2 text-coral-ink">{plus(o.extra)}</span>}
                </td>
              </tr>
            ))}
            {item.note && (
              <tr {...row()}>
                <td colSpan={cols + 1} className="pt-1 pb-2 font-display text-[0.8rem] leading-snug font-bold">
                  {item.note}
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

function PriceHead({ title, children }: { title: string; children: string }) {
  return (
    <th scope="col" className="pb-1.5 text-center font-display text-[0.85rem] font-extrabold text-coral-ink lg:text-[0.9rem]">
      <abbr title={title} className="no-underline">
        {children}
      </abbr>
    </th>
  )
}
