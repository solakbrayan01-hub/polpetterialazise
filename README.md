# La Polpetteria di Lazise

Sito React per una **polpetteria street food** sul Lago di Garda. NON è un ristorante: è un take-away. Le polpette si mangiano camminando, si ordinano al telefono e si ritirano, oppure si portano via.

## ✅ Responsive

Il sito è completamente responsive. Breakpoints:
- **Desktop** (>1024px): layout pieno con 3D side-by-side
- **Tablet** (≤1024px): stack verticale, 3D in alto
- **Mobile** (≤768px): tutto a singola colonna, navbar compatta, CTA full-width
- **Small phone** (≤480px): tab del menù verticali, padding ridotti
- **Landscape phone**: layout speciale per evitare che il 3D occupi tutto lo schermo
- **Reduced motion**: tutte le animazioni disattivate per chi lo richiede dal sistema
- **Touch devices**: hover effects disattivati, sostituiti con stati attivi su tap
- **iOS safe area**: padding extra per il notch dell'iPhone

## Concept

- **Nessun tavolo da prenotare**. Niente cameriere, niente coperto.
- Si mangia **camminando per Lazise**, sul lungolago, o si porta via.
- Si può **ordinare al telefono** e ritirare (perfetto per chi è in camping).
- Le polpette sono **buone anche il giorno dopo** (confezione termica, istruzioni per riscaldare).

## Stack

- **React 18** + Vite
- **Three.js** + React Three Fiber + drei
- **Google Fonts**: Fraunces, DM Mono, Caveat

## Sezioni del sito

1. **Hero** — Titolo "Polpette da passeggio sul lago", scena 3D pulita: piattino di carta con tre polpette infilzate da stuzzicadenti. Niente più caos di pomodori e vapore. CTA principale "Ordina al telefono".

2. **Ticker** scorrevole

3. **Come funziona** (NUOVA, sezione chiave) — Tre card che spiegano i tre modi:
   - **In passeggiata**: ti fermi in vetrina e mangi sul lungolago
   - **Chiama e ritira**: ordini al telefono, passi a prendere (ideale per il camping)
   - **Take-away**: te le porti via, buone anche il giorno dopo

4. **Filosofia** — manifesto rivisto sul concept "non abbiamo tavoli, abbiamo una vetrina"

5. **Menù** — Prezzi cambiati al pezzo (€/cad) coerenti con un take-away. Sotto la griglia: 3 formati di vendita (3 polpette, 5 polpette, 10+ polpette)

6. **Come la facciamo** — 4 step con icone 3D animate (macinatura, impasto, cottura, infilzatura)

7. **Ingredienti** — lista interattiva, hover cambia il pannello dettaglio

8. **Contatti + Card "Ordini al telefono"** — Bottone telefono enorme cliccabile, 3 step di come ordinare. Niente più form prenotazione tavolo.

9. **Mappa stilizzata di Lazise** in SVG con pin animato

## Modifiche rispetto alla v2

- ✅ **Hero 3D pulita**: SOLO un piattino di carta con 3 polpette infilzate da stuzzicadenti. Niente più scodella di sugo, niente vapore, niente pomodori che fluttuano. Pulita, leggibile.
- ✅ **Concept riscritto**: niente più ristorante, ora è street food da passeggio
- ✅ **Sezione "Come funziona"** spiega chiaramente i 3 modi di acquisto
- ✅ **Form prenotazione rimosso**, sostituito con card "Ordina al telefono" con bottone tel: e step
- ✅ **Bottone "Ordina"** anche nella navbar (sempre visibile)
- ✅ **Sezione "Settimana in polpetta" rimossa** (non aveva più senso)
- ✅ **Prezzi al pezzo** (€2.50/cad invece di €9.50 a piatto)
- ✅ **Formati di vendita** sotto il menù: piattino da passeggio, vaschetta media, confezione famiglia
- ✅ **Orari aggiornati**: 11:30-14:30 / 17:30-22:30 (più adatti a un take-away)
- ✅ **Step "Si infilza"** nel processo invece di "Si serve"
- ✅ **Ticker** aggiornato: "ottime anche il giorno dopo", "chiama e ritira"

## Come avviare

```bash
npm install
npm run dev
```

## Personalizzazione

- **Numero di telefono**: cerca `tel:+390451234567` in `App.jsx` e sostituiscilo (3 occorrenze)
- **Email**: cerca `ciao@polpetteriadilazise.it` in `App.jsx`
- **Indirizzo**: sezione `<div className="contatti-info-block">` in `App.jsx` e nella mappa SVG
- **Menu**: costante `MENU` in `App.jsx`
- **Modi di acquisto**: sezione `<section className="come-funziona">` in `App.jsx`
