import type { Metadata } from "next";
import { inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://recambia.es"),
  title: {
    default: "RECAMBIA — Recambios de coche con stock real en España",
    template: "%s · RECAMBIA",
  },
  description:
    "Encuentra el recambio exacto para tu coche escribiendo tu matrícula. Stock real en España, entrega mañana. Nada de aduanas, nada de esperas de una semana.",
  openGraph: {
    title: "RECAMBIA — Tu pieza, mañana en tu puerta",
    description:
      "Stock real en España. Escribe tu matrícula y encuentra el recambio exacto para tu coche.",
    locale: "es_ES",
    type: "website",
    siteName: "RECAMBIA",
    images: [
      {
        url: "/images/og-recambia.png",
        width: 1200,
        height: 630,
        alt: "RECAMBIA — Recambios de coche con entrega en 24h",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RECAMBIA — Tu pieza, mañana en tu puerta",
    description:
      "Stock real en España. Escribe tu matrícula y encuentra el recambio exacto.",
    images: ["/images/og-recambia.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
