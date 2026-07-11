# BUILD_PROGRESS.md — Veronica Benessere one-page

File di salvataggio a blocchi. Aggiornalo (checkbox + note) ogni volta che si
chiude un blocco, così qualunque sessione futura sa esattamente da dove
riprendere senza dover indovinare. Riferimento di stile: `STYLE_REFERENCE.md`.

**Stato al 2026-07-09 (audit da codice, nessuna memoria di sessioni precedenti
disponibile — questo è il primo checkpoint scritto su disco).**

Legenda: ✅ fatto e verificato · ⚠️ fatto ma con dati placeholder/decisione
aperta · ❌ da fare.

---

## 0b. Quattordicesimo giro (2026-07-11, feedback Bax): favicon fiore di loto

✅ **Favicon originale creata** — Bax ha chiesto "un fiore di loto o qualcosa
da spa/benessere", senza fornire il file sorgente del monogramma reale visto
nel catalogo. Per evitare di copiare un asset di provenienza incerta
(possibile output di un altro tool generativo, vedi nota già presente nei
"Prossimi passi bloccanti" di questo file), ho **ridisegnato da zero** un
fiore di loto stilizzato: 5 petali (path SVG a mandorla, stessa forma
ruotata a -70/-35/0/35/70°) in `--sand` (#c7af8b, opacità scalata sui
petali esterni per profondità) con un accento centrale `--cream-soft`
(#f3ebd9), su un badge circolare `--deep-green` (#1f3423) — stessa palette
del sito, nessun colore nuovo introdotto.
✅ **File creati** (convenzione Next.js App Router, `app/**` file
conventions — vedi `node_modules/next/dist/docs/.../app-icons.md`):
- `app/icon.svg` — sorgente vettoriale, unica fonte di verità del disegno,
  serve direttamente i browser moderni (`<link rel="icon" ... type="image/
  svg+xml">`, crisp a qualunque dimensione).
- `app/favicon.ico` — rigenerato (sostituisce il default Next.js/triangolo
  rimasto dallo scaffold iniziale) via script una tantum con `sharp` (già
  una dipendenza del progetto, usata da `next/image`): rasterizza
  `icon.svg` a 16/32/48px e li incapsula in un container ICO scritto a mano
  (formato minimale, immagini PNG embedded direttamente — valido da Windows
  Vista in poi, nessuna libreria ICO esterna necessaria). Script temporaneo,
  non committato.
- `app/apple-icon.png` — 180×180, sfondo pieno (niente trasparenza, iOS
  applica la sua maschera), stessa fonte vettoriale.
✅ **Verificato**: build di produzione pulita, avviato `next start` e
controllato l'HTML reale — tutti e 3 i tag corretti in `<head>`
(`rel="icon"` su favicon.ico e icon.svg, `rel="apple-touch-icon"` su
apple-icon.png, content-type giusti). Controllo visivo del rendering a
16/32/180px: a 32px+ il fiore si legge chiaramente, a 16px non-retina
(rendering nativo, non upscalato) resta un badge verde con un accento
chiaro riconoscibile ma il dettaglio dei petali si perde — comportamento
normale per qualunque favicon dettagliato a quella risoluzione, non un
difetto di questo disegno specifico; sugli schermi retina (la maggioranza
del traffico mobile/desktop oggi) il browser renderizza l'SVG a
risoluzione più alta e il fiore resta leggibile.
⚠️ **Se in futuro arriva il file sorgente del monogramma reale** (SVG del
logo dal catalogo), questa favicon disegnata da zero va probabilmente
sostituita con quella per coerenza col logo ufficiale — per ora resta
un'interpretazione originale, non l'asset del brand reale.

---

## 0a. Tredicesimo giro (2026-07-11, feedback Bax): indirizzo privato, prezzi aggiornati

✅ **Indirizzo pubblico ridotto a solo città/CAP** — richiesta esplicita di
Bax: via e civico reali ("Via Guglielmo Marconi 35") non devono più comparire
in nessun punto pubblico del sito, resta visibile ovunque solo "35010
Cadoneghe (PD)". `data/site.ts`: `address` ristrutturato da `line1`/`line2`
liberi a campi tipati `city`/`province`/`postalCode` (single source of
truth, via/civico reali lasciati solo come commento per riferimento di
Bax, mai letti da nessun componente). Toccati 3 punti che leggevano
l'indirizzo:
- `components/LocationSection.tsx` — label "Indirizzo" → "Zona", valore ora
  "35010 Cadoneghe (PD)" invece di via+civico.
- `app/layout.tsx` (JSON-LD `LocalBusiness`) — rimosso `streetAddress`,
  `addressLocality` ora legge `site.address.city` ("Cadoneghe", il comune
  reale della sede) invece di `site.city` ("Padova", che è il claim
  SEO/area di mercato, non l'indirizzo legale — erano due cose diverse
  tenute erroneamente insieme prima di questo giro). Aggiunto `postalCode`
  (mancava). `addressRegion` ora legge `site.address.province` invece di
  essere hardcoded "PD" in due punti diversi.
- `data/site.ts` stesso — `mapsEmbedSrc`/`mapsLinkHref`: query cambiata da
  "Via Guglielmo Marconi 35, 35010 Cadoneghe PD" a "Cadoneghe PD, Italia".
  Non è solo testo: la mappa incorporata ora centra sulla città, senza pin
  sulla via/civico esatti — nascondere il testo dell'indirizzo ma lasciare
  il pin preciso sulla mappa avrebbe vanificato la richiesta.

⚠️ **Indirizzo preciso nella mail di conferma prenotazione — richiede
configurazione lato Cal.com, non codice**: il booking è interamente gestito
da Cal.com (embed in `components/CalEmbed.tsx`, nessun backend custom in
questo repo — vedi blocco 8). Le email di conferma le manda Cal.com, quindi
"mostra l'indirizzo solo dopo la prenotazione" si configura nella dashboard
Cal.com, non nel codice di questo sito. Procedura consigliata (verificare i
nomi esatti dei menu nel proprio account, l'interfaccia Cal.com cambia nel
tempo):
1. Cal.com → Event Types → l'evento usato dal sito (slug in
   `site.booking.calLink`, ora `"veronica-benessere/massaggio-1-ora"`) →
   tab **Location**.
2. Aggiungere location type **"In Person"/"In-person meeting"** e inserire
   l'indirizzo reale completo (Via Guglielmo Marconi 35, 35010 Cadoneghe
   PD). Se Cal.com espone un toggle tipo "Hide address until booking is
   confirmed" / "Only show location once booked", attivarlo: mostra
   l'indirizzo al cliente solo dopo la prenotazione (email + invito
   calendario), non sulla pagina pubblica di prenotazione.
3. **Se quel toggle non è disponibile sul piano/versione in uso** (metodo
   più affidabile, non dipende da un'opzione che potrebbe non esserci):
   lasciare la location dell'Event Type generica (es. solo "In Person"
   senza indirizzo, o "Da confermare") e usare **Workflows** di Cal.com →
   nuovo workflow, trigger "When new event is booked"/"Event confirmed" →
   azione "Send email to attendee" → corpo email personalizzato con
   l'indirizzo completo. Questo garantisce che il testo dell'indirizzo
   esista solo dentro l'email post-prenotazione, mai nella pagina pubblica
   dell'embed.
Non eseguibile da qui: è configurazione su un account SaaS esterno (Cal.com)
di cui non ho credenziali/accesso in questa sessione — da fare da Bax
direttamente nel suo dashboard Cal.com.

