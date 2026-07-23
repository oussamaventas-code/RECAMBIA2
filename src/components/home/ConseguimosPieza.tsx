"use client";

import { Reveal } from "@/components/shared/Reveal";
import { whatsappGenericUrl } from "@/lib/whatsapp";
import { HORARIO, promesaRespuesta } from "@/config/contacto";

/* ─── Reglas claras: qué podemos conseguir y qué no ─── */
const rules = [
  {
    ok: true,
    title: "Si se vende en el mercado de recambio, la conseguimos",
    text: "Bosch, TRW, Valeo, Sachs y cientos de marcas más. Trabajamos a diario con los grandes distribuidores de España: aunque no la veas en la web, la localizamos y te confirmamos precio y plazo en el día.",
  },
  {
    ok: false,
    title: "Solo quedan fuera las piezas exclusivas de concesionario",
    text: "Si el fabricante la vende únicamente en su red oficial, no podemos conseguirla. Te lo decimos claro desde el primer mensaje, sin hacerte perder el tiempo.",
  },
];

export function ConseguimosPieza() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-accent/5">
        {/* Subtle dot texture, same language as WorkshopMap */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-ink) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative p-8 sm:p-12 lg:p-16">
          {/* Header */}
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-dark mb-4">
              ¿No ves tu pieza en la web?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
              Conseguimos tu pieza.{" "}
              <span className="text-accent">Sea cual sea.</span>
            </h2>
            <p className="mt-4 text-ink-muted leading-relaxed max-w-xl">
              Lo que ves aquí es nuestro escaparate, no todo lo que vendemos.
              Dinos tu matrícula y la pieza que necesitas, y nos ponemos a
              buscarla en {HORARIO.respuestaEnHorario}.
            </p>
          </Reveal>

          {/* Rules */}
          <Reveal delay={0.05} className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {rules.map((rule) => (
              <div
                key={rule.title}
                className={`rounded-2xl border p-6 bg-surface-1 ${
                  rule.ok ? "border-success/30" : "border-line"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      rule.ok
                        ? "bg-success/15 text-success"
                        : "bg-surface-2 text-ink-faint"
                    }`}
                  >
                    {rule.ok ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{rule.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">
                      {rule.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.1} className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappGenericUrl(
                "Hola, busco una pieza que no veo en la web. Mi matrícula y la pieza que necesito son: ",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-success px-7 py-4 font-semibold text-white shadow-lg shadow-success/20 transition-all hover:bg-success-glow hover:shadow-xl active:scale-[0.98]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Pídenos tu pieza
            </a>
            <p className="text-xs text-ink-muted">{promesaRespuesta()}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
