import type { MetadataRoute } from "next";

/** Mientras el contenido sea borrador, nadie indexa. Ver el comentario en layout.tsx */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
