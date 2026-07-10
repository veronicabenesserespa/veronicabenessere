import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Pagine indicizzabili — privacy/cookie restano fuori (hanno già
  // `robots: { index: false }` nel proprio metadata, pagine legali non
  // vanno spinte in ricerca).
  const routes = [
    "",
    "/prezzi-massaggi-padova",
    "/massaggio-rilassante-padova",
    "/massaggio-schiena-collo-padova",
    "/prenota",
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));
}
