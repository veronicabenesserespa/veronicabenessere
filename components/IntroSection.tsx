import RevealText from "@/components/RevealText";
import { site } from "@/data/site";
import { treatments } from "@/data/treatments";

export default function IntroSection() {
  return (
    <section className="relative bg-ink py-28 md:py-36">
      <div className="editorial-container relative">
        <div className="grid gap-20 md:grid-cols-12 md:items-start md:gap-16">
          <div className="md:col-span-5">
            <RevealText as="p" className="label-eyebrow mb-6 text-muted-gold">
              La filosofia
            </RevealText>
            <RevealText
              as="h2"
              delay={0.12}
              className="font-display text-4xl font-light leading-[1.1] text-cream sm:text-5xl md:text-6xl"
            >
              Un rituale lento, in uno spazio pensato solo per te.
            </RevealText>
            <RevealText
              as="p"
              delay={0.32}
              className="mt-8 max-w-md text-base leading-relaxed text-cream/70 md:text-lg"
            >
              {site.operatorName} accoglie ogni persona in uno spazio
              raccolto, con luce bassa, olii caldi e tempo dedicato. Non un
              servizio veloce, ma una pausa reale: dallo stress, dalla
              fatica e dal ritmo di tutti i giorni.
            </RevealText>
            <RevealText
              as="p"
              delay={0.48}
              className="mt-4 max-w-md text-sm leading-relaxed text-sand/70"
            >
              {site.wellnessDisclaimer}
            </RevealText>
          </div>

          <div className="md:col-span-7">
            <div
              className="rounded-3xl border border-moss/15 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12"
              style={{
                background:
                  "linear-gradient(160deg, rgba(66,94,64,0.14) 0%, rgba(24,37,27,0.26) 100%)",
              }}
            >
              <RevealText
                as="p"
                direction="right"
                className="label-eyebrow mb-6 text-muted-gold"
              >
                Specializzazioni di Veronica
              </RevealText>

              {treatments.map((t, i) => (
                <RevealText
                  key={t.number}
                  direction="right"
                  delay={0.15 + i * 0.09}
                  className="flex items-baseline gap-4 py-6 md:gap-6 md:py-7"
                >
                  <span className="label-eyebrow text-muted-gold">
                    {t.number}
                  </span>
                  <h3 className="font-display text-2xl font-light text-cream sm:text-3xl md:text-4xl">
                    {t.title}
                  </h3>
                </RevealText>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
