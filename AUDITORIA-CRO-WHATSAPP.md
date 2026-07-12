# Auditoría CRO / UX / Embudo WhatsApp — RECAMBIA

**Fecha:** 2026-07-12 · **Rol:** consultoría UX/UI + CRO + psicología del consumidor + SEO + rendimiento
**Objetivo del negocio:** convertir tráfico de pago (Meta/Google Ads) en conversaciones de WhatsApp. Escaparate sin checkout.
**Estado auditado:** versión actual del código (tras retirar precios/stock del escaparate, añadir sección Packs con GSAP, ProcessStrip, tracker fbclid→WhatsApp y sección "Conseguimos tu pieza").

---

## Tabla de auditoría

| # | Apartado | Problema detectado | Impacto | Recomendación concreta | Prioridad |
|---|----------|--------------------|---------|------------------------|-----------|
| 1 | Primera impresión | El teléfono visible en la barra superior es "600 00 00 00" y todos los `wa.me` apuntan a `34600000000` (placeholders en `site-config.ts`). Un placeholder visible grita "web no terminada" y el embudo entero muere en un chat inexistente. | **Alto** | Sustituir número real + Pixel ID antes de gastar 1€ en anuncios. Es 1 línea de config. | **Alta** |
| 2 | Primera impresión | Junto al CTA principal no hay ninguna señal de *cuándo* responderéis. En un embudo WhatsApp la objeción nº1 es "¿me contestará alguien o hablo al vacío?". El "<2h" existe pero enterrado en microcopy de cards. | **Alto** | Añadir bajo el buscador del hero y junto al botón flotante: "Te responde un recambista en menos de 2h (L–V 9:00–18:30)". Fuera de horario, mostrar "Te respondemos mañana a partir de las 9:00". | **Alta** |
| 3 | Primera impresión | El banner verde superior dice "**Compra** tu pieza y llévate asesoramiento GRATIS": el verbo "compra" contradice el modelo consulta-primero que ahora comunica el resto de la web, y enmarca el asesoramiento como regalo post-compra en vez de como el diferencial del servicio. | Medio | Reescribir: *"Te asesora un mecánico real por WhatsApp — incluido con tu pedido"*. Quitar el emoji 🔧 (el resto de la web usa iconografía SVG). | Media |
| 4 | Primera impresión | El H1 vende velocidad ("Tu pieza, mañana en tu puerta") pero el diferencial real y defendible es la atención humana. Si los anuncios venden "te atiende una persona", hay mismatch parcial de mensaje. | Medio | Mantener H1 si los anuncios venden entrega; si el ángulo del anuncio es "persona real", crear variante de hero por campaña (misma página, H1 dinámico por UTM ya que el Tracker ya lee `utm_campaign`). | Media |
| 5 | UX / Embudo | **Fricción matrícula-first:** el único camino visible en el hero exige escribir la matrícula… y la mayoría de la gente NO se sabe su matrícula de memoria (está en el coche). El usuario en el sofá con el móvil se bloquea en el paso 1. | **Alto** | Añadir bajo el buscador un escape visible: *"¿No tienes la matrícula a mano? Escríbenos igual →"* (link wa.me). Y en el mensaje prellenado sugerir alternativa: "…o mándanos una foto de la pieza o del permiso de circulación". | **Alta** |
| 6 | UX / Embudo | Nadie sabe cómo se llama su pieza ("el gomón ese que chirría"). La web nunca sugiere el atajo más potente del sector: **mandar una foto por WhatsApp**. | **Alto** | En Diagnóstico, ConseguimosPieza y el float: añadir "¿No sabes cómo se llama? Mándanos una foto y lo identificamos". Reduce a cero la barrera de vocabulario técnico. | **Alta** |
| 7 | UX | El buscador del hero simula una búsqueda (delay artificial de 800 ms + "Comprobando tu matrícula…") y después pide una segunda decisión (Ver piezas / WhatsApp). Teatro + doble clic en el punto más caliente de la página. | Medio | Eliminar el delay o reducirlo a ~300 ms; considerar que el botón primario tras la matrícula sea directamente WhatsApp (verde), con "ver piezas" como enlace secundario de texto. | Media |
| 8 | UX | Home de ~8.500 px con 3 bloques de confianza que se solapan (TrustStrip, MechanicAdvisory, "¿Por qué RECAMBIA?"). La repetición diluye y alarga el scroll hasta el footer. | Medio | Fusionar "¿Por qué RECAMBIA?" dentro de MechanicAdvisory o moverlo a Quiénes somos. Objetivo: home de 7 secciones máx. | Media |
| 9 | UX (móvil) | Varios CTA de WhatsApp miden 40 px de alto (mínimo táctil recomendado: 48 px). | Medio | Subir `py` de los botones verdes a 48px de alto efectivo. | Media |
| 10 | UX (desktop) | La sección Packs ancla el scroll ~1.300 px (scroll-jacking). Quien quiere pasar de largo tiene que "pagar" todo el recorrido horizontal. | Medio | Reducir la distancia de scrub (~40%) o desanclar cuando el usuario scrollea rápido. Vigilar el % de abandono en esa zona cuando haya analytics. | Media |
| 11 | UI | La tarjeta de categoría "Frenos" en la home sigue usando la foto con pinza **Brembo** (logo visible) mientras vendes TRW/Ferodo. Riesgo de política de marcas de Meta si acaba en creatividades + incoherencia. | Medio | Sustituir `frenos.png` por foto de estudio sin marca visible (misma estética que filtros/motor). | Media |
| 12 | UI | En "Piezas destacadas" conviven fotos de estudio (filtros, amortiguador) con iconos SVG planos (frenos tras retirar la foto Brembo). El carrusel se ve desequilibrado. | Medio | Generar foto de estudio neutra para frenos y para cualquier categoría que hoy caiga a icono. | Media |
| 13 | UI | Emojis (💬 🔧 ⚡) en pills del hero y banner promo, conviviendo con iconografía SVG cuidada en el resto. Resta acabado premium. | Bajo | Sustituir por los mismos SVG de TrustStrip. | Baja |
| 14 | CRO | En las cards del catálogo el único CTA es "Ver Ficha Técnica" (azul): añade un paso al embudo y el nombre es frío para B2C. El microcopy de WhatsApp está debajo, en gris 10px. | **Alto** | Doble CTA en card: botón verde primario "Consultar por WhatsApp" (mensaje con pieza+matrícula, ya existe el builder) y enlace secundario "Ver detalles". Renombrar "Ver Ficha Técnica"→"Ver detalles". | **Alta** |
| 15 | CRO | No existe ningún evento de embudo salvo `Contact` (clic WA). No se mide: matrícula escrita, vista de ficha, vista de packs. Sin esto no se puede optimizar nada de lo anterior. | Medio | Con el píxel real: `fbq('track','ViewContent')` en ficha, evento custom `PlateEntered`, `Lead` diferenciado del float vs ficha. | Media |
| 16 | Psicología | **Cero prueba social en toda la web.** Ni una reseña, testimonio, foto real del equipo, caso resuelto. Todo el trust es autodeclarado ("somos 4 expertos") y además la página Quiénes somos admite "fase de lanzamiento". | **Alto** | Corto plazo: 2-3 capturas reales (anonimizadas) de chats resolviendo casos + foto real del equipo/almacén (la ilustración del equipo actual es abstracta). Medio plazo: pedir reseña Google a cada pedido entregado y embeber las 5 primeras. | **Alta** |
| 17 | Psicología | Las garantías correctas existen (14 días, garantía legal 3 años, "no pagas hasta confirmar") pero viven en `/envios`; en la **ficha de producto** —donde se decide— tras retirar el bloque de precio no queda ni envío ni garantía. | **Alto** | Mini-fila de 3 iconos bajo el CTA de la ficha: "Entrega 24h península · Devolución 14 días · Garantía 3 años". Un solo componente, reutilizable. | **Alta** |
| 18 | Psicología | Objeción "¿cómo pago si no hay carrito?" resuelta solo de pasada ("Stripe" en HowItWorks — jerga que el público general no conoce). | Medio | En ProcessStrip paso 3 y en la ficha: "Pagas con tarjeta mediante enlace seguro — nunca por adelantado". Mostrar iconos Visa/MC ahí, no solo en el footer. | Media |
| 19 | Psicología | El FAQ (7 preguntas, bien escritas) existe en `/ayuda` pero está enterrado en el footer. Las objeciones no se resuelven donde surgen. | Medio | Bloque acordeón de 4 FAQs en la home antes del footer (compatibilidad, pago, plazo, devolución) + enlace a /ayuda. | Media |
| 20 | Copywriting | HowItWorks paso 1: "Sin formularios, sin registro" — debajo de un formulario de matrícula. Paso 3 mezcla pago y entrega y usa "Stripe". | Medio | Paso 1: *"Sin cuentas, sin carritos: nos escribes y ya"*. Paso 3: *"Pagas con tarjeta por enlace seguro y lo recibes en 24h. Sin sorpresas."* | Media |
| 21 | Catálogo | "38 piezas encontradas" tras introducir matrícula sugiere que las 38 encajan en ESE coche (es el escaparate completo). El chip "¿Encaja en tu 1234 BCD?" mitiga pero el contador engaña. | Medio | Cambiar el contador cuando hay matrícula: "38 piezas en el escaparate — te confirmamos cuáles encajan en tu {matrícula}". | Media |
| 22 | Envíos | Métodos de pago: solo 2 iconos (Visa/MC) al fondo del footer. No hay una sección visual "Cómo pagas y recibes" que junte pago+envío+devolución. | Medio | Añadir a `/envios` (y resumen en ficha) un bloque de 4 pasos con iconos: Confirmas por WhatsApp → Link de pago seguro → Envío 24h → 14 días devolución. | Media |
| 23 | WhatsApp | El float es genérico: siempre el mismo mensaje esté donde esté el usuario. Si estoy viendo el kit de embrague y pulso el float, el mensaje no lo menciona. | Medio | El Tracker ya intercepta los clics `wa.me`: inyectar contexto de página (`pathname` → "Estoy viendo: Kit de embrague"). | Media |
| 24 | WhatsApp | Sin expectativa de respuesta ni fuera-de-horario. Un lead a las 23:00 que no recibe respuesta se enfría y no vuelve. | **Alto** | (a) Etiqueta junto al float con horario; (b) configurar autorespuesta de WhatsApp Business fuera de horario: "Somos personas, no bots 🙂 te contestamos mañana a las 9:00". Coherente con la marca. | **Alta** |
| 25 | SEO | El sitemap incluye URLs con query string (`/resultados?categoria=frenos`), señal débil/ignorable para Google, mientras que las páginas SEO reales (`/recambios/[marca]/[modelo]/[categoria]`) **no** están en el sitemap. | Medio | Sacar las query-URLs del sitemap y generar las rutas `/recambios/...` para las combinaciones marca/modelo/categoría con contenido. | Media |
| 26 | SEO | Sin `FAQPage` schema en /ayuda ni `Organization` schema global (JSON-LD `Product` ya está bien, sin offers falsos ✓). | Bajo | Añadir FAQPage a /ayuda y Organization (logo, sameAs redes cuando existan) al layout. | Baja |
| 27 | SEO local | No hay señal local alguna (sin dirección, sin GBP). Para "recambios + [ciudad]" no existís. | Medio | Cuando haya dirección fiscal: Google Business Profile + LocalBusiness schema + zona de reparto en /envios con nombres de ciudades. | Media |
| 28 | Rendimiento | `hero-poster.jpg` pesa **490 KB y es el LCP** de la página más importante. | **Alto** | Recomprimir a ≤150 KB (1920px, JPG q70 o WebP). Un solo archivo, impacto directo en LCP de todo el tráfico de pago. | **Alta** |
| 29 | Rendimiento | `b2b-workshop.png` (716 KB) se carga como background CSS en CounterNotes: sin lazy, sin next/image, para un fondo al 15% de opacidad. | Medio | Convertir a WebP ~60 KB o reemplazar por gradiente/patrón. | Media |
| 30 | Rendimiento | Dos librerías de animación conviven (framer-motion en 15+ componentes + GSAP en Packs). JS duplicado para el mismo trabajo. | Bajo | A medio plazo, migrar animaciones simples de entrada a CSS o unificar en una librería. No urgente. | Baja |
| 31 | Rendimiento | ~2,6 MB de imágenes muertas en `/public` (`hero-car.jpg`, `hero-car.png`, `hero-parts.png`, `ai-diagnosis.png`) sin referencias en el código. | Bajo | Borrarlas del repo. | Baja |
| 32 | Legal/Confianza | Privacidad y Condiciones muestran literalmente "[RAZÓN SOCIAL / NOMBre] … NIF [NIF] … [DIRECCIÓN]". El cliente que verifica antes de pagar lo ve. Además no hay banner RGPD y el píxel (cuando tenga ID real) lo exigirá. | **Alto** | Rellenar datos reales; añadir banner de consentimiento que gatee `fbq` (y gatear también la carga del script si el ID es placeholder); enlazar /legal/cookies en el footer. | **Alta** |

