// Precio orientativo para piezas del escaparate (data/products.ts). El precio
// final SIEMPRE se confirma por WhatsApp una vez verificada la compatibilidad
// con la matrícula del cliente — este componente solo ancla una referencia
// para que el usuario no tenga que abrir una conversación a ciegas.
const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });

interface PriceHintProps {
  price: number;
  compareAtPrice?: number;
  /** "sm" para tarjetas de listado, "md" para la ficha de producto. */
  size?: "sm" | "md";
  className?: string;
}

export function PriceHint({ price, compareAtPrice, size = "sm", className = "" }: PriceHintProps) {
  const hasDiscount = typeof compareAtPrice === "number" && compareAtPrice > price;

  return (
    <div className={className}>
      <div className="flex items-baseline gap-2">
        <span
          className={`font-mono-num font-bold text-ink ${size === "md" ? "text-2xl" : "text-lg"}`}
        >
          Desde {eur.format(price)}
        </span>
        {hasDiscount && (
          <span className="font-mono-num text-sm text-ink-faint line-through">
            {eur.format(compareAtPrice)}
          </span>
        )}
      </div>
      <p className="mt-0.5 text-[11px] leading-snug text-ink-faint">
        Orientativo, IVA incl. Precio final confirmado con tu matrícula por WhatsApp.
      </p>
    </div>
  );
}
