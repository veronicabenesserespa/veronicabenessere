# STYLE_REFERENCE.md — Veronica Benessere (Padova/Cadoneghe)

Fonte primaria di verità per mood, palette, tipografia, motion e struttura del
sito. Letto e applicato prima di ogni modifica al design. Non copia branding,
testi, loghi o codice di siti terzi (es. Antara Spa & Wellness): ne riprende
solo la grammatica visiva (luxury wellness, slow motion, editoriale).

## Identità reale del brand (da `References/`)

- **Nome attività**: Veronica Benessere (rinominato da "Veronica Massaggi"
  il 2026-07-10 — unica fonte di verità: `site.businessName` in
  `data/site.ts`, da cui derivano navbar/footer/metadata/JSON-LD)
- **Operatrice**: Veronica
- **Città/zona**: Cadoneghe, Padova
- **WhatsApp**: 380 753 4917
- **Logotipo**: "Veronica" in script/corsivo elegante + "Benessere" in serif
  regular — coerente con la coppia Cormorant Garamond (italic per il nome,
  regular/light per il resto) già impostata in `app/layout.tsx`.
- **Icona/monogramma**: fiore di loto, tratto sottile a una linea, oro/muted-gold.
  Utilizzabile come motivo grafico ricorrente (favicon, divisори, watermark
  leggerissimo) ma senza abusarne — un dettaglio, non un pattern ripetuto.
- **Trattamenti reali** (dal catalogo `Veronica Massaggi – Catalogo
  Trattamenti Wellness (5).png`): Massaggio Svedese, Massaggio
  Decontratturante, Massaggio Drenaggio Linfatico, Massaggio Sportivo (max
  30 min), Massaggio Miofasciale. Ogni seduta dura 1 ora (tranne lo Sportivo,
  max 30 min). Prezzi **a pacchetto**, non per trattamento: trattamento
  singolo €30, 3 sedute €85, 5 sedute €140, 10 sedute €250. I massaggi sono
  intercambiabili nei pacchetti; consigliato un percorso continuativo.
  Eseguiti con oli professionali, ambiente confortevole e rilassante.

  ⚠️ Questo è un modello diverso dal listino generico usato nel primo giro di
  build (`data/treatments.ts` attuale ha 4 trattamenti con prezzo/durata
  singoli, presi dal brief originale, non dal catalogo reale). Vedi
  `BUILD_PROGRESS.md` → blocco 7 per la decisione da prendere.

## 1. Brand mood

Luxury spa naturale, rituale caldo e intimo. Atmosfera: candela, fumo
d'incenso, asciugamani, olio, pelle, mani, stanza calma. Niente estetica
clinica, niente verde chiaro acceso, niente look da centro estetico
generico. Premium ma umano, elegante ma accessibile.

## 2. Palette colori

CSS custom properties, valori esatti (già in `app/globals.css`):

```css
--cream: #E8DDC7;
--cream-soft: #F3EBD9;
--deep-green: #18251B;
--moss: #425E40;        /* corrisponde a "--antara-green-inspired" del brief */
--dark-brown: #241811;
--warm-brown: #4B3325;
--sand: #C7AF8B;
--muted-gold: #A88B5B;
--ink: #11110E;
```

Il verde principale è scuro, quasi foresta notturna — mai verde chiaro
brillante. Il beige/panna domina le sezioni contenuto e Instagram. Il marrone
dà profondità luxury.

Mappatura sezioni → colore dominante:

| Sezione | Sfondo | Testo |
|---|---|---|
| Hero | video scuro + overlay verde/marrone | cream |
| Intro/filosofia | ink | cream |
| Menu full-screen | deep-green | cream |
| Listino trattamenti | deep-green | cream |
| Calendario/prenotazione | cream / cream-soft | ink / dark-brown |
| Location | dark-brown | cream |
| Instagram | cream-soft | ink |
| Footer | deep-green (stretto) | cream/sand |

## 3. Tipografia

- **Titoli**: Cormorant Garamond — serif elegante, grande, sottile, tracking
  leggermente negativo in stato iniziale (si apre con RevealText).
- **Testi/UI**: Manrope — sans pulita, leggibile.
- **Label/microcopy**: uppercase, letter-spacing 0.28em, ~0.7rem (classe
  utility `.label-eyebrow` in `globals.css`).
- H1 desktop molto grande (clamp fino a ~7.5rem), font-weight light (300).
  Mai 700/800 fuori dai display.
- Vietati: Inter, Roboto, Arial, system fonts, Space Grotesk.

## 4. Motion language

- Linee sottili (`AnimatedLine`): scaleX 0→1, origin left, si attivano
  all'ingresso in viewport (GSAP ScrollTrigger).
- Bordi superiori dei container animati con lo stesso meccanismo, posizionati
  in absolute top-0 sopra un contenitore `relative`.
- Testo (`RevealText`): opacity 0→1, y 24→0, blur 8px→0; `openTracking`
  opzionale per il letter-spacing che si apre.
- Immagini (`ImageReveal`): clip-path mask reveal (Framer Motion,
  `whileInView`, once: true).
- Menu full-screen (`FullscreenMenu`): clip-path circle da 0% a 150%
  ancorato in alto a destra, poi stagger dei link (GSAP timeline).
- Smooth scroll: Lenis + GSAP ScrollTrigger sincronizzati
  (`SmoothScrollProvider`).
- Ease: `power3.out` / `power4.inOut` — mai bounce/elastic.
- `prefers-reduced-motion: reduce` → tutte le animazioni JS si bypassano
  (stato finale statico), più fallback CSS globale in `globals.css`.

## 5. Layout / struttura one-page

Hero → Intro (filosofia + 3 immagini reveal) → Listino trattamenti → Booking
→ Location → Instagram → Footer. Menu full-screen e StickyCTA sono overlay
persistenti montati in `app/layout.tsx`, non sezioni della pagina.

## 6. Asset richiesti (placeholder finché mancano)

Vedi `public/assets/README.md` per l'elenco completo e dove si collegano nel
codice. Tutti i componenti hanno già un fallback elegante (gradiente o
pattern CSS) se il file manca — il sito non si rompe mai per asset assenti.

## 7. Riferimento video (`References/Registrazione ...mp4`)

Presumo sia una registrazione dello scroll di un sito spa di riferimento
(es. Antara) usata come mood reference per motion e ritmo, **non** footage
reale da montare nell'hero — non esiste ancora un tool in questa sessione per
analizzare video. Da confermare con Bax (vedi domande finali).
