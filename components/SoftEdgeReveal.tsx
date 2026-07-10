"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SoftEdgeRevealProps = {
  as?: ElementType;
  id?: string;
  children: ReactNode;
  className?: string;
  /** Raggio di partenza, molto più morbido del raggio "a riposo" definito dalle classi Tailwind (es. rounded-xl/rounded-2xl). Se è impostato radiusVar, è invece solo il valore di partenza di quella custom property (es. "11rem"). */
  from?: string;
  /**
   * Nome della custom property CSS da animare (es. "--dome-y") invece del
   * border-radius diretto — necessario per i bordi ellittici stile
   * "cupola" (vedi `.section-dome` in globals.css): GSAP non riesce a
   * interpolare in modo affidabile la sintassi "/ N N 0 0" dentro la
   * shorthand border-radius, ma anima correttamente una singola custom
   * property numerica. Se omesso, si comporta come prima (tween diretto
   * di border-radius), usato dalle card interne (calendario, mappa).
   */
  radiusVar?: string;
  delay?: number;
  duration?: number;
};

/**
 * Bordi soft in stile editoriale spa: il container entra con un border-radius
 * molto morbido/largo e si "stringe" fino al raggio definitivo (quello già
 * impostato via className, es. rounded-2xl) quando la sezione entra in
 * viewport. Il valore finale viene letto dallo stile calcolato, così la
 * classe Tailwind resta l'unica fonte di verità per il raggio a riposo.
 */
export default function SoftEdgeReveal({
  as = "div",
  id,
  children,
  className = "",
  from = "4rem",
  radiusVar,
  delay = 0,
  duration = 1.9,
}: SoftEdgeRevealProps) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const fromVars = radiusVar
      ? { [radiusVar]: from }
      : { borderRadius: from };
    const toVars = radiusVar
      ? { [radiusVar]: getComputedStyle(el).getPropertyValue(radiusVar).trim() }
      : { borderRadius: getComputedStyle(el).borderRadius };

    const ctx = gsap.context(() => {
      gsap.fromTo(el, fromVars, {
        ...toVars,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [from, radiusVar, delay, duration]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