✅ **Prezzi pacchetti aggiornati** in `data/treatments.ts` (unica fonte,
letta da `components/TreatmentsMenu.tsx`, `app/prezzi-massaggi-padova/
page.tsx`, e da `app/massaggio-rilassante-padova/page.tsx` +
`app/massaggio-schiena-collo-padova/page.tsx` via `packages[0]` — quindi un
solo file toccato, tutte le pagine coerenti):
- 1 seduta: €30 → **€40**
- 3 sedute: €85 → **€100** (≈ €33/seduta, era ≈ €28/seduta)
- 5 sedute: €140 → **€160** (€32/seduta esatto, era €28/seduta)
- 10 sedute: €250 → **€300** (€30/seduta esatto, era €25/seduta)
Nessun prezzo per singolo trattamento nel JSON-LD (invariato, il prezzo è
sempre a pacchetto — vedi blocco 7).

✅ **Verificato**: `npm run build` pulito (zero errori TS, tutte le route
generate correttamente incluse le 2 pagine SEO che leggono `packages[0]`),
`npm run lint` pulito (solo il warning preesistente non correlato su
`<img>` in `Hero.tsx`).

---

## 0. Dodicesimo giro (2026-07-10, feedback Bax): SEO locale, zero modifiche estetiche

Richiesta esplicita: nessun cambiamento visivo, solo dati/metadata SEO
per rendere il sito trovabile online. Dettagli completi e checklist in
**`SEO_PLAN.md`** (nuovo file). Riepilogo:

✅ **Due decisioni chiarite con Bax prima di procedere** (entrambe
consequenziali, non decidibili in autonomia): indirizzo reale resta
pubblico (mappa + JSON-LD, nessuna modifica); pagina
`/regala-massaggio-padova` scartata perché presupponeva un prodotto
(buono regalo) non confermato nei dati del progetto.

✅ **`data/site.ts`**: aggiunto `areaServed: "Padova e provincia"` (area
geografica reale, non un elenco di comuni inventato) e `facebook: {url:
""}` (placeholder pronto, pubblicato solo quando valorizzato). Pulito un
commento TODO obsoleto sul `calLink` (il valore reale era già stato
inserito da Bax in un giro precedente, il commento diceva ancora
"sostituiscilo").

✅ **`app/layout.tsx`**: title/description home ampliati, `keywords`
esteso con le varianti di ricerca richieste (vicino Padova, prezzo
Padova, schiena collo Padova, ecc. — solo keyword, nessun dato
aziendale inventato). JSON-LD: aggiunto schema `WebSite`, tipo business
cambiato da solo `LocalBusiness` a `["HealthAndBeautyBusiness",
"LocalBusiness"]` (più specifico, resta valido come LocalBusiness),
aggiunto `areaServed`. `sameAs` ora pubblica un profilo social solo se è
reale: salta l'URL Instagram placeholder e il Facebook vuoto, invece di
dichiarare a Google un profilo che non esiste.

✅ **4 nuove pagine SEO**, stesso design system esistente (stessa
struttura di `/privacy`, nessuna nuova estetica), ognuna con
title/description/canonical/OG propri, `BreadcrumbList` JSON-LD, CTA
prenotazione + WhatsApp, disclaimer benessere:
- `/prezzi-massaggi-padova` — listino/pacchetti reali
- `/massaggio-schiena-collo-padova` — mappata sul trattamento reale "Decontratturante"
- `/massaggio-rilassante-padova` — mappata sul trattamento reale "Svedese"
- `/prenota` — landing di conversione pura, riusa `CalEmbed` (stesso componente della home)

Valutate e **scartate** (motivo in `SEO_PLAN.md` §5): `/massaggi-padova`
(duplicherebbe la home, pattern doorway page da evitare),
`/regala-massaggio-padova` (prodotto non confermato), `/contatti`
(valore marginale, già coperto da footer+Location).

✅ **`app/sitemap.ts`**: aggiunte le 4 nuove pagine, rimosse `/privacy` e
`/cookie` (hanno già `robots: {index:false}` nel proprio metadata — una
pagina noindex non dovrebbe stare in sitemap).

🐛 **Bug reale trovato e corretto durante la scrittura delle nuove
pagine**: in `/prezzi-massaggi-padova`, la frase "il prezzo di Veronica
Benessere non dipende..." veniva renderizzata senza lo spazio
("Benesserenon"). Causa: quando un'espressione JSX (`{site.businessName}`)
è seguita da uno spazio e poi il testo continua su più righe nel
sorgente, il compilatore JSX di questo progetto (Next.js/SWC) elimina lo
spazio iniziale di quel blocco di testo — un comportamento reale e
riproducibile (verificato campionando l'HTML/RSC generato dalla build di
produzione), non un typo. Fix: spazio esplicito via `{" "}` subito dopo
l'espressione. Controllate le altre 3 pagine nuove per lo stesso pattern
(espressione seguita da testo multi-riga): nessun altro caso trovato,
verificato campionando l'HTML compilato di ciascuna.

⚠️ **Non fatto in questo giro** (fuori scope esplicito, "solo dati SEO"):
nessun bottone/link visibile aggiunto per Facebook (il campo dati è
pronto in `data/site.ts`, ma aggiungerlo in UI è una modifica di
componente); nessuna modifica a Hero/Footer/IntroSection/ecc.

Note tecniche verificate: build di produzione pulita, lint pulito,
tutte e 4 le nuove pagine testate con Playwright (fresh install, rimosso
a fine test) — zero errori JS, calendario Cal.com montato correttamente
anche sulla route dedicata `/prenota`, titoli/H1 corretti su tutte.

📌 **Osservazione, non causata da me**: durante questo giro è comparso un
commit `1492b70 "Initial deploy"` sul branch `main` (autore
`imbacsii-ops`) che include tutto lo stato del progetto fino a quel
momento — non ho eseguito io nessun `git commit` in questa sessione
(per convenzione, committo solo su richiesta esplicita). Probabile
pipeline di deploy automatica o commit fatto da Bax in un altro
terminale. Le modifiche fatte *dopo* quel commit (il fix dello spazio
mancante) restano ancora non committate.

---

## 1. Brief strategico
✅ Brief completo ricevuto (AGENTS.md/CLAUDE.md + prompt esteso). Obiettivo:
lead gen (prenotazione), ICP definito nel brief, competitor Antara come
riferimento estetico (non copiato). `STYLE_REFERENCE.md` creato ora come
sintesi unica.

## 2. Architettura & UX
✅ One-page con anchor: `#home #trattamenti #prenota #dove-siamo #instagram
#contatti`. Nav in `data/site.ts` → `navLinks`. Regola 3-click rispettata
(tutto raggiungibile dalla home/menu full-screen).

## 3. Design system
✅ Palette hex esatta in `app/globals.css` (`:root` + `@theme inline`).
✅ Font Cormorant Garamond + Manrope caricati via `next/font/google` in
`app/layout.tsx`.
✅ Spacing/utility editoriali (`.editorial-container`, `.label-eyebrow`,
`.hairline`) definiti.
✅ Favicon originale (fiore di loto ridisegnato da zero, non il monogramma
del catalogo) generata il 2026-07-11 — vedi blocco 0b.

