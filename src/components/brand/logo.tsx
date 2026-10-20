// ⚑ Logo aproximado con la fuente display. Reemplázalo por el SVG oficial (mantén el tamaño con className).
export function Logo({ className = '', ...rest }: { className?: string; 'data-logo'?: boolean }) {
  return (
    <span className={`inline-block font-display font-black uppercase leading-[0.8] ${className}`} aria-hidden="true" {...rest}>
      <span className="block">Cookie</span>
      <span className="block">
        Fries<span className="ml-[0.05em] inline-block -translate-y-[1.35em] text-[0.3em] leading-none">City</span>
      </span>
    </span>
  )
}
