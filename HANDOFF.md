# HANDOFF — Web Estudio Minahk

## Qué es

Sitio **one-page estático** en HTML + CSS + JavaScript vanilla. **Sin frameworks, sin build, sin dependencias**: se abre haciendo doble click en `index.html` y se publica subiendo la carpeta a cualquier hosting.

## Estructura

```
index.html          → todo el contenido (textos, proyectos, datos de contacto)
css/styles.css      → sistema de diseño completo (colores, tipografía, secciones)
js/main.js          → animaciones y comportamiento (menú, reveals, count-up, filtros, form)
assets/             → logo original + versiones generadas (transparente y monograma K)
placeholders/       → imágenes provisorias (ver IMAGENES.md para reemplazarlas)
robots.txt          → SEO
sitemap.xml         → SEO (actualizar dominio)
```

## Cómo verlo

- **Local:** abrir `index.html` en el navegador, o `python3 -m http.server 8000` en la carpeta y entrar a `http://localhost:8000`.
- **Publicar:** subir la carpeta completa a Vercel (`vercel deploy`), Netlify, GitHub Pages o cualquier hosting estático. No requiere configuración.

## Cómo editar contenido

Todo el contenido está en `index.html`, en español y comentado por sección:

- **Titular del hero:** buscar `hero__title`. Hay 3 alternativas propuestas en un comentario HTML justo arriba.
- **Stats (30+ años, proyectos, m²):** buscar `js-count`. El número final se edita en `data-target="..."`; el sufijo (+) está en el HTML al lado.
- **Servicios:** cada bloque es un `<article class="service">`. Título, párrafo y lista de sub-servicios son texto plano.
- **Cita de Osvaldo:** buscar `blockquote class="quote"`.
- **Proyectos:** cada tarjeta es un `<a class="card">` dentro de `#grid`. Para agregar uno: duplicar una tarjeta, cambiar `data-cat` (`vivienda | comercial | turistico | instalacion`), la imagen y los textos.
- **Contacto:** email e Instagram aparecen en la sección contacto y en el footer.

## Cómo reemplazar imágenes

Ver **IMAGENES.md**: cada placeholder tiene dimensiones, descripción de la foto ideal y prompt de IA sugerido. Se reemplaza pisando el archivo en `/placeholders/` con el mismo nombre — no hay que tocar código.

## Qué falta / pendientes

1. **Backend del formulario** — hoy solo muestra confirmación visual. El punto de conexión está marcado con `TODO backend` en `js/main.js` (y en el HTML). Opciones simples: [Formspree](https://formspree.io) (cambiar el `action` del form) o Resend con un endpoint propio.
2. **Dominio final** — reemplazar `https://www.minahk.com.ar/` en: `index.html` (og:url y JSON-LD), `robots.txt` y `sitemap.xml`.
3. **Fotos reales** — reemplazar placeholders según IMAGENES.md.
4. **Datos reales** — email (`estudiominahk@gmail.com`), teléfono (`+54 381 418-9066`) y ciudad (San Miguel de Tucumán) ya están cargados; falta verificar los valores de las stats.
5. **OG image final** — armar `placeholders/og-image.jpg` con foto + logo cuando haya fotos reales.

## Notas técnicas

- Animaciones con IntersectionObserver y CSS puro; **todo respeta `prefers-reduced-motion`**.
- Tipografías: Archivo (variable, ancho expandido en títulos) + IBM Plex Mono, vía Google Fonts.
- El teal exacto extraído del logo es `#18A99F` (variable `--teal` en `css/styles.css`).
- `assets/logo-transparente.png` y `assets/logo-k.png` fueron generados desde el JPEG original quitando el fondo blanco (el original no se tocó).