## 4. Componenti motion
✅ `AnimatedLine.tsx` — linee scaleX 0→1 con ScrollTrigger.
✅ `RevealText.tsx` — opacity/y/blur reveal + openTracking. Estesa
(2026-07-10) con prop `direction?: "up" | "right"` per i reveal orizzontali
(usata nell'elenco trattamenti di `IntroSection.tsx`).
✅ `ImageReveal.tsx` — clip-path mask reveal con fallback gradiente.
✅ `SoftEdgeReveal.tsx` (2026-07-10) — border-radius che parte molto morbido
(default 4rem) e si "stringe" fino al raggio a riposo definito dalla classe
Tailwind del container (letto via `getComputedStyle`, quindi resta l'unica
fonte di verità) quando entra in viewport. Ispirato alla grammatica visiva
di siti spa luxury editoriali (bordi soft che si assestano), non un clone
di codice/asset di terzi — vedi nota in `CLAUDE.md` sul non copiare Antara.
Usato in `BookingSection.tsx` (card calendario, 64px→16px) e
`LocationSection.tsx` (card mappa, 64px→12px).
✅ `FullscreenMenu.tsx` — clip-path circle expand, Esc + focus trap via
tabIndex, aria-modal, chiude su click link. Barra logo/MENU non sticky
(fade out dopo 80px di scroll, vedi blocco 4d).
❌ `SmoothScrollProvider.tsx` (Lenis) rimosso il 2026-07-10 — vedi blocco
4d. Lo scroll è nativo del browser; GSAP ScrollTrigger gestisce comunque
tutte le animazioni scroll-linked.
Tutti i componenti motion rispettano `prefers-reduced-motion` (verificato per
ognuno singolarmente).

## 4b. Layout a sezioni impilate ("sticky stack", 2026-07-10)
✅ Effetto "cards impilate" stile Antara: Hero + IntroSection restano il
livello base, normali, senza modifiche ("livello 1"). Da `TreatmentsMenu`
in poi ogni sezione è `position: sticky; top: 0` con `z-index` crescente
(z-10 Listino, z-20 Calendario, z-30 Location, z-40 Instagram, z-50
Footer) + angoli superiori arrotondati (`rounded-t-[1.75rem]
md:rounded-t-[3rem]`) + `overflow-hidden` (per far seguire alla
AnimatedLine in cima il bordo arrotondato) + `min-h-[100svh]` (tranne il
Footer, resta "stretto" come da brief originale). Effetto: mentre si
scrolla, ogni sezione resta fissa in cima finché la successiva non le
scivola sopra, con gli angoli tondi che lasciano intravedere il colore
della sezione precedente — nessun "buco di colore" perché la sezione sotto
resta letteralmente incollata lì (sticky), non è mai scrollata via del
tutto finché non viene coperta. Nessuna libreria nuova: solo CSS
`position: sticky` nativo, compatibile con Lenis (che smootha lo scroll
nativo della finestra senza wrapper a transform, quindi sticky funziona
normalmente). Verificato con screenshot a più punti di scroll, desktop e
mobile: il colore della sezione sotto è visibile correttamente dietro ogni
angolo arrotondato, catena Hero→Filosofia→Listino→Calendario→Location→
Instagram→Footer confermata end-to-end.
⚠️ Nota di leggibilità navbar: `FullscreenMenu.tsx` ha la barra superiore
fissa (`fixed`, fuori da questo sistema di stacking, sempre sopra a tutto)
con testo `text-cream` — ora che le sezioni chiare (Calendario `bg-cream`,
Instagram `bg-cream-soft`) restano "incollate" sotto la navbar più a lungo
grazie allo sticky stack, il problema di contrasto già segnalato il
2026-07-10 (testo chiaro su sfondo chiaro) è molto più visibile che prima.
Da sistemare se Bax conferma (es. navbar che inverte colore in base alla
sezione sotto, o un colore che funzioni ovunque).

✅ Rifinitura (2026-07-10, secondo giro, feedback Bax): la prima versione
aveva due problemi. (1) La sezione successiva iniziava a scivolare sopra
troppo presto, coprendo fino al 30% del contenuto della sezione corrente
prima che l'utente lo vedesse tutto. (2) Il raggio dei bordi era statico
(solo Tailwind), non "morbidissimo all'inizio e via via più stretto"
legato allo scroll come richiesto.
- **Fix (1) — buffer anti-copertura**: aggiunto uno spacer vuoto
  (`h-[160svh]`) in fondo a `TreatmentsMenu`, `BookingSection`,
  `LocationSection`, `InstagramSection` (non al Footer, resta compatto).
  La finestra di copertura della sezione successiva dura sempre esattamente
  1 viewport di scroll (da `top bottom` a `top top`), quindi uno spacer di
  1 viewport si "annullerebbe" quasi del tutto — serve più di 1 viewport
  per lasciare un margine vero. Verificato: ~680-780px di margine reale
  (contenuto sempre completamente visto) su tutte e 4 le transizioni,
  desktop e mobile.
- **Fix (2) — bordi in scrub**: `SoftEdgeReveal.tsx` esteso con prop
  `scrub?: boolean` — se true usa `scrollTrigger: { start: "top bottom",
  end: "top top", scrub: true }` invece del play-once precedente, quindi
  il border-radius segue in tempo reale la posizione di scroll (non un
  tween che parte una volta sola). Tutte e 5 le sezioni impilate (incluso
  il Footer) ora usano `<SoftEdgeReveal as="section" scrub from="8rem">`
  al posto del semplice `<section>` con classe statica — partono da un
  raggio molto morbido (8rem, si applica a tutti e 4 gli angoli, quindi
  all'inizio la card sembra quasi una pillola) e si stringono fino al
  raggio a riposo (`rounded-t-[1.75rem]`/`md:rounded-t-[3rem]`, letto
  automaticamente da `getComputedStyle` — nessun valore duplicato) man
  mano che la sezione scivola in posizione. Verificato campionando il
  border-radius calcolato a più punti di scroll (128px → 108/96 → 88/64 →
  68/32 → 48/0): interpolazione fluida e continua, non un salto.
- Il componente `SoftEdgeReveal` resta invariato per l'uso non-scrub sulle
  card interne (calendario in `BookingSection`, mappa in
  `LocationSection`), che continuano ad avere il loro reveal one-shot
  quando entrano in viewport la prima volta.

✅ **Fix architetturale (2026-07-10, terzo giro, feedback Bax)**: il vero
bug dietro "la pagina rimane bloccata a Massaggio Decontratturante".
`position: sticky` da solo NON fa scorrere il contenuto interno di un
elemento: una volta "agganciata" in cima, la sezione resta un fotogramma
fisso — qualunque contenuto oltre la prima schermata (trattamenti 03/04/05,
pacchetti) non era mai raggiungibile scrollando, perché lo sticky non ha
scroll interno. Lo spacer del giro precedente allungava solo quanto restava
bloccato quel fotogramma, non risolveva il problema. Sostituito
l'approccio: nuovo componente `components/StackedSection.tsx` che usa GSAP
ScrollTrigger `pin: true` (non più `position: sticky` via CSS) sul
`<section>`, con un wrapper interno il cui `scrollHeight` determina quanto
spazio di scroll serve; durante il pin il wrapper trasla verticalmente
(`onUpdate` + `gsap.set(inner, { y: -dist * progress })`) così il
contenuto scorre davvero, tutto, prima che la sezione si sblocchi. Il
reveal dei bordi (radiusFrom 8rem → raggio a riposo) resta sulla fase
"top bottom → top top" precedente all'aggancio, invariato nell'effetto
visivo. Rimossi gli spacer manuali (`h-[160svh]`) e la prop `scrub` da
`SoftEdgeReveal.tsx` (tornato alla sua versione originale one-shot,
usata solo per le card interne) — `pinSpacing` di GSAP riserva
automaticamente lo spazio di scroll corretto, calcolato dal contenuto
reale, niente più valori a mano da indovinare.
Verificato con browser reale, scroll fine-grained (passi da 150px):
tutti i 5 trattamenti + il blocco pacchetti diventano visibili in sequenza
scrollando dentro la stessa sezione "agganciata"; la sezione Calendario
inizia a comparire (bordi che si stringono) solo dopo che tutto il
contenuto del Listino è stato mostrato, mai prima. Confermato anche il
salto da link di navigazione (`#trattamenti` da URL) e lo stesso
comportamento su mobile.

✅ **Fix vuoto tra sezioni (2026-07-10, quarto giro, feedback Bax)**: dopo
il fix precedente restava un tratto di colore vuoto tra la fine di una
sezione e l'inizio di quella dopo. Causa reale: le 4 sezioni impilate
usavano `min-h-[100svh]` (altezza *minima*) invece di un'altezza fissa —
con `min-h`, il box della sezione cresceva fino all'altezza reale del
contenuto (anche 2000px+), e GSAP calcola lo spazio del pin (`pinSpacing`)
*in aggiunta* all'altezza naturale del box: risultato, un viewport intero
di scroll "morto" raddoppiato per ogni sezione. Cambiato `min-h-[100svh]`
→ `h-[100svh]` (altezza fissa, non minima) su `TreatmentsMenu`,
`BookingSection`, `LocationSection`, `InstagramSection` — ora il box è
sempre esattamente un viewport e lo spazio riservato da GSAP corrisponde
esattamente all'altezza reale del contenuto, non di più. Il Footer (via
`StackedSection`/pin) restava comunque "corto" per design ("stretto" da
brief originale, niente `min-h`) e questo creava un secondo problema
specifico: essendo alto solo ~395px contro un viewport di 900px, la
finestra di ingresso da un viewport intero lo faceva sembrare vuoto per
gran parte della transizione prima che diventasse leggibile. Per il
Footer, tornato a `SoftEdgeReveal` (one-shot, `"top 85%"`, non più nel
sistema di pin) — mantiene il reveal dei bordi morbidi ma appare con lo
scroll normale del documento, senza la finestra fissa da un viewport, così
resta compatto E la transizione resta breve. Verificato: altezza totale
pagina scesa da 9244px a 7554px (~18% in meno di scroll "morto"), e con
screenshot fine-grained sulla transizione Instagram→Footer il testo del
footer è visibile molto prima che nel giro precedente.

✅ **Rifinitura estetica (2026-07-10, quinto giro, feedback Bax)**:
1. Rimossa la `AnimatedLine` posizionata `absolute top-0` in cima a
   `TreatmentsMenu.tsx` (Listino) — sedeva proprio sul bordo arrotondato,
   visivamente in conflitto con la curva. Le altre linee divisorie del
   Listino (tra i trattamenti, sopra "Pacchetti") restano invariate. Le
   sezioni Calendario/Location/Instagram hanno ancora la stessa linea in
   cima — non toccate perché non richiesto esplicitamente, ma stesso
   pattern: da rimuovere anche lì se Bax le vuole via.
2. **"Buco nero" dietro gli angoli arrotondati**: le posizioni geometriche
   risultavano già corrette nei test (nessuno scarto misurabile tra il
   bordo inferiore di una sezione e quello superiore della successiva), ma
   per garantire robustezza contro eventuali disallineamenti (arrotondamenti
   sub-pixel dei transform GSAP, variazioni di viewport su mobile quando la
   barra del browser si nasconde durante lo scroll) — casi difficili da
   riprodurre in modo deterministico — l'altezza di `TreatmentsMenu`,
   `BookingSection`, `LocationSection`, `InstagramSection` è stata
   aumentata da `h-[100svh]` a `h-[calc(100svh+120px)]`. Le posizioni di
   trigger (dove iniziano le transizioni) restano invariate come richiesto
   ("le posizioni vanno benissimo così") — cambia solo quanto colore pieno
   c'è in coda a ogni sezione prima che quella dopo la coincida, quindi il
   colore corretto è sempre presente dietro qualunque angolo arrotondato,
   con margine. Verificato con screenshot ravvicinati sulla curva
   Listino→Calendario: il verde ora copre abbondantemente l'area dietro la
   curvatura in ogni fase della transizione.

## 4c. Tempistiche più lente e rilassate (2026-07-10, sesto giro)
✅ Feedback Bax: "è un sito rilassante per massaggi, troppo veloce" —
allungate le durate di default su tutti i componenti motion:
`RevealText` 1.15s→1.9s (ease power3.out→power2.out, meno "scattoso"),
`AnimatedLine` 1.4s→2.0s, `SoftEdgeReveal` 1.2s→1.9s, `ImageReveal`
(Framer Motion) 1.3s→1.9s. `StackedSection`: `scrub: true` → `scrub: 0.6`
sia sul reveal dei bordi che sul pin, così lo scroll-stack segue lo scroll
con un lieve "ritardo" elastico invece di essere agganciato 1:1 — più
morbido, tecnica standard GSAP per questo tipo di effetto. Menu
full-screen (`FullscreenMenu.tsx`): overlay 0.9s→1.1s, stagger link
0.07s→0.09s/0.6s→0.75s.
✅ **Sequenza d'ingresso hero ridisegnata** (richiesta specifica: video +
logo insieme per primi, pausa per "respirare" col video, poi testo, poi
CTA, poi bottone MENU per ultimo). Con un solo video hero disponibile (non
due file separati "incenso" + "principale" come menzionato nella
richiesta), la sequenza è stata implementata via delay temporali fissi
anziché sync sul contenuto/timestamp del video (troppo fragile da
implementare in modo affidabile): video (fade 2.4s, delay 0.1s) + logo
(fade 1.6s, delay 0.2s, in `FullscreenMenu.tsx`) insieme subito, poi pausa
fino a ~2.2s, poi eyebrow (delay 2.2s) → titolo riga 1 (2.5s) → riga 2
(2.85s) → sottotitolo (3.3s) → CTA (3.8s) → bottone MENU (delay 4.0s,
fade 1.2s). Il reveal ritardato di logo/MENU è attivo **solo in home**
(`usePathname() === "/"`) — su `/privacy` e `/cookie` restano visibili da
subito, altrimenti un utente lì aspetterebbe 4s per vedere la navigazione,
un problema di usabilità/accessibilità, non un dettaglio rilassante.
🐛 **Bug reale trovato e corretto durante la verifica**: avvolgendo il CTA
della hero in `RevealText` (necessario per il delay di 3.8s), il bottone
non diventava mai visibile — restava bloccato per sempre su opacity:0.
Causa: `RevealText` di default usa uno `ScrollTrigger` con `start: "top
85%"`, pensato per contenuto scrollato in viewport più in basso nella
pagina. Il CTA nella hero, spinto verso il fondo del viewport da
`items-end`, si trova già oltre quella soglia all'apertura della pagina —
il trigger non scattava mai perché nessuno scroll avviene automaticamente.
Fix: tutti i `RevealText` della hero passano esplicitamente `start="top
bottom"` (soddisfatto da qualunque elemento già nel viewport iniziale,
indipendentemente da dove si trova esattamente). Verificato con browser
reale campionando opacity/transform a intervalli di tempo: prima del fix
il CTA restava fermo a opacity 0 anche dopo 6s, dopo il fix raggiunge
opacity 1 nei tempi previsti.

