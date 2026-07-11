import { loginAction } from "./actions";

interface AccesoPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function AccesoPage({ searchParams }: AccesoPageProps) {
  const { next, error } = await searchParams;

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface-1 p-8 shadow-sm">
        <h1 className="font-display text-xl text-ink">Acceso interno</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Herramienta para crear presupuestos. Solo para el equipo de RECAMBIA.
        </p>

        <form action={loginAction} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="next" value={next ?? "/presupuesto/nuevo"} />
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          {error && (
            <p className="text-sm text-danger">Contraseña incorrecta. Inténtalo de nuevo.</p>
          )}

          <button
            type="submit"
            className="mt-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark active:scale-[0.98]"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
