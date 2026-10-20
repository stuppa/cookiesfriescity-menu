import { categories } from '@/data/menu'
import { CategoryIcon } from './brand/icons'
import { toneBg, wrap } from './ui'

export function CategoryNav() {
  const active = 'cookies'

  return (
    <>
      <ul aria-label="Categorías" className={`${wrap} flex flex-wrap justify-center gap-x-3 gap-y-3.5 pb-2 md:hidden`}>
        {categories.map((c) => (
          <li key={c.id} className="w-[calc((100%-2.25rem)/4)]">
            <a href={`#${c.id}`} className="flex flex-col items-center gap-1.5">
              <span className={`grid h-[3.4rem] w-full place-items-center rounded-[1.1rem] ${toneBg[c.tone]}`}>
                <CategoryIcon id={c.id} className="size-7" />
              </span>
              <span className="text-[0.85rem] font-semibold">{c.short}</span>
            </a>
          </li>
        ))}
      </ul>

      <nav aria-label="Categorías del menú" className="hidden md:block">
        <ul className={`${wrap} flex gap-2.5 overflow-x-auto py-2.5 [scrollbar-width:none]`}>
          {categories.map((c) => (
            <li key={c.id} className="shrink-0 lg:flex-auto">
              <a
                href={`#${c.id}`}
                aria-current={active === c.id ? 'true' : undefined}
                className={`relative flex h-12 items-center justify-center gap-2 rounded-full px-5 text-[0.92rem] font-semibold lg:h-14 lg:gap-3 lg:text-[0.95rem] ${active === c.id ? 'bg-coral' : toneBg[c.tone]}`}
              >
                <CategoryIcon id={c.id} className="size-6 lg:size-7" />
                <span className="lg:hidden">{c.short}</span>
                <span className="max-lg:hidden">{c.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
