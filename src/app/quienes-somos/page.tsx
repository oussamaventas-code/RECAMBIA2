import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "RECAMBIA nace del mostrador de un almacén de recambios: gente que lleva años sirviendo piezas a talleres, ahora también online.",
};

export default function QuienesSomosPage() {
  return (
    <InfoPage
      title="Quiénes somos"
      subtitle="No somos un marketplace anónimo. Venimos del mostrador de un almacén de recambios y eso se nota."
    >
      <div className="prose-recambia flex flex-col gap-6 text-ink-muted leading-relaxed">
        <p>
          RECAMBIA nace de una idea sencilla:{" "}
          <strong className="text-ink">
            comprar un recambio online debería ser tan fiable como pedirlo en
            el mostrador de toda la vida
          </strong>
          . Sin jugártela con la compatibilidad, sin esperar una semana a que
          llegue de otro país, y con alguien al otro lado que sepa lo que es
          una copela o un bimasa.
        </p>
        <p>
          Detrás del proyecto hay gente que trabaja a diario en la
          distribución de recambios en España: conocemos el almacén, las
          referencias, los plazos reales y los proveedores. Por eso solo
          prometemos lo que podemos cumplir — si te decimos que la pieza llega
          mañana, es porque sabemos dónde está hoy.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface-1 p-5 text-center">
            <p className="font-mono-num text-2xl font-bold text-accent">+500.000</p>
            <p className="mt-1 text-xs">referencias en catálogo</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface-1 p-5 text-center">
            <p className="font-mono-num text-2xl font-bold text-accent">+500</p>
            <p className="mt-1 text-xs">marcas de fabricantes</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface-1 p-5 text-center">
            <p className="font-mono-num text-2xl font-bold text-accent">24h</p>
            <p className="mt-1 text-xs">entrega en península</p>
          </div>
        </div>
        <p>
          Trabajamos con fabricantes de primer nivel — Bosch, Valeo, TRW,
          Mahle, Monroe, Lemförder, Gates y muchos más — y con talleres
          asociados por toda España para que, si no quieres montar la pieza tú
          mismo, tengas dónde hacerlo a precio cerrado.
        </p>
        <p className="rounded-xl bg-surface-2 p-4 text-sm">
          🚧 RECAMBIA está en fase de lanzamiento. Si algo no funciona como
          esperabas, dínoslo por{" "}
          <Link href="/contacto" className="text-accent hover:underline">
            cualquiera de nuestras vías de contacto
          </Link>{" "}
          — nos ayuda a mejorar y te lo compensamos.
        </p>
      </div>
    </InfoPage>
  );
}
