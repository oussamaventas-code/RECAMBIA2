import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/layout/InfoPage";
import { LEGAL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Condiciones de compra",
  description:
    "Condiciones generales de venta de RECAMBIA: precios, pedidos, envíos, desistimiento y garantías.",
  robots: { index: false },
};

// BORRADOR: sustituir los campos [ENTRE CORCHETES] por los datos reales de
// la empresa antes de lanzar. Conviene revisión por un profesional legal.
export default function CondicionesPage() {
  return (
    <InfoPage
      title="Condiciones de compra"
      subtitle="Última actualización: julio de 2026 · Documento en borrador, pendiente de revisión legal."
    >
      <div className="flex flex-col gap-8 text-sm text-ink-muted leading-relaxed">
        <section>
          <h2 className="font-display text-lg text-ink mb-2">1. Identificación del vendedor</h2>
          <p>
            {LEGAL.businessName}, NIF {LEGAL.nif}, domicilio en {LEGAL.address},
            España (en adelante, «RECAMBIA»).
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">2. Proceso de compra</h2>
          <p>
            Los pedidos se formalizan por WhatsApp. Los precios mostrados en
            la web incluyen IVA y son orientativos hasta la confirmación
            expresa del pedido por nuestro equipo, que verificará
            disponibilidad, precio final y compatibilidad con tu vehículo
            antes de solicitar el pago. No se cobra ningún importe sin esa
            confirmación previa.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">3. Envíos</h2>
          <p>
            Entrega en 24h laborables en península para piezas en stock
            (pedidos confirmados antes de las 17:00). Envío gratuito a partir
            de 60 €. Condiciones detalladas en{" "}
            <Link href="/envios" className="text-accent hover:underline">
              Envíos y devoluciones
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">4. Derecho de desistimiento</h2>
          <p>
            Dispones de 14 días naturales desde la recepción para desistir de
            la compra sin justificación, conforme al Real Decreto Legislativo
            1/2007. La pieza debe devolverse sin montar y en su embalaje
            original. Quedan excluidos los bienes precintados que hayan sido
            desprecintados por razones de protección de la salud o higiene, y
            los componentes electrónicos con precinto abierto.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">5. Garantías</h2>
          <p>
            Todas las piezas nuevas cuentan con la garantía legal de
            conformidad de 3 años desde la entrega. La garantía cubre defectos
            de fabricación; no cubre desgaste normal, montaje incorrecto o uso
            inadecuado. Para piezas cuya sustitución requiera instalación
            profesional, el fabricante puede requerir justificante de montaje
            en taller.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">6. Resolución de litigios</h2>
          <p>
            Para cualquier controversia, puedes dirigirte a nuestro servicio
            de atención al cliente. Asimismo, la Comisión Europea facilita una
            plataforma de resolución de litigios en línea disponible en{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </section>
      </div>
    </InfoPage>
  );
}
