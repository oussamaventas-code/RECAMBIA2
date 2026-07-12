// Imagen por categoría, usada como imagen del producto cuando no hay
// foto real (product.images vacío). Prioriza las fotos de estudio (PNG)
// generadas para el escaparate.
const CATEGORY_IMAGES: Record<string, string> = {
  frenos: "/images/categorias/frenos.png",
  filtros: "/images/categorias/filtros.png",
  suspension: "/images/categorias/suspension.png",
  motor: "/images/categorias/motor.png",
  electrico: "/images/categorias/electrico.png",
  transmision: "/images/categorias/transmision.png",
  carroceria: "/images/categorias/carroceria.png",
  climatizacion: "/images/categorias/climatizacion.png",
  aceites: "/images/categorias/aceites.png",
};

export function categoryImage(categorySlug: string): string | null {
  return CATEGORY_IMAGES[categorySlug] ?? null;
}
