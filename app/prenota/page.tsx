import type { Metadata } from "next";
import Link from "next/link";
import { site, socialLinks } from "@/data/site";
import CalEmbed from "@/components/CalEmbed";

const title = "Prenota un Massaggio a Padova";
const description =
  "Prenota online il tuo massaggio a Padova: scegli giorno e orario dal calendario, conferma immediata via email. Oppure scrivi su WhatsApp per domande rapide.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/prenota" },
  openGraph: { title, description, url: `${site.url}/prenota` },
};

export default function PrenotaPage() {
  const infoRows = [
    { label: "Durata appuntamenti", value: site.booking.duration },
    { label: "Tra un trattamento e l'altro", value: site.booking.buffer },
    { label: "Cancellazione", value: site.booking.cancellation },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Prenota",
        item: `${site.url}/prenota`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-cream px-6 py-32 text-ink md:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="editorial-container">
        <Link
          href="/"
          className="label-eyebrow text-warm-brown hover:text-ink"
        >
          &larr; Torna al sito
        </Link>

        <p className="label-eyebrow mb-6 mt-8 text-warm-brown">Calendario</p>
        <h1 className="max-w-2xl font-display text-5xl font-light leading-[1.1] text-dark-brown sm:text-6xl">
          Prenota il tuo momento
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-warm-brown/80 md:text-lg">
          Scegli giorno e orario. La conferma arriverà via email e
          l&apos;appuntamento verrà aggiunto al calendario.
        </p>

        <div className="relative mt-14 overflow-hidden rounded-2xl border border-sand/60 bg-cream-soft md:mt-16">
          <div className="grid md:grid-cols-[1.4fr_1fr]">
            <div className="border-b border-sand/50 p-6 md:border-b-0 md:border-r md:p-8">
              <CalEmbed calLink={site.booking.calLink} />
            </div>

            <div className="flex flex-col justify-center gap-8 p-8 md:p-12">
              {infoRows.map((row) => (
                <div key={row.label}>
                  <p className="label-eyebrow mb-2 text-warm-brown">
                    {row.label}
                  </p>
                  <p className="text-sm leading-relaxed text-dark-brown/80">
                    {row.value}
                  </p>
                </div>
              ))}
              <div className="pt-2">
                <a
                  href={socialLinks.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-eyebrow inline-block border-b border-warm-brown/40 pb-1 text-dark-brown transition-colors hover:border-dark-brown"
                >
                  Domande rapide? Scrivi su WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-16 max-w-md text-xs leading-relaxed text-warm-brown/60">
          {site.wellnessDisclaimer}
        </p>
      </div>
    </main>
  );
}
