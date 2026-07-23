/* ─── Trust items data ─── */
const trustItems = [
  {
    label: "Envío 24h",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Pago 100% seguro",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Solo pagas si la pieza encaja",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Stock en España",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Asesoramiento mecánico",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

/* ─── TrustItem component ─── */
function TrustItem({
  icon,
  label,
  isLast,
}: {
  icon: React.ReactNode;
  label: string;
  isLast: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <span className="text-accent">{icon}</span>
      <span className="text-sm text-ink whitespace-nowrap">{label}</span>

      {/* Separator */}
      {!isLast && (
        <span
          aria-hidden
          className="hidden lg:block ml-5 h-4 w-px bg-line"
        />
      )}
    </div>
  );
}

/* ─── Main component ─── */
export function TrustStrip() {
  return (
    <section className="bg-surface-1 border-y border-line">
      {/* ── Desktop: centered row ── */}
      <div className="hidden lg:flex items-center justify-center gap-8 py-3.5">
        {trustItems.map((item, i) => (
          <TrustItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isLast={i === trustItems.length - 1}
          />
        ))}
      </div>

      {/* ── Mobile / Tablet: static flex for top 3 ── */}
      <div className="lg:hidden overflow-x-auto py-3.5 no-scrollbar">
        <div className="flex w-max items-center px-4">
          {trustItems.slice(0, 3).map((item, i) => (
            <div key={item.label} className="flex items-center gap-2.5 mx-3 shrink-0">
              <span className="text-accent">{item.icon}</span>
              <span className="text-xs font-medium text-ink whitespace-nowrap">
                {item.label}
              </span>
              {i < 2 && (
                <span
                  aria-hidden
                  className="ml-5 h-1 w-1 rounded-full bg-line-strong"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
