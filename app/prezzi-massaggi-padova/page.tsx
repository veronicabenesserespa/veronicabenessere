import type { Metadata } from "next";
import Link from "next/link";
import { site, socialLinks } from "@/data/site";
import { treatments, packages, treatmentsNote } from "@/data/treatments";

const title = "Prezzi Massaggi Padova — Listino e Pacchetti";
const description =
  "Listino massaggi a Padova: prezzo a pacchetto valido per qualsiasi trattamento, da 1 a 10 sedute. Prenota online il tuo momento di benessere.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/prezzi-massaggi-padova" },
  openGraph: { title, description, url: `${site.url}/prezzi-massaggi-padova` },
};

export default function PrezziMassaggiPadovaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Prezzi massaggi Padova",
        item: `${site.url}/prezzi-massaggi-padova`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-ink px-6 py-32 text-cream md:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="editorial-container">
        <Link href="/" className="label-eyebrow text-sand hover:text-cream">
          &larr; Torna al sito
        </Link>

        <p className="label-eyebrow mb-6 mt-8 text-sand">Listino</p>
        <h1 className="max-w-3xl font-display text-5xl font-light leading-[1.1] sm:text-6xl">
          Prezzi massaggi a Padova
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg">
          A {site.city} il prezzo di {site.businessName}{" "}
          non dipende dal singolo trattamento scelto, ma dal percorso: un pacchetto di
          sedute pensato per chi vuole rendere il benessere un&apos;abitudine,
          non un&apos;eccezione. Ogni seduta dura un&apos;ora (il massaggio
          sportivo max 30 minuti), in un ambiente riservato e curato nei
          dettagli, su appuntamento.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {packages.map((p) => (
            <div
              key={p.sessions}
              className={`relative flex flex-col justify-between gap-6 rounded-2xl border px-6 py-8 ${
                p.featured
                  ? "border-muted-gold bg-warm-brown/25"
                  : "border-cream/15 bg-cream/[0.03]"
              }`}
            >
              <div>
                {p.featured ? (
                  <span className="label-eyebrow mb-3 block text-[0.6rem] text-muted-gold">
                    Il più scelto
                  </span>
                ) : null}
                <p className="label-eyebrow text-cream/60">{p.sessions}</p>
                <p className="mt-3 font-display text-3xl text-sand md:text-4xl">
                  {p.price}
                </p>
                {p.perSession ? (
                  <p className="mt-1 text-xs text-cream/45">{p.perSession}</p>
                ) : null}
              </div>
              <Link
                href="/#prenota"
                className="label-eyebrow self-start border-b border-sand/40 pb-1 text-cream transition-colors hover:border-sand hover:text-sand"
              >
                Prenota
              </Link>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-sm italic leading-relaxed text-sand/70">
          {treatmentsNote}
        </p>

        <div className="mt-20 max-w-2xl">
          <p className="label-eyebrow mb-4 text-sand">Trattamenti inclusi</p>
          <h2 className="font-display text-3xl font-light leading-[1.1] sm:text-4xl">
            Cosa comprende ogni pacchetto
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Il prezzo del pacchetto è lo stesso qualunque trattamento tu
            scelga tra questi — puoi anche alternarli tra una seduta e
            l&apos;altra:
          </p>
        </div>

        <ul className="mt-8 max-w-2xl space-y-6">
          {treatments.map((t) => (
            <li key={t.number} className="border-b border-cream/10 pb-6">
              <div className="flex items-baseline gap-3">
                <span className="label-eyebrow text-muted-gold">
                  {t.number}
                </span>
                <h3 className="font-display text-xl font-light">{t.title}</h3>
                <span className="label-eyebrow text-cream/45">
                  {t.duration}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">
                {t.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap items-center gap-4">
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
            Domande sui prezzi? Scrivi su WhatsApp
          </a>
        </div>

        <p className="mt-16 max-w-2xl text-xs leading-relaxed text-cream/40">
          {site.wellnessDisclaimer}
        </p>
      </div>
    </main>
  );
}
