import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";
import { whatsappGenericUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Diagnóstico online",
  description:
    "Cuéntanos qué le pasa a tu coche y un experto en recambios te dice qué pieza necesitas. Gratis, por WhatsApp, sin compromiso.",
};

const STEPS = [
  {
    num: "1",
    title: "Cuéntanos el síntoma",
    text: "Ruido al frenar, testigo encendido, tirones... descríbelo con tus palabras y añade tu matrícula.",
  },
  {
    num: "2",
    title: "Un experto lo revisa",
    text: "Una persona que sabe de piezas (no un bot) identifica tu coche y la causa más probable.",
  },
  {
    num: "3",
    title: "Te decimos la pieza exacta",
    text: "Recibes la referencia compatible con tu coche, el precio y el plazo de entrega. Tú decides.",
  },
];

const EXAMPLES = [
  "«Me chirrían los frenos al frenar en frío»",
  "«Se enciende el testigo de la batería a ratos»",
  "«El aire acondicionado ya no enfría»",
  "«No sé cómo se llama esta pieza, te mando una foto»",
];

export default function DiagnosticoPage() {
  return (
    <InfoPage
      title="Diagnóstico online gratuito"
      subtitle="No necesitas saber de mecánica. Cuéntanos qué le pasa a tu coche y te decimos qué pieza necesitas — gratis y sin compromiso."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="rounded-2xl border border-line bg-surface-1 p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-display text-lg font-bold text-accent">
              {step.num}
            </span>
            <h2 className="mt-4 font-display text-lg text-ink">{step.title}</h2>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">
              {step.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface-1 p-6 sm:p-8">
        <h2 className="font-display text-xl text-ink">
          Ejemplos de consultas que resolvemos a diario
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {EXAMPLES.map((example) => (
            <li
              key={example}
              className="rounded-xl bg-surface-2 px-4 py-3 text-sm text-ink-muted italic"
            >
              {example}
            </li>
          ))}
        </ul>

        <a
          href={whatsappGenericUrl(
            "Hola, quiero un diagnóstico. Mi coche hace esto: ",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-success px-6 py-4 font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] sm:w-auto sm:px-10"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
          Empezar diagnóstico por WhatsApp
        </a>
        <p className="mt-3 text-xs text-ink-faint">
          Respuesta en menos de 2 horas laborables. El diagnóstico es
          orientativo: para averías complejas te recomendaremos pasar por un
          taller asociado.
        </p>
      </div>
    </InfoPage>
  );
}
