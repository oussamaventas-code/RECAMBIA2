import { EmailCaptureForm } from "@/components/marketing/EmailCaptureForm";
import { DISCOUNT } from "@/lib/site-config";

// Sección de portada: imán de leads. Captura el email de quien todavía no está
// listo para escribir por WhatsApp y le da un empujón con el descuento.
export function DescuentoEmail() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/8 via-surface-1 to-surface-1 p-8 shadow-sm sm:p-12">
          {/* Glow decorativo */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-dark">
              🎁 Bienvenida
            </span>
            <h2 className="mt-4 font-display text-2xl text-ink sm:text-3xl">
              Llévate un {DISCOUNT.short} en tu primer pedido
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-muted sm:text-base">
              Déjanos tu email y te damos un código de bienvenida. Lo usas cuando pidas tu pieza por
              WhatsApp y te lo aplicamos al presupuesto.
            </p>

            <div className="mt-6 max-w-lg">
              <EmailCaptureForm source="portada" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
