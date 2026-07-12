# Re-auditoría CRO / UX / Embudo WhatsApp — RECAMBIA (v2)

**Fecha:** 2026-07-12 (2ª pasada, tras commit 69cf441) · **Objetivo:** convertir tráfico de pago en conversaciones de WhatsApp
**Método:** revisión de código + navegación real (escritorio 1280px y móvil 375px) con medición de red y consola.

## Nota de salud

```
Landing Page Health: 70/100 — Grado C  (auditoría v1 inicial: 56 · tras primeras correcciones: 73)

Message Match:    ███████░░░  70/100  (▼ -2: promesa 24h vs "Servicio 48H")
Page Speed:       ███████░░░  68/100  (▼ -2: home más larga; poster LCP sigue a 490KB)
Mobile:           ████████░░  82/100  (▼ -3: home de 15.200px en móvil)
Trust:            ███████░░░  68/100  (▼ -2: vuelve Brembo, enlaces de marcas rotos; ▲ logos pago, Murcia)
CTA/Embudo:       ██████░░░░  60/100  (=)
```

La nota baja ligeramente respecto a la última revisión: el commit añade cosas buenas (fotos de packs, señal local de Murcia, logos de pago, cabeceras de seguridad) pero **reintroduce dos problemas ya corregidos** y añade un bug funcional nuevo. Los bloqueadores de lanzamiento siguen intactos.

---

## ✅ Mejoras confirmadas en esta versión

| Mejora | Verificación |
|---|---|
| Packs con fotos de estudio profesionales | Visto en vivo; servidas por next/image optimizadas y lazy |
| Fotos de estudio para carrocería/climatización/aceites (grid de categorías 100% fotográfico) | 22-35 KB optimizadas por next/image |
| Logos de pago vectoriales (Visa, MC, Apple Pay, Google Pay) en footer | Renderizan bien |
| Cabeceras de seguridad HTTP (nosniff, X-Frame-Options, HSTS, Referrer-Policy) | `next.config.ts` |
| **Primera señal local: "Reparto propio en Murcia"** en la nueva sección de envíos | Renderiza bien en desktop y móvil |
| Carrusel de productos destacados retirado de la home (menos e-commerce falso) | Confirmado en page.tsx |
| No hay scroll horizontal real en móvil (verificado: `scrollTo(500,·)` → scrollX 0) | El overflow que reporta el DOM es del carril deslizable, benigno |

---

## Tabla de hallazgos activos

**Estado:** 🆕 nuevo en esta versión · 🔁 regresión (estaba corregido y ha vuelto) · ⏳ pendiente de la auditoría anterior

