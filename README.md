# Menú digital · Cookie Fries City

Next.js 16 (App Router) · Tailwind CSS 4 · Motion · GSAP + ScrollTrigger · Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Qué editar

| Quiero cambiar… | Archivo |
|---|---|
| Precios, productos, sabores, dips, extras, paquetes | `src/data/menu.ts` |
| WhatsApp, dirección, Google Maps, redes, links del menú | `src/data/site.ts` |
| Fotos | `public/images/` (mismo nombre de archivo) |
| Mascota | `public/brand/mascota-*.svg` (cuerpo) + ojos en `src/components/brand/mascot.tsx` |
| Logo, stickers, doodles, iconos | `src/components/brand/` |
| Fuentes | `src/app/layout.tsx` |
| Colores | `src/app/globals.css` (`@theme`) |

Todo lo que es provisional está marcado con **⚑** en el código.

- **Precio:** cambia el número. `null` en un tamaño se muestra como "-".
- **Producto:** agrega un objeto al `items` de su categoría.
- **Fotos:** las actuales son recortes de los mocks (baja resolución). El hero va en dos capas con el mismo encuadre: `hero-bebidas.webp` (fondo) y `hero-galletas.webp` (galletas con fondo transparente).
- **Fuentes:** Grandstander (títulos) y Shantell Sans (notas a mano) son placeholders de Google Fonts. Para la oficial usa `next/font/local` con la misma `variable`. El texto corrido usa la fuente del sistema (cero descarga). Si prefieres otra, define `--font-sans` en `globals.css`.

## Animaciones

- `src/app/globals.css`: keyframes y reglas (solo `transform`/`opacity`), incluido el parallax con CSS scroll-driven animations (corre en el compositor, sin JS por frame). Monto por elemento: `data-parallax` + `[--parallax:6]` = ±6 %.
- `src/components/providers.tsx`: Lenis, anclas con offset, reveals al entrar en pantalla, pausa de loops fuera de pantalla y el respaldo del parallax con GSAP (solo se descarga en navegadores sin scroll-driven animations).
- Con `prefers-reduced-motion: reduce` no se oculta ni se mueve nada.

## Deploy

Vercel detecta Next.js sin configuración: `vercel` (preview) o `vercel --prod`.