---

## Los 10 cambios que más aumentarían las conversiones

1. **Número de WhatsApp y Pixel ID reales** — sin esto la conversión es literalmente 0. Todo lo demás es multiplicar por cero.
2. **Escape "sin matrícula" en el hero** — "¿No tienes la matrícula a mano? Escríbenos igual →". Desbloquea al mayor segmento perdido.
3. **"Mándanos una foto de la pieza"** en Diagnóstico/float/ConseguimosPieza — elimina la barrera de no saber el nombre técnico.
4. **Prueba social real** — capturas de chats reales resolviendo casos + foto real del equipo; luego reseñas Google.
5. **Expectativa de respuesta visible + autorespuesta fuera de horario** — convierte "¿habrá alguien?" en certeza.
6. **CTA verde de WhatsApp en las cards del catálogo** (además de "Ver detalles") — acorta el embudo un paso entero.
7. **Bloque envío+devolución+garantía bajo el CTA de la ficha** — las 3 objeciones principales, en el punto de decisión.
8. **Poster del hero a ≤150 KB** — LCP de la página que paga todo el tráfico.
9. **Reescrituras de copy** — banner promo sin "Compra", HowItWorks sin "Stripe"/"sin formularios", "Ver Ficha Técnica"→"Ver detalles".
10. **Banner RGPD + gating del píxel** — habilita encender el tracking legalmente y sin ruido de consola.

