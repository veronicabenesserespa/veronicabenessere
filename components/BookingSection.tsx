import Link from "next/link";
import RevealText from "@/components/RevealText";
import SoftEdgeReveal from "@/components/SoftEdgeReveal";
import StackedSection from "@/components/StackedSection";
import { site, socialLinks } from "@/data/site";

/**
 * ATTENZIONE — qui NON va montato <CalEmbed>, e in generale nessun <iframe>.
 *
 * Questa sezione è "pinnata" da ScrollTrigger (vedi StackedSection): per
 * pinnare, GSAP avvolge l'elemento in un `.pin-spacer`, e a ogni refresh
 * rimuove lo spacer e reinserisce l'elemento nel DOM per rimisurarlo. Un
 * <iframe> rimosso e reinserito nel DOM perde il proprio browsing context e
 * ricarica il documento da zero (comportamento da specifica HTML, non un bug
 * di GSAP: la stessa doc di GSAP avverte che non si può pinnare un elemento
 * con iframe figli senza che il frame si ricarichi).
 *
 * Su touch il refresh scatta quando l'altezza del viewport cambia oltre il
 * 25% (ScrollTrigger.js, `_ignoreMobileResize`): la barra degli indirizzi non
 * ci arriva, la tastiera virtuale di Android sì. Risultato del vecchio codice:
 * l'utente toccava un campo del form Cal.com, si apriva la tastiera, il
 * calendario si ricaricava, la tastiera si chiudeva, nuovo refresh, nuovo
 * reload. Loop infinito, form svuotato a metà, e prenotazioni doppie che
 * Cal.com rifiutava con HTTP 409. Su iOS la tastiera non tocca innerHeight,
 * quindi lì il bug non si vedeva.
 *
 * Il calendario vive solo in /prenota (app/prenota/page.tsx), che è una
 * pagina normale senza pin. Questa sezione ci porta.
 */
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
            Scegli giorno e orario dal calendario. La conferma arriverà via
            email e l&apos;appuntamento verrà aggiunto al calendario.
          </RevealText>
        </div>

        <SoftEdgeReveal className="relative mt-14 overflow-hidden rounded-2xl border border-sand/60 bg-cream-soft md:mt-16">
          <div className="grid md:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col justify-center gap-9 border-b border-sand/50 p-8 md:border-b-0 md:border-r md:p-12">
              <p className="max-w-md font-display text-3xl font-light leading-[1.2] text-dark-brown md:text-4xl">
                Le disponibilità sono sempre aggiornate. Tu scegli l&apos;ora,
                allo spazio penso io.
              </p>

              <div className="flex flex-col items-start gap-6">
                <Link
                  href="/prenota"
                  className="label-eyebrow rounded-full bg-muted-gold px-8 py-4 text-ink transition-transform hover:scale-[1.03]"
                >
                  Scegli giorno e orario
                </Link>
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
            </div>
          </div>
        </SoftEdgeReveal>
    </StackedSection>
  );
}
