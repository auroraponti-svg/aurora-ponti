# Portfolio Aurora Ponti

Sito one-page in HTML, CSS e JavaScript senza framework né build: si apre facendo doppio clic su `index.html`.

La fonte di verità è [`SPECIFICHE.md`](SPECIFICHE.md). Se il codice e le specifiche non concordano, sbaglia il codice.

## Cartelle

```
index.html              la pagina
SPECIFICHE.md           specifiche, correzioni tecniche (⚠) e decisioni concordate
assets/
  css/
    reset.css           azzera le differenze tra browser
    tokens.css          colori, font, misure, curve: tutti i valori del sistema
    style.css           lo stile del sito, commentato sezione per sezione
  fonts/                Instrument Serif (regolare, corsivo) e DM Sans (400/500), solo latino
  js/
    main.js             ripieghi per i popup; le animazioni arriveranno qui
    vendor/             GSAP e ScrollTrigger, in locale (servono solo per il parallax)
riferimenti/
  *.png                 mockup di ogni sezione a 1440px (1px immagine = 1px del sito)
  wireframe/*.png       wireframe con i post-it sul movimento
  pdf/                  i PDF originali
```

## Dove cambiare cosa

- **Un colore, una dimensione di testo, il margine** → `assets/css/tokens.css`. Si cambia una volta e vale
  ovunque.
- **L'aspetto di una sezione** → `assets/css/style.css`, cercando il numero della sezione (es. `02`). Le regole
  per tablet e telefono stanno in fondo al blocco di ogni sezione (`@media (width < 1024px)` e `(width < 768px)`).
- **I testi dei popup di approfondimento** → `index.html`, in fondo: un `<dialog>` per progetto, con i
  `LOREM — DA FORNIRE` da sostituire.

## Vederlo da un server (facoltativo)

Aperto come file funziona tutto. Per provarlo come sarà online:

```
python3 -m http.server
```

poi apri `http://localhost:8000`.
