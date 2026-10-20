// ⚑ Mascota aproximada (cookie fry blanca con chispas). Reemplázala por el SVG oficial;
// conserva las clases mascot-eyes / mascot-arm si quieres mantener parpadeo y saludo.
const INK = 'var(--color-ink)'
const WHITE = '#fffdf7'

// Brazo/pierna "de manguera": trazo grueso negro + trazo blanco encima.
function Hose({ d }: { d: string }) {
  return (
    <>
      <path d={d} stroke={INK} strokeWidth={12} fill="none" strokeLinecap="round" />
      <path d={d} stroke={WHITE} strokeWidth={5.5} fill="none" strokeLinecap="round" />
    </>
  )
}

function Glove({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r={9} fill={WHITE} stroke={INK} strokeWidth={4} />
}

function Shoe({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d="M-14 4c-2-8 4-14 12-14 7 0 12 5 16 9 3 3 2 9-3 9h-21c-2 0-3-2-4-4z" fill={WHITE} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d="M-14 3h29" stroke={INK} strokeWidth={3} strokeLinecap="round" />
    </g>
  )
}

export function Mascot({ variant = 'wave', className }: { variant?: 'wave' | 'flag'; className?: string }) {
  return (
    <svg viewBox="0 0 250 240" className={className} aria-hidden="true" strokeLinejoin="round" data-loop>
      {/* piernas detrás del cuerpo */}
      <Hose d="M94 172c-4 18-16 30-36 34" />
      <Hose d="M132 174c6 18 18 28 38 30" />
      <Shoe x={50} y={205} flip />
      <Shoe x={178} y={203} />

      <g transform="rotate(-7 113 111)">
        {/* grosor del bloque */}
        <rect x="84" y="32" width="82" height="142" rx="26" fill={WHITE} stroke={INK} strokeWidth={5} />
        <rect x="72" y="40" width="82" height="142" rx="26" fill={WHITE} stroke={INK} strokeWidth={5} />
        {/* chispas */}
        <g fill={INK}>
          <ellipse cx="88" cy="132" rx="7" ry="5.5" transform="rotate(25 88 132)" />
          <ellipse cx="124" cy="122" rx="5" ry="4.2" />
          <ellipse cx="112" cy="156" rx="9" ry="6" transform="rotate(-12 112 156)" />
          <ellipse cx="140" cy="146" rx="4.6" ry="6" />
          <ellipse cx="84" cy="164" rx="4.2" ry="3.4" />
          <ellipse cx="134" cy="170" rx="3.6" ry="3" />
        </g>
        {/* cara */}
        <ellipse cx="88" cy="96" rx="6" ry="4" fill="var(--color-pink)" />
        <ellipse cx="138" cy="94" rx="6" ry="4" fill="var(--color-pink)" />
        <g className="mascot-eyes">
          <ellipse cx="100" cy="82" rx="4.6" ry="6.4" fill={INK} />
          <ellipse cx="126" cy="80" rx="4.6" ry="6.4" fill={INK} />
          <circle cx="101.6" cy="79.6" r="1.6" fill={WHITE} />
          <circle cx="127.6" cy="77.6" r="1.6" fill={WHITE} />
        </g>
        <path d="M98 97c5 13 22 13 29-2-9 5-20 6-29 2z" fill={INK} stroke={INK} strokeWidth={3} />
        <path d="M107 104c3 3 9 3 12-1-4-1-8-1-12 1z" fill="var(--color-coral)" />
      </g>

      {/* brazo apoyado */}
      <Hose d="M76 126c-14 4-24 16-28 32" />
      <Glove cx={46} cy={162} />

      {variant === 'wave' ? (
        <g className="mascot-arm">
          <Hose d="M150 116c16-6 26-20 30-38" />
          <Glove cx={181} cy={72} />
        </g>
      ) : (
        <g>
          <path d="M188 116 192 8" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />
          <path d="M192 10l50 10-15 13 15 13-50-6z" fill={INK} stroke={INK} strokeWidth={3} />
          <text x="214" y="34" textAnchor="middle" fontSize="15" fontWeight={900} fill={WHITE} transform="rotate(10 214 30)" className="font-display">
            CITY
          </text>
          <Hose d="M150 118c16-2 26-10 34-20" />
          <Glove cx={188} cy={94} />
        </g>
      )}
    </svg>
  )
}

/** Pin del mapa con la cara de la mascota. */
export function MascotPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" className={`pin-bob ${className ?? ''}`} aria-hidden="true" data-loop>
      <path d="M40 97S6 62 6 38a34 34 0 1 1 68 0c0 24-34 59-34 59z" fill="var(--color-coral)" />
      <g transform="rotate(-6 40 38)">
        <rect x="27" y="17" width="30" height="40" rx="10" fill={WHITE} stroke={INK} strokeWidth={3.5} />
        <rect x="22" y="21" width="30" height="40" rx="10" fill={WHITE} stroke={INK} strokeWidth={3.5} />
        <ellipse cx="32" cy="35" rx="2.2" ry="3" fill={INK} />
        <ellipse cx="42" cy="34" rx="2.2" ry="3" fill={INK} />
        <path d="M30 42c3 6 10 6 13-1-4 2-9 3-13 1z" fill={INK} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      </g>
    </svg>
  )
}
