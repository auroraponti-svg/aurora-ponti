# Portfolio Aurora Ponti

## Specifiche per lo sviluppo

Aurora Ponti · 23 settembre 2026

> **Come leggere questo file.** È la fonte di verità del progetto: se il codice e il file non concordano, sbaglia
> il codice. Il PDF originale è in `riferimenti/pdf/`, i mockup a 1440px in `riferimenti/*.png`, i wireframe con i
> post-it in `riferimenti/wireframe/*.png`.
> Le **correzioni tecniche** concordate il 24 settembre 2026 sono segnate con ⚠ nel punto in cui valgono e
> sostituiscono il testo originale dove lo contraddicono. Le risposte ai punti aperti sono in fondo, in
> [Decisioni concordate](#decisioni-concordate-24-settembre-2026).

Sito one-page con scroll narrativo in sette sezioni, palette bianco/blu, tipografia Instrument Serif + DM Sans. Stack consigliato: HTML/CSS/JS statico con GSAP e ScrollTrigger; Next.js solo se in futuro serve un blog. Il riferimento visivo è la canvas "Mockup Portfolio Aurora", dove ogni sezione ha accanto il suo post-it con le indicazioni di movimento.

## Sistema

Una sola famiglia di blu su bianco. Nessun secondo colore d'accento: la ricchezza arriva dal contrasto di valore, non dalla varietà di tinte.

### Colori

| Token | Valore | Uso |
| --- | --- | --- |
| `--ink` | `#0F1A30` | Titoli e testo principale |
| `--ink-2` | `#45556F` | Testo secondario, paragrafi |
| `--ink-3` | `#616F85` ⚠ | Meta, didascalie, date |
| `--blue` | `#25439B` | Accento: link, corsivi in evidenza, numeri di tappa |
| `--blue-deep` | `#16296B` | Fondo pieno, **solo** sezione 02 |
| `--blue-panel` | `#1E3480` | Pannello foto dentro la sezione 02 |
| `--blue-soft` | `#8FA5D4` | Testo su fondo blu profondo, dettagli |
| `--tint` | `#EDF1FB` | Riempimenti chiari, segnaposto immagini |
| `--line` | `#DCE3F1` | Bordi visibili |
| `--line-soft` | `#EAEFF8` | Separatori tra righe |
| `--bg` | `#FFFFFF` | Fondo base |
| `--bg-alt` | `#F6F8FD` | Fondo alternato, sezioni 04 e 06 |

> ⚠ **`--ink-3` era `#6C7B94`.** Quel valore ha contrasto 4.29:1 su `--bg` e 4.03:1 su `--bg-alt`: sotto il minimo
> di 4.5:1 per il testo normale, e le date della sezione 06 stanno proprio su `--bg-alt`. `#616F85` è la stessa
> tinta appena più scura: 5.10:1 su `--bg`, 4.80:1 su `--bg-alt`, 4.51:1 su `--tint`.

Ritmo dei fondi lungo lo scroll: `01 bianco · 02 BLU PROFONDO · 03 bianco · 04 tinta · 05 bianco · 06 tinta · 07 bianco`. Il blu profondo compare una volta sola in tutta la pagina, sul caso studio principale: è quello che lo rende impossibile da saltare.

### Tipografia

Due famiglie, entrambe su Google Fonts. La regola che le tiene insieme: **il serif è la voce, il sans sono i dati.** Nomi, titoli e frasi in serif; numeri, meta e testo corrente in sans.

| Token | Font | Uso |
| --- | --- | --- |
| `--font-display` | Instrument Serif 400 + corsivo | Titoli, nomi progetto, frasi in evidenza |
| `--font-body` | DM Sans 400 / 500 | Paragrafi, meta, numeri, pulsanti |

**Instrument Serif ha un solo peso (400).** Non applicare mai `font-weight` maggiore di 400: il browser sintetizza un finto grassetto che imbruttisce le forme. La gerarchia si fa con la dimensione, non col peso.

Attivare le cifre tabellari su DM Sans ovunque compaiano numeri in colonna — date della timeline, statistiche del caso studio: `font-variant-numeric: tabular-nums`. Senza, le date non si incolonnano.

| Ruolo | Font | Dimensione | Interlinea | Crenatura |
| --- | --- | --- | --- | --- |
| Hero (nome) | display | 96px | 0.94 | -0.025em |
| Titolo sezione | display | 46–52px | 1.08 | -0.025em |
| Frase in evidenza (sez. 05) | display | 72px | 1.05 | -0.03em |
| Nome progetto | display | 36px | 1.1 | -0.02em |
| Tappa processo | display | 28px | 1.2 | -0.015em |
| Riga timeline | display | 23px | 1.3 | -0.012em |
| Paragrafo | body 400 | 15–16px | 1.65–1.75 | 0 |
| Meta / categoria | body 500 | 13px | 1.4 | +0.01em |
| Statistiche | body 500 | 34px | 1 | -0.02em |

Limite di misura per i paragrafi: 40–52 caratteri per riga (`max-width` in `ch`, non in px). Oltre, l'occhio perde la riga di ritorno.

**Ruoli presi dal mockup** (decisione del 24 settembre 2026: le misure che il mockup usa davvero entrano nelle
specifiche). Misurate al pixel sui riferimenti a 1440px.

| Ruolo | Font | Dimensione | Interlinea | Crenatura | Dove |
| --- | --- | --- | --- | --- | --- |
| Titolo sezione, variante compatta | display | 46px | 1.08 | -0.025em | "Altri lavori" (03); la 04 usa 52px |
| Titolo grande | display | 64px | 1.05 | -0.025em | "FLU / Uniting" (02), "Parliamone." (07) |
| Titolo piccolo | display | 40px | 1.3 | -0.025em | "Il mio percorso" (06), contatore "01" (02) |
| Attacco | display | 32px | 1.2 | -0.015em | "Nata tra strategia e operatività" (05) |
| Ruolo hero | body 400 | 19px | 1.4 | 0 | "Marketing Manager Junior — …" |
| Email | body 400 | 17px | — | 0 | Email nel contatto (07) |
| Link con freccia | body 500 | 15px | 1.4 | 0 | "Vedi il caso completo" |
| Pulsante | body 500 | 14px | 1 | 0 | "Guarda i progetti" |
| Dettaglio | body 400 | 14px | 1.4 | 0 | Azienda e anni (06), link social (07), "/ 01" (02) |
| Etichetta | body 400 | 12px | 1.2 | 0 | Etichette statistiche (02), piè di pagina (07) |
| Numero di sfondo | body 400 | 120px | 1 | 0 | Numeri 01–03 della sezione 03, colore `--bg-alt` |

## Griglia e margini

**La regola che conta: margine sinistro di 90px identico su tutte le sezioni.** Scorrendo la pagina, il bordo sinistro del testo non si sposta mai. È il dettaglio che nessuno nota consapevolmente e che distingue un sito progettato da uno assemblato — non va rotto per nessun motivo estetico.

Unica eccezione: la sezione 02, che è divisa in due pannelli a tutta altezza (52% foto / 48% contenuto). Lì il testo parte dal proprio pannello, quindi il margine è interno e vale 72px.

| Misura | Valore |
| --- | --- |
| Larghezza di progetto | 1440px |
| Altezza sezione | 100vh, minimo 760px |
| Margine orizzontale | 90px |
| Passo di spaziatura | multipli di 4px |

Le sezioni sono alte quanto la finestra e si susseguono in scroll normale: **niente scroll-snap**, che su trackpad e su mobile combatte col gesto dell'utente e fa sembrare la pagina rotta.

Proporzioni delle righe progetto (sezione 03): testo 44% / immagine 56%, con 36px di distanza. Le tre immagini hanno la stessa altezza (172px) — un disallineamento anche di pochi pixel qui si vede subito.

La riga centrale è specchiata: immagine a sinistra, testo a destra con `text-align: right`. Il paragrafo descrittivo ha `max-width` in `ch` **e** `margin-left: auto`, altrimenti si allinea a destra dentro il proprio blocco invece che al bordo esterno, e le tre righe non condividono lo stesso margine.

## Le sette sezioni

L'ordine non è casuale: **prima la prova, poi la spiegazione.** Chi arriva vede un risultato concreto entro il primo scroll, e solo dopo il metodo, la persona e le credenziali. Se in futuro si aggiungono sezioni, questa logica va mantenuta.

| # | Sezione | Contenuto | Fondo |
| --- | --- | --- | --- |
| 01 | Hero | Nome su due righe, ruolo, una riga di sintesi, pulsante verso i progetti, foto verticale a destra | bianco |
| 02 | Progetto in evidenza | Caso FLU / Uniting: foto a sinistra, categoria, nome, descrizione, tre statistiche, link al caso completo, frecce per scorrere altri due casi | blu profondo |
| 03 | Altri progetti | Tre righe editoriali: categoria e anno, nome, descrizione, immagine. Numero grande sullo sfondo | bianco |
| 04 | Come lavoro | Titolo, sottotitolo, linea di processo orizzontale con quattro tappe | tinta |
| 05 | Chi sono | Tre blocchi asimmetrici in alto, linea tratteggiata, frase grande in basso | bianco |
| 06 | Percorso | Sei righe: ruolo, azienda, anni. Titolo allineato a destra in alto | tinta |
| 07 | Contatto | Scritta gigante di sfondo, nome, email, link social | bianco |

### Dettagli che non si vedono dal mockup

**Sezione 02** — le frecce scorrono i casi studio in evidenza. Al momento solo FLU / Uniting ha contenuti reali. Finché è l'unico, il contatore dice `01 / 01` e **le frecce non compaiono**: meglio nessuna freccia che una freccia che gira a vuoto. Il link "Vedi il caso completo" porta alla pagina di caso studio descritta più avanti.

**Sezione 03** — i numeri di sfondo (01, 02, 03) sono decorativi e sbordano oltre il margine. Vanno esclusi dai lettori di schermo con `aria-hidden="true"`, altrimenti vengono letti come contenuto.

**Sezione 04** — la linea orizzontale ha un gradiente da `--line` a `--blue`: la progressione cromatica è la metafora dell'avanzamento nel funnel. I quattro pallini sono sopra la linea e hanno il fondo del colore della sezione, così "bucano" la linea invece di sovrapporsi.

> ⚠ **Numeri delle tappe.** Nel mockup "01" e "02" sono più chiari (circa 2.3:1 e 3.5:1 su `--bg-alt`), sotto il
> minimo per il testo. I numeri restano sopra 4.5:1 (da `--ink-3` a `--blue`); la progressione cromatica resta
> intera nella linea e nei pallini, che sono decorativi.

**Sezione 07** — la scritta "CONTATTO" è puramente decorativa: `aria-hidden`, e il testo vero è quello in primo piano. Deve restare più chiara del testo sopra in ogni circostanza; se si scurisce, il contrasto del contenuto salta.

## Destinazioni e navigazione

### Dove portano i progetti

Un cursore che dice "Vedi progetto →" è una promessa. Se dall'altra parte non c'è niente, è un cartello "Entrata" su un muro — e il visitatore lo scopre proprio nell'istante in cui era più interessato.

I progetti non sono tutti nella stessa situazione, quindi la destinazione si dichiara per progetto: **l'interfaccia promette solo quello che può mantenere.**

| Stato | Quando si usa | Cosa fa la riga |
| --- | --- | --- |
| `caso` | Esiste una pagina di caso studio | Cursore "Vedi il caso →", riga cliccabile, porta a `progetti/<slug>.html` ⚠ → *superato da D17: apre il popup di approfondimento* |
| `link` | Non c'è il caso, ma il lavoro è online | Cursore "Vedi il sito →" (o "Vedi il profilo →"), apre l'URL esterno in nuova scheda con `rel="noopener"` |
| `nessuno` | Né l'uno né l'altro | Nessun cursore, nessun hover, riga non cliccabile. Resta leggibile come scheda descrittiva |

Lo stato vive nel markup come `data-destinazione="caso|link|nessuno"`, così cambiarlo è una parola sola e non un rifacimento. Il cursore magnetico legge quell'attributo per decidere il proprio testo, e non si attiva affatto sullo stato `nessuno`.

> ⚠ **Percorso relativo.** Il PDF scrive `/progetti/<slug>.html`: la barra iniziale significa "dalla radice del
> disco" quando si apre `index.html` come file, e il link si rompe. Si usa `progetti/<slug>.html`, che funziona
> sia da file sia online.

Stessa logica sulle righe della timeline (sezione 06): oggi non portano da nessuna parte, quindi niente hover che suggerisca un click — il cambio di fondo `--tint` va bene perché segnala lettura, non destinazione.

### La pagina di caso studio

> ⚠ **Superata dalla decisione D17 (24 settembre 2026):** l'approfondimento si apre in un popup sulla pagina, non
> in una pagina separata. La struttura qui sotto (testata, contesto, cosa ho fatto, risultati) resta la traccia
> dei contenuti del popup.

Un template solo, riempito con contenuti diversi. Stesso sistema di colori, tipografia e margini del portfolio: deve sembrare la stessa casa, non un allegato.

1. **Testata** — categoria e anno, nome del progetto, ruolo di Aurora, una riga di sintesi
2. **Il contesto** — qual era il problema del cliente, in un paragrafo
3. **Cosa ho fatto** — il lavoro in tre o quattro blocchi, ognuno con la sua immagine
4. **Risultati** — le statistiche, stesso trattamento della sezione 02
5. **Piede** — progetto precedente / successivo, e ritorno al portfolio

Per chi fa marketing, una pagina indicizzabile vale molto più di una modale: la modale non ha un indirizzo, non si manda a un collega e non si posta su LinkedIn. Quindi pagina vera, con `<title>`, meta description e immagine OG propri.

La pagina eredita le animazioni del portfolio, ma più sobrie: qui la persona è venuta a leggere, non a essere stupita.

### Il menu

Il mockup non ne ha uno, ed è una scelta giusta da difendere: sette sezioni a tutta altezza raccontano una storia in un ordine preciso — prima la prova, poi la spiegazione — e un menu completo inviterebbe a saltare, disfacendo quell'ordine.

Ma senza nulla, l'email resta a sette scroll di distanza, e chi vuole scrivere ad Aurora è esattamente la persona da non far faticare. Serve il minimo che risolve il problema senza aprirne un altro.

**Barra fissa, due voci.**

| Aspetto | Specifica |
| --- | --- |
| Quando compare | Dopo l'80% dell'altezza dell'hero; sparisce tornando su |
| Sinistra | "Aurora Ponti" in serif 15px — torna in cima |
| Destra | "Contatti" in sans 500 13px — scroll morbido alla sezione 07 |
| Altezza | 64px, margini orizzontali uguali a quelli della pagina |
| Fondo | Bianco all'85% con `backdrop-filter: blur(12px)`, bordo inferiore `--line-soft` |
| Ingresso | Fade + `translateY(-8px → 0)`, 300ms ease-out |
| Mobile | Identica, margine 24px. **Niente hamburger**: due voci non sono un menu |

Il link "Contatti" è un `<a href="#contatto">` vero, così funziona anche se il JavaScript non parte; lo scroll morbido è un miglioramento, non il meccanismo. Con `prefers-reduced-motion` la barra compare senza animazione e il salto è istantaneo.

La barra sta in un `<header>` con `role="banner"`, e il primo elemento focusabile della pagina è uno **skip link** "Vai al contenuto", invisibile finché non riceve il focus da tastiera. Senza, chi naviga col Tab se la ritrova da attraversare a ogni pagina.

> ⚠ **Barra senza JavaScript.** Nasconderla in cima alla pagina e mostrarla dopo l'80% dell'hero richiede
> JavaScript. Per la regola "non nascondere mai in attesa di una classe", se il JavaScript non parte la barra
> resta sempre visibile: è il JavaScript a nasconderla, non il CSS.

## Motion

Ogni sezione ha un movimento diverso, coerente con quello che mostra. **Non applicare lo stesso fade-in generico a tutte**: è la differenza tra un sito animato e un sito con le animazioni.

### Curve e regole generali

```
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
```

- Solo `transform` e `opacity` (girano sulla GPU). Mai animare `width`, `height`, `top`, `margin`.
- `ease-out` per tutto ciò che entra. **Mai `ease-in`**: parte lento proprio nell'istante in cui l'occhio guarda, e fa sembrare il sito pigro.
- Nessun rimbalzo, nessun effetto elastico: il registro è professionale, non giocoso.
- Gli elementi entrano da `scale(0.96)` o `translateY`, mai da `scale(0)` — nulla, nella realtà, compare dal nulla.
- Ogni rivelazione deve partire da uno stato già visibile e migliorarlo. Se l'animazione non parte (scheda in background, crawler, JS lento), il contenuto deve essere comunque lì. Non nascondere mai il contenuto in attesa di una classe.
- `IntersectionObserver` con `{ once: true, rootMargin: "-100px" }`: ogni animazione parte una volta sola, non a ogni passaggio.

> ⚠ **Partenze invisibili.** Diverse righe della tabella partono da uno stato nascosto (`opacity: 0`,
> `clip-path: inset(0 100% 0 0)`, `scaleX(0)`, contatori da zero), in contrasto con la regola qui sopra. Si
> risolvono così: HTML e CSS di base mostrano **sempre** tutto nello stato finale. Solo il JavaScript, quando è
> partito davvero, porta nello stato iniziale gli elementi ancora fuori dallo schermo e li anima quando entrano.
> Se il JavaScript non parte o fallisce, nessun elemento viene mai nascosto. Ciò che è già visibile al caricamento
> non viene nascosto e fatto riapparire (niente lampeggi).

### Tabella delle animazioni

| Sezione | Elemento | Innesco | Animazione | Durata | Easing |
| --- | --- | --- | --- | --- | --- |
| 01 | Blocco hero | Caricamento | Fade + `scale(1.04 → 1)` | 900ms | ease-out |
| 01 | Nome (2 righe) | Caricamento | `clip-path` dal basso, riga per riga | 700ms, sfalsate 80ms | ease-out |
| 01 | Linee di sfondo | Scroll | Parallax a 0.3× | continuo | lineare |
| 02 | Foto | Ingresso viewport | `clip-path: inset(0 100% 0 0) → inset(0)` | 900ms | ease-out |
| 02 | Testo | Ingresso viewport | Fade + `translateY(24px → 0)`, riga per riga | 600ms, sfalsate 80ms | ease-out |
| 02 | Tre statistiche | Ingresso viewport | Conteggio da zero | 600ms | ease-out |
| 02 | Cambio caso (frecce) | Click | Stesso wipe, nuova foto; numero con slide verticale | 700ms | ease-out |
| 03 | Numero di sfondo | Ingresso riga | `clip-path` dal basso | 400ms | ease-out |
| 03 | Testo riga | Ingresso riga | Fade + `translateY(16px → 0)` | 500ms, sfalsate 40ms | ease-out |
| 03 | Immagine | Scroll | Parallax a 0.85× rispetto al testo ⚠ | continuo | lineare |
| 04 | Linea di processo | Ingresso viewport | `scaleX(0 → 1)`, origine a sinistra | 800ms | ease-out |
| 04 | Pallini | Quando la linea li raggiunge | Fade + `scale(0.8 → 1)` | 300ms | ease-out |
| 04 | Testo tappe | Dopo il proprio pallino | Fade + `translateY(12px → 0)` | 400ms, sfalsate 120ms | ease-out |
| 05 | Tre blocchi | Ingresso viewport | Fade + `translateY(20px → 0)` | 500ms, sfalsate 120ms | ease-out |
| 05 | Linea tratteggiata | Dopo i blocchi | `scaleX(0 → 1)` da sinistra | 600ms | ease-out |
| 05 | Parola in corsivo | 200ms dopo la frase | Fade da `opacity: 0` | 500ms | ease-out |
| 06 | Righe timeline | Ingresso viewport | Fade + `translateY(12px → 0)` | 400ms, sfalsate 60ms | ease-out |
| 07 | Scritta gigante | Ingresso viewport | Fade + `translateY(60px → 0)` | 1100ms | ease-out |
| 07 | Contenuto in primo piano | 300ms dopo la scritta | Fade + `translateY(16px → 0)` | 600ms | ease-out |

> ⚠ **Parallax delle immagini, sezione 03.** Spostare l'intera immagine a 0.85× la farebbe muovere di circa ±80px
> mentre attraversa lo schermo, invadendo le linee di separazione tra le righe (distanti circa 30px). La cornice da
> 172px resta ferma e allineata; è l'immagine **dentro** la cornice a scorrere più lenta, con un'escursione massima
> di circa ±16px.

### Stati al passaggio del mouse

| Elemento | Stato | Comportamento |
| --- | --- | --- |
| Riga progetto (sez. 03) | Hover | Cursore personalizzato "Vedi progetto →" che segue il puntatore con inerzia (spring, non posizione diretta) |
| Riga progetto | Hover | **Nessuno zoom sull'immagine.** L'immagine non è un bersaglio cliccabile: animarla è il tell dell'animazione messa perché si poteva |
| Riga timeline (sez. 06) | Hover | Fondo `--tint`, transizione 200ms |
| Pulsante hero, frecce sez. 02 | Hover | Fondo pieno / inversione colore, 200ms |
| Qualsiasi elemento premibile | Active | `transform: scale(0.97)`, 160ms ease-out |

Gli stati hover vanno chiusi in `@media (hover: hover) and (pointer: fine)`: sui dispositivi touch l'hover si attiva al tocco e resta appiccicato.

Il cursore personalizzato non segue la posizione esatta del mouse: a ogni frame si avvicina del **15%** della distanza che lo separa dal puntatore (`x += (obiettivo - x) * 0.15`). Senza questa inerzia sembra incollato al puntatore e innaturale; molto più in basso arriva in ritardo, come un cane al guinzaglio. Se si usa una libreria di animazione, l'equivalente è una molla con `stiffness: 100, damping: 15` — stesso comportamento, due modi di scriverlo: **implementarne uno solo.**

> **Scelta (24 settembre 2026):** si implementa la formula del 15% a ogni frame, in poche righe di JavaScript con
> `requestAnimationFrame`, senza libreria. GSAP + ScrollTrigger restano solo per il parallax.

## Responsive

I mockup sono a 1440px. **Il mobile non è ancora disegnato**, quindi queste sono regole, non schermate: se qualcosa resta ambiguo in fase di sviluppo, va chiesto prima di decidere.

Un portfolio di questo tipo viene aperto spessissimo da telefono — tipicamente da un link su LinkedIn. Il mobile non è un ripiego.

Breakpoint: `390` / `768` / `1024` / `1440`.

| Sezione | Sotto 768px |
| --- | --- |
| Margine | Da 90px a 24px |
| 01 Hero | Nome a 44–52px. Foto sotto il testo, a tutta larghezza, altezza ridotta. Linee di sfondo mantenute ma più lente |
| 02 Caso in evidenza | Impila: foto sopra (55vh), contenuto sotto. Le tre statistiche restano in riga — se non entrano, due sopra e una sotto, mai in colonna |
| 03 Altri progetti | Una colonna: immagine sopra, testo sotto. **L'alternanza sparisce** (in colonna singola non significa nulla) e il testo torna tutto allineato a sinistra. Numeri di sfondo ridotti a 64px, in linea col testo |
| 04 Come lavoro | La linea ruota in verticale: scende lungo il bordo sinistro, le quattro tappe si impilano con i pallini sulla linea |
| 05 Chi sono | Una colonna, i tre blocchi si impilano. Frase finale a 36–42px |
| 06 Percorso | Due righe per voce: ruolo sopra, azienda e anno sotto sulla stessa riga (azienda a sinistra, anno a destra). La colonna centrale sparisce |
| 07 Contatto | La scritta gigante usa `clamp()` per stare nella larghezza senza scroll orizzontale. Mai lasciarla tagliare |

### Cosa cambia nel movimento

**Il cursore magnetico "Vedi progetto →" non esiste su mobile**: non c'è un puntatore da seguire. Va sostituito con una freccia statica accanto al nome del progetto, sempre visibile, e l'intera riga diventa un'area toccabile.

Il parallax va ridotto o disattivato sotto i 768px: su mobile scatta, consuma batteria e in molti browser entra in conflitto con la barra degli indirizzi che compare e scompare durante lo scroll.

Tutte le aree toccabili ad almeno 44×44px, con 8px di distanza tra una e l'altra. Le frecce della sezione 02 sono già dimensionate così (46px).

Usare `min-height: 100dvh` e non `100vh`: su mobile `vh` non tiene conto della barra del browser e taglia il contenuto.

> ⚠ **`svh` invece di `dvh`.** `100dvh` cambia valore mentre la barra del browser compare e scompare: le sezioni si
> ridimensionano durante lo scroll e la pagina "salta". Si usa `min-height: 100svh` (l'altezza con la barra
> visibile: stabile, non taglia mai il contenuto), con `100vh` come ripiego per i browser che non conoscono `svh`.

## Accessibilità

Non è un adempimento burocratico: un portfolio che funziona da tastiera e con contrasti corretti è anche un portfolio che si legge al sole, sul treno, con lo schermo sporco.

**Contrasti** — tutti i colori del sistema sono già verificati contro i rispettivi fondi: minimo 4.5:1 per il testo normale, 3:1 per il testo grande. Se si cambia una tinta va riverificata. Il rischio più comune è schiarire un grigio "per eleganza" e scendere sotto soglia. ⚠ *Non era vero per `--ink-3`: corretto, vedi Colori.*

**Elementi reali, non finti** — il pulsante dell'hero è un `<a>`, le frecce della sezione 02 sono `<button>`. Mai un `<div>` con un click sopra: il tasto Tab non ci arriva e i lettori di schermo non lo annunciano.

**Etichette** — le frecce contengono solo un simbolo, quindi servono `aria-label="Caso precedente"` e `aria-label="Caso successivo"`.

**Focus visibile** — anello di 2px in `--blue` su ogni elemento interattivo. Non rimuoverlo con `outline: none` senza sostituirlo.

> ⚠ **Focus sulla sezione 02.** `--blue` sul fondo `--blue-deep` ha contrasto 1.5:1: l'anello sarebbe invisibile.
> Sulla sezione 02 l'anello è bianco (`--bg`, 13.4:1).

**Gerarchia dei titoli** — un solo `<h1>`, il nome nell'hero; poi `<h2>` per i titoli di sezione. Niente salti di livello.

**Decorazioni escluse** — `aria-hidden="true"` sui numeri di sfondo della sezione 03, sulla scritta "CONTATTO" della 07 e sulle linee SVG dell'hero.

**Movimento ridotto** — obbligatorio. Dentro `@media (prefers-reduced-motion: reduce)` spariscono parallax, spostamenti e clip-path; restano solo le dissolvenze, accorciate a 200ms. Ridurre non significa azzerare: le dissolvenze aiutano a capire che qualcosa è cambiato.

## Performance

Un portfolio lento vanifica il lavoro fatto sul movimento: le animazioni scattano e sembrano mal fatte anche quando sono corrette.

**Font** — caricare solo i tagli usati: Instrument Serif regolare e corsivo, DM Sans 400 e 500. Usare `font-display: swap` e precaricare solo i due file necessari sopra la piega. Ospitare i font in locale invece che da Google Fonts riduce di una connessione esterna e migliora la privacy.

**Immagini** — le immagini dei progetti occupano circa il 60% della superficie visiva: sono il fattore principale. Formato WebP o AVIF, `srcset` per le diverse densità, `loading="lazy"` su tutto quello che sta sotto la piega, e `width`/`height` sempre dichiarati per evitare che il contenuto salti mentre caricano.

**Budget** — obiettivo sotto i 500KB per il primo caricamento, font inclusi. Se GSAP pesa troppo per un progetto di questa dimensione, gran parte delle animazioni in tabella si fa con `IntersectionObserver` e transizioni CSS: solo il parallax e il cursore magnetico traggono un beneficio reale da una libreria.

**Animazioni** — le transizioni CSS girano fuori dal thread principale e restano fluide anche mentre la pagina carica; quelle in JavaScript no. Dove l'animazione è prevedibile (rivelazioni, dissolvenze) conviene il CSS; il JavaScript solo dove serve reagire al movimento del mouse o dello scroll in tempo reale.

## Cosa serve da Aurora

Il mockup è completo come sistema visivo, ma i contenuti sono ancora segnaposto. Finché restano tali, lo sviluppatore può costruire la struttura ma non consegnare.

- [ ] **Foto ritratto** per l'hero, formato verticale (circa 3:4), tagliata a 320×420px
- [ ] **Immagini dei tre progetti** della sezione 03 — screenshot dei siti, foto dei locali, grafiche social già realizzate
- [ ] **Foto del caso FLU / Uniting** per la sezione 02: è la più grande della pagina, va scelta con cura
- [ ] **La destinazione di ogni progetto** — per ognuno dei tre più FLU / Uniting: pagina di caso studio, link al lavoro online (con URL), oppure niente. Vedi "Destinazioni e navigazione"
- [ ] **Testi del caso studio** per i progetti a cui si dà una pagina: contesto, lavoro svolto, risultati
- [ ] **Decisione sugli altri due casi in evidenza** della sezione 02, se si vogliono le frecce
- [ ] **Testi definitivi** — quelli attuali sono una bozza tratta dal CV. Va riletta soprattutto la descrizione di FLU / Uniting: è il paragrafo che un selezionatore legge per intero
- [x] **URL LinkedIn** e conferma dell'indirizzo email da mostrare → vedi D2
- [ ] **Dominio** dove pubblicare

### Nota sui numeri

Le cifre della sezione 02 (200.000 € convertiti, 15 warm lead, 8 brief) vengono dal profilo professionale. Prima della pubblicazione conviene verificare di poterle rendere pubbliche: sono dati di un cliente, e in un colloquio potrebbero essere chieste nel dettaglio. Se ci fossero vincoli di riservatezza, si possono presentare in forma relativa — per esempio "il 22% del budget in brief convertito" invece del valore assoluto.

## Decisioni concordate (24 settembre 2026)

Risposte alle domande aperte prima dello sviluppo. Valgono come il resto del documento.

### Contenuti

- **D1 — Testi.** Si usano i testi del mockup: vengono dal CV, non sono inventati. Il segnaposto
  `LOREM — DA FORNIRE` va solo dove il materiale manca davvero. Dove mockup e wireframe differiscono, vale il mockup.
- **D2 — Contatti.** Email confermata: `aurora.ponti@live.it`. LinkedIn: `https://www.linkedin.com/in/ponti-aurora`.
- **D3 — Statistiche della sezione 02.** Segnaposto finché non c'è conferma che le cifre (€200K, 15, 8) si possono
  pubblicare.
- **D4 — Sezione 02.** Contatore `01 / 01`, frecce nascoste finché gli altri casi non esistono. "Vedi il caso
  completo" apre il popup di approfondimento di FLU / Uniting (vedi D17).
- **D5 — Destinazioni.** Il meccanismo `data-destinazione` resta nel markup. Tutti e quattro i progetti sono
  `caso`: aprono il proprio popup di approfondimento (D17).
- **D6 — Percorso.** Le due voci "Stage marketing — Boggi Milano" (2021 e 2019) sono corrette, non un doppione.
- **D7 — Pulsante "Guarda i progetti".** Porta al primo progetto, la sezione 02.

### Layout

- **D8 — Schermi oltre 1440px.** Il contenuto sta in una colonna di 1440px centrata: il bordo sinistro resta
  identico in tutte le sezioni, solo più a destra. Fondi colorati e pannelli della sezione 02 restano a tutta
  larghezza.
- **D9 — Tablet (768–1023px).** Le sezioni 02, 03, 04 e 05 si impilano già come su mobile; le altre restano come
  su desktop. Il margine resta 90px fino a 768px, come da tabella responsive. *(La 05 è stata aggiunta costruendo
  il responsive: con tre colonne a 768px i paragrafi scendevano a circa 20 caratteri per riga, metà della misura
  minima.)*
- **D10 — "CONTATTO" (sezione 07).** Rientra sempre nei bordi, a qualsiasi larghezza, desktop compreso.
- **D11 — Specifiche e mockup.** Dove non concordano vince questo documento: sezione 02 divisa 52% / 48% (il mockup
  misura circa 47 / 53), immagini della sezione 03 alte 172px (il wireframe dice 160).
- **D12 — Hero.** Nel mockup il ruolo va a capo e si sovrappone al paragrafo, e la freccia del pulsante scende sotto
  il testo: sono errori di impaginazione del mockup e non si riproducono.
- **D12b — Altri punti in cui vince il documento sul mockup** (emersi costruendo le sezioni):
  - paragrafi mai sotto 15px: le descrizioni delle tappe (04) sono a 15px, il mockup le ha a 14px;
  - numeri delle tappe (04) nel ruolo Meta, 13px (il mockup li ha a circa 11px);
  - misura massima 52ch: il sottotitolo della 04 va a capo prima che nel mockup (lì la riga supera i 52ch);
  - margine interno di 72px anche per il contatore della sezione 02 (il mockup lo mette a 56px);
  - immagine della riga specchiata (03) larga come le altre, 56% (nel mockup è 20px più stretta);
  - titolo della sezione 06 appoggiato al margine destro di 90px ("allineato a destra"); nel mockup finisce circa
    80px prima.

### Tecnica

- **D13 — Titoli nascosti.** Le sezioni 02 e 05 non hanno un titolo visibile: ricevono un `<h2>` letto dai lettori
  di schermo ma invisibile a occhio ("Progetto in evidenza", "Chi sono"), così la gerarchia non salta.
- **D14 — Risorse locali.** Font e GSAP sono salvati nel progetto, niente CDN: `index.html` funziona anche offline.
  Dei font si usa solo il sottoinsieme latino, che copre l'italiano.
- **D15 — Precarico dei font.** Aprendo `index.html` come file il browser rifiuta il precarico e segna un errore
  in console; i font arrivano comunque dal CSS. Il precarico quindi si attiva solo quando il sito è su un server.
- **D16 — Correzioni tecniche.** Le note ⚠ sono correzioni concordate e sostituiscono il testo originale dove lo
  contraddicono.

### Approfondimenti e responsive (24 settembre 2026, punto 3)

- **D17 — Approfondimenti in popup.** Sotto ogni progetto (i tre della sezione 03 e FLU / Uniting nella 02) c'è un
  pulsante che apre un popup grande sulla pagina con l'approfondimento: niente pagina separata, per restare
  snelli. Nella 03 il pulsante si chiama "Vedi di più"; nella 02 resta "Vedi il caso completo", come nel mockup.
  - Il popup è un `<dialog>` nativo: si apre anche senza JavaScript nei browser recenti (`commandfor`), blocca lo
    scroll della pagina, si chiude con Esc, con la X o cliccando fuori, e riporta il focus al pulsante.
  - Contenuti: testata (categoria e anno, nome), una riga di sintesi, un'immagine, poi i blocchi "Il contesto",
    "Cosa ho fatto", "Risultati". Tutti `LOREM — DA FORNIRE` finché non arrivano i testi.
  - Su desktop largo fino a 1120px e alto al massimo quanto la finestra meno 80px; sotto i 768px a tutto schermo.
  - Nella 03 l'area del pulsante copre tutta la riga: si può cliccare ovunque, immagine compresa, e il cursore
    "Vedi progetto →" (punto 4) mantiene la promessa. Su touch il pulsante è sempre visibile, quindi la freccia
    statica accanto al nome prevista in "Cosa cambia nel movimento" non serve più.
  - Conseguenza accettata: l'approfondimento non ha un indirizzo proprio da condividere.
- **D18 — Scelte del responsive** dove la tabella non dà un valore:
  - titoli sotto i 768px ridotti in proporzione, così il nome dell'hero resta il testo più grande: titolo grande
    40px, titolo sezione 34px (compatto 32), titolo piccolo 30, nome progetto 28, attacco 26, tappa 24, riga
    timeline 20. Paragrafi e dati restano uguali;
  - foto dell'hero: sotto i 1067px si stringe al 30% della finestra (sempre 3:4); sotto i 768px è a tutta larghezza
    in 4:3;
  - linee dell'hero su mobile: mantengono le proporzioni e si centrano, invece di schiacciarsi;
  - numeri di sfondo della 03 sotto i 1024px: 64px, allineati al bordo del testo, senza sbordare ("in linea col
    testo");
  - sezione 07 sotto i 768px: "CONTATTO" sale sopra il piede di pagina invece di sovrapporsi, perché lì hanno
    quasi la stessa dimensione;
  - aree toccabili: link e pulsanti alti almeno 44px; dove il disegno li vuole più bassi, l'area cresce ma lo
    spazio visivo resta quello del mockup.
