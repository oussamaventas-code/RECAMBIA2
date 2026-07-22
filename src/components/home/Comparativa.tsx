"use client";

import { Reveal } from "@/components/shared/Reveal";

/* Responde a "¿por qué tú y no mi taller de siempre / una web grande?".
   Solo comparaciones verificables desde dentro (proceso, no precio inventado):
   nada de cifras de ahorro hasta tener el dato real del propietario. */

interface Fila {
  pregunta: string;
  taller: string;
  online: string;
  recambia: string;
}

const filas: Fila[] = [
  {
    pregunta: "¿Verifican la pieza antes de cobrarte?",
    taller: "Depende del mecánico, no siempre por escrito",
    online: "No, buscas y pagas tú solo",
    recambia: "Sí, confirmamos con tu matrícula antes de cobrar",
  },
  {
    pregunta: "¿Cómo pides la pieza?",
    taller: "Desplazándote en persona",
    online: "Buscando tú en un catálogo",
    recambia: "Por WhatsApp, desde el sofá",
  },
  {
    pregunta: "¿No sabes qué pieza es?",
    taller: "Hay que llevar el coche",
    online: "Tienes que saber la referencia",
    recambia: "Mandas una foto y te la identificamos",
  },
  {
    pregunta: "¿Quién te atiende?",
    taller: "El mecánico, si tiene un hueco",
    online: "Un chat automático o nadie",
    recambia: "Un recambista con 15+ años de oficio",
  },
  {
    pregunta: "¿Devolución si no encaja?",
    taller: "Depende del taller",
    online: "Política estándar, sin ayuda",
    recambia: "14 días, sin líos",
  },
];

export function Comparativa() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            ¿Por qué no ir directo al taller o a una web grande?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            Cada opción tiene su sitio. Así de claro es en qué se diferencia RECAMBIA.
          </p>
        </Reveal>

        {/* Tabla: solo escritorio */}
        <Reveal delay={0.08} className="mt-10 hidden overflow-hidden rounded-2xl border border-line shadow-sm sm:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2 text-left text-ink-muted">
                <th className="w-2/5 px-5 py-4 font-semibold">&nbsp;</th>
                <th className="px-5 py-4 font-semibold">Taller de siempre</th>
                <th className="px-5 py-4 font-semibold">Web grande</th>
                <th className="px-5 py-4 font-semibold text-accent-dark">RECAMBIA</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f, i) => (
                <tr key={f.pregunta} className={i % 2 === 1 ? "bg-surface-2/40" : undefined}>
                  <td className="border-t border-line px-5 py-4 font-medium text-ink">{f.pregunta}</td>
                  <td className="border-t border-line px-5 py-4 text-ink-muted">{f.taller}</td>
                  <td className="border-t border-line px-5 py-4 text-ink-muted">{f.online}</td>
                  <td className="border-t border-line bg-accent/5 px-5 py-4 font-medium text-ink">
                    {f.recambia}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Cards: móvil */}
        <div className="mt-10 flex flex-col gap-4 sm:hidden">
          {filas.map((f, i) => (
            <Reveal
              key={f.pregunta}
              delay={i * 0.06}
              className="rounded-2xl border border-line bg-surface-1 p-5 shadow-sm"
            >
              <p className="font-semibold text-ink">{f.pregunta}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-faint">Taller de siempre</dt>
                  <dd className="text-right text-ink-muted">{f.taller}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-faint">Web grande</dt>
                  <dd className="text-right text-ink-muted">{f.online}</dd>
                </div>
                <div className="flex justify-between gap-3 rounded-lg bg-accent/5 px-2.5 py-1.5">
                  <dt className="font-semibold text-accent-dark">RECAMBIA</dt>
                  <dd className="text-right font-medium text-ink">{f.recambia}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
