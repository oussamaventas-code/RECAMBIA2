import type { CaseStatus, CaseType, ShippingStatus } from "@/lib/crm-store";
import { whatsappGenericUrl } from "@/lib/whatsapp";

interface PedidoEstadoProps {
  shippingStatus?: ShippingStatus;
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  openCase: { type: CaseType; status: CaseStatus } | null;
  plate?: string;
}

const STEPS: { key: ShippingStatus; label: string }[] = [
  { key: "preparando", label: "Preparando" },
  { key: "enviado", label: "Enviado" },
  { key: "entregado", label: "Entregado" },
];

const STEP_ORDER: Record<ShippingStatus, number> = { preparando: 0, enviado: 1, entregado: 2 };

const CASE_TYPE_LABEL: Record<CaseType, string> = { garantia: "garantía", devolucion: "devolución" };
const CASE_STATUS_LABEL: Record<CaseStatus, string> = {
  abierto: "Recibida, la estamos revisando",
  en_revision: "En gestión",
  resuelto: "Resuelta",
  rechazado: "Cerrada",
};

export function PedidoEstado({
  shippingStatus,
  carrier,
  trackingNumber,
  trackingUrl,
  openCase,
  plate,
}: PedidoEstadoProps) {
  const currentStep = shippingStatus ? STEP_ORDER[shippingStatus] : -1;

  return (
    <div className="rounded-xl border border-line bg-surface-1 p-5">
      <p className="text-sm font-semibold text-ink">Estado de tu pedido</p>
      <ol className="mt-4 flex items-center justify-between">
        {STEPS.map((step, idx) => {
          const done = idx <= currentStep;
          return (
            <li key={step.key} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    done ? "bg-success text-white" : "bg-surface-3 text-ink-faint"
                  }`}
                >
                  {done ? "✓" : idx + 1}
                </span>
                <span className={`text-xs ${done ? "font-semibold text-ink" : "text-ink-faint"}`}>
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`mx-2 h-0.5 flex-1 ${idx < currentStep ? "bg-success" : "bg-line"}`} />
              )}
            </li>
          );
        })}
      </ol>

      {shippingStatus === "enviado" && (trackingNumber || trackingUrl) && (
        <p className="mt-4 text-center text-xs text-ink-muted">
          {carrier && <>Con {carrier}. </>}
          {trackingNumber && <>Nº de seguimiento: <span className="font-mono-num text-ink">{trackingNumber}</span>. </>}
          {trackingUrl && (
            <a href={trackingUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
              Ver seguimiento &rarr;
            </a>
          )}
        </p>
      )}

      <div className="mt-5 border-t border-line pt-4 text-center">
        {openCase ? (
          <p className="text-xs text-ink-muted">
            Tienes una {CASE_TYPE_LABEL[openCase.type]} en curso:{" "}
            <span className="font-semibold text-ink">{CASE_STATUS_LABEL[openCase.status]}</span>.
          </p>
        ) : (
          <p className="text-xs text-ink-faint">
            ¿La pieza no encaja o tiene algún problema?{" "}
            <a
              href={whatsappGenericUrl(
                `Hola, quiero abrir una devolución o garantía de mi pedido${plate ? ` (matrícula: ${plate})` : ""}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-origen="presupuesto-abrir-incidencia"
              className="font-semibold text-accent hover:underline"
            >
              Escríbenos por WhatsApp
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
