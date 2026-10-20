// Todo el contenido del menú. Los componentes solo leen de aquí.
// Precios en MXN, tomados del menú real (docs/mockups/menu-real.png).
// Para cambiar un precio edita el número; para agregar un producto agrega un objeto a `items`.

export type Tone = 'peach' | 'mint' | 'pink' | 'butter' | 'sky' | 'lilac'
export type CategoryId = 'cookies' | 'calientes' | 'frias' | 'frappes' | 'snacks' | 'bites' | 'helado'

/** `null` = ese tamaño no existe (se muestra "-"). */
export type Price = number | null

export type Extra = { name: string; extra?: number }

export type Item = {
  name: string
  /** Texto chico junto al nombre, ej. "(Fresa / Mango)". */
  detail?: string
  /** [chico, grande] en categorías con tamaños; [precio] en las demás. */
  prices: Price[]
  /** Variantes del producto, ej. sabores del rol de canela. */
  options?: Extra[]
  /** Aclaración que va debajo del producto. */
  note?: string
}

export type Category = {
  id: CategoryId
  /** Título de la tarjeta y del chip en desktop. */
  label: string
  /** Chip en mobile. */
  short: string
  tone: Tone
  /** Muestra columnas Ch / Gde. */
  sizes?: boolean
  items?: Item[]
  /** Nota destacada al final de la tarjeta. */
  footnote?: string
  /** Muestra la lista de toppings al final. */
  toppings?: boolean
  /** Texto manuscrito sobre la foto (\n = salto de línea). */
  tagline?: string
  /** ⚑ Placeholder: reemplaza el archivo en public/images por la foto real (mismo nombre). */
  photo?: { src: string; alt: string }
}

