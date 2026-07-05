import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Envíos y devoluciones",
  description:
    "Plazos de entrega, gastos de envío y cómo devolver una pieza en RECAMBIA. Entrega 24h en península y devolución en 14 días.",
};

export default function EnviosPage() {
  return (
    <InfoPage
      title="Envíos y devoluciones"
      subtitle="Sin sorpresas: esto es lo que puedes esperar de nosotros cuando pides una pieza."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-surface-1 p-6 sm:p-8">
          <h2 className="font-display text-xl text-ink">🚚 Envíos</h2>
          <ul className="mt-4 flex flex-col gap-4 text-sm text-ink-muted leading-relaxed">
            <li className="flex gap-3">
              <span className="text-accent font-bold">·</span>
              <span>
                <strong className="text-ink">Península:</strong> entrega en 24h
                laborables si la pieza está en stock y pides antes de las
                17:00.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">·</span>
              <span>
                <strong className="text-ink">Envío gratis</strong> en pedidos
                superiores a 60 €. Por debajo, el coste exacto se te confirma
                antes de pagar.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">·</span>
              <span>
                <strong className="text-ink">
                  Baleares, Canarias, Ceuta y Melilla:
                </strong>{" "}
                consultar plazo y coste — te lo confirmamos por WhatsApp antes
                de cerrar el pedido.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">·</span>
              <span>
                <strong className="text-ink">Talleres profesionales:</strong>{" "}
                entrega antes de las 9:00 en rutas de reparto habituales.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">·</span>
              <span>
                Piezas voluminosas (parabrisas, capós, portones) pueden
                requerir transporte especial; te avisamos siempre antes.
              </span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-surface-1 p-6 sm:p-8">
          <h2 className="font-display text-xl text-ink">↩ Devoluciones</h2>
          <ul className="mt-4 flex flex-col gap-4 text-sm text-ink-muted leading-relaxed">
            <li className="flex gap-3">
              <span className="text-accent font-bold">·</span>
              <span>
                <strong className="text-ink">14 días naturales</strong> desde
                la entrega para desistir de la compra sin dar explicaciones
                (derecho legal de desistimiento).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">·</span>
              <span>
                Si la pieza no encaja por un error nuestro de compatibilidad,{" "}
                <strong className="text-ink">
                  la recogemos gratis en tu casa
                </strong>{" "}
                y te devolvemos el importe íntegro.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">·</span>
              <span>
                La pieza debe estar <strong className="text-ink">sin montar</strong>,
                sin señales de instalación y en su embalaje original.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">·</span>
              <span>
                <strong className="text-ink">Garantía legal de 3 años</strong>{" "}
                en piezas nuevas. Si una pieza falla por defecto de
                fabricación, la gestionamos con el fabricante por ti.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">·</span>
              <span>
                Para iniciar una devolución, escríbenos por WhatsApp con tu
                número de pedido. Sin formularios raros.
              </span>
            </li>
          </ul>
        </section>
      </div>

      <p className="mt-8 rounded-xl bg-surface-2 p-4 text-xs text-ink-faint leading-relaxed">
        Los componentes eléctricos y electrónicos (centralitas, sensores,
        alternadores...) solo admiten devolución si el precinto está intacto,
        por normativa del sector. Los líquidos y aceites abiertos no admiten
        devolución por seguridad.
      </p>
    </InfoPage>
  );
}
