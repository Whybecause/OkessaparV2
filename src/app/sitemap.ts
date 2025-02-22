import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/music", "/shows", "/lyrics", "/contact"];
  return routes.map((route) => ({
    url: `https://okessapar.com${route}`,
    lastModified: new Date().toISOString(),
  }));
}