export const categories: Category[] = [
  { id: 'cookies', label: 'Cookies', short: 'Cookies', tone: 'peach' },
  {
    id: 'calientes',
    label: 'Bebidas Calientes',
    short: 'Calientes',
    tone: 'mint',
    sizes: true,
    tagline: 'Café\nde especialidad',
    photo: { src: '/images/latte-especialidad.webp', alt: 'Latte caliente con arte latte en vaso Cookie Fries' },
    items: [
      { name: 'Espresso', prices: [32, 38] },
      { name: 'Americano', prices: [35, 40] },
      { name: 'Capuccino', prices: [45, 50] },
      { name: 'Latte', prices: [45, 55] },
      { name: 'Vainilla Latte', prices: [50, 60] },
      { name: 'Biscoff Latte', prices: [null, 72] },
      { name: 'Lavanda Latte', prices: [55, 65] },
      { name: 'Chai Latte', prices: [55, 65] },
      { name: 'Dirty Chai Latte', prices: [65, 72] },
      { name: 'Matcha Latte', prices: [55, 65] },
      { name: 'Matcha Lavanda', prices: [60, 70] },
      { name: 'Taro Latte', prices: [55, 65] },
      { name: 'Chocolate', prices: [48, 55] },
    ],
  },
  {
    id: 'frias',
    label: 'Bebidas Frías',
    short: 'Frías',
    tone: 'pink',
    sizes: true,
    tagline: 'Drink\ngood\nmood',
    photo: { src: '/images/iced-matcha-cookie.webp', alt: 'Matcha latte frío con galleta encima' },
    items: [
      { name: 'Americano', prices: [40, 50] },
      { name: 'Latte', prices: [55, 60] },
      { name: 'Vainilla Latte', prices: [60, 65] },
      { name: 'Biscoff Latte', prices: [72, 82] },
      { name: 'Lavanda Latte', prices: [65, 70] },
      { name: 'Chai Latte', prices: [65, 72] },
      { name: 'Dirty Chai Latte', prices: [72, 78] },
      { name: 'Matcha Latte', prices: [65, 72] },
      { name: 'Matcha Lavanda', prices: [70, 75] },
      { name: 'Taro Latte', prices: [65, 72] },
      { name: 'Chocolate', prices: [55, 65] },
      { name: 'Tonic Espresso', prices: [60, null] },
      { name: 'Citrus Tonic Espresso', prices: [65, null] },
      { name: 'Dr. Pepper Espresso', prices: [65, 70] },
      { name: 'Refresher', detail: '(Fresa / Mango)', prices: [55, 65] },
    ],
  },
  {
    id: 'frappes',
    label: 'Frappés',
    short: 'Frappés',
    tone: 'butter',
    sizes: true,
    photo: { src: '/images/frappe-cookies-cream.webp', alt: 'Frappé de cookies & cream con crema batida' },
    items: [
      { name: 'Nutella', prices: [75, 80] },
      { name: 'Biscoff Caramel', prices: [75, 80] },
      { name: 'Taro', prices: [65, 70] },
      { name: 'Chai', prices: [65, 70] },
      { name: 'Matcha', prices: [65, 70] },
      { name: 'Cookies & Cream', prices: [65, 70] },
      { name: 'Café', prices: [65, 70] },
    ],
  },
  {
    id: 'snacks',
    label: 'Snacks',
    short: 'Snacks',
    tone: 'sky',
    tagline: 'Pequeños\nvicios,\ngrandes\nmomentos',
    footnote: '¡Pide tus papas con queso!',
    photo: { src: '/images/rol-canela-caramelo.webp', alt: 'Roles de canela bañados en caramelo' },
    items: [
      { name: 'Papas a la Francesa', prices: [55] },
      { name: 'Papas Gajo', prices: [60] },
      {
        name: 'Rol de Canela',
        prices: [60],
        options: [{ name: 'Nutella' }, { name: 'Ferrero', extra: 10 }, { name: 'Biscoff', extra: 10 }],
      },
      { name: 'Pizza Rol', prices: [65] },
    ],
  },
  {
    id: 'bites',
    label: 'Bites',
    short: 'Bites',
    tone: 'lilac',
    tagline: 'Bocados\nde felicidad',
    footnote: 'Incluye 1 bola de helado, topping de tu elección y ½ cookie de decoración.',
    toppings: true,
    photo: { src: '/images/bites-brownie-cheesecake.webp', alt: 'Bites de brownie con cheesecake apilados' },
    items: [
      { name: 'Brownie Bites', prices: [65] },
      { name: 'Cheesecake Bites', prices: [65] },
      { name: 'Mix Bites', detail: '(brownie/cheesecake)', prices: [65] },
      { name: 'Mostachón', prices: [70] },
    ],
  },
  {
    id: 'helado',
    label: 'Helado',
    short: 'Helado',
    tone: 'mint',
    tagline: 'El\nfinal\nperfecto',
    toppings: true,
    photo: { src: '/images/helado-vainilla-caramelo.webp', alt: 'Helado de vainilla con caramelo en vaso Cookie Fries' },
    items: [
      { name: 'Helado de Vainilla', prices: [48] },
      {
        name: 'Helado de Chocolate',
        prices: [48],
        note: 'Incluye 2 bolas, topping de tu elección y ½ cookie de decoración.',
      },
      { name: 'Affogato', prices: [60] },
    ],
  },
]

export const cookieBox = {
  price: 65,
  cookies: 6,
  dips: 1,
  combine: 2,
  flavors: ['Chispas Choco', 'Brownie', 'Red Velvet', 'Cinnamon Roll', 'Pay de Limón'],
}

export const dips = {
  extraPrice: 12,
  items: [
    { name: 'Nutella' },
    { name: 'Biscoff', extra: 10 },
    { name: 'Cream Cheese' },
    { name: 'Lechera' },
    { name: 'Dulce de Leche' },
    { name: 'Peanut Butter' },
  ] satisfies Extra[],
}

export const cookieSingle = 12

export const packages = {
  price: 280,
  includes: [{ text: '4 cajitas de galletas' }, { text: '4 dips' }, { text: '¡Decora con stickers!', detail: '(10pz)' }],
}

export const toppings: Extra[] = [
  { name: 'Nutella' },
  { name: 'Lechera' },
  { name: 'Dulce de leche' },
  { name: 'Peanut butter' },
  { name: 'Biscoff', extra: 10 },
]

export const extras = [
  { name: 'Leche vegetal', price: 8, addon: true },
  { name: 'Vainilla sugar free', price: 8, addon: true },
  { name: 'Botella de agua', price: 15 },
  { name: 'Bola helado', price: 20 },
]

export const mxn = (n: number) => `$${n}`
export const plus = (n: number) => `+$${n}`
export const category = (id: CategoryId) => categories.find((c) => c.id === id)!
