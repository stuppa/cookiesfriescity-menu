// ⚑ Stickers aproximados (estrella y badge YUM!). Reemplázalos por los SVG oficiales si existen.

// Estrella de picos irregulares, determinista para que server y cliente rendericen igual.
function burst(points: number, outer: number, inner: number) {
  let d = ''
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 ? inner : outer * (0.88 + 0.12 * Math.abs(Math.sin(i * 7.3)))
    const a = (Math.PI * i) / points - Math.PI / 2
    d += `${i ? 'L' : 'M'}${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`
  }
  return `${d}Z`
}
const BURST = burst(13, 50, 39)

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
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d={BURST} fill={fill} />
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

export function YumBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
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
