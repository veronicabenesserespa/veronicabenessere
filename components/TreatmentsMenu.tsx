import RevealText from "@/components/RevealText";
import StackedSection from "@/components/StackedSection";
import { treatments, treatmentsNote, packages } from "@/data/treatments";

export default function TreatmentsMenu() {
  return (
    <StackedSection
      as="section"
      id="trattamenti"
      className="z-10 h-[100svh]"
      colorClassName="section-dome h-full overflow-hidden bg-deep-green text-cream"
      innerClassName="editorial-container relative py-28 md:py-36"
      backdropColor="var(--ink)"
    >
        <div className="max-w-2xl">
          <p className="label-eyebrow mb-6 text-sand">Listino</p>
          <RevealText
            as="h2"
            className="font-display text-4xl font-light leading-[1.1] sm:text-5xl md:text-6xl"
          >
            Menu dei trattamenti
          </RevealText>
          <RevealText
            as="p"
            delay={0.15}
            className="mt-6 max-w-md text-base leading-relaxed text-cream/70 md:text-lg"
          >
            Rituali semplici, tempo dedicato solo a te. Il prezzo dipende dal
            percorso scelto, non dal singolo trattamento.
          </RevealText>
        </div>

        <div className="mt-16 md:mt-20">
          {treatments.map((t) => (
            <div
              key={t.number}
              className="grid gap-4 py-9 md:grid-cols-12 md:items-center md:gap-6 md:py-10"
            >
              <span className="label-eyebrow text-muted-gold md:col-span-1">
                {t.number}
              </span>

              <div className="md:col-span-7">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-3xl font-light md:text-4xl">
                    {t.title}
                  </h3>
                  {t.featured ? (
                    <span className="label-eyebrow text-[0.6rem] text-sand/80">
                      Consigliato
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/55">
                  {t.description}
                </p>
              </div>

              <span className="label-eyebrow text-cream/55 md:col-span-2">
                {t.duration}
              </span>

              <a
                href="#prenota"
                className="label-eyebrow justify-self-start rounded-full border border-sand/40 px-6 py-3 text-center text-cream transition-colors hover:border-sand hover:bg-sand hover:text-ink md:col-span-2 md:justify-self-end"
              >
                Prenota
              </a>
            </div>
          ))}

          <RevealText
            as="p"
            className="mx-auto my-10 max-w-2xl text-center text-sm italic leading-relaxed text-sand/70 md:my-12"
          >
            {treatmentsNote}
          </RevealText>
        </div>

        <div className="mt-14 md:mt-16">
          <div className="max-w-xl">
            <p className="label-eyebrow mb-4 text-sand">Pacchetti</p>
            <RevealText
              as="h3"
              className="font-display text-3xl font-light leading-[1.1] sm:text-4xl"
            >
              Un percorso, non una seduta isolata.
            </RevealText>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4 md:gap-6">
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
                    <p className="mt-1 text-xs text-cream/45">
                      {p.perSession}
                    </p>
                  ) : null}
                </div>
                <a
                  href="#prenota"
                  className="label-eyebrow self-start border-b border-sand/40 pb-1 text-cream transition-colors hover:border-sand hover:text-sand"
                >
                  Prenota
                </a>
              </div>
            ))}
          </div>
        </div>
    </StackedSection>
  );
}
