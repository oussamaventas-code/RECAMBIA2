import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/layout/InfoPage";
import { whatsappGenericUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Centro de ayuda",
  description:
    "Preguntas frecuentes sobre pedidos, envíos, devoluciones y compatibilidad de recambios en RECAMBIA.",
};

const FAQS = [
  {
    q: "¿Cómo sé que la pieza encaja en mi coche?",
    a: "Escribe tu matrícula en el buscador y te mostramos solo piezas compatibles. Además, antes de cobrar nada, una persona de nuestro equipo revisa tu pedido y confirma la compatibilidad con tu bastidor. Si aun así no encajara, la recogemos gratis en tu casa.",
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: "Si la pieza está en stock y pides antes de las 17:00, la recibes al día laborable siguiente en península. Baleares, Canarias, Ceuta y Melilla tienen plazos y condiciones especiales que te confirmamos antes de cerrar el pedido.",
  },
  {
    q: "¿Cómo se hace el pedido?",
    a: "Por WhatsApp. Eliges la pieza, pulsas «Pedir» y se abre un chat con el pedido ya preparado. Una persona te confirma disponibilidad, precio final y entrega antes de cobrarte nada.",
  },
  {
    q: "¿Puedo devolver una pieza?",
    a: "Sí. Tienes 14 días naturales desde la entrega para desistir de la compra sin dar explicaciones (derecho legal de desistimiento), y si el error de compatibilidad es nuestro, la recogida corre de nuestra cuenta. La pieza debe estar sin montar y en su embalaje original.",
  },
  {
    q: "¿Las piezas tienen garantía?",
    a: "Todas las piezas nuevas tienen la garantía legal de 3 años. Además son de fabricantes de primer nivel (Bosch, Valeo, TRW, Mahle, Monroe...), muchos de ellos proveedores de origen de tu coche.",
  },
  {
    q: "¿Trabajáis con talleres?",
    a: "Sí, con tarifa profesional desde el primer pedido y entrega antes de las 9:00. Mira la página de talleres o escríbenos directamente.",
  },
  {
    q: "¿Qué pasa si no encuentro mi pieza en la web?",
    a: "Trabajamos con más de 500 marcas y cientos de miles de referencias — la web solo muestra una parte. Escríbenos por WhatsApp con tu matrícula y la pieza que buscas: si existe, la encontramos.",
  },
];

export default function AyudaPage() {
  return (
    <InfoPage
      title="Centro de ayuda"
      subtitle="Las dudas más habituales, respondidas sin letra pequeña. Si no encuentras la tuya, escríbenos: contesta una persona, no un bot."
    >
      <div className="flex flex-col gap-4">
        {FAQS.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-2xl border border-line bg-surface-1 open:border-accent/40"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {faq.q}
              <svg
                className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="px-5 pb-5 text-sm text-ink-muted leading-relaxed">
              {faq.a}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface-2/60 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg text-ink">¿Sigues con dudas?</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Escríbenos y te contestamos en menos de 2 horas laborables.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={whatsappGenericUrl("Hola, tengo una duda: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-success px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          >
            WhatsApp
          </a>
          <Link
            href="/contacto"
            className="rounded-xl border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Otras vías de contacto
          </Link>
        </div>
      </div>
    </InfoPage>
  );
}
