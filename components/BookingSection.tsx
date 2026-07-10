import RevealText from "@/components/RevealText";
import SoftEdgeReveal from "@/components/SoftEdgeReveal";
import StackedSection from "@/components/StackedSection";
import CalEmbed from "@/components/CalEmbed";
import { site, socialLinks } from "@/data/site";

export default function BookingSection() {
  const infoRows = [
    { label: "Durata appuntamenti", value: site.booking.duration },
    { label: "Tra un trattamento e l'altro", value: site.booking.buffer },
    { label: "Cancellazione", value: site.booking.cancellation },
  ];

  return (
    <StackedSection
      as="section"
      id="prenota"
      className="z-20 h-[100svh]"
      colorClassName="section-dome h-full overflow-hidden bg-cream text-ink"
      innerClassName="editorial-container relative py-28 md:py-36"
      backdropColor="var(--deep-green)"
    >
        <div className="max-w-2xl">
          <p className="label-eyebrow mb-6 text-warm-brown">Calendario</p>
          <RevealText
            as="h2"
            className="font-display text-4xl font-light leading-[1.1] text-dark-brown sm:text-5xl md:text-6xl"
          >
            Prenota il tuo momento
          </RevealText>
          <RevealText
            as="p"
            delay={0.15}
            className="mt-6 max-w-md text-base leading-relaxed text-warm-brown/80 md:text-lg"
          >
            Scegli giorno e orario. La conferma arriverà via email e
            l&apos;appuntamento verrà aggiunto al calendario.
          </RevealText>
        </div>

        <SoftEdgeReveal className="relative mt-14 overflow-hidden rounded-2xl border border-sand/60 bg-cream-soft md:mt-16">
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
        </SoftEdgeReveal>
    </StackedSection>
  );
}