## Los 10 errores más importantes encontrados

1. Placeholders de teléfono/WhatsApp visibles y funcionales en producción-candidata.
2. Cero prueba social en todo el sitio.
3. Datos legales sin rellenar (`[RAZÓN SOCIAL]`, `[NIF]`, `[DIRECCIÓN]`) visibles al público.
4. Embudo matrícula-first sin ruta alternativa visible.
5. LCP de 490 KB en la landing principal.
6. La ficha de producto quedó sin información de envío/garantía tras retirar el bloque de precio.
7. "Compra tu pieza…" en el banner cuando ya no se puede comprar en la web.
8. CTA primario del catálogo lleva a otra página, no a WhatsApp.
9. Foto con marca Brembo en la categoría Frenos (riesgo de política de anuncios + incoherencia).
10. Sitemap apuntando a URLs con query string en vez de a las páginas SEO reales.

## Plan de acción priorizado

**Fase 0 — Antes de encender campañas (½ día, bloqueante)**
1. `site-config.ts`: número WhatsApp + teléfono + Pixel ID reales.
2. Rellenar razón social/NIF/dirección en legales; enlazar /legal/cookies en footer.
3. Banner de consentimiento + gatear píxel.
4. Comprimir `hero-poster.jpg` (≤150 KB).
5. `npm run build` limpio de verificación.

