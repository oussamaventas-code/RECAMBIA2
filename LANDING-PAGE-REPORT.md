# Auditoría Landing — RECAMBIA (web nueva)

**Fecha:** 2026-07-12 (re-auditoría tras correcciones, mismo día) · **Contexto:** destino de tráfico de pago Meta Ads → embudo WhatsApp sin checkout · **Entorno:** dev local (Next.js 15), escritorio + móvil 375px

## Nota de salud

```
Landing Page Health: 73/100 — Grado C+  (antes: 56 — D)

Message Match:    ███████░░░  75/100  (=)
Page Speed:       ███████░░░  70/100  (▲ +35)
Mobile:           ████████░░  85/100  (▲ +10)
Trust Signals:    ███████░░░  70/100  (▲ +15)
Form/CTA (WA):    ██████░░░░  60/100  (▲ +15)
```

**Con solo poner el número de WhatsApp y el Pixel ID reales, la web sube a ~B+ (85).** Toda la infraestructura ya está construida y verificada; lo que queda son dos valores de configuración y ajustes menores.

---

## ✅ Corregido y verificado en la re-auditoría

| Problema original | Estado | Verificación |
|---|---|---|
| Sin tracking (Pixel, fbclid, UTM) | ✅ Resuelto | `Tracker.tsx` captura `fbclid`/UTM en sessionStorage; probado en vivo: clic en WhatsApp dispara `fbq('track','Contact')` y añade `[ref: fb-IwAR1234]` al mensaje |
| Vídeo héroe de 23 MB | ✅ Resuelto | Ahora 8 MB + `poster` + `preload="metadata"`: la carga inicial solo transfiere ~30 KB de vídeo |
| PNGs de categoría de ~620 KB con `<img>` crudo | ✅ Resuelto | `next/image` en CategoryIndex, ProductCard y ficha: se sirven a 35–55 KB y con lazy load (verificado en red) |
| Contradicción devolución 14 vs 30 días | ✅ Resuelto | Unificado a "Devolución 14 días" en TrustStrip |
| Foto Brembo en producto TRW | ✅ Resuelto (productos) | `category-image.ts` mapea frenos → SVG neutro; la ficha y las cards ya no muestran la pinza Brembo |
| Título duplicado "· RECAMBIA · RECAMBIA" | ✅ Resuelto | Quitado el sufijo manual en `producto/[slug]` |
| CSS inválido en MechanicAdvisory | ✅ Resuelto | Ahora usa `color-mix()` |
| Filtros antes que productos en `/resultados` móvil | ✅ Resuelto | `flex-col-reverse`: productos primero; además la card muestra "¿Encaja en tu {matrícula}?" — refuerza el message match |

**Incidencia durante la revisión:** `/resultados` devolvía 404 por caché de dev corrupta (`.next`) tras las ediciones en caliente — no era un bug del código. Limpiada la caché y reiniciado el servidor, la ruta funciona. Si vuelve a pasar: borrar `.next` y relanzar.

---

## 🔴 Bloqueadores restantes (2 valores de configuración)

En `src/lib/site-config.ts` (el propio archivo ya lo avisa en su TODO):

1. **`WHATSAPP_NUMBER = "34600000000"`** — los 8+ CTAs siguen apuntando a un número inexistente. También `PHONE_DISPLAY`/`PHONE_TEL` (el "600 00 00 00" es visible en la barra superior).
2. **`META_PIXEL_ID = "PIXEL_ID_HERE"`** — el píxel se inicializa con ID inválido (la consola muestra `[Meta Pixel] - Invalid PixelID: null`).

## 🟠 Nuevos hallazgos (introducidos con los cambios)

1. **El píxel carga incondicionalmente aunque el ID sea placeholder.** Descarga `fbevents.js` (~100 KB) para nada y ensucia la consola. Gatear en `layout.tsx`: renderizar el `<Script>` solo si `META_PIXEL_ID` no es el placeholder.
2. **RGPD:** ahora que hay Meta Pixel, hace falta **banner de consentimiento** antes de disparar `PageView` (AEPD multa esto en España). Antes no había cookies y era coherente no tenerlo; ya no.
3. **`hero-poster.jpg` pesa 490 KB** — al ser la imagen LCP conviene dejarla en ~100–150 KB (JPG q70 o WebP).
4. **`Tracker.tsx` intercepta también ctrl/cmd+clic y clic central** — rompe "abrir en pestaña nueva". Añadir al inicio del handler: `if (e.ctrlKey || e.metaKey || e.button !== 0) return;`.

## 🟡 Pendientes menores (de la auditoría original)

- La foto Brembo (`frenos.png`) sigue en la tarjeta de **categoría** "Frenos" de la home — menos arriesgado que en un producto, pero si esa creatividad acaba en un anuncio, mejor sustituirla.
- Botones de WhatsApp a 40 px de alto (recomendado ≥48 px en móvil).
- Imágenes legacy pesadas en `public/images/` (`b2b-workshop.png` 716 KB como fondo CSS en CounterNotes, `hero-car.jpg` 748 KB, `ai-diagnosis.png` 631 KB) — comprimir o eliminar las no usadas.
- Sin reseñas reales ni datos fiscales/dirección en el footer.
- Copy: "Sin formularios, sin registro" convive con el formulario de matrícula.

## Checklist de lanzamiento (orden)

1. ☐ Número de WhatsApp Business real en `site-config.ts`
2. ☐ Pixel ID real + gatear el script si no hay ID
3. ☐ Banner de consentimiento (RGPD) antes del PageView
4. ☐ Comprimir `hero-poster.jpg` a <150 KB
5. ☐ Fix modificadores de teclado en `Tracker.tsx`
6. ☐ Sustituir foto Brembo de la categoría Frenos
7. ☐ `npm run build` limpio antes de desplegar (la caché de dev se corrompió durante las ediciones; el build de producción parte de cero)

## Lo que ya está bien (no tocar)

- Embudo matrícula→WhatsApp de un solo campo con mensajes prellenados, ahora **con atribución de campaña de punta a punta** (fbclid → sessionStorage → `[ref: …]` en el mensaje + evento `Contact`).
- Propuesta de valor clara y coherente ("persona real + asesoramiento + 24h") en toda la página; la card de resultados repite la matrícula del usuario.
- Carga inicial ligera: vídeo diferido con poster, imágenes optimizadas y lazy, sin third-parties salvo el píxel.
- SEO técnico correcto: robots (excluye `/presupuesto`), sitemap, OG/Twitter cards, títulos limpios.