## 4d. Settimo giro (2026-07-10, feedback Bax): navbar, allineamento, "buco nero" risolto per davvero, Instagram+Footer uniti

✅ **Navbar non più sticky**: `FullscreenMenu.tsx`, la barra logo/MENU ora
sparisce (fade via `opacity` + `transition-opacity duration-500`, non
`display:none`, resta focusabile da tastiera) non appena si scrolla oltre
80px, e riappare solo tornando vicino alla cima. Resta sempre visibile
mentre il menu full-screen è aperto (altrimenti il bottone "CHIUDI"
sparirebbe con lui). Implementato con un listener di scroll nativo
(throttle via `requestAnimationFrame`), non GSAP ScrollTrigger — è un
semplice show/hide binario, non serve altro.

✅ **IntroSection allineata verticalmente**: rimosso l'offset `md:mt-14`
che avevo aggiunto un giro fa sulla card "Specializzazioni di Veronica" —
ora le due colonne (testo filosofia + card trattamenti) iniziano alla
stessa altezza (`md:items-start` sul grid). Verificato: entrambe le
colonne a `top: 1044px` esatti.

✅ **"Buco nero" — causa reale trovata (finalmente)**: Bax ha allegato uno
screenshot in `References/` che mostrava un'ampia area scura piatta tra il
listino pacchetti e il Calendario. Ho riprodotto l'identica scena con
scroll a rotelle reali (non salti diretti — i miei test precedenti
usavano `window.scrollTo()`, che bypassa il ciclo di scroll reale e non
la mostrava) e poi campionato l'elemento/colore esatto in quel punto con
`document.elementFromPoint`: **non è nero**, è `rgb(24,37,27)` —
esattamente `--deep-green`, la sezione Listino che si estende
correttamente come da fix di due giri fa. Il bug non era architetturale:
era percettivo — quel verde è così scuro che su un'area ampia e piatta
(senza texture/testo) l'occhio (e la compressione JPEG/PNG di uno
screenshot) lo legge come nero puro. Fix: `--deep-green` in
`app/globals.css` schiarito da `#18251b` a `#1f3423` — ancora molto
scuro ("quasi foresta notturna" come da brief originale) ma ora
percepibile come verde anche su superfici piatte grandi. Cambia ovunque
`bg-deep-green`/`text-deep-green` è usato (Listino, overlay del menu
full-screen). Aumentato anche il margine di sicurezza da 120px a 220px
extra (`h-[calc(100svh+220px)]`) sulle 3 sezioni impilate rimaste
(Listino/Calendario/Location) come cautela aggiuntiva.
⚠️ **Rimosso Lenis** (`components/SmoothScrollProvider.tsx` eliminato,
dipendenza disinstallata) come parte dell'indagine: sospettavo un
disallineamento tra lo smoothing di Lenis e gli aggiornamenti di
posizione di GSAP ScrollTrigger durante lo scroll reale (motivo per cui i
miei test sintetici precedenti — scroll istantaneo — non riproducevano il
problema che Bax vedeva con lo scroll reale). Si è rivelato non essere la
causa (il colore era già corretto), ma rimosso comunque: elimina una
classe intera di potenziali bug di sincronizzazione tra le due librerie,
e GSAP ScrollTrigger è più maturo/testato con lo scroll nativo puro. Lo
scroll ora è nativo del browser; il feeling "morbido" resta comunque
presente grazie allo `scrub: 0.6` di `StackedSection.tsx` (già in atto dal
giro precedente) e alle durate più lente di tutti i reveal.
⚠️ **Nota tecnica**: verificato che il fix del colore sia corretto in
`npm run build` (build di produzione pulita), ma il server di sviluppo
attualmente in esecuzione (avviato molto prima in questa sessione) non ha
ancora ricompilato il CSS aggiornato al momento di questa verifica — stesso
tipo di ritardo di ricompilazione già visto altre volte in questa sessione.
Se non vedi subito il verde più chiaro: refresh forzato (Ctrl+Shift+R) o
riavvia `npm run dev`.