**Fase 1 — Primera semana de campañas (1-2 días de trabajo)**
6. Escape "sin matrícula" + "mándanos una foto" (hero, float, Diagnóstico).
7. Etiqueta de horario de respuesta junto a float y CTAs + autorespuesta WhatsApp Business.
8. Doble CTA en cards del catálogo; renombrar "Ver Ficha Técnica".
9. Bloque envío/devolución/garantía en ficha.
10. Reescrituras de copy (banner, HowItWorks, contador de resultados).
11. Foto de estudio neutra para Frenos (home tile + card).

**Fase 2 — Semanas 2-3 (con datos entrando)**
12. Capturas de chats reales + foto del equipo; sistema de petición de reseñas Google post-entrega.
13. Eventos de embudo (ViewContent, PlateEntered, Lead por origen).
14. FAQ acordeón en home + FAQPage schema.
15. Sitemap: quitar query-URLs, añadir rutas /recambios/.
16. b2b-workshop.png → WebP; borrar imágenes muertas.

**Fase 3 — Optimización continua**
17. Variantes de hero por ángulo de anuncio (UTM).
18. A/B del flujo del buscador (delay/CTA directo).
19. Ajustar o retirar el pin de Packs según scroll-depth real.
20. Consolidar librerías de animación.

## Estimación cualitativa del potencial

- **Fase 0** no "mejora" la conversión: la **crea**. Hoy es 0% por el número placeholder. Es la diferencia entre tirar el presupuesto y tener línea base.
- **Fases 1** ataca las tres fricciones más caras del embudo (matrícula-first, ausencia de expectativa de respuesta, CTA indirecto en catálogo). En embudos WhatsApp similares, resolver estas fricciones suele mover la tasa de clic-a-conversación de forma **sustancial — orden de +30-60% relativo** sobre la línea base. No es una promesa: es el rango razonable si el tráfico está bien segmentado.
- **Fase 2 (prueba social real)** es el multiplicador de medio plazo: una web sin ninguna evidencia externa convierte estructuralmente peor por muy buen copy que tenga; las primeras 5-10 reseñas reales suelen ser el salto más visible en frío.
- Base sólida a favor: el diseño es profesional, el copy tiene voz propia y honesta, el flujo matrícula→WhatsApp con mensajes prellenados y atribución fbclid ya construido es mejor que el 90% de landings de este tipo. El trabajo restante es de **fricción y evidencia**, no de rediseño.
