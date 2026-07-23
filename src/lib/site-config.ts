// Datos de negocio centralizados. Cuando lleguen el WhatsApp Business
// definitivo, la zona de reparto real y el horario, se actualizan aquí y
// se propagan a toda la web (Nav, Footer, Contacto, WhatsApp).

export const WHATSAPP_NUMBER = "34632334756";

// El ID del Píxel de Meta ya NO se pone aquí a mano: se lee de la variable
// de entorno NEXT_PUBLIC_META_PIXEL_ID (ver .env.example y MetaPixel.tsx).
// Sin esa variable, el píxel sencillamente no se carga — antes se
// inicializaba siempre con el placeholder "PIXEL_ID_HERE", que estaba roto,
// no ausente.

export const PHONE_DISPLAY = "632 33 47 56";
export const PHONE_TEL = "+34632334756";

// Correo de contacto general. OJO: dominio con x → recambiaX.es
export const EMAIL = "hola@recambiax.es";

// El horario y la promesa de respuesta viven en src/config/contacto.ts
// (HORARIO, horarioTexto, promesaRespuesta) — única fuente para toda la web.

// Compara contra la hora real de Madrid (no la del navegador del visitante,
// que puede estar en otro huso) para no prometer la respuesta rápida fuera
// de horario. Usa en-US solo para parsear el weekday en ASCII fijo
// (Mon..Sun); no se muestra.
export function isBusinessHours(date: Date = new Date()): boolean {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Madrid",
      hour12: false,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  const isWeekday = parts.weekday !== "Sat" && parts.weekday !== "Sun";
  const minutesOfDay = (Number(parts.hour) % 24) * 60 + Number(parts.minute);
  return isWeekday && minutesOfDay >= 9 * 60 && minutesOfDay < 18 * 60 + 30;
}

// Cookie que marca sesión iniciada en el creador interno de presupuestos.
export const ADMIN_COOKIE = "recambia_admin";

// Número de Bizum donde el cliente paga sus presupuestos. Configurable por
// entorno (BIZUM_PHONE): si se deja vacío, la ficha del presupuesto solo
// muestra la opción de pagar con tarjeta.
export function getBizumPhone(): string | null {
  const raw = process.env.BIZUM_PHONE;
  return raw && raw.trim() ? raw.trim() : null;
}

// Descuento por dejar el email (imán de leads). TODO cambiar aquí y se
// propaga a la portada, el popup y el WhatsApp. El código lo aplica el
// recambista a mano al montar el presupuesto (no hay carrito automático).
export const DISCOUNT = {
  code: "BIENVENIDA5",
  // Texto corto para titulares y texto largo para el cuerpo.
  short: "5% de descuento",
  long: "5% de descuento en tu primer pedido",
} as const;

// Identificación legal del vendedor (LSSI-CE art. 10 exige mostrarla en la
// web). Único sitio donde rellenar estos datos: se propagan a las 3 páginas
// legales y al footer. Mientras sigan entre corchetes, la web no puede
// lanzarse legalmente — no se deben inventar, hace falta el dato real.
export const LEGAL = {
  businessName: "[RAZÓN SOCIAL / NOMBRE]",
  nif: "[NIF]",
  address: "[DIRECCIÓN]",
} as const;
