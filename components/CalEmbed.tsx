"use client";

import { useEffect, useId, useRef, useState } from "react";

type CalApi = {
  (...args: unknown[]): void;
  ns?: Record<string, CalApi>;
  q?: unknown[][];
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

type CalEmbedProps = {
  calLink: string;
  className?: string;
};

/**
 * Dopo quanto, senza iframe montato, si mostra il link di riserva verso
 * cal.com. Serve per i browser che bloccano gli iframe di terze parti o gli
 * script esterni (blocchi anti-tracciamento, browser in-app, estensioni):
 * lì l'embed non arriverà mai, e senza uscita l'utente resta davanti a un
 * "Caricamento calendario" infinito, senza modo di prenotare.
 */
const FALLBACK_DELAY_MS = 8000;

/**
 * Monta il calendario Cal.com inline usando lo script ufficiale
 * (https://app.cal.com/embed/embed.js) — nessun backend/database custom,
 * nessuna chiamata diretta a Google Calendar: tutta la
 * disponibilità/conferme sono gestite lato Cal.com (configurato a parte).
 *
 * IMPORTANTE: questo componente non va mai montato dentro una sezione
 * pinnata da ScrollTrigger. Il perché è spiegato per esteso in
 * components/BookingSection.tsx — in breve, il pin sposta l'elemento nel DOM
 * a ogni refresh e un iframe spostato nel DOM si ricarica da zero.
 */
export default function CalEmbed({ calLink, className = "" }: CalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  /**
   * id dell'elemento e namespace Cal.com univoci per istanza. Con un id
   * fisso e il namespace di default, due calendari sulla stessa pagina (o un
   * remount durante una navigazione client-side, che lascia `window.Cal` già
   * caricato e il namespace agganciato a un elemento ormai smontato) si
   * contendono lo stesso target: il secondo resta bloccato su "Caricamento
   * calendario" per sempre. Il replace è necessario perché useId produce
   * caratteri non validi dentro un selettore CSS (es. ":r0:").
   */
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const containerId = `cal-booking-${uid}`;
  const namespace = `booking${uid}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    setLoaded(false);
    setTimedOut(false);
    // Reset difensivo: evita doppio iframe se l'effect viene rieseguito
    // (React StrictMode in sviluppo, o un eventuale remount). replaceChildren
    // invece di innerHTML = "": stesso effetto, senza passare da un parser HTML.
    el.replaceChildren();

    // Snippet ufficiale Cal.com (embed.js): inietta lo script una sola
    // volta e mette in coda i comandi finché non è pronto.
    (function (C: Window, embedJsUrl: string, actionInit: string) {
      const push = (api: CalApi, args: unknown[]) => {
        (api.q = api.q || []).push(args);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: unknown[]) {
          const cal = C.Cal as CalApi;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const script = d.createElement("script");
            script.src = embedJsUrl;
            d.head.appendChild(script);
            cal.loaded = true;
          }
          if (args[0] === actionInit) {
            const namespace = args[1] as string;
            const api = ((...args2: unknown[]) => push(api, args2)) as CalApi;
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns = cal.ns || {};
              cal.ns[namespace] = cal.ns[namespace] || api;
              push(cal.ns[namespace], args);
              push(cal, ["initNamespace", namespace]);
            } else {
              push(cal, args);
            }
            return;
          }
          push(cal, args);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = window.Cal as CalApi;
    Cal("init", namespace, { origin: "https://cal.com" });

    // Se per qualche motivo il namespace non fosse disponibile, si ripiega
    // esattamente sul percorso di default già in produzione prima di questa
    // modifica (init senza namespace + inline sull'istanza principale): è
    // sicuro perché nell'app esiste una sola istanza di CalEmbed, e così il
    // caso peggiore di questa modifica è "come prima", non "rotto".
    let api = Cal.ns?.[namespace];
    if (!api) {
      Cal("init", { origin: "https://cal.com" });
      api = Cal;
    }

    api("inline", {
      elementOrSelector: `#${containerId}`,
      calLink,
      config: { layout: "month_view" },
    });
    api("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    let timer: number | undefined;

    const settle = () => {
      setLoaded(true);
      if (timer) window.clearTimeout(timer);
    };

    // subtree: true perché Cal.com inserisce prima un wrapper <cal-inline> e
    // solo dentro quello l'iframe: un observer sui soli figli diretti può
    // non vedere mai l'iframe comparire.
    const observer = new MutationObserver(() => {
      if (el.querySelector("iframe")) {
        settle();
        observer.disconnect();
      }
    });
    observer.observe(el, { childList: true, subtree: true });

    if (el.querySelector("iframe")) {
      settle();
      observer.disconnect();
    } else {
      timer = window.setTimeout(() => setTimedOut(true), FALLBACK_DELAY_MS);
    }

    return () => {
      observer.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [calLink, containerId, namespace]);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-cream ${className}`}>
      <div
        id={containerId}
        ref={containerRef}
        role="region"
        aria-label="Calendario di prenotazione"
        aria-busy={!loaded}
        className="min-h-[650px] w-full md:min-h-[700px]"
      />
      {!loaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-cream px-6 text-center"
          // Finché sta solo caricando non deve intercettare i click destinati
          // all'embed che sta comparendo sotto; quando invece mostra il link
          // di riserva, quel link deve essere cliccabile.
          aria-hidden={!timedOut}
          style={{ pointerEvents: timedOut ? "auto" : "none" }}
        >
          {timedOut ? (
            <>
              <p className="max-w-xs text-sm leading-relaxed text-warm-brown/80">
                Il calendario non si carica: il tuo browser potrebbe bloccare i
                contenuti esterni. Puoi aprirlo direttamente.
              </p>
              <a
                href={`https://cal.com/${calLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="label-eyebrow rounded-full bg-muted-gold px-7 py-3.5 text-ink"
              >
                Apri il calendario
              </a>
            </>
          ) : (
            <p className="label-eyebrow text-warm-brown/60">
              Caricamento calendario...
            </p>
          )}
        </div>
      )}
    </div>
  );
}
