// ============================================================================
// DATI DEL SITO — modifica qui nome, contatti, indirizzo, social e booking.
// Nessun altro file dovrebbe contenere questi valori "hardcoded".
// ============================================================================

export const site = {
  // TODO Bax: dominio reale non ancora confermato. Finché resta questo
  // placeholder, canonical URL, sitemap, robots e Open Graph puntano tutti
  // a un indirizzo che non esiste — vanno tutti aggiornati automaticamente
  // (leggono tutti da qui) appena il dominio vero è deciso/acquistato.
  url: "https://www.nomeattivita.it",

  // Nome dell'attività, mostrato in navbar, footer e metadata
  businessName: "Veronica Benessere",

  // Nome della massaggiatrice/operatrice, mostrato in intro e footer
  operatorName: "Veronica",

  // Città e claim brevissimo usato in SEO e hero
  city: "Padova",
  claim: "Massaggi benessere a Padova",

  // Area servita per SEO locale (JSON-LD areaServed + copy delle pagine
  // dedicate). "Provincia di Padova" è un'entità geografica reale, non un
  // elenco di comuni inventato — copre in modo onesto un raggio ampio
  // senza dichiarare copertura di paesi specifici mai confermati da Bax.
  areaServed: "Padova e provincia",

  phone: "+39 380 753 4917",
  phoneHref: "tel:+393807534917",
  email: "veronicabenesserespa@gmail.com",

  // WhatsApp reale (dal catalogo Veronica Massaggi)
  whatsappNumber: "393807534917",
  whatsappMessage: "Ciao! Vorrei avere informazioni sui trattamenti.",

  // Indirizzo — SOLO città/CAP sono pubblici (mappa, JSON-LD, sezione
  // "Dove trovarmi", footer): via e civico non vengono più stampati da
  // nessun componente di questo sito, su richiesta esplicita di Bax
  // (2026-07-11) per motivi di privacy. La via/civico esatti restano solo
  // come nota qui sotto per Bax stesso — l'indirizzo preciso va comunicato
  // al cliente unicamente nella mail di conferma prenotazione, configurata
  // lato Cal.com (vedi BUILD_PROGRESS.md per la procedura passo-passo).
  //
  // Via/civico reali (NON usare in nessun componente pubblico):
  // Via Guglielmo Marconi 35
  address: {
    city: "Cadoneghe",
    province: "PD",
    postalCode: "35010",
    parking: "Parcheggio disponibile in via/piazza indicativa nelle vicinanze.",
    transport: "A 5 minuti a piedi dalla fermata del tram / autobus più vicina.",
    // Query a livello di città (non via/civico): la mappa mostra l'area di
    // Cadoneghe, non un pin sulla porta di casa.
    mapsEmbedSrc:
      "https://www.google.com/maps?q=Cadoneghe+PD,+Italia&output=embed",
    mapsLinkHref:
      "https://www.google.com/maps/search/?api=1&query=Cadoneghe+PD,+Italia",
  },

  // Instagram reale confermato da Bax (2026-07-11).
  instagram: {
    handle: "@veronica.benessere",
    url: "https://www.instagram.com/veronica.benessere",
  },

  // TODO Bax: link della pagina Facebook, se esiste. Finché resta vuota,
  // non viene pubblicata da nessuna parte (JSON-LD sameAs la salta).
  facebook: {
    url: "",
  },

  // Orari — placeholder
  hours: [
    { day: "Lunedì – Venerdì", time: "9:00 – 19:00" },
    { day: "Sabato", time: "9:00 – 13:00" },
    { day: "Domenica", time: "Chiuso" },
  ],

  // Info pratiche mostrate nella sezione prenotazione
  booking: {
    duration: "I trattamenti durano un'ora, tranne il massaggio sportivo (max 30 minuti).",
    buffer: "Tra un appuntamento e l'altro è previsto un tempo di pausa per preparare lo spazio.",
    cancellation: "Le cancellazioni sono gratuite fino a 12 ore prima dell'appuntamento.",
    // Slug Cal.com reale (formato "utente/tipo-evento", confermato da Bax).
    // Usato da components/CalEmbed.tsx in BookingSection per montare il
    // calendario, e da app/prenota/page.tsx per la pagina di booking dedicata.
    // Per cambiarlo: sostituisci solo questo valore.
    calLink: "veronica-benessere/massaggio-1-ora",
    provider: "Cal.com",
  },

  // Legale
  vatOrFiscalCode: "",

  // Disclaimer benessere (obbligatorio, non rimuovere)
  wellnessDisclaimer:
    "I trattamenti proposti sono orientati al benessere e al relax e non sostituiscono prestazioni mediche, fisioterapiche o sanitarie.",
} as const;

export const socialLinks = {
  whatsappHref: `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    site.whatsappMessage
  )}`,
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Trattamenti", href: "#trattamenti" },
  { label: "Prenota", href: "#prenota" },
  { label: "Dove siamo", href: "#dove-siamo" },
  { label: "Instagram", href: "#instagram" },
  { label: "Contatti", href: "#contatti" },
] as const;
