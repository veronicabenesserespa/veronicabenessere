"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type StackedSectionProps = {
  as?: ElementType;
  id?: string;
  /** Classi per il box esterno "fisso": solo posizione/dimensione/z-index, niente colore o border-radius (vedi backdropColor). */
  className?: string;
  /** Classi per il livello colorato con gli angoli arrotondati (bg-*, rounded-t-*, overflow-hidden). */
  colorClassName?: string;
  innerClassName?: string;
  children: ReactNode;
  /**
   * Altezza di partenza (molto più "alta"/morbida) della cupola durante
   * l'ingresso, prima di stringersi all'altezza a riposo definita dalla
   * custom property `--dome-y` di `.section-dome` in globals.css. È solo
   * il valore della custom property (es. "11rem"), non l'intero
   * border-radius: GSAP non riesce a interpolare in modo affidabile la
   * sintassi ellittica "/ N N 0 0" dentro la shorthand border-radius (la
   * appiattisce durante il tween), ma anima correttamente una singola
   * custom property numerica — il border-radius vero resta sempre
   * dichiarato in CSS statico, mai scritto da JS.
   */
  radiusFrom?: string;
  /**
   * Colore CSS (es. "var(--deep-green)") da mostrare esattamente dietro
   * agli angoli arrotondati, per tutta la durata del pin — non solo
   * durante l'ingresso. Necessario perché una volta agganciata, la
   * sezione precedente continua a scorrere via normalmente e non resta
   * lì a "fare da sfondo": senza questo fondale dedicato, gli angoli
   * arrotondati rivelano il nero del body per gran parte della lettura,
   * non solo per un istante in transizione.
   */
  backdropColor: string;
};

/**
 * Sezione "a stack" in stile editoriale spa: mentre scorre, la sezione
 * (1) entra da sotto con i bordi superiori che si stringono da radiusFrom
 * al raggio a riposo, poi (2) resta fissa in cima e il suo contenuto
 * scorre internamente finché non è stato letto tutto, e solo allora (3) si
 * sblocca e lascia spazio alla sezione successiva.
 *
 * Struttura a tre livelli (necessaria per evitare angoli neri):
 * - outer (pin target di GSAP): rettangolo pieno, colorato con
 *   `backdropColor`, MAI arrotondato — è quello che si vede dietro agli
 *   angoli tondi del livello sopra, sempre, indipendentemente da dove sia
 *   scorsa la sezione precedente nel frattempo.
 * - colorLayer: il colore vero della sezione + gli angoli arrotondati
 *   animati + overflow-hidden.
 * - inner: il wrapper che trasla verticalmente per far scorrere il
 *   contenuto durante il pin.
 */
export default function StackedSection({
  as = "section",
  id,
  className = "",
  colorClassName = "",
  innerClassName = "",
  children,
  radiusFrom = "11rem",
  backdropColor,
}: StackedSectionProps) {
  const Tag = as;
  const sectionRef = useRef<HTMLElement | null>(null);
  const colorLayerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const colorLayer = colorLayerRef.current;
    const inner = innerRef.current;
    if (!section || !colorLayer || !inner) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Con prefers-reduced-motion niente pin/scrub: flusso documento normale,
    // tutto il contenuto è raggiungibile con lo scroll nativo del browser.
    if (reduceMotion) return;

    const toDomeY = getComputedStyle(colorLayer)
      .getPropertyValue("--dome-y")
      .trim();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        colorLayer,
        { "--dome-y": radiusFrom },
        {
          "--dome-y": toDomeY,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 0.6,
          },
        }
      );

      // Una volta agganciata (pin), la cupola non ha più nulla da "rivelare"
      // dietro di sé — la sezione precedente è già scorsa via, sostituita
      // dal fondale di backdropColor. Senza questo, la curva resterebbe
      // visibile per l'intera durata della lettura (la sezione è fixed in
      // cima allo schermo per tutto quel tempo), sembrando "appiccicata"
      // in alto invece di essere solo un effetto di transizione in ingresso.
      // Si richiude a raggio 0 rapidamente, subito dopo l'aggancio.
      gsap.fromTo(
        colorLayer,
        { "--dome-y": toDomeY },
        {
          "--dome-y": "0px",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=240",
            scrub: 0.6,
          },
        }
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () =>
          "+=" + Math.max(inner.scrollHeight - window.innerHeight, 0),
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const dist = Math.max(inner.scrollHeight - window.innerHeight, 0);
          gsap.set(inner, { y: -dist * self.progress });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [radiusFrom]);

  return (
    <Tag
      ref={sectionRef}
      id={id}
      className={className}
      style={{ backgroundColor: backdropColor }}
    >
      <div ref={colorLayerRef} className={colorClassName}>
        <div ref={innerRef} className={innerClassName}>
          {children}
        </div>
      </div>
    </Tag>
  );
}
