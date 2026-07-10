import type { Metadata } from "next";
import Link from "next/link";
import { site, socialLinks } from "@/data/site";
import { treatments, packages } from "@/data/treatments";

const title = "Massaggio Schiena e Collo a Padova — Decontratturante";
const description =
  "Massaggio decontratturante per schiena e collo a Padova: pressione profonda sulle zone contratte per allentare nodi muscolari e rigidità accumulata. Su appuntamento.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/massaggio-schiena-collo-padova" },
  openGraph: {
    title,
    description,
    url: `${site.url}/massaggio-schiena-collo-padova`,
  },
};

export default function MassaggioSchienaColloPadovaPage() {
  const treatment = treatments.find((t) => t.title === "Massaggio Decontratturante");
  const startingPackage = packages[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Massaggio schiena e collo Padova",
        item: `${site.url}/massaggio-schiena-collo-padova`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-ink px-6 py-32 text-cream md:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="editorial-container max-w-3xl">
        <Link href="/" className="label-eyebrow text-sand hover:text-cream">
          &larr; Torna al sito
        </Link>

        <p className="label-eyebrow mb-6 mt-8 text-sand">Trattamento mirato</p>
        <h1 className="font-display text-5xl font-light leading-[1.1] sm:text-6xl">
          Massaggio schiena e collo a Padova
        </h1>

        {treatment ? (
          <p className="mt-6 text-base leading-relaxed text-cream/75 md:text-lg">
            {treatment.description} Una seduta dura {treatment.duration.toLowerCase()},
            in uno spazio riservato e tranquillo su appuntamento a {site.city}.
          </p>
        ) : null}

        <p className="mt-6 text-base leading-relaxed text-cream/75 md:text-lg">
          Chi passa molte ore seduto, al lavoro o in auto, tende ad
          accumulare tensione proprio tra schiena e collo. Il massaggio
          decontratturante lavora con pressione più profonda su quelle zone
          contratte, per restituire un senso di leggerezza e allentare la
          rigidità della giornata — un momento di pausa reale, non solo
          fisica.
        </p>

        <div className="mt-14 rounded-2xl border border-cream/15 bg-cream/[0.03] p-8">
          <p className="label-eyebrow mb-3 text-sand">A partire da</p>
          <p className="font-display text-4xl text-sand">
            {startingPackage.price}
          </p>
          <p className="mt-1 text-xs text-cream/50">{startingPackage.sessions}</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/60">
            Il prezzo è a pacchetto e vale per qualsiasi trattamento del
            listino, decontratturante incluso.{" "}
            <a
              href="/prezzi-massaggi-padova"
              className="border-b border-sand/40 text-sand hover:border-sand"
            >
              Vedi tutti i pacchetti
            </a>
            .
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <a
            href="/#prenota"
            className="label-eyebrow rounded-full bg-sand px-8 py-4 text-ink transition-transform hover:scale-[1.03]"
          >
            Prenota il tuo momento
          </a>
          <a
            href={socialLinks.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="label-eyebrow border-b border-cream/30 pb-1 text-cream transition-colors hover:border-cream"
          >
            Scrivi su WhatsApp
          </a>
        </div>

        <p className="mt-16 text-xs leading-relaxed text-cream/40">
          {site.wellnessDisclaimer}
        </p>
      </div>
    </main>
  );
}
