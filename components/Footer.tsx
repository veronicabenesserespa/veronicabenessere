import RevealText from "@/components/RevealText";
import SoftEdgeReveal from "@/components/SoftEdgeReveal";
import { site, socialLinks } from "@/data/site";

/**
 * Instagram è stato unito al footer (2026-07-10, richiesta Bax): stesso
 * colore beige, nessuna cuciture tra i due — ma resta un blocco proprio,
 * tipograficamente definito, in cima al footer, non solo una riga persa
 * tra i contatti. Le 3 foto preview sono state tolte: senza gli asset
 * reali mostravano solo placeholder trasparenti, "quella casella che
 * vedo trasparente" secondo il feedback di Bax.
 */
export default function Footer() {
  return (
    // Fondale color-dark-brown (colore di Location, la sezione prima):
    // gli angoli arrotondati animati sotto rivelano questo colore invece
    // del nero del body, anche per un istante durante il reveal.
    <div style={{ backgroundColor: "var(--dark-brown)" }}>
      <SoftEdgeReveal
        as="footer"
        id="contatti"
        className="section-dome relative overflow-hidden bg-cream-soft text-ink"
        radiusVar="--dome-y"
        from="11rem"
      >
        <div className="editorial-container relative py-20 md:py-24">
          <div
            id="instagram"
            className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
          >
            <div className="max-w-xl">
              <p className="label-eyebrow mb-6 text-warm-brown">Instagram</p>
              <RevealText
                as="h2"
                className="font-display text-4xl font-light leading-[1.1] text-dark-brown sm:text-5xl md:text-6xl"
              >
                Cosa succede qui
              </RevealText>
              <RevealText
                as="p"
                delay={0.15}
                className="mt-6 max-w-md text-base leading-relaxed text-warm-brown/80 md:text-lg"
              >
                Piccoli rituali, angoli di calma e disponibilità della
                settimana.
              </RevealText>
            </div>

            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="label-eyebrow shrink-0 rounded-full bg-dark-brown px-8 py-4 text-cream transition-transform hover:scale-[1.03]"
            >
              Seguimi su Instagram &middot; {site.instagram.handle}
            </a>
          </div>

          <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-4 md:gap-6">
            <div>
              <p className="font-display text-2xl text-dark-brown">
                {site.businessName}
              </p>
              <p className="mt-3 max-w-[220px] font-display text-base italic text-warm-brown/80">
                Il mondo può aspettare. Respira.
              </p>
            </div>

            <div>
              <p className="label-eyebrow mb-3 text-warm-brown">Contatti</p>
              <ul className="space-y-2 text-sm text-dark-brown/75">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="hover:text-dark-brown"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-dark-brown"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="label-eyebrow mb-3 text-warm-brown">Orari</p>
              <ul className="space-y-2 text-sm text-dark-brown/75">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-eyebrow mb-3 text-warm-brown">
                Informazioni
              </p>
              <ul className="space-y-2 text-sm text-dark-brown/75">
                <li>
                  <a href="/privacy" className="hover:text-dark-brown">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/cookie" className="hover:text-dark-brown">
                    Cookie
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 text-xs text-warm-brown/60 md:flex-row md:items-center md:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {site.businessName}. Tutti i
              diritti riservati.
            </p>
            <p className="max-w-md">{site.wellnessDisclaimer}</p>
          </div>
        </div>
      </SoftEdgeReveal>
    </div>
  );
}
