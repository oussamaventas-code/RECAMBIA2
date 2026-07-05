import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { whatsappGenericUrl } from "@/lib/whatsapp";

export default function TalleresAsociadosPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-surface-1 border-b border-line py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent mb-6">
                Para Clientes y Profesionales
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-tight mb-6">
                La red de talleres de confianza de RECAMBIA.
              </h1>
              <p className="text-lg text-ink-muted leading-relaxed max-w-2xl mb-8">
                Compra tus piezas online al mejor precio y envíalas directamente a uno de nuestros más de 500 talleres asociados en toda España para que te las monten. Sin complicaciones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3.5 font-semibold text-white transition-all hover:bg-accent-dark active:scale-95"
                >
                  Buscar mi pieza y taller
                </Link>
                <a
                  href={whatsappGenericUrl("Hola, tengo un taller y me gustaría unirme a la red de talleres asociados de RECAMBIA.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-line-strong bg-surface-1 px-6 py-3.5 font-semibold text-ink transition-all hover:border-accent hover:text-accent hover:bg-surface-2"
                >
                  Soy taller, quiero unirme
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How it works for customers */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl text-ink mb-4">¿Cómo funciona para ti?</h2>
              <p className="text-ink-muted">Montar tus propias piezas nunca fue tan fácil y económico.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="rounded-2xl border border-line bg-surface-1 p-8 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-2xl font-bold text-accent">
                  1
                </div>
                <h3 className="font-display text-xl text-ink mb-3">Encuentra tu pieza</h3>
                <p className="text-sm text-ink-muted">
                  Introduce tu matrícula en RECAMBIA y añade al carrito los recambios exactos que necesita tu coche al mejor precio del mercado.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl border border-line bg-surface-1 p-8 text-center shadow-sm relative">
                <div className="hidden md:block absolute top-16 -left-4 w-8 border-t-2 border-dashed border-line-strong" />
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-2xl font-bold text-accent">
                  2
                </div>
                <h3 className="font-display text-xl text-ink mb-3">Elige tu taller</h3>
                <p className="text-sm text-ink-muted">
                  Durante el proceso de pago, introduce tu código postal y selecciona el taller de nuestra red que más te convenga por cercanía y precio.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl border border-line bg-surface-1 p-8 text-center shadow-sm relative">
                <div className="hidden md:block absolute top-16 -left-4 w-8 border-t-2 border-dashed border-line-strong" />
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10 text-2xl font-bold text-success">
                  3
                </div>
                <h3 className="font-display text-xl text-ink mb-3">Lleva el coche y listo</h3>
                <p className="text-sm text-ink-muted">
                  Nosotros enviamos la pieza directamente al taller (suele llegar al día siguiente). Te avisamos y solo tienes que llevar el coche a que te la monten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* B2B Call to Action */}
        <section className="bg-surface-2 py-20 border-t border-line">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="font-display text-3xl sm:text-4xl text-ink mb-6">
              ¿Tienes un taller mecánico?
            </h2>
            <p className="text-lg text-ink-muted mb-10">
              Únete gratis a nuestra red. Te enviamos clientes directamente a la puerta de tu taller para que les instales las piezas. Además, obtendrás acceso a nuestra tarifa especial para profesionales en todos tus recambios.
            </p>
            <a
              href={whatsappGenericUrl("Hola, tengo un taller y me gustaría unirme a la red de talleres asociados de RECAMBIA.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-8 py-4 font-semibold text-white transition-all hover:bg-ink-muted hover:shadow-lg active:scale-95"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Contactar por WhatsApp para unirme
            </a>
            <ul className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-ink-muted">
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Alta gratuita
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Nuevos clientes
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Descuentos exclusivos
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