✅ **Instagram unita al Footer**: `components/InstagramSection.tsx`
eliminato, `app/page.tsx` non lo importa più. Il contenuto (eyebrow
"Instagram" + titolo "Cosa succede qui" + sottotesto + CTA "Seguimi su
Instagram") ora vive in cima a `components/Footer.tsx`, stesso sfondo
beige (`bg-cream-soft`, testo `text-ink`/`text-dark-brown`/
`text-warm-brown` — tutti i colori delle colonne footer aggiornati da
chiaro-su-verde a scuro-su-beige) — nessuna cucitura tra i due, un'unica
sezione. **Rimossa la griglia delle 3 foto preview** ("quella casella che
vedo trasparente" — erano i placeholder di `ImageReveal` senza asset
reali): ora Instagram è solo titolo + CTA, con peso tipografico pari alle
altre sezioni (stessa scala h2 di Listino/Calendario/Location), separato
dai contatti sottostanti da una `AnimatedLine`. La sezione non usa più
`StackedSection` (niente pin, niente altezza forzata a un viewport):
Footer resta un semplice `SoftEdgeReveal` one-shot, molto più compatto
("stretta" come richiesto) e non più full-viewport.
✅ `components/ImageReveal.tsx` eliminato (non più usato da nessun
componente dopo la rimozione della griglia foto) insieme alla dipendenza
`framer-motion`, ora inutilizzata.
✅ `public/assets/README.md` aggiornato: instagram-preview-1/2/3.jpg non
più agganciate a nessun componente.

## 4e. Ottavo giro (2026-07-10, feedback Bax): tutte le linee via, sezioni più ravvicinate

✅ **Tutte le `AnimatedLine` rimosse dal sito** — non solo quella tra la
CTA della hero e "La filosofia" (esplicitamente richiesta), ma "tutte le
altre linee orizzontali divisorie" come da istruzione: le linee in cima a
`BookingSection`/`LocationSection`/`Footer`, quelle tra i trattamenti in
`TreatmentsMenu.tsx` e nella card "Specializzazioni di Veronica" di
`IntroSection.tsx`, quella prima di "Pacchetti", quella prima del blocco
WhatsApp in Location, quelle nel footer (tra Instagram e le colonne, prima
del copyright), e quella nel menu full-screen prima dei contatti social.
Il componente `components/AnimatedLine.tsx` è stato eliminato: dopo aver
tolto ogni utilizzo, non serviva più a nulla (verificato con una ricerca
su tutto il repo, zero occorrenze rimaste). La separazione tra blocchi ora
è affidata solo a spaziatura/tipografia, senza elementi grafici.
✅ **Sezioni impilate "alzate" — meno spazio vuoto in coda**: rimosso il
margine di sicurezza estra (`h-[calc(100svh+220px)]` → `h-[100svh]`, cioè
tornato a esattamente un viewport, senza buffer) su `TreatmentsMenu`,
`BookingSection`, `LocationSection`. Quel margine era stato aggiunto come
cautela per il "buco nero" quando pensavo fosse un problema di
posizionamento — ora che sappiamo che era solo una questione di colore
(vedi blocco 4d), il buffer extra non serve più a garantire la
correttezza, solo ad allungare inutilmente lo scroll. Risultato: Calendario
sale fin sotto le card dei pacchetti prezzi, Location sale fin sotto la
card del Calendario, il blocco Instagram+Footer sale fin sotto la mappa —
esattamente come richiesto ("alza... verso..."), verificato con screenshot
su tutte e tre le transizioni: nessun vuoto percepibile, solo il normale
padding di fondo di ogni sezione.
✅ `components/Hero.tsx` — video reale inserito, responsive per breakpoint
(mobile <768px carica solo il video verticale, desktop solo l'orizzontale,
mai entrambi via `matchMedia` lato client), WebM/VP9 come sorgente primaria
+ mp4/H.264 fallback, poster reali, `onError` → fallback gradiente,
`prefers-reduced-motion` → poster statico al posto del video, overlay scuro
verde/marrone, headline + subheadline + CTA doppia (Prenota / WhatsApp),
AnimatedLine finale.
✅ Video ottimizzati da `source/` (2026-07-10): desktop 1920x1012 (1.8MB mp4
/ 0.9MB webm, da 6.4MB originali), mobile 1080x1920 (2.9MB mp4 / 1.6MB
webm, da 9.8MB originali), audio rimosso in entrambi. Vedi
`public/assets/README.md`.
✅ Fix banner nero in alto (2026-07-10): il video "orizontal desktop"
sorgente aveva letterbox cinematico **incorporato nei pixel** (barre nere
226px sopra/sotto, rilevate con `ffmpeg cropdetect`), non un problema di
CSS — qualunque `object-cover` le avrebbe comunque mostrate. Ri-codificato
con `crop=3240:1708:0:226` prima dello scale. Se arrivano nuovi video
grezzi in `source/`, ricontrollare sempre con cropdetect prima di
scalare/pubblicare. Il video mobile non aveva questo problema.
✅ Overlay ridisegnato (2026-07-10): il gradiente precedente aveva un punto
più chiaro (30% opacità) proprio all'altezza dell'headline, indebolendo il
contrasto. Ora l'opacità cresce in modo monotono dall'alto al basso
(58%→93%) e il video ha un filtro CSS leggero (`brightness(0.82)
saturate(0.85) blur(0.5px)`) per attenuarne la prominenza rispetto al
testo, coerente col brief originale ("blur/opacity leggerissimi").
✅ Barra superiore (2026-07-10): logo ingrandito (text-xl/2xl, era
text-lg/xl), padding più ampio (px-6 py-6 / md:px-12 py-9, era px-5 py-5 /
md:px-10 py-7), "Veronica" ora in corsivo + "Massaggi" regular (due span
separati in `FullscreenMenu.tsx`, derivati da `site.operatorName` +
resto di `site.businessName` — non hardcoded).
✅ Copy hero (2026-07-10): rimosso "Padova ·" dall'eyebrow (resta solo
"Rituali di benessere"), "un appuntamento alla volta" → "una seduta alla
volta", rimosso il link "Scrivi su WhatsApp" accanto alla CTA "Prenota il
tuo momento" (resta solo il bottone WhatsApp flottante di `StickyCTA.tsx`,
invariato).
✅ Sfumatura finale + linea (2026-07-10): l'overlay in fondo alla hero ora
termina con `var(--ink)` pieno (stesso colore esatto dello sfondo di
`IntroSection`), così la transizione tra video e sezione successiva non ha
cuciture. Rimossa la `AnimatedLine` sotto il CTA nella hero (restava solo
quella già presente in cima a `IntroSection`, ridondante).

