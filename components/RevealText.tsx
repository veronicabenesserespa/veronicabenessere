"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Il letter-spacing si "apre" leggermente durante il reveal (per titoli/eyebrow). */
  openTracking?: boolean;
  start?: string;
  /** Asse del reveal: "up" (default, y 24->0) o "right" (x 48->0, per liste
   * che compaiono da destra a sinistra, es. l'elenco trattamenti). */
  direction?: "up" | "right";
};

/**
 * Reveal editoriale: opacity 0->1, blur 8px->0, allo scroll in viewport,
 * con offset verticale (default) oppure orizzontale da destra (direction="right").
 * Con openTracking=true il letter-spacing passa da leggermente stretto a normale.
 */
export default function RevealText({
  as = "div",
  children,
  className = "",
  delay = 0,
  openTracking = false,
  start = "top 85%",
  direction = "up",
}: RevealTextProps) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, filter: "blur(0px)" });
      return;
    }

    const axisFrom = direction === "right" ? { x: 48 } : { y: 24 };
    const axisTo = direction === "right" ? { x: 0 } : { y: 0 };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          ...axisFrom,
          filter: "blur(8px)",
          letterSpacing: openTracking ? "-0.01em" : undefined,
        },
        {
          opacity: 1,
          ...axisTo,
          filter: "blur(0px)",
          letterSpacing: openTracking ? "0em" : undefined,
          duration: 1.9,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, openTracking, start, direction]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
