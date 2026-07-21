import type { MetadataRoute } from "next";

const BASE = "https://recambiax.es";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/diagnostico`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/talleres-asociados`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/quienes-somos`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/ayuda`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/envios`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contacto`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
