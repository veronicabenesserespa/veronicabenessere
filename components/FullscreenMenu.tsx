"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { site, navLinks, socialLinks } from "@/data/site";

export default function FullscreenMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [barHidden, setBarHidden] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  /**
   * La barra logo/MENU non resta agganciata durante lo scroll: si vede
   * solo vicino alla cima della pagina, sparisce non appena si scrolla
   * (non "si nasconde scendendo e riappare salendo" come i header comuni —
   * qui esplicitamente non deve mai comparire mentre si scrolla).
   */
  useEffect(() => {
    let ticking = false;
    function update() {
      setBarHidden(window.scrollY > 80);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const linkItems = linksRef.current?.querySelectorAll("li");
    if (!overlay || !linkItems) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power4.inOut" },
    });

    if (reduceMotion) {
      tl.set(overlay, { clipPath: "circle(150% at 100% 0%)" }).set(
        linkItems,
        { opacity: 1, y: 0 }
      );
    } else {
      tl.set(overlay, { clipPath: "circle(0% at 100% 0%)" })
        .to(overlay, { clipPath: "circle(150% at 100% 0%)", duration: 1.1 })
        .fromTo(
          linkItems,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.09, ease: "power2.out" },
          "-=0.4"
        );
    }

    timelineRef.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  /**
   * In home, il logo compare presto (insieme al video della hero) e il
   * bottone MENU per ultimo, dopo il CTA — vedi la sequenza gemella in
   * Hero.tsx (stessi valori di delay, coordinati a mano perché sono due
   * componenti separati montati insieme al caricamento della pagina).
   * Sulle altre pagine (privacy/cookie, senza hero) restano visibili da
   * subito: aspettare 4s per vedere il bottone MENU lì sarebbe un problema
   * di usabilità, non un dettaglio "rilassante".
   */
  useEffect(() => {
    const logo = logoRef.current;
    const trigger = triggerRef.current;
    if (!logo || !trigger) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !isHome) {
      gsap.set([logo, trigger], { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logo,
        { opacity: 0, y: 12, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          delay: 0.2,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        trigger,
        { opacity: 0, y: 12, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          delay: 4.0,
          ease: "power2.out",
        }
      );
    });

    return () => ctx.revert();
  }, [isHome]);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.play();
    } else {
      tl.reverse();
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Barra superiore minimale: visibile solo vicino alla cima della
          pagina, sparisce durante lo scroll (mai agganciata/sticky). Resta
          sempre visibile mentre il menu full-screen è aperto. */}
      <div
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-500 ease-out md:px-12 md:py-9 ${
          barHidden && !isOpen
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }`}
      >
        <a
          ref={logoRef}
          href="#home"
          className="font-display text-xl tracking-wide text-cream md:text-2xl"
        >
          <span className="italic">{site.operatorName}</span>{" "}
          <span>{site.businessName.slice(site.operatorName.length).trim()}</span>
        </a>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="fullscreen-menu"
          aria-label={isOpen ? "Chiudi il menu" : "Apri il menu"}
          className="label-eyebrow flex h-11 items-center gap-3 rounded-full border border-cream/30 bg-ink/30 px-5 text-cream backdrop-blur-sm transition-colors hover:border-cream/70"
        >
          {isOpen ? "CHIUDI" : "MENU"}
        </button>
      </div>

      {/* Overlay full-screen */}
      <div
        id="fullscreen-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-deep-green px-6 py-24 md:px-16 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <nav className="flex flex-1 items-center">
          <ul ref={linksRef} className="flex flex-col gap-3 md:gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  tabIndex={isOpen ? 0 : -1}
                  className="font-display text-[13vw] font-light leading-[1.05] text-cream transition-colors hover:text-sand md:text-6xl lg:text-7xl"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 text-sand">
            <a
              href={socialLinks.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              className="label-eyebrow hover:text-cream"
            >
              WhatsApp
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              className="label-eyebrow hover:text-cream"
            >
              {site.instagram.handle}
            </a>
            <a
              href={site.phoneHref}
              tabIndex={isOpen ? 0 : -1}
              className="label-eyebrow hover:text-cream"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
