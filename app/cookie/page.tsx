import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Cookie Policy | ${site.businessName}`,
  description: `Informativa sui cookie di ${site.businessName}.`,
  robots: { index: false, follow: true },
};

// PLACEHOLDER: da aggiornare in base ai cookie/servizi terzi effettivamente
// usati in produzione (es. Google Maps embed, Cal.com/Calendly embed, pixel
// pubblicitari). Verificare con un consulente legale prima della pubblicazione.
export default function CookiePage() {
  return (
    <main className="min-h-screen bg-ink px-6 py-32 text-cream md:px-16">
      <div className="editorial-container">
        <Link href="/" className="label-eyebrow text-sand hover:text-cream">
          &larr; Torna al sito
        </Link>

        <h1 className="mt-8 font-display text-5xl font-light">
          Cookie Policy
        </h1>

        <div className="mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-cream/75">
          <p>
            Questa è una pagina segnaposto. Il testo definitivo deve elencare
            in modo puntuale i cookie e i servizi di terze parti realmente
            attivi sul sito (ad esempio l&apos;embed della mappa o del
            calendario di prenotazione), con relative finalità e durata.
          </p>
          <p>
            Cookie tecnici: necessari al funzionamento del sito, non
            richiedono consenso.
          </p>
          <p>
            Servizi di terze parti previsti: Google Maps (visualizzazione
            mappa), Cal.com o Calendly (calendario di prenotazione). Questi
            servizi, quando attivi, possono impostare propri cookie secondo
            le rispettive informative.
          </p>
          <p>
            Per qualsiasi richiesta relativa ai cookie scrivi a{" "}
            {site.email}.
          </p>
        </div>
      </div>
    </main>
  );
}
