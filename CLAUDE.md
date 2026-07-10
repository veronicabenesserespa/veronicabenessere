# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project state

Fresh `create-next-app` scaffold (Next.js 16.2.10, App Router) — no custom routes, components, or business logic have been built yet beyond the default splash page at `app/page.tsx`. There is no test framework configured.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint via eslint.config.mjs (flat config, extends eslint-config-next core-web-vitals + typescript)
```

There is no test command — none is defined in `package.json` and no test runner is installed.

## Next.js 16 breaking changes (read before writing code)

Per `AGENTS.md`, this Next.js version diverges from what training data assumes. Two concrete divergences confirmed in `node_modules/next/dist/docs/`:

- **Middleware is now Proxy.** Create `proxy.ts` at the project root (not `middleware.ts`). Same functionality, new convention and file name. See `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`.
- **Cache Components replace experimental PPR/`useCache`/`dynamicIO`.** Set `cacheComponents: true` in `next.config.ts` to opt in; this single flag supersedes the old `experimental.ppr`, `experimental.useCache`, and `experimental.dynamicIO` flags. Caching is then controlled with the `'use cache'` directive plus `cacheLife`/`cacheTag` from `next/cache`. Not currently enabled in `next.config.ts` — check that file before assuming which caching model (default dynamic vs. Cache Components) applies. See `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md` and `.../01-app/01-getting-started/08-caching.md`.

Before implementing anything involving routing interception, data caching/revalidation, or other API surface you're not 100% certain about, grep `node_modules/next/dist/docs/` for the relevant guide rather than relying on prior Next.js knowledge — this install has 400+ doc files covering App Router APIs in detail.

## Architecture

- **App Router only** (`app/` directory) — no `pages/` directory exists.
- `app/layout.tsx` — root layout; loads `Geist`/`Geist_Mono` via `next/font/google` and exposes them as CSS variables (`--font-geist-sans`, `--font-geist-mono`).
- `app/globals.css` + `postcss.config.mjs` — Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config.*` file; v4 is CSS-first config, so theme customization belongs in `globals.css`).
- Path alias `@/*` → repo root (`tsconfig.json`).
- `framer-motion` is installed but not yet used anywhere.
- Static assets (SVGs) live in `public/`.



Questo file deve diventare la guida creativa completa per il sito di una massaggiatrice benessere a Padova. Il sito deve essere ispirato alla grammatica visiva di un sito spa luxury internazionale come Antara Spa & Wellness (antaraspawellness.com), ma NON deve copiarne, branding, testi, loghi, immagini o codice. Deve creare una versione originale con la stessa atmosfera: luxury wellness, slow motion, video scuro sbiadito, tipografia editoriale, linee animate, menu full-screen, scroll narrativo, colori naturali premium.


# 1. Brand mood
Descrivi il mood:
- luxury spa naturale
- rituale caldo e intimo
- atmosfera con candela, fumo d’incenso, asciugamani, olio, pelle, mani, stanza calma
- niente estetica clinica
- niente verde chiaro acceso
- niente look cheap da centro estetico generico
- deve sembrare premium ma umano, elegante ma accessibile

# 2. Palette colori
Usa questi colori CSS custom properties:
--cream: #E8DDC7;
--cream-soft: #F3EBD9;
--deep-green: #18251B;
--antara-green-inspired: #425E40;
--dark-brown: #241811;
--warm-brown: #4B3325;
--sand: #C7AF8B;
--muted-gold: #A88B5B;
--ink: #11110E;

Nota: il verde principale deve essere molto scuro, quasi foresta notturna. Il beige/panna deve dominare le sezioni Instagram e contenuto. Il marrone deve dare profondità luxury. Evitare verde chiaro brillante.

# 3. Typography
Usa una combinazione font molto simile a siti wellness editoriali premium:
- Titoli: Cormorant Garamond oppure Playfair Display, serif elegante, grande, sottile, con tracking leggermente negativo.
- Testi: Manrope oppure Inter, sans pulita e leggibile.
- Label e microcopy: uppercase, letter-spacing alto, dimensioni piccole.

Indicazioni:
- Titoli molto grandi su desktop.
- Testo che appare con fade e blur leggero.
- Alcune parole chiave possono avere effetto stretch/letter spacing animato allo scroll.
- Non usare font troppo moderni/tech.

# 4. Motion language
Definisci questi effetti:
- hero video background con overlay verde/marrone scuro e blur/opacity leggerissimi
- linee sottili che si animano da sinistra a destra quando entrano in viewport
- bordi superiori dei container che si disegnano allo scroll
- testo che appare piano con opacity 0 -> 1, y: 20 -> 0, blur 8px -> 0
- titoli con leggero tracking animation o scaleX morbido
- immagini che si rivelano con clip-path/mask reveal
- menu centrale: un piccolo riquadro con scritto “MENU” si espande fino a full-screen
- transizioni lente, raffinate, non aggressive
- supporto prefers-reduced-motion per accessibilità

# 5. Layout inspiration
Il sito deve avere:
- Hero full viewport con video candela/incenso/massaggio come background
- Navbar minimale
- Logo testuale semplice
- Bottone MENU centrale o in alto, con apertura full-screen
- Sezione intro con testo grande e linee animate
- Sezione trattamenti/listino prezzi in stile menu spa
- Sezione calendario/prenotazione con card premium e placeholder embed
- Sezione “Cosa succede qui” ispirata al blocco Instagram: mega box beige/panna con CTA Instagram e contenuti social futuri
- Footer stretto verde scurissimo con contatti, orari, WhatsApp, link privacy/cookie

# 6. Assets
Gli asset saranno messi nella cartella /public/assets.
Prevedi questi placeholder:
- /public/assets/hero-spa-video.mp4
- /public/assets/incense-candle.mp4
- /public/assets/massage-room.jpg
- /public/assets/hands-massage.jpg
- /public/assets/towels-oil.jpg
- /public/assets/instagram-preview-1.jpg
- /public/assets/instagram-preview-2.jpg
- /public/assets/instagram-preview-3.jpg

Se gli asset non esistono ancora, crea fallback visivi eleganti con gradienti e texture CSS.

# 7. UX rules
- Mobile-first
- Booking sempre facile da raggiungere
- CTA sticky su mobile: “Prenota”
- WhatsApp floating button
- Prezzi chiari
- Massimo 3 click per arrivare alla prenotazione
- Niente claim medici
- Inserire disclaimer: “I trattamenti sono orientati al benessere e non sostituiscono prestazioni mediche o fisioterapiche.”

# 8. Accessibility
- Contrasti leggibili
- Keyboard navigation
- Focus states visibili
- Aria labels per menu e bottoni
- Animazioni disattivabili con prefers-reduced-motion
- Video hero muted, playsInline, loop, senza audio obbligatorio

# 9. SEO locale
- Keyword: massaggi Padova, massaggio rilassante Padova, massaggi benessere Padova
- Metadata Next.js
- Open Graph
- JSON-LD LocalBusiness + Service
- Sitemap e robots
- FAQ SEO


