"use client";

import { useEffect, useRef, useState } from "react";

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

const CONTAINER_ID = "cal-booking";

/**
 * Monta il calendario Cal.com inline dentro #cal-booking usando lo script
 * ufficiale (https://app.cal.com/embed/embed.js) — nessun backend/database
 * custom, nessuna chiamata diretta a Google Calendar: tutta la
 * disponibilità/conferme sono gestite lato Cal.com (configurato a parte).
 */
export default function CalEmbed({ calLink, className = "" }: CalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    setLoaded(false);
    // Reset difensivo: evita doppio iframe se l'effect viene rieseguito
    // (React StrictMode in sviluppo, o un eventuale remount).
    el.innerHTML = "";

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
    Cal("init", { origin: "https://cal.com" });
    Cal("inline", {
      elementOrSelector: `#${CONTAINER_ID}`,
      calLink,
      layout: "month_view",
    });
    Cal("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    const observer = new MutationObserver(() => {
      if (el.querySelector("iframe")) {
        setLoaded(true);
        observer.disconnect();
      }
    });
    observer.observe(el, { childList: true });

    return () => observer.disconnect();
  }, [calLink]);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-cream ${className}`}>
      <div
        id={CONTAINER_ID}
        ref={containerRef}
        role="region"
        aria-label="Calendario di prenotazione"
        aria-busy={!loaded}
        className="min-h-[650px] w-full md:min-h-[700px]"
      />
      {!loaded && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cream"
        >
          <p className="label-eyebrow text-warm-brown/60">
            Caricamento calendario...
          </p>
        </div>
      )}
    </div>
  );
}
