import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { treatments } from "@/data/treatments";
import FullscreenMenu from "@/components/FullscreenMenu";
import StickyCTA from "@/components/StickyCTA";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Titolo/descrizione condivisi tra metadata standard, Open Graph e Twitter
// Card: un'unica fonte di verità, così restano sempre coerenti tra loro.
const homeTitle = `Massaggi benessere a Padova | ${site.businessName}`;
const homeDescription =
  "Massaggi rilassanti e trattamenti benessere su appuntamento a Padova e provincia. Prenota online in pochi click, conferma immediata via calendario.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    // Le pagine dedicate (es. app/prezzi-massaggi-padova/page.tsx) impostano
    // il proprio title assoluto — questo template si applica solo a quelle
    // che non lo sovrascrivono.
    template: `%s | ${site.businessName}`,
  },
  description: homeDescription,
  // Keyword primarie (brief CLAUDE.md) + varianti di ricerca locale reali
  // per intento: rilassante, benessere, "vicino a me", prezzo, zona
  // specifica del corpo. Nessun nome di comune inventato: solo Padova,
  // già confermata come città reale dell'attività.
  keywords: [
    "massaggi Padova",
    "massaggio rilassante Padova",
    "massaggi benessere Padova",
    "massaggi vicino Padova",
    "massaggi prezzo Padova",
    "massaggio schiena collo Padova",
    "massaggio decontratturante Padova",
    "massaggio drenante Padova",
    "centro massaggi Padova provincia",
  ],
  authors: [{ name: site.businessName }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: site.url,
    siteName: site.businessName,
    title: homeTitle,
    description: homeDescription,
    // TODO Bax: manca /public/assets/og-cover.jpg (1200x630) — finché non
    // c'è, i link condivisi su WhatsApp/Instagram/Facebook non mostrano
    // un'anteprima immagine (alcuni client mostrano un riquadro vuoto o
    // rifiutano l'anteprima). Vedi public/assets/README.md.
    images: [{ url: "/assets/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/assets/og-cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // sameAs pubblica solo profili social reali confermati — mai l'URL
  // placeholder "@nomeprofilo"/Facebook vuoto, altrimenti Google indicizza
  // un profilo social che non esiste o non è quello giusto.
  const sameAsCandidates: (string | null)[] = [
    site.instagram.handle !== "@nomeprofilo" ? site.instagram.url : null,
    site.facebook.url || null,
  ];
  const sameAs = sameAsCandidates.filter(
    (url): url is string => url !== null
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.businessName,
        url: site.url,
        inLanguage: "it-IT",
      },
      {
        // HealthAndBeautyBusiness è un sottotipo di LocalBusiness più
        // specifico per un'attività di massaggi/benessere — l'array
        // mantiene entrambi validi per i risultati ricchi di Google.
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${site.url}/#business`,
        name: site.businessName,
        image: `${site.url}/assets/og-cover.jpg`,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line1,
          addressLocality: site.city,
          addressRegion: "PD",
          addressCountry: "IT",
        },
        // Area servita ampia (provincia), non un elenco di comuni
        // specifici mai confermati — vedi nota su site.areaServed.
        areaServed: {
          "@type": "AdministrativeArea",
          name: site.areaServed,
        },
        openingHoursSpecification: site.hours
          .filter((h) => h.time !== "Chiuso")
          .map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.day,
            description: h.time,
          })),
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      ...treatments.map((t) => ({
        "@type": "Service",
        serviceType: t.title,
        name: t.title,
        description: t.description,
        provider: { "@id": `${site.url}/#business` },
        areaServed: site.city,
        // Il prezzo è a pacchetto (vedi data/treatments.ts → packages),
        // non per singolo trattamento: niente Offer.price qui per non
        // dichiarare un prezzo che non corrisponde alla realtà.
      })),
    ],
  };

  return (
    <html
      lang="it"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body className="bg-ink font-body text-cream antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FullscreenMenu />
        {children}
        <StickyCTA />
      </body>
    </html>
  );
}
