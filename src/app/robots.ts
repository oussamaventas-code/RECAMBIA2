import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/presupuesto"],
    },
    sitemap: "https://recambia.es/sitemap.xml",
  };
}
