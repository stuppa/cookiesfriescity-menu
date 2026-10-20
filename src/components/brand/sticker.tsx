'use client'

// ⚑ Stickers aproximados (estrella y badge YUM!). Reemplázalos por los SVG oficiales si existen.

// Estrella de 13 picos irregulares (precalculada: igual en server y cliente).
const BURST =
  'M50.0 6.0L59.3 12.1L72.9 6.3L75.9 20.8L90.2 22.3L86.5 36.2L94.8 44.6L88.7 54.7L96.5 67.6L82.1 72.2L81.9 86.0L68.1 84.5L61.0 94.8L50.0 89.0L38.0 98.5L31.9 84.5L18.7 85.3L17.9 72.2L5.9 66.7L11.3 54.7L0.4 44.0L13.5 36.2L12.0 23.7L24.1 20.8L27.7 7.5L40.7 12.1Z'

export function Starburst({
  lines,
  fill = 'var(--color-pink)',
  size = 12.5,
  heart = false,
  className,
}: {
  lines: string[]
  fill?: string
  size?: number
  heart?: boolean
  className?: string
}) {
  const lh = size * 1.02
  const rows = lines.length + (heart ? 0.8 : 0)
  const y0 = 50 - ((rows - 1) * lh) / 2 + size * 0.36
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" data-loop>
      <path d={BURST} fill={fill} className="burst-spin" />
      <text textAnchor="middle" fontSize={size} fontWeight={900} fill="var(--color-ink)" className="font-display uppercase">
        {lines.map((l, i) => (
          <tspan key={l} x="50" y={y0 + i * lh}>
            {l}
          </tspan>
        ))}
      </text>
      {heart && (
        <path
          transform={`translate(44 ${y0 + (lines.length - 0.55) * lh}) scale(0.3)`}
          d="M20.5 31C9.5 23 3.5 16.5 5.2 9.8 6.8 3.6 14.8 2.8 19.6 9.6 23.4 2.6 32.4 2.4 34.6 8.6 37 15.4 31 22.6 19.4 30.4"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth={9}
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export function YumBadge({ className, ...rest }: { className?: string; 'data-pop'?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" {...rest}>
      <circle cx="50" cy="50" r="48" fill="var(--color-pink)" />
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontSize="28"
        fontWeight={900}
        fill="var(--color-coral)"
        transform="rotate(-14 50 50)"
        className="font-display"
      >
        YUM!
      </text>
    </svg>
  )
}
