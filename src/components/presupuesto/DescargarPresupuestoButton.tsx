"use client";

// El diálogo de impresión del navegador ya deja "Guardar como PDF": no hace
// falta generar un PDF en el servidor para que el cliente se lo enseñe a su
// mecánico o lo guarde. El CSS print: del resto de la página oculta nav,
// footer y botones de pago, dejando solo el presupuesto.
export function DescargarPresupuestoButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-ink-muted hover:border-accent hover:text-accent"
    >
      Descargar / imprimir
    </button>
  );
}
