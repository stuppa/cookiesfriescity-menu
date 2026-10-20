// Datos del negocio. ⚑ Todo lo marcado es placeholder: cámbialo por lo real.

const whatsappNumber = '520000000000' // ⚑ 52 + número a 10 dígitos, sin espacios
const landingUrl = '/' // ⚑ URL del landing (Inicio / Nosotros)

const wa = (text: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`

export const site = {
  name: 'Cookie Fries City',
  tagline: ['Galletas', 'Café', 'Snacks', 'Buenos Momentos'],
  orderUrl: wa('¡Hola! Quiero hacer un pedido 🍪'),
  whatsappUrl: wa('¡Hola! Tengo un craving 🍪'),
  address: ['Av. 5 de Mayo 123,', 'Col. Centro', 'Córdoba, Ver. (Ejemplo)'], // ⚑
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+5+de+Mayo+123+Centro+C%C3%B3rdoba+Veracruz', // ⚑
  aboutUrl: landingUrl,
  socials: [
    { name: 'Instagram', href: 'https://www.instagram.com/' }, // ⚑
    { name: 'TikTok', href: 'https://www.tiktok.com/' }, // ⚑
    { name: 'Facebook', href: 'https://www.facebook.com/' }, // ⚑
  ],
  nav: [
    { label: 'Inicio', href: landingUrl },
    { label: 'Menú', href: '#menu', current: true },
    { label: 'Nosotros', href: `${landingUrl}#nosotros` },
    { label: 'Ubicación', href: '#visitanos' },
    { label: 'Contacto', href: '#contacto' },
  ],
  /** ⚑ Fotos de redes (placeholders en public/images). En mobile se muestran las 4 primeras. */
  socialPhotos: [
    { src: '/images/redes-1.webp', alt: 'Cookie fries en vasos con galletas red velvet' },
    { src: '/images/redes-2.webp', alt: 'Lattes fríos Cookie Fries' },
    { src: '/images/redes-3.webp', alt: 'Snack con caramelo en caja Cookie Fries' },
    { src: '/images/redes-4.webp', alt: 'Letrero de neón de la mascota Cookie Fries' },
    { src: '/images/redes-5.webp', alt: 'Bebida en el interior del café' },
  ],
}
