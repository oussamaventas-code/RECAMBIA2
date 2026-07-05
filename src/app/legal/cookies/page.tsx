import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies usa RECAMBIA y cómo gestionarlas.",
  robots: { index: false },
};

// BORRADOR: actualizar cuando se instalen analytics/píxeles publicitarios.
// En ese momento será obligatorio añadir además un banner de consentimiento.
export default function CookiesPage() {
  return (
    <InfoPage
      title="Política de cookies"
      subtitle="Última actualización: julio de 2026 · Documento en borrador, pendiente de revisión legal."
    >
      <div className="flex flex-col gap-8 text-sm text-ink-muted leading-relaxed">
        <section>
          <h2 className="font-display text-lg text-ink mb-2">1. Qué son las cookies</h2>
          <p>
            Pequeños archivos que se almacenan en tu navegador al visitar una
            web y que permiten recordar información sobre tu visita.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">2. Cookies que usamos actualmente</h2>
          <p>
            En este momento la web solo utiliza cookies técnicas
            imprescindibles para su funcionamiento (por ejemplo, recordar tu
            preferencia al cerrar avisos). Estas cookies no requieren
            consentimiento según la normativa vigente.
          </p>
          <p className="mt-2">
            Si en el futuro incorporamos cookies de análisis o publicidad
            (Google Analytics, píxel de TikTok/Meta), esta política se
            actualizará y se te pedirá consentimiento expreso mediante un
            banner antes de activarlas.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">3. Cómo desactivarlas</h2>
          <p>
            Puedes configurar tu navegador para bloquear o eliminar cookies
            desde sus ajustes de privacidad. Ten en cuenta que bloquear las
            cookies técnicas puede afectar al funcionamiento de la web.
          </p>
        </section>
      </div>
    </InfoPage>
  );
}
