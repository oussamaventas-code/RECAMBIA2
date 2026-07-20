import type { Metadata } from "next";
import { inter, jetbrainsMono, spaceGrotesk } from "@/lib/fonts";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://recambiax.es"),
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
    // La imagen la genera src/app/opengraph-image.tsx (file convention de
    // Next.js): siempre 1200x630 correctos, sin depender de un fichero suelto.
  },
  twitter: {
    card: "summary_large_image",
    title: "RECAMBIA — Tu pieza, mañana en tu puerta",
    description:
      "Stock real en España. Escribe tu matrícula y encuentra el recambio exacto.",
  },
};

import { Suspense } from "react";
import { Tracker } from "@/components/layout/Tracker";
import { META_PIXEL_ID, PHONE_TEL } from "@/lib/site-config";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoPartsStore",
              name: "RECAMBIA",
              image: "https://recambiax.es/images/og-recambia.jpg",
              description:
                "Encuentra el recambio exacto para tu coche. Stock real en España, entrega mañana.",
              url: "https://recambiax.es",
              telephone: PHONE_TEL,
              address: {
                "@type": "PostalAddress",
                addressCountry: "ES",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:30",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Suspense fallback={null}>
          <Tracker />
        </Suspense>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
