import MapEmbed from "@/components/MapEmbed";
import RevealText from "@/components/RevealText";
import SoftEdgeReveal from "@/components/SoftEdgeReveal";
import StackedSection from "@/components/StackedSection";
import { site, socialLinks } from "@/data/site";

export default function LocationSection() {
  const details = [
    {
      label: "Zona",
      value: `${site.address.postalCode} ${site.address.city} (${site.address.province})`,
    },
    { label: "Parcheggio", value: site.address.parking },
    { label: "Mezzi", value: site.address.transport },
  ];

  return (
    <StackedSection
      as="section"
      id="dove-siamo"
      className="z-30 h-[100svh]"
      colorClassName="section-dome h-full overflow-hidden bg-dark-brown text-cream"
      innerClassName="editorial-container relative pb-28 pt-14 md:pb-36 md:pt-16"
      backdropColor="var(--cream)"
    >
        <div className="max-w-2xl">
          <p className="label-eyebrow mb-6 text-sand">Location</p>
          <RevealText
            as="h2"
            className="font-display text-4xl font-light leading-[1.1] sm:text-5xl md:text-6xl"
          >
            Dove trovarmi
          </RevealText>
        </div>

        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-14">
          {/*
            GOOGLE MAPS EMBED
            Unica cosa da toccare: address.mapsEmbedSrc in data/site.ts
            (in Google Maps: Condividi > Incorpora una mappa > copia l'URL).
            Finché resta vuoto viene mostrato un placeholder "in arrivo".
            L'iframe vero è dentro MapEmbed e si monta solo al click: qui
            siamo dentro una sezione pinnata, e un iframe montato subito si
            ricaricherebbe a ogni refresh di ScrollTrigger. Il perché per
            esteso è in components/MapEmbed.tsx.
          */}
          <SoftEdgeReveal className="relative aspect-[4/3] overflow-hidden rounded-xl border border-cream/15 bg-warm-brown/40 md:aspect-auto">
            <MapEmbed
              embedSrc={site.address.mapsEmbedSrc}
              linkHref={site.address.mapsLinkHref}
              city={site.city}
            />
          </SoftEdgeReveal>

          <div className="flex flex-col justify-center gap-8">
            {details.map((d) => (
              <div key={d.label}>
                <p className="label-eyebrow mb-2 text-sand">{d.label}</p>
                <p className="max-w-sm text-sm leading-relaxed text-cream/75">
                  {d.value}
                </p>
              </div>
            ))}

            <a
              href={socialLinks.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="label-eyebrow inline-flex w-fit items-center gap-3 rounded-full bg-moss px-7 py-3.5 text-cream transition-transform hover:scale-[1.03]"
            >
              Scrivi su WhatsApp
            </a>
          </div>
        </div>
    </StackedSection>
  );
}
