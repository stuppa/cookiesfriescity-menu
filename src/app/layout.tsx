import type { Metadata, Viewport } from 'next'
import { Grandstander, Nunito_Sans, Shantell_Sans } from 'next/font/google'
import './globals.css'

// ⚑ Fuentes placeholder de Google Fonts. Para la fuente oficial de la marca usa
// next/font/local con el archivo oficial y conserva la misma `variable`.
const display = Grandstander({ subsets: ['latin'], variable: '--font-grandstander' })
const hand = Shantell_Sans({ subsets: ['latin'], weight: '700', variable: '--font-shantell', preload: false })
const body = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata: Metadata = {
  title: 'Menú | Cookie Fries City',
  description: 'Cookies, cafés, frappés y snacks en un solo lugar. Combina, disfruta, repite.',
}

export const viewport: Viewport = { themeColor: '#f7f4e5' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es-MX" className={`${display.variable} ${hand.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