## 4f. Nono giro (2026-07-10, feedback Bax): angoli neri — causa reale e fix strutturale definitivo

✅ **"Angoli neri" — causa reale trovata (questa volta non era percettiva)**:
Bax ha segnalato angoli ancora neri dopo il fix colore del blocco 4d,
allegando anche uno screenshot del sito Antara reale (bordi grandi e
drammatici) come riferimento "così mi piacerebbe". Ho campionato con
`document.elementFromPoint` esattamente sul pixel dell'angolo arrotondato
(non più al centro piatto della sezione, dove il fix precedente era
corretto) sia durante l'ingresso sia — decisivo — a 400px dentro la fase
di lettura già "agganciata" (pin). Risultato: il pixel dell'angolo
risolveva su `.pin-spacer` (il wrapper automatico creato da GSAP quando
usa `pin: true`), trasparente e senza `border-radius`, che a sua volta
lascia vedere `<body>` (`--ink`, nero vero). Confermato anche via
screenshot ravvicinato 250×250px: una sliver nera inconfondibile
nell'angolo in alto a sinistra della sezione Calendario (cream).
**Causa architetturale**: mentre una sezione è agganciata (pinned), la
sezione precedente è tornata al normale flusso documento e continua a
scorrere via per tutta la durata della lettura — nessun buffer di
altezza fissa sulla sezione precedente può "reggere" l'angolo per sempre,
perché prima o poi quella sezione scorre oltre e non c'è più nulla dietro
tranne il body. Il fix di due giri fa (buffer/colore) attenuava il
sintomo solo per pin brevi, non lo eliminava.
**Fix — `StackedSection.tsx` riscritto a 3 livelli**: (1) contenitore
esterno, il vero target di `pin` di GSAP, un rettangolo pieno MAI
arrotondato, riempito con un colore fisso passato via nuova prop
`backdropColor` (es. `"var(--deep-green)"`); (2) livello colore, un div
interno con il vero colore della sezione + `rounded-t-*` +
`overflow-hidden` (il target dell'animazione del border-radius, prima
era il contenitore esterno); (3) livello interno invariato (traslazione
verticale per lo scroll del contenuto durante il pin). Così, indipendentemente
da dove sia scorsa la sezione precedente nel frattempo, dietro
all'angolo arrotondato c'è sempre e comunque il colore giusto — non più
un buffer temporaneo ma un fondale permanente, strutturalmente corretto
per qualunque durata di pin. Applicato a:
- `TreatmentsMenu.tsx` → `backdropColor="var(--ink)"` (dietro: Hero/Intro)
- `BookingSection.tsx` → `backdropColor="var(--deep-green)"` (dietro: Listino)
- `LocationSection.tsx` → `backdropColor="var(--cream)"` (dietro: Calendario)
- `Footer.tsx` → wrapper esterno `<div style={{backgroundColor: "var(--dark-brown)"}}>`
  attorno al `SoftEdgeReveal` esistente (stesso principio, ma il Footer non
  usa `StackedSection`/pin, quindi non serviva estendere `SoftEdgeReveal`
  con la prop — un div wrapper manuale basta per il caso one-shot).
✅ **Verificato**: build di produzione pulita (`npm run build`, zero errori),
lint pulito (zero errori, solo il warning preesistente e non correlato su
`<img>` in `Hero.tsx`). Riverificato con Playwright fresh install
campionando il pixel dell'angolo delle 4 transizioni (Listino, Calendario,
Location, Footer) in tre momenti ciascuna (metà transizione, appena
agganciata, 400px dentro la lettura): ogni campione risolve o sul livello
colore corretto o sul fondale `backdropColor` corretto, mai su `<body>` o
su un elemento trasparente — zero leak in tutte e 12 le combinazioni.
Screenshot ravvicinato di conferma sulla transizione Calendario (la stessa
zona del bug originale): angolo cream pulito, fondale verde dietro,
nessun nero. Script di verifica e dipendenza Playwright temporanea
rimossi a fine test (mai committati).
⚠️ **Raggio bordi non ancora aumentato**: lo screenshot di Antara allegato
da Bax mostra un raggio molto più grande/drammatico (quasi una collina)
rispetto agli attuali `rounded-t-[1.75rem] md:rounded-t-[3rem]` di questo
sito. Non l'ho toccato in questo giro perché il messaggio era
principalmente una segnalazione di bug con Antara come riferimento di
"correttezza" del comportamento (bordo pulito, sfondo giusto), non
un'istruzione esplicita di ridisegnare la scala del raggio. La nuova
architettura a 3 livelli rende comunque sicuro aumentare il raggio in
futuro senza reintrodurre il bug (il fondale è permanente, non più legato
alla posizione di scroll) — da confermare con Bax se lo vuole più
drammatico.

## 4g. Decimo giro (2026-07-10, feedback Bax): bordi "a cupola" stile Antara, WhatsApp senza numero duplicato

