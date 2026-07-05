import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

interface InfoPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

// Shell común para páginas de contenido (ayuda, legal, contacto...).
export function InfoPage({ title, subtitle, children }: InfoPageProps) {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper">
        <div className="border-b border-line bg-surface-1">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
            <h1 className="font-display text-3xl sm:text-4xl text-ink">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 max-w-2xl text-ink-muted leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
