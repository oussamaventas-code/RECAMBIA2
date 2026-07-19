// Calculadora de precio "sexy" para presupuestos en directo.
//
// Contexto: al hablar con el cliente (teléfono/WhatsApp) consultamos nuestro
// coste real y, si hace falta, el precio aproximado al que se vende esa
// pieza online. Esta función propone un precio de venta competitivo pero con
// margen suficiente para cubrir logística y, sobre todo, el coste de
// adquisición de cliente (Meta Ads) — no solo el coste de la pieza.
//
// Regla: el precio sugerido es el MAYOR entre...
//   (a) el precio de mercado con un descuento por tramos (gancho fuerte en
//       piezas baratas, más discreto en piezas caras), y
//   (b) un margen mínimo garantizado sobre el coste (protege cuando el
//       mercado está muy barato o no tenemos referencia de mercado).
//
// Los tramos son de partida — ajústalos con datos reales de conversión y de
// coste por Meta Ads en cuanto tengáis un par de semanas de campaña.

export type PricingMethod =
  | "descuento-mercado"
  | "margen-minimo"
  | "margen-bajo"
  | "margen-defecto";

export interface PriceSuggestionInput {
  /** Lo que os cuesta la pieza a vosotros (sin IVA o con IVA, pero consistente siempre). */
  cost: number;
  /** Precio aproximado al que se vende esa pieza online (opcional). */
  marketPrice?: number;
}

export interface PriceSuggestionResult {
  price: number;
  method: PricingMethod;
  marginEuros: number;
  marginPercent: number;
  /** Descuento aplicado sobre el precio de mercado, si se ha usado esa referencia. */
  discountPercent?: number;
  /** true si el margen se ha tenido que sacrificar para no quedar por encima del mercado. */
  lowMargin?: boolean;
}

/** % de descuento sobre precio de mercado, según el tramo de precio. */
function marketDiscountRate(marketPrice: number): number {
  if (marketPrice <= 30) return 0.25;
  if (marketPrice <= 100) return 0.2;
  return 0.15;
}

/** Multiplicador mínimo sobre el coste, según el tramo de coste. */
function minMarginMultiplier(cost: number): number {
  if (cost <= 15) return 2.5;
  if (cost <= 60) return 2.2;
  return 1.9;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function suggestPrice({ cost, marketPrice }: PriceSuggestionInput): PriceSuggestionResult {
  if (!Number.isFinite(cost) || cost <= 0) {
    throw new Error("El coste debe ser un número mayor que 0.");
  }

  const minMarginPrice = round2(cost * minMarginMultiplier(cost));

  if (marketPrice && marketPrice > 0) {
    const discountRate = marketDiscountRate(marketPrice);
    const marketBasedPrice = round2(marketPrice * (1 - discountRate));
    // Nunca sugerir un precio igual o por encima del de mercado: si el margen
    // mínimo lo pidiera, el techo real es "un poco por debajo del mercado".
    const priceCeiling = round2(marketPrice * 0.95);

    let price: number;
    let method: PricingMethod;
    if (minMarginPrice <= marketBasedPrice) {
      // Hay margen de sobra: usamos el precio "gancho" con descuento por tramo.
      price = marketBasedPrice;
      method = "descuento-mercado";
    } else if (minMarginPrice <= priceCeiling) {
      // No llega al descuento ideal, pero se mantiene por debajo del mercado
      // con el margen protegido.
      price = minMarginPrice;
      method = "margen-minimo";
    } else {
      // El margen objetivo superaría el propio precio de mercado: pieza de
      // margen ajustado. Avisa para que se decida a mano (coste demasiado
      // alto para competir con margen sano en esta pieza).
      price = priceCeiling;
      method = "margen-bajo";
    }

    return {
      price,
      method,
      marginEuros: round2(price - cost),
      marginPercent: round1(((price - cost) / cost) * 100),
      discountPercent: method === "descuento-mercado" ? round1(discountRate * 100) : undefined,
      lowMargin: method === "margen-bajo",
    };
  }

  return {
    price: minMarginPrice,
    method: "margen-defecto",
    marginEuros: round2(minMarginPrice - cost),
    marginPercent: round1(((minMarginPrice - cost) / cost) * 100),
  };
}

export const PRICING_METHOD_LABEL: Record<PricingMethod, string> = {
  "descuento-mercado": "Descuento sobre precio de mercado",
  "margen-minimo": "Margen mínimo garantizado (el mercado estaba demasiado bajo)",
  "margen-bajo": "⚠ Margen ajustado: el coste deja poco margen frente al mercado",
  "margen-defecto": "Margen por defecto (sin referencia de mercado)",
};
