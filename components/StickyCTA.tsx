"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * CTA persistente: barra sticky "Prenota" in fondo su mobile. Il bottone
 * WhatsApp flottante è stato rimosso su richiesta di Bax (2026-07-10) — il
 * WhatsApp resta comunque raggiungibile dal footer, dal menu full-screen e
 * dalle sezioni Calendario/Location.
 *
 * Punta direttamente a /prenota (il calendario vero) e non all'ancora
 * #prenota: è il bottone "voglio prenotare adesso", mandarlo su una sezione
 * che poi richiede un secondo tap è attrito inutile.
 *
 * Su /prenota la barra si nasconde: è fixed a bottom-0 con z-40, quindi lì
 * coprirebbe i 64px inferiori dell'embed Cal.com, cioè proprio la zona dove
 * cade il bottone di conferma della prenotazione su schermi piccoli.
 */
export default function StickyCTA() {
  const pathname = usePathname();
  if (pathname === "/prenota") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-ink/95 backdrop-blur md:hidden">
      <Link
        href="/prenota"
        className="label-eyebrow flex h-16 items-center justify-center bg-muted-gold text-ink"
      >
        Prenota il tuo momento
      </Link>
    </div>
  );
}
