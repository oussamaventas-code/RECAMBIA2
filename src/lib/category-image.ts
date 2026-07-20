// Imagen por categoría, usada como imagen del producto cuando no hay
// foto real (product.images vacío).
const CATEGORY_IMAGES: Record<string, string> = {
  frenos: "/images/categorias/frenos.jpeg",
  filtros: "/images/categorias/filtros.jpeg",
  suspension: "/images/categorias/suspension.jpeg",
  motor: "/images/categorias/motor.jpeg",
  electrico: "/images/categorias/electrico.jpeg",
  transmision: "/images/categorias/transmision.jpeg",
  carroceria: "/images/categorias/carroceria.jpeg",
  climatizacion: "/images/categorias/climatizacion.jpeg",
  aceites: "/images/categorias/aceites.jpeg",
};

export function categoryImage(categorySlug: string): string | null {
  return CATEGORY_IMAGES[categorySlug] ?? null;
}