✅ **Raggio molto più drammatico**: sostituito l'angolo arrotondato
(`rounded-t-[1.75rem] md:rounded-t-[3rem]`, un semplice corner-radius che
su una sezione larga quanto il viewport lascia un lungo tratto piatto in
mezzo) con una vera curva ellittica a tutta larghezza — nuova classe
`.section-dome` in `globals.css`: `border-radius: 50% 50% 0 0 / var(--dome-y)
var(--dome-y) 0 0` (raggio orizzontale 50% forza le due curve dei corner ad
incontrarsi al centro in alto, come la "collina" di Antara nello
screenshot di riferimento, non un semplice angolo). `--dome-y` (l'altezza
verticale dell'arco) è 3rem su mobile, 5.5rem da `md:` in su. Applicata a
tutte e 4 le transizioni (Listino, Calendario, Location, Footer) al posto
delle vecchie classi `rounded-t-*`.
🐛 **Due bug reali trovati e corretti durante l'implementazione**:
1. `getComputedStyle(el).borderRadius` (la proprietà shorthand) **omette
   sempre la componente ellittica verticale** (quella dopo lo slash) anche
   quando è impostata via CSS — un quirk documentato del browser. Il primo
   tentativo leggeva questo valore per calcolare il raggio "a riposo" da
   dare in pasto a GSAP, e quindi calcolava un target sbagliato.
2. **Anche risolvendo (1)**, GSAP non riesce a interpolare in modo
   affidabile la sintassi ellittica `/ N N 0 0` dentro la shorthand
   `border-radius` — la appiattisce durante il tween invece di animarla,
   risultando in un raggio finale simmetrico enorme (50% orizzontale
   **e** 50% verticale, cioè metà dell'altezza dell'intera sezione) che
   inghiottiva parte del contenuto (verificato con screenshot: il bordo
   diventava un arco/pillola gigante che copriva il calendario).
   **Fix**: la vera correzione è stata smettere di animare `border-radius`
   direttamente. La curva ellittica resta sempre dichiarata staticamente
   in CSS (`.section-dome`, mai scritta da JS); GSAP anima invece soltanto
   la custom property numerica `--dome-y` (da un valore di partenza molto
   più alto/morbido, "11rem", fino al valore a riposo letto da
   `getComputedStyle().getPropertyValue("--dome-y")` — questo sì affidabile,
   perché è una singola property semplice, non uno shorthand multi-parte).
   Applicato sia a `StackedSection.tsx` (le 3 sezioni impilate) sia a
   `SoftEdgeReveal.tsx`, esteso con una nuova prop opzionale `radiusVar`
   (se assente si comporta esattamente come prima — nessuna regressione
   sulle card interne non-ellittiche di Calendario/Location, che continuano
   a usare il vecchio tween diretto su `borderRadius`).
✅ **Verificato**: build pulita, lint pulito, riverificato con Playwright
(fresh install, rimosso a fine test) sia desktop che mobile: campionato il
raggio effettivo per-angolo (proprietà longhand, non la shorthand
ingannevole) su tutte e 4 le transizioni — risultato corretto ovunque
("50% 88px" su desktop = 5.5rem, coerente con `--dome-y`). Corner-leak
check ripetuto (stesso metodo `elementFromPoint` del giro precedente) su
desktop e mobile, tutte e 4 le transizioni: nessun nero residuo. Screenshot
di conferma su Calendario e Footer: curva ampia e pulita a tutta larghezza,
esattamente come nel riferimento Antara allegato da Bax.

✅ **Footer — rimosso il numero di telefono duplicato**: nella colonna
"Contatti" restava sia il link diretto al numero sia il link WhatsApp
(che porta comunque a quel numero). Rimossa la riga del telefono diretto
su richiesta di Bax ("lascia whatsapp che già implica il numero di
telefono") — restano solo email e WhatsApp. Il numero resta comunque
raggiungibile ovunque altro sia già presente (JSON-LD, eventuali altri
CTA), qui si è tolta solo la ridondanza nel footer.

## 4h. Undicesimo giro (2026-07-10, feedback Bax): la cupola non deve restare "appiccicata" per tutta la lettura

✅ **Causa reale trovata**: Bax ha notato che in Location lo scroll "è
tutto normale" (curve e differenze appaiono solo durante la transizione),
mentre in Calendario e Listino i bordi verdi restavano "appiccicati" in
cima per un po' e sparivano solo a un certo punto. Riprodotto con
Playwright campionando `position`/`z-index`/`getBoundingClientRect` a
step di scroll fine (150px) su tutta la sequenza Listino→Calendario→
Location, con screenshot ogni 3 step: la cupola (curva + eventuale colore
di fondale dietro di essa) restava visibile in cima allo schermo per
**l'intera durata del pin**, non solo durante l'ingresso — perché durante
il pin la sezione è `position: fixed` in cima allo schermo per tutto il
tempo in cui il contenuto scorre internamente, e il raggio "a riposo" (il
valore a cui la cupola si stringe dopo l'ingresso) non è mai zero, resta
una curva visibile fissa lì per tutta la lettura. Location non mostrava il
problema semplicemente perché il suo contenuto è più corto della
viewport: quasi non si aggancia (pin quasi nullo), quindi non c'è mai
abbastanza tempo per notare la cupola "incollata".
✅ **Fix**: `StackedSection.tsx` ora ha una terza fase di animazione,
oltre a ingresso (raggio grande→a riposo) e pin (contenuto che scorre
dentro): appena il pin comincia (`start: "top top"`), un secondo tween
scrub richiude rapidamente `--dome-y` da valore-a-riposo a `0px` in soli
240px di scroll aggiuntivo. Risultato: la cupola appare durante
l'ingresso, si stringe, poi si richiude del tutto quasi subito dopo
l'aggancio — il bordo superiore resta piatto per il resto della lettura,
esattamente come si vede già (per ragioni diverse) in Location. Verificato
con screenshot a step fine su Listino e Calendario: bordo piatto confermato
sia a metà lista trattamenti sia a metà calendario Cal.com, dopo un
brevissimo tratto di curva in ingresso.

## 6. Sezione intro/filosofia
✅ Rifatta (2026-07-10). Colonna testo: eyebrow/titolo/paragrafo/disclaimer
ora hanno reveal a cascata più marcato (delay 0 → 0.12 → 0.32 → 0.48),
"il testo grande appare subito, poi gli altri man mano" come richiesto.
Colonna a fianco: le 3 immagini reveal (massage-room/hands-massage/
towels-oil) sono state **rimosse** e sostituite da un elenco dei 5
trattamenti (da `data/treatments.ts`, stessa fonte dati del listino
completo) che compare da destra a sinistra, uno alla volta, con hairline
`AnimatedLine` tra le righe — stessa grammatica visiva del resto del sito
(numeri label-eyebrow oro, titoli font-display). Per il reveal da destra è
stato esteso `components/RevealText.tsx` con una prop `direction?: "up" |
"right"` (asse x invece di y), riutilizzabile altrove.
❌ Foto reali (massage-room/hands-massage/towels-oil) non più agganciate a
nessun componente dopo questa modifica — restano un asset "orfano" in
`public/assets/README.md` in attesa di una futura collocazione, se Bax le
vuole ancora da qualche parte.
✅ Rifinitura (2026-07-10, secondo giro): rimosso il link "Vedi il listino
completo" sotto l'elenco (ridondante col link "Trattamenti" già in navbar).
Gap tra le due colonne aumentato (gap-16→20 mobile, md:gap-10→16 desktop)
+ offset `md:mt-14` sulla colonna trattamenti, per più respiro di lettura
tra "La filosofia" e l'elenco. L'elenco ora vive dentro una card
(`rounded-3xl border-moss/15`) con sfumatura verde trasparente (gradient
`rgba(66,94,64,0.14)` → `rgba(24,37,27,0.26)`, gli stessi verdi di
`--moss`/`--deep-green` usati in `TreatmentsMenu.tsx` subito sotto), per
richiamare visivamente quella sezione senza copiarne il colore pieno.
Testo filosofia: "ma una pausa reale: dallo stress, dalla fatica e dal
ritmo di tutti i giorni" (era "dalle mani, dal respiro...").

## 7. Listino trattamenti
✅ **Chiuso.** Bax ha confermato: fedele al catalogo reale. `data/treatments.ts`
ora contiene i 5 trattamenti reali (Svedese, Decontratturante, Drenaggio
Linfatico, Sportivo max 30', Miofasciale) con durata e descrizione, senza
prezzo per riga. `components/TreatmentsMenu.tsx` aggiunge sotto una sezione
"Pacchetti" con le 4 card di prezzo (1/€30, 3/€85, 5/€140 evidenziato come
"il più scelto", 10/€250 con risparmio per seduta). JSON-LD in
`app/layout.tsx` aggiornato: niente più `Offer.price` per singolo
trattamento (sarebbe stato un dato falso). Verificato via screenshot reali
(desktop + mobile + menu full-screen) con dev server: tutto renderizza
correttamente, animazioni scroll-triggered confermate su scroll reale.

## 8. Booking/calendario
✅ `components/BookingSection.tsx` — card cream, info pratiche
(durata/buffer/cancellazione), CTA WhatsApp per domande rapide.
✅ Card avvolta in `SoftEdgeReveal` (2026-07-10): bordo morbido che si
stringe da 64px a 16px (rounded-2xl) all'ingresso in viewport.
✅ **Cal.com integrato (2026-07-10)** — `components/CalEmbed.tsx`, nuovo
componente client. Carica lo script ufficiale
`https://app.cal.com/embed/embed.js` (snippet IIFE ufficiale Cal.com,
nessun pacchetto npm aggiuntivo) e monta il calendario inline dentro
`#cal-booking`. Nessun backend/database custom, nessuna chiamata diretta a
Google Calendar — tutta la disponibilità/conferme restano gestite lato
Cal.com. Card cream (`bg-cream`, `rounded-2xl`), `min-h-[650px]` mobile /
`md:min-h-[700px]` desktop, fallback di caricamento testuale
("Caricamento calendario...") nascosto automaticamente via
`MutationObserver` non appena Cal.com inietta l'iframe reale, container
con `role="region"` + `aria-label` + `aria-busy` per l'accessibilità. Reset
difensivo dell'`innerHTML` a ogni mount per evitare iframe duplicati in
sviluppo (React Strict Mode monta gli effect due volte).
⚠️ **`site.booking.calLink` è ancora il placeholder `"nome-mamma/massaggio-
relax"`** — verificato con browser reale: lo script si carica
correttamente, il widget Cal.com risponde con un vero errore 404 nativo
("Cal Link seems to be wrong") perché quello slug non esiste. Non è un
bug: basta sostituire il valore in `data/site.ts` (campo `booking.calLink`,
formato `"utente/tipo-evento"`, si trova nell'URL della pagina di
prenotazione Cal.com reale di Bax) e il calendario vero apparirà senza
nessun'altra modifica al codice.

## 9. Location
✅ `components/LocationSection.tsx` — placeholder Google Maps con istruzioni
commentate, fallback pattern CSS elegante, indirizzo/parcheggio/mezzi da
`data/site.ts`, CTA WhatsApp.
✅ Card mappa avvolta in `SoftEdgeReveal` (2026-07-10): bordo morbido che si
stringe da 64px a 12px (rounded-xl) all'ingresso in viewport — stesso
effetto della card calendario in `BookingSection.tsx`.
✅ **Indirizzo reale collegato (2026-07-10, sesto giro)**: Via Guglielmo
Marconi 35, 35010 Cadoneghe (PD), confermato da Bax. `mapsEmbedSrc`
valorizzato con `https://www.google.com/maps?q=...&output=embed` e
`mapsLinkHref` con `https://www.google.com/maps/search/?api=1&query=...`
— tecnica standard che non richiede una API key di Google Maps. Verificato
con browser reale: la mappa carica e mostra il pin esattamente
sull'indirizzo giusto.
✅ Sezione riavvicinata al Calendario (2026-07-10): padding superiore
ridotto (`py-28/36` → `pt-14/16`, bottom invariato per il margine
anti-buco-nero) così il contenuto (eyebrow "Location") inizia più vicino
alla parte alta della sezione non appena diventa visibile.

## 10. Instagram
✅ **Unita al Footer (2026-07-10)** — non più una sezione a sé, vedi
blocco 4d e blocco 11 qui sotto. `components/InstagramSection.tsx`
eliminato.
❌ Handle Instagram reale non presente (placeholder `@nomeprofilo`).

## 11. Footer
✅ `components/Footer.tsx` — ora include anche il blocco Instagram in cima
(vedi blocco 4d), poi 4 colonne (brand/contatti/orari/info legali),
copyright dinamico, disclaimer benessere, linee sottili. Sfondo
`bg-cream-soft` (era `bg-deep-green`), testo scuro.

## 12. Mobile / StickyCTA
✅ `components/StickyCTA.tsx` — barra sticky "Prenota" bottom (solo mobile,
`md:hidden`).
✅ Mobile-first confermato leggendo le classi Tailwind di tutti i componenti
(base → `sm:`/`md:`/`lg:`).
✅ **Bottone WhatsApp flottante rimosso (2026-07-10, sesto giro)** su
richiesta di Bax — restava solo la barra sticky "Prenota". WhatsApp resta
comunque raggiungibile da: menu full-screen, footer, Calendario, Location.

## 13. Performance & accessibilità
✅ `prefers-reduced-motion` gestito sia lato JS (ogni componente motion) sia
CSS globale (`globals.css`).
✅ `next/image` con `loading="lazy"` (tranne priority esplicita), `sizes`
impostato.
✅ Focus states (`:focus-visible`), aria-label su menu/WhatsApp/mappa,
aria-modal sul menu full-screen.
❌ Non ancora eseguito un audit Lighthouse/axe reale (richiede asset reali e
build di produzione per essere significativo — rimandato a quando ci sono le
foto/video definitivi).

## 14. SEO
✅ Metadata Next.js completi in `app/layout.tsx` (title/description/keywords/
canonical/OG/Twitter).
✅ JSON-LD `LocalBusiness` + `Service` (uno per trattamento) generato
dinamicamente da `data/site.ts` + `data/treatments.ts`.
✅ `app/robots.ts`, `app/sitemap.ts`, `/privacy`, `/cookie` presenti.
❌ FAQ SEO (richiesta in CLAUDE.md sezione "SEO locale") non ancora
implementata — non era nell'elenco componenti del prompt esteso originale,
quindi è stata saltata nel primo giro. Da aggiungere se Bax la conferma.
❌ `og-cover.jpg` (1200x630) non presente — meta OG puntano a un file
inesistente.

## 15. Struttura file
✅ Struttura rispettata 1:1 rispetto al prompt (component-by-component,
`data/site.ts`, `data/treatments.ts`, `public/assets/README.md`).

## 16. Dati modificabili
⚠️ `data/site.ts` aggiornato con i dati reali confermati: businessName
"Veronica Benessere" (rinominato da "Veronica Massaggi" il 2026-07-10),
operatorName "Veronica", WhatsApp/telefono +39 380 753 4917, CAP zona
Cadoneghe (35010). Restano placeholder (marcati
`TODO Bax` nel file) solo i campi non presenti nel catalogo: email, via e
civico esatti, orari, handle Instagram reale. `data/treatments.ts` è ora
100% reale (vedi blocco 7).

## 17. QA / consegna finale
❌ Non ancora fatta la consegna finale a Bax (dove cambiare testi/prezzi,
dove mettere foto/video, come lanciare dev/build, come deployare) — verrà
fatta all'ultimo blocco, dopo aver chiuso i punti aperti sopra.

---

## Decisioni prese (2026-07-09)

1. **Trattamenti/prezzi**: ✅ confermato — layout fedele al catalogo reale
   (elenco trattamenti + blocco pacchetti separato). Implementato.
2. **Video in `References/`**: ✅ confermato — solo riferimento di stile, non
   usato come hero. Video hero reali forniti in `source/` il 2026-07-10
   (uno vertical mobile, uno orizontal desktop) e integrati, compressi, in
   `public/assets/hero-*.mp4` / `.webm` — vedi blocco 5.

## Prossimi passi bloccanti (serve risposta di Bax)

1. **Dati mancanti**: email, indirizzo esatto (via/civico), orari reali,
   handle Instagram. Tutti marcati `TODO Bax` in `data/site.ts`.
2. **Asset reali**: video hero ✅ ricevuti e integrati (2026-07-10). Mancano
   ancora le foto (massage-room, hands-massage, towels-oil, 3x instagram
   preview) — quando arrivano vanno depositate in `public/assets/` con i
   nomi già cablati nel codice (vedi `public/assets/README.md`).
3. ✅ **Favicon**: risolta 2026-07-11 con un fiore di loto originale
   ridisegnato da zero (vedi blocco 0b). Resta aperto solo se Bax vuole
   sostituirla in futuro col monogramma reale del catalogo — servirebbe il
   file sorgente (SVG).
4. **FAQ SEO** (opzionale, da CLAUDE.md ma non nel prompt esteso): se Bax la
   vuole, si aggiunge come nuovo blocco/componente.
