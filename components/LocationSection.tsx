import RevealText from "@/components/RevealText";
import SoftEdgeReveal from "@/components/SoftEdgeReveal";
import StackedSection from "@/components/StackedSection";
import { site, socialLinks } from "@/data/site";

export default function LocationSection() {
  const details = [
    { label: "Indirizzo", value: `${site.address.line1}, ${site.address.line2}` },
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
            In Google Maps: Condividi > Incorpora una mappa > copia l'URL
            dentro il src dell'iframe (o valorizza address.mapsEmbedSrc in
            data/site.ts). Finché resta vuoto, viene mostrato un placeholder.
          */}
          <SoftEdgeReveal className="relative aspect-[4/3] overflow-hidden rounded-xl border border-cream/15 bg-warm-brown/40 md:aspect-auto">
            {site.address.mapsEmbedSrc ? (
              <iframe
                src={site.address.mapsEmbedSrc}
                className="h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa dello studio"
              />
            ) : (
              <div
                className="flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-4 p-8 text-center"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--cream) 1px, transparent 1px), linear-gradient(90deg, var(--cream) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  backgroundColor: "var(--warm-brown)",
                  backgroundPosition: "center",
                  opacity: 0.98,
                }}
              >
                <span className="label-eyebrow text-sand">
                  Mappa in arrivo
                </span>
                <p className="max-w-xs text-sm text-cream/70">
                  Qui verrà mostrata la mappa dello studio a {site.city}.
                </p>
                <a
                  href={site.address.mapsLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-eyebrow border-b border-sand/50 pb-1 text-cream hover:border-cream"
                >
                  Apri in Google Maps
                </a>
              </div>
            )}
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
