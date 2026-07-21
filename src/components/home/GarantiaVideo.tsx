import { Reveal } from "@/components/shared/Reveal";

export function GarantiaVideo() {
  return (
    <section className="bg-surface-1 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-8 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-dark">
            Garantia Recambia
          </span>
          <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
            Compra con la tranquilidad de acertar
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            Te explicamos como revisamos compatibilidad, stock y entrega antes
            de confirmar tu pedido.
          </p>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink shadow-xl shadow-ink/10">
            <video
              className="block aspect-[3/1] w-full bg-ink object-cover object-[50%_82%]"
              src="/images/video/garantia.mp4"
              poster="/images/video/garantia-poster.jpg"
              controls
              loop
              playsInline
              preload="none"
            >
              Tu navegador no puede reproducir este video.
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
