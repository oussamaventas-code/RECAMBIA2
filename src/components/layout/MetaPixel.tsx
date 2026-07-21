"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getConsent, CONSENT_EVENT } from "@/lib/consent";

// Sin NEXT_PUBLIC_META_PIXEL_ID no hay nada que cargar (antes el script se
// inicializaba siempre con el placeholder "PIXEL_ID_HERE" — roto, no
// ausente). Con el ID puesto, el script solo se inyecta tras consentimiento
// explícito, y se retira en cuanto el usuario lo revoca desde /legal/cookies.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!PIXEL_ID) return;
    const sync = () => setEnabled(getConsent() === "accepted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!PIXEL_ID || !enabled) return null;

  return (
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
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