| # | Estado | Apartado | Problema | Impacto | Recomendación | Prioridad |
|---|--------|----------|----------|---------|---------------|-----------|
| 1 | ⏳ | Bloqueador | `WHATSAPP_NUMBER`, `META_PIXEL_ID`, teléfono visible "600 00 00 00": todo placeholder. Consola: `Invalid PixelID: null` | **Alto** | Rellenar `site-config.ts` antes de encender campañas | **Alta** |
| 2 | ⏳ | Bloqueador | Legales con "[RAZÓN SOCIAL] / [NIF] / [DIRECCIÓN]" visibles; sin banner RGPD con píxel presente | **Alto** | Rellenar + banner de consentimiento que gatee `fbq` | **Alta** |
| 3 | 🆕 | UX / funcional | **Los 12 tiles de "Marcas que trabajamos" enlazan a `/resultados?marca=X` y ese parámetro no existe**: verificado en vivo, `?marca=bosch` muestra las 38 piezas con "Todas las marcas" activo. 12 enlaces rotos funcionalmente en la home | **Alto** | Leer `marca` en `resultados/page.tsx` y pasarla a `ResultsView` como `initialBrand` (espejo exacto de `initialCategory`, ~6 líneas) | **Alta** |
| 4 | 🔁 | Confianza/Riesgo | **La foto Brembo ha vuelto**: `category-image.ts` mapea de nuevo frenos→`frenos.png` (pinza con logo Brembo). Aparece en la ficha del disco TRW (verificado en vivo), en las cards de frenos y como primera imagen del grid de la home | Medio-Alto | Regenerar `frenos.png` sin marca visible (como las nuevas de carrocería/climatización) y reemplazar el archivo — así se arregla en los 3 sitios a la vez | **Alta** |
| 5 | 🆕 | Copy/Coherencia | "Ver **catálogo** completo" (BrandIndex) reintroduce la palabra que se decidió eliminar ("esto es un escaparate"). Además "Solo distribuimos **recambio original**…" choca con ConseguimosPieza ("las piezas exclusivas de origen no las conseguimos") | Medio | "Ver todas las piezas"; y "Solo primeras marcas del mercado de recambio (Bosch, TRW, Valeo…)" | Media |
| 6 | 🆕 | Coherencia | La nueva sección de envíos dice "Servicio 24H / **48H**" mientras hero ("mañana en tu puerta"), TrustStrip ("Envío 24h") y HowItWorks ("Recíbelo en 24h") prometen 24h a secas. ¿Cuál es la promesa? | Medio | Unificar: "24h si está en stock, 48h si lo traemos del proveedor" — y decirlo igual en todas partes | Media |
| 7 | 🆕 | UX | La home ya son **12 secciones (~15.200 px en móvil)**: se añadieron BrandIndex y DeliveryServices sin quitar nada. Tres bloques hablan de entrega (TrustStrip, DeliveryServices, WorkshopMap) y tres de confianza. El footer queda a 15 pantallas del hero | Medio | Fusionar DeliveryServices con WorkshopMap ("dónde y cómo te lo llevamos"); mover BrandIndex a /resultados o convertirlo en una franja de logos de una línea | Media |
| 8 | ⏳ | Embudo | Fricción matrícula-first sin escape: nadie se sabe la matrícula de memoria | **Alto** | "¿No tienes la matrícula a mano? Escríbenos igual →" bajo el buscador | **Alta** |
| 9 | ⏳ | Embudo | La web nunca sugiere **mandar una foto de la pieza** (el atajo nº1 del sector para quien no sabe el nombre técnico) | **Alto** | Añadirlo a Diagnóstico, ConseguimosPieza y mensaje del float | **Alta** |
| 10 | ⏳ | Psicología | **Cero prueba social** (ni reseñas, ni testimonios, ni fotos reales del equipo) y Quiénes Somos declara "fase de lanzamiento" | **Alto** | Capturas reales de chats + foto real del equipo; luego primeras reseñas Google | **Alta** |
| 11 | ⏳ | Psicología | Sin expectativa de respuesta junto a los CTA ("¿me contestará alguien?") ni gestión de fuera-de-horario | **Alto** | "Te responde un recambista en <2h (L–V 9:00–18:30)" junto a float y hero + autorespuesta WhatsApp Business | **Alta** |
| 12 | ⏳ | CRO | Cards del catálogo: único CTA "Ver Ficha Técnica" (frío, añade un paso); el WhatsApp va en microcopy gris | **Alto** | Doble CTA: verde "Consultar por WhatsApp" + enlace "Ver detalles" | **Alta** |
| 13 | ⏳ | Psicología | La ficha de producto sigue sin envío/devolución/garantía junto al CTA (se retiraron con el bloque de precio) | **Alto** | Mini-fila: "Entrega 24h · Devolución 14 días · Garantía 3 años" bajo el botón | **Alta** |
| 14 | ⏳ | Rendimiento | `hero-poster.jpg` **490 KB y es el LCP** — se commiteó sin comprimir | **Alto** | Recomprimir ≤150 KB (un archivo, afecta a todo el tráfico de pago) | **Alta** |
| 15 | ⏳ | Rendimiento | `b2b-workshop.png` 716 KB como background CSS sin optimizar (fondo al 15% de opacidad) | Medio | WebP ~60 KB o gradiente | Media |
| 16 | 🆕 | Rendimiento | 4 PNGs de packs nuevos de ~700 KB cada uno en `/public` (~2,8 MB fuente). next/image los sirve optimizados, pero cualquier uso futuro fuera de next/image pagará el precio completo | Bajo | Exportar a ~200 KB de origen; no urgente | Baja |
| 17 | 🆕 | Código | Comentarios de asistente IA olvidados y commiteados en `Packs.tsx:14-15` ("// ... [we need to keep imports untouched] ... I will only replace the specific lines needed") | Bajo | Borrarlos | Baja |
| 18 | ⏳ | Copy | Banner verde "**Compra** tu pieza…" (ya no se compra en la web); HowItWorks "Sin formularios" bajo un formulario y "Stripe" (jerga) | Medio | *"Te asesora un mecánico real por WhatsApp — incluido con tu pedido"* / *"Pagas con tarjeta por enlace seguro"* | Media |
| 19 | ⏳ | Catálogo | "38 piezas encontradas" tras meter matrícula sugiere que las 38 encajan en ese coche | Medio | "38 piezas en el escaparate — te confirmamos cuáles encajan en tu {matrícula}" | Media |
| 20 | ⏳ | Psicología | FAQ buena pero enterrada en el footer; objeciones sin resolver donde surgen | Medio | Acordeón de 4 FAQs en la home antes del footer | Media |
| 21 | ⏳ | WhatsApp | Float genérico sin contexto de página; sin etiqueta de horario | Medio | Tracker ya intercepta clics: inyectar "Estoy viendo: {página}" + etiqueta de horario | Media |
| 22 | ⏳ | SEO | Sitemap con URLs query (`?categoria=`) y sin las páginas SEO `/recambios/[marca]/[modelo]/[categoria]` | Medio | Intercambiarlas | Media |
| 23 | 🆕 | SEO local | "Reparto propio en Murcia" es la primera señal local — pero solo vive en la home. Ni /envios, ni Contacto, ni schema la recogen | Medio | Replicar en /envios y Contacto; cuando haya dirección: Google Business Profile + `LocalBusiness` (areaServed: Región de Murcia) — hay hueco SEO en "recambios coche Murcia" | Media |
| 24 | ⏳ | UX móvil | CTAs de WhatsApp a 40 px de alto (mínimo táctil 48 px) | Medio | Subir padding | Media |
| 25 | ⏳ | UX desktop | El pin GSAP de Packs retiene ~1.300 px de scroll | Medio | Reducir distancia ~40%; medir abandono cuando haya analytics | Media |
| 26 | ⏳ | CRO | Sin eventos de embudo (solo `Contact`): ni ViewContent, ni matrícula escrita, ni origen del clic | Medio | Añadir con el píxel real | Media |
| 27 | ⏳ | UI | Emojis (💬🔧⚡) mezclados con iconografía SVG | Bajo | Sustituir por SVG | Baja |
| 28 | ⏳ | Rendimiento | ~2,6 MB de imágenes muertas en /public (hero-car×2, ai-diagnosis, hero-parts) | Bajo | Borrar | Baja |
| 29 | ⏳ | Código | framer-motion + GSAP conviven (JS duplicado de animación) | Bajo | Unificar a medio plazo | Baja |

