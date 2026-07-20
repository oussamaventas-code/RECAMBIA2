export interface Testimonial {
  id: string;
  name: string;
  city: string;
  vehicle: string;
  comment: string;
  rating: number;
  image?: string;
  date: string;
}

// Vacío a propósito: no publicamos reseñas inventadas. En cuanto haya
// valoraciones REALES (Google Business, capturas de WhatsApp con permiso del
// cliente), se añaden aquí y la sección <Testimonials /> vuelve a aparecer sola.
export const testimonials: Testimonial[] = [];
