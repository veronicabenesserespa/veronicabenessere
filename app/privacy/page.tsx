import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.businessName}`,
  description: `Informativa sulla privacy di ${site.businessName}.`,
  robots: { index: false, follow: true },
};

// PLACEHOLDER: testo generico, da far verificare/redigere da un consulente
// legale/DPO prima della pubblicazione (D.Lgs. 196/2003, GDPR 2016/679).
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ink px-6 py-32 text-cream md:px-16">
      <div className="editorial-container">
        <Link href="/" className="label-eyebrow text-sand hover:text-cream">
          &larr; Torna al sito
        </Link>

        <h1 className="mt-8 font-display text-5xl font-light">
          Privacy Policy
        </h1>

        <div className="mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-cream/75">
          <p>
            Questa è una pagina segnaposto. Il testo definitivo
            dell&apos;informativa privacy deve essere redatto o verificato da
            un consulente legale o DPO in conformità al Regolamento (UE)
            2016/679 (GDPR) e alla normativa italiana applicabile.
          </p>
          <p>
            Titolare del trattamento: {site.businessName}, contattabile
            all&apos;indirizzo {site.email}.
          </p>
          <p>
            Dati raccolti: dati forniti volontariamente tramite form di
            contatto, WhatsApp o strumenti di prenotazione (nome, contatti,
            eventuali preferenze sul trattamento richiesto).
          </p>
          <p>
            Finalità: gestione delle richieste di informazioni e delle
            prenotazioni, comunicazioni relative agli appuntamenti.
          </p>
          <p>
            Diritti dell&apos;interessato: accesso, rettifica, cancellazione,
            limitazione, opposizione al trattamento, secondo quanto previsto
            dagli articoli 15-22 del GDPR.
          </p>
        </div>
      </div>
    </main>
  );
}
