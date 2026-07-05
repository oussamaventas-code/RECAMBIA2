import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";
import { whatsappGenericUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Habla con el equipo de RECAMBIA: WhatsApp, teléfono o email. Respuesta en menos de 2 horas laborables.",
};

const CHANNELS = [
  {
    icon: "💬",
    title: "WhatsApp",
    detail: "La vía más rápida. Pedidos, dudas y diagnóstico.",
    action: { label: "Abrir chat", href: whatsappGenericUrl("Hola, ") },
    external: true,
  },
  {
    icon: "📞",
    title: "Teléfono",
    detail: "Lunes a viernes, de 9:00 a 18:30.",
    action: { label: "600 00 00 00", href: "tel:+34600000000" },
    external: false,
  },
  {
    icon: "✉️",
    title: "Email",
    detail: "Para presupuestos, facturas y temas administrativos.",
    action: { label: "hola@recambia.es", href: "mailto:hola@recambia.es" },
    external: false,
  },
];

export default function ContactoPage() {
  return (
    <InfoPage
      title="Contacto"
      subtitle="Detrás de RECAMBIA hay personas que saben de piezas. Elige la vía que prefieras: contestamos en menos de 2 horas laborables."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CHANNELS.map((channel) => (
          <div
            key={channel.title}
            className="flex flex-col rounded-2xl border border-line bg-surface-1 p-6"
          >
            <span className="text-3xl" aria-hidden="true">
              {channel.icon}
            </span>
            <h2 className="mt-3 font-display text-lg text-ink">
              {channel.title}
            </h2>
            <p className="mt-1 flex-1 text-sm text-ink-muted leading-relaxed">
              {channel.detail}
            </p>
            <a
              href={channel.action.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              {channel.action.label}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-ink-faint">
        Horario de atención: lunes a viernes de 9:00 a 18:30 (excepto
        festivos nacionales). Los pedidos por WhatsApp fuera de horario se
        atienden a primera hora del siguiente día laborable.
      </p>
    </InfoPage>
  );
}
