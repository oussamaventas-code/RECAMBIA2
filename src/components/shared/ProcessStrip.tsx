// Explica el proceso de compra (elegir → confirmar por WhatsApp → pagar)
// antes de que el usuario vea precio y stock, para que la confirmación
// humana no se sienta como una sorpresa a mitad del checkout.
export function ProcessStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-line bg-surface-2/60 px-4 py-3 text-xs sm:text-sm text-ink-muted ${className}`}
    >
      <span className="flex items-center gap-1.5">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">
          1
        </span>
        Eliges tu pieza
      </span>
      <span className="text-ink-faint" aria-hidden="true">
        →
      </span>
      <span className="flex items-center gap-1.5">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">
          2
        </span>
        Te confirmamos precio y disponibilidad en &lt;2h
      </span>
      <span className="text-ink-faint" aria-hidden="true">
        →
      </span>
      <span className="flex items-center gap-1.5">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-[10px] font-bold text-success">
          3
        </span>
        <strong className="font-semibold text-ink">Pagas solo entonces</strong>
      </span>
    </div>
  );
}
