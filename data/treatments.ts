// ============================================================================
// LISTINO TRATTAMENTI — dati reali dal catalogo "Veronica Massaggi".
// Il prezzo NON è per singolo trattamento: è a pacchetto (vedi `packages`
// sotto), uguale per qualsiasi trattamento scelto. L'ordine di `treatments`
// è l'ordine di visualizzazione nella sezione "Menu dei trattamenti".
// ============================================================================

export type Treatment = {
  number: string;
  title: string;
  duration: string;
  description: string;
  featured?: boolean;
};

export const treatments: Treatment[] = [
  {
    number: "01",
    title: "Massaggio Svedese",
    duration: "60 min",
    description:
      "Manovre ampie e fluide per sciogliere le tensioni superficiali e ritrovare un respiro più lento.",
  },
  {
    number: "02",
    title: "Massaggio Decontratturante",
    duration: "60 min",
    description:
      "Pressione più profonda sulle zone contratte, per allentare nodi muscolari e rigidità accumulata.",
  },
  {
    number: "03",
    title: "Massaggio Drenaggio Linfatico",
    duration: "60 min",
    description:
      "Movimenti leggeri e ritmici pensati per alleggerire gambe e sistema linfatico.",
  },
  {
    number: "04",
    title: "Massaggio Sportivo",
    duration: "Max 30 min",
    description:
      "Trattamento mirato e intenso su una zona specifica, pensato per chi si allena con costanza.",
  },
  {
    number: "05",
    title: "Massaggio Miofasciale",
    duration: "60 min",
    description:
      "Lavoro lento sui tessuti profondi, per sciogliere le tensioni croniche e restituire mobilità.",
  },
];

// Nota mostrata sotto l'elenco trattamenti.
export const treatmentsNote =
  "Ogni seduta dura un'ora, tranne il massaggio sportivo (max 30 minuti). I trattamenti sono intercambiabili all'interno dei pacchetti, anche se è consigliato seguire un percorso continuativo. Tutti eseguiti con oli professionali, in un ambiente confortevole e rilassante.";

export type TreatmentPackage = {
  sessions: string;
  price: string;
  perSession?: string;
  featured?: boolean;
};

// Prezzo a pacchetto: valido per qualunque trattamento tra quelli sopra.
export const packages: TreatmentPackage[] = [
  { sessions: "1 seduta", price: "€40" },
  { sessions: "3 sedute", price: "€100", perSession: "≈ €33 / seduta" },
  {
    sessions: "5 sedute",
    price: "€160",
    perSession: "€32 / seduta",
    featured: true,
  },
  { sessions: "10 sedute", price: "€300", perSession: "€30 / seduta" },
];
