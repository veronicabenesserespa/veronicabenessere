/**
 * CTA persistente: barra sticky "Prenota" in fondo su mobile. Il bottone
 * WhatsApp flottante è stato rimosso su richiesta di Bax (2026-07-10) — il
 * WhatsApp resta comunque raggiungibile dal footer, dal menu full-screen e
 * dalle sezioni Calendario/Location.
 */
export default function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-ink/95 backdrop-blur md:hidden">
      <a
        href="#prenota"
        className="label-eyebrow flex h-16 items-center justify-center bg-muted-gold text-ink"
      >
        Prenota il tuo momento
      </a>
    </div>
  );
}
