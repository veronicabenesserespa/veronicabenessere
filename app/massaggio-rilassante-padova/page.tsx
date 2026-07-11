import type { Metadata } from "next";
import Link from "next/link";
import { site, socialLinks } from "@/data/site";
import { treatments, packages } from "@/data/treatments";

const title = "Massaggio Rilassante a Padova — Massaggio Svedese";
const description =
  "Massaggio rilassante a Padova: manovre ampie e fluide per sciogliere le tensioni superficiali e ritrovare un respiro più lento. Su appuntamento, in ambiente riservato.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/massaggio-rilassante-padova" },
  openGraph: {
    title,
    description,
    url: `${site.url}/massaggio-rilassante-padova`,
  },
};

export default function MassaggioRilassantePadovaPage() {
  const treatment = treatments.find((t) => t.title === "Massaggio Svedese");
  const startingPackage = packages[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Massaggio rilassante Padova",
        item: `${site.url}/massaggio-rilassante-padova`,
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

        <p className="label-eyebrow mb-6 mt-8 text-sand">Rituale di benessere</p>
        <h1 className="font-display text-5xl font-light leading-[1.1] sm:text-6xl">
          Massaggio rilassante a Padova
        </h1>

        {treatment ? (
          <p className="mt-6 text-base leading-relaxed text-cream/75 md:text-lg">
            {treatment.description} Una seduta dura {treatment.duration.toLowerCase()},
            pensata come una vera pausa dal ritmo della giornata, in uno
            spazio riservato e curato su appuntamento a {site.city}.
          </p>
        ) : null}

        <p className="mt-6 text-base leading-relaxed text-cream/75 md:text-lg">
          Non serve un motivo specifico per prendersi questo tempo: basta la
          stanchezza accumulata, la voglia di rallentare, o semplicemente il
          bisogno di un momento tutto per sé. Il massaggio rilassante lavora
          con manovre ampie e fluide, pensate per accompagnare il corpo
          verso un respiro più lento.
        </p>

        <div className="mt-14 rounded-2xl border border-cream/15 bg-cream/[0.03] p-8">
          <p className="label-eyebrow mb-3 text-sand">A partire da</p>
          <p className="font-display text-4xl text-sand">
            {startingPackage.price}
          </p>
          <p className="mt-1 text-xs text-cream/50">{startingPackage.sessions}</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/60">
            Il prezzo è a pacchetto e vale per qualsiasi trattamento del
            listino, massaggio svedese incluso.{" "}
            <Link
              href="/prezzi-massaggi-padova"
              className="border-b border-sand/40 text-sand hover:border-sand"
            >
              Vedi tutti i pacchetti
            </Link>
            .
          </p>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Link
            href="/#prenota"
            className="label-eyebrow rounded-full bg-sand px-8 py-4 text-ink transition-transform hover:scale-[1.03]"
          >
            Prenota il tuo momento
          </Link>
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
