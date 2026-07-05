# DECISIONS — decisiones de diseño y técnicas

## Stack: HTML + CSS + JS vanilla (sin framework)

El brief original pedía Next.js, pero a pedido explícito del cliente se cambió a **HTML estático puro**. Consecuencias positivas: cero build, cero dependencias, hosting trivial, y edición de contenido directa en el HTML. Lo que se pierde (rutas de proyectos individuales generadas, next/image) se puede recuperar más adelante si el sitio crece; la estructura de secciones y datos está pensada para migrar fácil.

- **Sin Lenis:** el smooth scroll usa `scroll-behavior: smooth` nativo + `scroll-padding-top` para las anclas. Evita una dependencia por CDN y respeta `prefers-reduced-motion` gratis.
- **Sin Framer Motion:** las animaciones se resuelven con IntersectionObserver + transiciones CSS. Para un one-page esto cubre reveals, stagger, count-up y filtros sin costo de librería.

## Identidad visual

- **Teal `#18A99F`:** extraído por muestreo directo de píxeles del logo (el brief estimaba `#17A398`; el valor real del archivo es levemente más luminoso). El teal oscuro `#0E7A72` del brief se mantuvo para hovers y textos sobre claro (mejor contraste AA que el teal principal).
- **La diagonal de la K como motivo:** aparece en (1) los guiones de los eyebrows y bullets (`skewX(-32deg)`, el ángulo aproximado de la K), (2) los `clip-path` con esquina cortada de imágenes, botones y formulario, (3) el subrayado del nav en hover, (4) el fondo diagonal del footer y (5) los rombos de la timeline. Es sutil y sistemático, no literal.
- **Logo intocado:** el JPEG original se conserva en `assets/`. Se generaron por script (removiendo el matte blanco píxel a píxel, sin redibujar): `logo-transparente.png` (completo, para el footer/OG) y `logo-k.png` (solo el monograma, para nav y favicon).

## Tipografía

- **Archivo (variable, ejes wdth+wght):** una sola familia cubre display y cuerpo. Los títulos usan `font-stretch` 112–125% (el registro "Archivo Expanded" que pedía el brief) con pesos 700–800; el cuerpo usa ancho normal. Menos requests, sistema más cohesivo.
- **IBM Plex Mono** para eyebrows, cifras, etiquetas y botones: aporta el registro técnico/ingenieril que diferencia al estudio (instalaciones, mediciones) del estudio de arquitectura genérico.

## Layout y ritmo

- **Alternancia claro/oscuro:** Hero (oscuro) → Estudio (claro) → Servicios (claro) → Sustentabilidad (dark) → Proyectos (claro) → Proceso (dark) → Contacto (claro con form dark) → Footer (dark). El teal es solo acento, nunca fondo masivo.
- **Servicios como acordeón vertical** (uno abierto a la vez, el primero abierto por defecto): da a cada línea de servicio una fila protagónica con imagen propia, funciona igual de bien en mobile y evita el patrón de "tres cards". La animación usa `grid-template-rows: 0fr → 1fr`, que anima altura sin hacks de max-height.
- **Instalaciones con jerarquía propia:** su título lleva "gas · pluviales" en teal y el copy nombra explícitamente shoppings, dirección técnica y habilitaciones — es el diferencial B2B.
- **Stats con count-up** y **"30+" gigante outline en el hero** como recurso de números grandes.
- **Grilla de proyectos 4:5** con hover de zoom + subrayado teal; los filtros ocultan tarjetas con fade/scale (transición CSS; suficiente sin FLIP para 6 items).

## Accesibilidad y SEO

- `prefers-reduced-motion` desactiva parallax, word-reveal, count-up (muestra el valor final) y reveals (todo visible).
- Acordeón con `aria-expanded`, menú móvil con `aria-hidden`/`aria-expanded` y cierre con Escape.
- Contraste: textos grises sobre oscuro usan `#9B9C9E`+ (AA en tamaños usados); links teal sobre claro usan el teal oscuro.
- JSON-LD `ArchitecturalService` con founder y `sameAs` a Instagram; OG tags; sitemap y robots con TODO de dominio.

## Placeholders

Se generaron JPEGs reales (gradientes oscuros con el motivo diagonal y grano sutil) en vez de SVG, para que el reemplazo por fotos sea pisar el archivo `.jpg` con el mismo nombre sin tocar HTML. Guía completa con prompts de IA en `IMAGENES.md`.
