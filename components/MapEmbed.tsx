"use client";

import { useState } from "react";

type MapEmbedProps = {
  /** URL di embed di Google Maps. Se vuoto, mostra il placeholder "in arrivo". */
  embedSrc: string;
  /** Link esterno a Google Maps, sempre disponibile anche senza embed. */
  linkHref: string;
  city: string;
};

/**
 * Mappa "a facciata": finché l'utente non la chiede, si vede solo il
 * placeholder testurizzato e l'iframe di Google non esiste nel DOM.
 *
 * Due motivi, non uno.
 *
 * 1. Questo blocco vive dentro LocationSection, che è una StackedSection
 *    pinnata da ScrollTrigger. Il pin sposta l'elemento nel DOM a ogni
 *    refresh, e un <iframe> spostato nel DOM si ricarica da zero: è lo
 *    stesso meccanismo che faceva ricaricare in loop il calendario Cal.com
 *    in home (vedi il commento in BookingSection.tsx). Qui il danno era
 *    minore perché in questa sezione non ci sono campi di input, quindi
 *    niente tastiera virtuale: il refresh scattava in pratica solo al
 *    cambio di orientamento. Montando l'iframe solo su richiesta, quel
 *    ricaricamento diventa uno stato raro e voluto dall'utente, non un
 *    costo che ogni visitatore paga senza saperlo.
 * 2. L'embed di Google Maps è pesante e imposta cookie di terze parti al
 *    primo byte. Tenerlo fuori dal caricamento iniziale alleggerisce la
 *    pagina e non fa partire tracciamento che il visitatore non ha chiesto.
 *
 * Il link esterno "Apri in Google Maps" resta sempre visibile: chi vuole la
 * mappa vera in una scheda nuova non deve prima caricare l'embed.
 */
export default function MapEmbed({ embedSrc, linkHref, city }: MapEmbedProps) {
  const [shown, setShown] = useState(false);

  if (embedSrc && shown) {
    return (
      <iframe
        src={embedSrc}
        className="h-full w-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Mappa della zona di ${city}`}
      />
    );
  }

  return (
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
      {embedSrc ? (
        <>
          <span className="label-eyebrow text-sand">La zona</span>
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            La mappa si carica solo quando la apri, così la pagina resta
            leggera.
          </p>
          <button
            type="button"
            onClick={() => setShown(true)}
            className="label-eyebrow rounded-full border border-sand/50 px-7 py-3 text-cream transition-colors hover:bg-sand hover:text-ink"
          >
            Mostra la mappa
          </button>
        </>
      ) : (
        <>
          <span className="label-eyebrow text-sand">Mappa in arrivo</span>
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            Qui verrà mostrata la mappa dello studio a {city}.
          </p>
        </>
      )}

      <a
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="label-eyebrow border-b border-sand/50 pb-1 text-cream hover:border-cream"
      >
        Apri in Google Maps
      </a>
    </div>
  );
}
