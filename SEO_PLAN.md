# SEO_PLAN.md — Veronica Benessere

Strategia SEO locale per Padova e provincia. Scritta usando solo i dati
reali già presenti nel progetto (`data/site.ts`, `data/treatments.ts`) —
nessun nome di comune, recensione, prezzo o link inventato. Dove un dato
manca, è segnato esplicitamente come `TODO Bax`.

---

## 1. Obiettivo SEO

Essere trovati su Google (e sulle AI answer engine) da chi cerca massaggi
benessere a Padova e nei comuni limitrofi, e convertire quel traffico —
insieme a quello proveniente da Instagram/Facebook — in prenotazioni
tramite il calendario Cal.com già integrato nel sito.

Non è in scope in questa fase: Google Business Profile (vedi sezione 9,
fase futura), campagne a pagamento, link building esterno.

## 2. Keyword primarie

Le stesse già presenti nel brief (`CLAUDE.md`) e ora anche in
`app/layout.tsx` → `metadata.keywords`:

- massaggi Padova
- massaggio rilassante Padova
- massaggi benessere Padova

## 3. Keyword secondarie (intento specifico)

Aggiunte in questo giro, mappate 1:1 su contenuto reale già esistente
(trattamenti in `data/treatments.ts`), non su servizi inventati:

| Keyword | Intento | Pagina che la copre |
|---|---|---|
| massaggi vicino Padova | locale, "near me" | Home (`/`) — areaServed ampio |
| massaggi prezzo Padova | prezzo/comparazione | `/prezzi-massaggi-padova` |
| massaggio schiena collo Padova | dolore/tensione specifica | `/massaggio-schiena-collo-padova` (Massaggio Decontratturante) |
| massaggio rilassante Padova | relax generico | `/massaggio-rilassante-padova` (Massaggio Svedese) |
| massaggio decontratturante Padova | trattamento specifico | `/massaggio-schiena-collo-padova` + Home |
| massaggio drenante Padova | trattamento specifico | Home (Massaggio Drenaggio Linfatico, nessuna pagina dedicata per ora — vedi sezione 5) |
| centro massaggi Padova provincia | area estesa | Home (JSON-LD `areaServed`) |

**Area servita**: `site.areaServed = "Padova e provincia"` — usata in
`app/layout.tsx` (JSON-LD) e nelle pagine dedicate. Non sono stati
inventati nomi di comuni specifici (Limena, Vigonza, Rubano, ecc.): se
Bax vuole nominarli esplicitamente (più efficace per la ricerca locale
molto mirata), vanno confermati uno per uno — vedi checklist lancio.

## 4. Pagine create in questo giro

Tutte usano solo dati reali da `data/site.ts` / `data/treatments.ts`,
stesso design system del resto del sito (nessuna nuova estetica),
`BreadcrumbList` JSON-LD, CTA prenotazione + WhatsApp, disclaimer
benessere obbligatorio.

- **`/prezzi-massaggi-padova`** — listino pacchetti completo (dati reali
  da `packages`) + elenco trattamenti. Title: "Prezzi Massaggi Padova —
  Listino e Pacchetti".
- **`/massaggio-schiena-collo-padova`** — pagina dedicata mappata sul
  trattamento reale "Massaggio Decontratturante".
- **`/massaggio-rilassante-padova`** — pagina dedicata mappata sul
  trattamento reale "Massaggio Svedese".
- **`/prenota`** — landing page di conversione pura: stesso componente
  `CalEmbed` della home, per traffico da bio Instagram/Facebook o ads
  che deve atterrare dritto sul calendario senza scrollare tutto il sito.

## 5. Pagine valutate e NON create (con motivo)

- **`/massaggi-padova`** — scartata: duplicherebbe l'intento e buona
  parte del contenuto già coperto dalla homepage (che ha già title
  "Massaggi benessere a Padova"). Creare una pagina quasi identica alla
  home per la stessa keyword è il pattern "doorway page" che il brief
  chiede esplicitamente di evitare. La homepage resta la pagina
  canonica per "massaggi Padova".
