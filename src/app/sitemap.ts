import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const BASE = "https://recambia.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/resultados`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/diagnostico`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/talleres-asociados`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/quienes-somos`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/ayuda`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/envios`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contacto`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/resultados?categoria=${c.slug}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/producto/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
