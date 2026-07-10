# Asset richiesti

Metti qui i file elencati sotto. Finché mancano, il sito mostra fallback
eleganti (gradienti/placeholder), quindi non si rompe nulla: puoi lanciare
`npm run dev` anche a cartella vuota.

## Video

- **hero-desktop.webm / hero-desktop.mp4** — video di sfondo hero per
  viewport ≥768px (orizzontale, 1920x1280). WebM (VP9) è la sorgente
  primaria, mp4 (H.264) il fallback per browser senza supporto VP9.
- **hero-mobile.webm / hero-mobile.mp4** — video di sfondo hero per
  viewport <768px (verticale 9:16, 1080x1920). Stessa logica webm/mp4.
- **hero-poster-desktop.jpg / hero-poster-mobile.jpg** — frame statico
  mostrato mentre il video carica, su connessioni lente, o al posto del
  video quando l'utente ha `prefers-reduced-motion: reduce` attivo.

Generati da `source/hero video orizontal desktop.mp4` e
`source/hero video vertical mobile.mp4` con ffmpeg: audio rimosso (hero è
muto), scalati a risoluzione web, H.264 CRF 26 + VP9 CRF 34. Risultato:
desktop 1.9MB mp4 / 0.95MB webm (da 6.4MB originali), mobile 2.9MB mp4 /
1.6MB webm (da 9.8MB originali). `components/Hero.tsx` sceglie il video
giusto via `matchMedia` lato client, così mobile e desktop non scaricano
mai entrambe le versioni.

## Foto

- **massage-room.jpg**, **hands-massage.jpg**, **towels-oil.jpg** — non più
  agganciate a nessun componente dal 2026-07-10 (`IntroSection.tsx` ora
  mostra l'elenco trattamenti al posto delle immagini). Tienile pure se
  vuoi riusarle altrove in futuro, altrimenti puoi ignorarle.
- **instagram-preview-1.jpg**, **instagram-preview-2.jpg**,
  **instagram-preview-3.jpg** — non più agganciate a nessun componente dal
  2026-07-10: il blocco Instagram (ora unito al footer in `Footer.tsx`, su
  richiesta di Bax) mostra solo titolo + CTA "Seguimi su Instagram", senza
  griglia foto (mostravano solo placeholder trasparenti senza gli asset
  reali). Tienile pure per un futuro riutilizzo, altrimenti ignorale.

Formato consigliato: JPG o WebP, lato lungo max ~2000px, ottimizzate
(< 400KB ciascuna) per non appesantire lo scroll.

## SEO

- **og-cover.jpg** (1200x630px) — immagine di anteprima quando il link del
  sito viene condiviso su WhatsApp/Instagram/social. Va messa direttamente
  in `/public/assets/og-cover.jpg` (percorso già collegato in `app/layout.tsx`).

## Dove si collegano questi file nel codice

| File | Componente |
|---|---|
| hero-desktop.mp4/.webm, hero-mobile.mp4/.webm, hero-poster-desktop.jpg, hero-poster-mobile.jpg | `components/Hero.tsx` |
| massage-room.jpg, hands-massage.jpg, towels-oil.jpg | *(nessuno — vedi nota sopra)* |
| instagram-preview-1/2/3.jpg | *(nessuno — vedi nota sopra)* |
| og-cover.jpg | `app/layout.tsx` (metadata Open Graph/Twitter) |
