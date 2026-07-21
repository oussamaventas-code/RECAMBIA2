import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";
import { CookiePreferencesButton } from "@/components/layout/CookiePreferencesButton";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies usa RECAMBIA y cómo gestionarlas.",
  robots: { index: false },
};

// BORRADOR: pendiente de revisión legal.
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
          <h2 className="font-display text-lg text-ink mb-2">2. Cookies que usamos</h2>
          <p>
            <strong className="font-semibold text-ink">Técnicas (siempre activas):</strong>{" "}
            imprescindibles para el funcionamiento de la web — por ejemplo, recordar tu decisión
            de cookies o mantener tu sesión al crear un presupuesto. No requieren consentimiento
            según la normativa vigente.
          </p>
          <p className="mt-2">
            <strong className="font-semibold text-ink">
              Publicitarias (solo si las aceptas):
            </strong>{" "}
            usamos el píxel de Meta (Facebook/Instagram) para medir la eficacia de nuestros
            anuncios y mostrarte publicidad más relevante. Este píxel solo se carga después de que
            aceptes expresamente el banner de cookies — si lo rechazas o no decides, no se carga.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-ink mb-2">3. Cómo cambiar tu decisión</h2>
          <p>
            Puedes revocar o volver a dar tu consentimiento cuando quieras con este botón, o
            configurando tu navegador para bloquear cookies desde sus ajustes de privacidad. Ten en
            cuenta que bloquear las cookies técnicas puede afectar al funcionamiento de la web.
          </p>
          <div className="mt-4">
            <CookiePreferencesButton />
          </div>
        </section>
      </div>
    </InfoPage>
  );
}
