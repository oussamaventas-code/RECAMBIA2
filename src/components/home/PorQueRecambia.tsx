"use client";

import { Reveal } from "@/components/shared/Reveal";

/* Sección de confianza HONESTA para tráfico frío: nada de reseñas ni métricas
   inventadas. Solo verdades verificables — equipo veterano, trato directo por
   WhatsApp y cero riesgo al comprar. Cuando haya reseñas reales de Google, se
   añade un bloque de testimonios de verdad encima o debajo de esta. */

const razones = [
  {
    title: "Hablas con un recambista real",
    body: "Nada de bots ni centralitas. Escribes por WhatsApp y te responde una persona que lleva años montando y vendiendo piezas.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    ),
  },
  {
    title: "Solo pagas si la pieza encaja",
    body: "Verificamos la compatibilidad con tu matrícula o número de bastidor antes de cobrarte nada. Cero riesgo de comprar la pieza equivocada.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    ),
  },
  {
    title: "En tu puerta en 24h",
    body: "Stock en España y envío al día siguiente si pides antes de las 17:00. Te llega a casa o directamente al taller.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    ),
  },
  {
    title: "Pago seguro y devolución 14 días",
    body: "Pagas con tarjeta por enlace seguro o por Bizum. Y si algo no va como esperabas, tienes 14 días para devolverlo sin líos.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    ),
  },
];

export function PorQueRecambia() {
  return (
    <section className="bg-surface-2 border-b border-line py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-dark">
            Sin intermediarios
          </span>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Un equipo de verdad, no una web más
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            Somos <strong className="font-semibold text-ink">4 recambistas con 15 años</strong> detrás
            del mostrador. Ahora te atendemos directo por WhatsApp: tú preguntas, nosotros confirmamos
            la pieza exacta para tu coche.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {razones.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 0.08}
              className="flex gap-4 rounded-2xl border border-line bg-surface-1 p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  {r.icon}
                </svg>
              </span>
              <div>
                <h3 className="font-semibold text-ink">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
