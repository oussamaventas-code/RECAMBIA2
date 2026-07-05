import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { whatsappGenericUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 items-center justify-center bg-paper px-4 py-24">
        <div className="max-w-md text-center">
          <p className="font-mono-num text-7xl font-bold text-accent">404</p>
          <h1 className="mt-4 font-display text-2xl text-ink">
            Esta pieza no está en el almacén
          </h1>
          <p className="mt-3 text-ink-muted leading-relaxed">
            La página que buscas no existe o se ha movido. Pero si lo que no
            encuentras es un recambio, eso sí sabemos solucionarlo.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Volver al inicio
            </Link>
            <a
              href={whatsappGenericUrl("Hola, busco una pieza: ")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Buscar mi pieza por WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