---

## Los 10 cambios que más aumentarían las conversiones (orden)

1. **Config real** (nº WhatsApp + Pixel ID + teléfono) — sin esto todo lo demás multiplica por cero.
2. **Arreglar los 12 enlaces de marca rotos** — o filtran o se quitan; ahora prometen y no cumplen.
3. **Escape "sin matrícula" + "mándanos una foto de la pieza"** — las dos fricciones más caras del embudo.
4. **Prueba social real** (capturas de chats + foto del equipo; luego reseñas Google).
5. **Expectativa de respuesta** junto a los CTA + autorespuesta fuera de horario.
6. **CTA verde de WhatsApp en las cards** del catálogo.
7. **Poster del hero ≤150 KB** (LCP de la landing que paga todo el tráfico).
8. **Quitar la foto Brembo otra vez** (ficha TRW + primera imagen de la home).
9. **Garantías/envío en la ficha** bajo el botón de consulta.
10. **Unificar la promesa de entrega** (24h vs 48h) en todas las secciones.

## Los 10 errores más importantes

1. Placeholders funcionales (WhatsApp/teléfono/píxel). 2. 12 enlaces de marca que no hacen nada (nuevo). 3. Cero prueba social. 4. Legales sin rellenar + sin RGPD. 5. Foto Brembo reintroducida (regresión). 6. LCP de 490 KB. 7. Matrícula-first sin alternativa. 8. Home de 12 secciones/15.200px móvil con solapes. 9. Ficha sin envío/garantía. 10. Promesa de entrega inconsistente (24H/48H vs "mañana").

## Plan de acción priorizado

**Fase 0 — antes de campañas (½ día):** config real → legales + banner RGPD → poster ≤150 KB → `npm run build` limpio.
**Fase 1 — misma semana (1-2 días):** fix parámetro `marca` → frenos.png sin marca → escape sin matrícula + foto de pieza → horario de respuesta + autorespuesta → doble CTA en cards → garantías en ficha → unificar 24/48h → copys (banner, HowItWorks, "catálogo completo").
**Fase 2 — semanas 2-3:** prueba social real → eventos de embudo → FAQ en home → sitemap /recambios/ → SEO local Murcia (envios, contacto, GBP, schema) → b2b-workshop a WebP → fusionar secciones de entrega.
**Fase 3 — continua:** heros por UTM, A/B buscador, pin de Packs según scroll-depth, unificar animaciones, limpiar código (comentarios IA, imágenes muertas).

## Estimación cualitativa

Igual que en la v1 con un matiz: la base visual ha mejorado (packs y categorías 100% fotográficas dan aspecto de tienda seria) pero **el embudo no ha avanzado nada** — los 5 hallazgos de impacto Alto de la auditoría anterior siguen todos abiertos y se ha añadido uno nuevo (enlaces de marca). Resolver Fase 0 crea la línea base (hoy la conversión real es 0 por el número placeholder); Fase 1 ataca fricción y coherencia con un potencial razonable de **+30-60% relativo** sobre esa línea base; la prueba social (Fase 2) sigue siendo el multiplicador estructural pendiente más importante.