- **`/regala-massaggio-padova`** — scartata su indicazione di Bax:
  presupponeva un prodotto (buono regalo) non confermato come reale nei
  dati del progetto. Da riconsiderare se in futuro Bax conferma di
  vendere/gestire buoni regalo (anche solo "prenota un pacchetto come
  regalo, scrivimi su WhatsApp").
- **`/contatti`** — non creata: il footer (sempre presente in ogni
  pagina) e la sezione Location già coprono indirizzo/telefono/email/
  WhatsApp/mappa. Valore aggiunto marginale per una pagina dedicata su
  un sito one-page. Da riconsiderare solo se serve un URL specifico da
  linkare (es. da Google Business Profile in futuro).
- **Pagine per "Massaggio Drenaggio Linfatico" / "Massaggio Sportivo" /
  "Massaggio Miofasciale"** — non create in questo giro per contenere lo
  scope a quanto richiesto; sono comunque già indicizzabili come parte
  del contenuto della homepage (`#trattamenti`) e dello schema `Service`
  in JSON-LD. Possibile prossimo passo se le prime pagine dedicate
  portano traffico.

## 6. Struttura contenuti (pattern usato per ogni pagina dedicata)

1. Eyebrow + H1 con keyword primaria della pagina
2. Paragrafo con dati reali (durata, descrizione trattamento) + un
   secondo paragrafo di contesto/beneficio (senza claim medici)
3. Blocco prezzo "a partire da" con link al listino completo
4. CTA doppia: "Prenota il tuo momento" (→ `/#prenota`) + WhatsApp
5. Disclaimer benessere in fondo

## 7. Titoli e meta description (già impostati nel codice)

| Pagina | Title | Meta description |
|---|---|---|
| `/` | Massaggi benessere a Padova \| Veronica Benessere | Massaggi rilassanti e trattamenti benessere su appuntamento a Padova e provincia. Prenota online in pochi click, conferma immediata via calendario. |
| `/prezzi-massaggi-padova` | Prezzi Massaggi Padova — Listino e Pacchetti | Listino massaggi a Padova: prezzo a pacchetto valido per qualsiasi trattamento, da 1 a 10 sedute. Prenota online il tuo momento di benessere. |
| `/massaggio-schiena-collo-padova` | Massaggio Schiena e Collo a Padova — Decontratturante | Massaggio decontratturante per schiena e collo a Padova: pressione profonda sulle zone contratte per allentare nodi muscolari e rigidità accumulata. Su appuntamento. |
| `/massaggio-rilassante-padova` | Massaggio Rilassante a Padova — Massaggio Svedese | Massaggio rilassante a Padova: manovre ampie e fluide per sciogliere le tensioni superficiali e ritrovare un respiro più lento. Su appuntamento, in ambiente riservato. |
| `/prenota` | Prenota un Massaggio a Padova | Prenota online il tuo massaggio a Padova: scegli giorno e orario dal calendario, conferma immediata via email. Oppure scrivi su WhatsApp per domande rapide. |

Per cambiarli: ogni file `app/<slug>/page.tsx` ha una costante `title`/
`description` in cima al file.

## 8. Posizionamento commerciale (percezione valore, non prezzo basso)

Le pagine prezzo non aprono con "prezzi bassi" ma con il concetto di
percorso/rituale ("il prezzo non dipende dal singolo trattamento ma dal
percorso"), coerente con la richiesta di comunicare valore senza
sembrare cheap. I prezzi restano chiari e visibili (nessun prezzo
nascosto), ma il framing è sul percorso di sedute, l'ambiente riservato
e l'attenzione personale — non sul risparmio.

Per alzare i prezzi in futuro senza toccare la comunicazione: basta
cambiare i valori in `data/treatments.ts` → `packages`. Nessun testo
nelle pagine dedicate cita cifre hardcoded al di fuori di quell'array
(tranne `startingPackage.price`, che le legge dinamicamente).

## 9. Attività in casa — come viene comunicata

Su richiesta esplicita di Bax, **l'indirizzo reale resta pubblico**
(mappa + JSON-LD), quindi qui non è stato applicato il pattern "zona
indicativa, dettagli dopo prenotazione" proposto come opzione. Il
linguaggio usato nelle pagine ("ambiente riservato e curato", "spazio
tranquillo su appuntamento") resta comunque quello elegante richiesto,
indipendentemente dalla scelta sulla visibilità dell'indirizzo — utile
se in futuro si volesse cambiare idea senza riscrivere tutti i testi.

## 10. Instagram / Facebook → sito

- **Instagram**: handle ancora placeholder (`@nomeprofilo` in
  `data/site.ts`). Finché resta così, il JSON-LD **non** lo pubblica in
  `sameAs` (fix tecnico di questo giro: pubblicare un profilo falso in
  dati strutturati è peggio che non pubblicarlo). Appena Bax conferma
  l'handle reale, aggiornare `data/site.ts` → `instagram.handle` e
  `instagram.url`: compare automaticamente ovunque, JSON-LD incluso.
- **Facebook**: non esisteva nessun campo nel progetto. Aggiunto un
  placeholder vuoto `data/site.ts` → `facebook.url` — se Bax fornisce il
  link, va incollato lì; finché è vuoto non viene pubblicato da nessuna
  parte (stesso principio di sicurezza dell'Instagram placeholder).
  Nota: aggiungere un **bottone/link visibile** a Facebook nel sito (in
  footer o navbar) è una modifica di componente/estetica, fuori dallo
  scope di questo giro ("solo dati SEO") — il campo dati è pronto, il
  collegamento visivo è un passo separato da fare quando richiesto.
- **Pagina `/prenota`**: pensata apposta come landing pulita per il link
  in bio di Instagram/Facebook — atterra dritto sul calendario, senza
  dover far scrollare tutto il sito.
- **Anteprima social (Open Graph)**: manca `/public/assets/og-cover.jpg`
  (1200×630) — vedi checklist lancio, punto bloccante.

## 11. Recensioni / testimonianze

Nessuna recensione o testimonianza è presente nei dati del progetto:
non ne sono state inventate, e non è stato aggiunto uno schema
`AggregateRating`/`Review` (pubblicarlo senza recensioni reali sarebbe
un dato falso in JSON-LD, rischio anche di penalizzazione Google). Se
in futuro arrivano recensioni reali (Google, Instagram, dirette), vanno
aggiunte prima come contenuto reale sul sito, e solo dopo eventualmente
in JSON-LD.

## 12. Google Business Profile — fase futura

Non incluso nel piano operativo attuale, come richiesto. Quando si deciderà
di attivarlo: sincronizzare nome/indirizzo/telefono/orari esattamente
uguali a quelli di `data/site.ts` (coerenza NAP — Name/Address/Phone — è
un fattore diretto per il ranking locale), collegare le stesse foto/URL
usate sul sito, e valutare se aggiungere `hasMap`/coordinate reali al
JSON-LD solo a quel punto (mai inventarle prima).

## 13. Checklist tecnica

- [x] Title/description per home + 4 nuove pagine
- [x] Open Graph + Twitter Card (title/description dinamici, url corretto)
- [x] Canonical URL su ogni pagina
- [x] Sitemap aggiornata con le nuove pagine (privacy/cookie escluse, sono noindex)
- [x] robots.txt (nessuna modifica necessaria, era già corretto)
- [x] Heading H1 unico per pagina, gerarchia H1→H2→H3 verificata
- [x] Alt text immagini (unica `<img>` del sito è decorativa con `alt=""` corretto)
- [x] JSON-LD: `WebSite`, `HealthAndBeautyBusiness`/`LocalBusiness`, `Service` per trattamento, `BreadcrumbList` per le pagine dedicate
- [x] `areaServed` (Padova e provincia) invece di un singolo comune
- [x] `sameAs` non pubblica più profili social placeholder/vuoti
- [ ] **TODO Bax**: `og-cover.jpg` (1200×630) — bloccante per anteprime social decenti
- [ ] **TODO Bax**: dominio reale (`site.url` è ancora `nomeattivita.it`) — bloccante per canonical/sitemap/OG corretti
- [ ] **TODO Bax**: handle Instagram reale
- [ ] **TODO Bax**: link Facebook (se esiste)
- [ ] Da valutare: Core Web Vitals / Lighthouse reale (rimandato a quando ci sono asset fotografici definitivi, come già annotato in `BUILD_PROGRESS.md`)

## 14. Checklist lancio

1. Confermare dominio reale → aggiornare `data/site.ts` → `url`
2. Aggiungere `public/assets/og-cover.jpg`
3. Confermare/aggiornare handle Instagram (e link Facebook se esiste)
4. Verificare orari (`data/site.ts` → `hours`, attualmente marcati come
   placeholder nel commento del file anche se già usati nel sito)
5. Inviare la sitemap a Google Search Console una volta online
6. Testare i rich results con lo strumento ufficiale Google (Rich
   Results Test) sulle pagine con JSON-LD
7. Decidere se nominare esplicitamente i comuni limitrofi serviti (oltre
   a "Padova e provincia") — solo con conferma diretta di quali
8. Fase successiva, non bloccante: Google Business Profile (sezione 12)
