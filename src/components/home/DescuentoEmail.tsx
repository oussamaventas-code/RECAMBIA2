import { whatsappGenericUrl } from "@/lib/whatsapp";
import { promesaRespuesta } from "@/config/contacto";

// Sección de portada: antes era un imán de leads con 5% de descuento y
// captura de email. Se sustituyó porque competía por precio (lo contrario a
// la propuesta de la marca) y capturaba emails cuando el canal donde
// realmente se vende es WhatsApp. Ahora es un diagnóstico gratis por
// matrícula + síntoma: solo lo pide alguien con un coche roto ahora mismo.
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
              Gratis, sin compromiso
            </span>
            <h2 className="mt-4 font-display text-2xl text-ink sm:text-3xl">
              ¿No sabes qué pieza necesitas?
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-muted sm:text-base">
              Mándanos tu matrícula y qué le pasa al coche. Un recambista te dice qué pieza
              necesitas, cuánto cuesta y si te compensa arreglarlo. Aunque al final no nos
              compres a nosotros.
            </p>

            <div className="mt-6">
              <a
                href={whatsappGenericUrl(
                  "Hola, no sé qué pieza necesito. Mi matrícula es: [ESCRIBE AQUÍ] y al coche le pasa esto: [DESCRIBE EL SÍNTOMA]",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark hover:shadow-xl active:scale-[0.98]"
              >
                Que me digan qué necesito &rarr;
              </a>
              <p className="mt-2 text-xs text-ink-faint">{promesaRespuesta()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
