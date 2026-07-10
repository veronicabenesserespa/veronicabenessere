"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import RevealText from "@/components/RevealText";
import { site } from "@/data/site";

type Variant = "mobile" | "desktop";

/**
 * Due video separati (non uno solo ridimensionato) perché le inquadrature
 * verticale/orizzontale sono girate diverse: su mobile si carica solo
 * hero-mobile.*, su desktop solo hero-desktop.* — mai entrambe insieme.
 * WebM (VP9) come sorgente primaria (~40% più leggero), mp4 (H.264) come
 * fallback per i browser senza supporto VP9.
 */
const VIDEO_SOURCES: Record<
  Variant,
  { webm: string; mp4: string; poster: string }
> = {
  mobile: {
    webm: "/assets/hero-mobile.webm",
    mp4: "/assets/hero-mobile.mp4",
    poster: "/assets/hero-poster-mobile.jpg",
  },
  desktop: {
    webm: "/assets/hero-desktop.webm",
    mp4: "/assets/hero-desktop.mp4",
    poster: "/assets/hero-poster-desktop.jpg",
  },
};

export default function Hero() {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const breakpoint = window.matchMedia("(max-width: 767px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyBreakpoint = () =>
      setVariant(breakpoint.matches ? "mobile" : "desktop");
    const applyMotion = () => setReduceMotion(motion.matches);

    applyBreakpoint();
    applyMotion();

    breakpoint.addEventListener("change", applyBreakpoint);
    motion.addEventListener("change", applyMotion);

    return () => {
      breakpoint.removeEventListener("change", applyBreakpoint);
      motion.removeEventListener("change", applyMotion);
    };
  }, []);

  const source = variant ? VIDEO_SOURCES[variant] : null;

  /**
   * Sequenza d'ingresso lenta e rilassata: il video (con l'incenso) e il
   * logo compaiono insieme per primi, poi una pausa per lasciarlo respirare
   * da solo prima che arrivino le scritte — vedi i delay via RevealText più
   * sotto e il reveal gemello del logo/bottone MENU in FullscreenMenu.tsx.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    if (reduceMotion) {
      gsap.set(video, { opacity: 1 });
      return;
    }

    gsap.fromTo(
      video,
      { opacity: 0 },
      { opacity: 1, duration: 2.4, delay: 0.1, ease: "power2.out" }
    );
  }, [source, reduceMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      {source &&
        (!videoFailed && !reduceMotion ? (
          <video
            ref={videoRef}
            key={variant}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(0.82) saturate(0.85) blur(0.5px)" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={source.poster}
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
          >
            <source src={source.webm} type="video/webm" />
            <source src={source.mp4} type="video/mp4" />
          </video>
        ) : (
          <img
            src={source.poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}

      {/* Fallback: gradiente premium verde/marrone, visibile sempre sotto al video */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 0%, var(--moss) 0%, var(--dark-brown) 48%, var(--ink) 100%)",
        }}
      />

      {/* Overlay scuro verde/marrone per leggibilità del testo: opacità che
          cresce in modo monotono dall'alto al basso (mai un punto più
          chiaro), così il contrasto col testo è garantito ovunque. L'ultimo
          stop è var(--ink) pieno, lo stesso colore di sfondo della sezione
          successiva, così la sfumatura finale si fonde senza cuciture. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,22,15,0.55) 0%, rgba(17,22,15,0.6) 30%, rgba(15,15,12,0.72) 55%, rgba(15,15,12,0.9) 80%, var(--ink) 100%)",
        }}
      />

      <div className="editorial-container relative z-10 w-full pb-24 pt-44 md:pb-28">
        <RevealText
          as="p"
          delay={2.2}
          start="top bottom"
          className="label-eyebrow mb-6 text-sand"
        >
          Rituali di benessere
        </RevealText>

        <h1 className="max-w-4xl font-display text-[15vw] font-light leading-[0.95] text-cream sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <RevealText
            as="span"
            openTracking
            delay={2.5}
            start="top bottom"
            className="block"
          >
            Il mondo può aspettare.
          </RevealText>
          <RevealText
            as="span"
            openTracking
            delay={2.85}
            start="top bottom"
            className="block italic text-sand"
          >
            Respira.
          </RevealText>
        </h1>

        <RevealText
          as="p"
          delay={3.3}
          start="top bottom"
          className="mt-8 max-w-md text-base leading-relaxed text-cream/80 md:text-lg"
        >
          Massaggi e trattamenti benessere a {site.city}, pensati per
          rallentare, sciogliere le tensioni e ritrovare il proprio ritmo, una
          seduta alla volta.
        </RevealText>

        <RevealText
          as="div"
          delay={3.8}
          start="top bottom"
          className="mt-10 inline-block"
        >
          <a
            href="#prenota"
            className="label-eyebrow rounded-full bg-muted-gold px-8 py-4 text-ink transition-transform hover:scale-[1.03]"
          >
            Prenota il tuo momento
          </a>
        </RevealText>
      </div>
    </section>
  );
}
