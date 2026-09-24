/* =========================================================================
   MAIN.JS
   Il sito funziona anche se questo file non parte: qui dentro ci sono solo
   miglioramenti, mai il meccanismo principale.

   INDICE
   1. Preferenze ............ movimento ridotto, puntatore fine
   2. Barra ................. compare dopo l'80% dell'hero
   3. Rivelazioni ........... sezioni 02–07, una volta sola, all'ingresso
   4. Conteggio ............. statistiche della sezione 02
   5. Parallax .............. linee dell'hero, immagini della 03 (GSAP)
   6. Cursore ............... "Vedi di più →" sulle righe della 03
   7. Popup ................. ripieghi e link diretti (#pizzerie-sara)
   ========================================================================= */

(function () {
  'use strict';

  var root = document.documentElement;


  /* -----------------------------------------------------------------------
     1. PREFERENZE
     ----------------------------------------------------------------------- */

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;


  /* -----------------------------------------------------------------------
     2. BARRA
     Nascosta in cima alla pagina, compare dopo l'80% dell'altezza
     dell'hero e sparisce tornando su. Il CSS la nasconde solo se c'è la
     classe js; se questo file non parte, resta sempre visibile.
     ----------------------------------------------------------------------- */

  var header = document.querySelector('.site-header');
  var hero = document.querySelector('.hero');

  if (header && hero) {
    var ticking = false;
    var updateHeader = function () {
      header.classList.toggle('is-visible', window.scrollY > hero.offsetHeight * 0.8);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateHeader);
      }
    }, { passive: true });
    updateHeader();
  }


  /* -----------------------------------------------------------------------
     3. RIVELAZIONI
     Il "sipario": solo i blocchi ancora fuori dallo schermo vengono portati
     allo stato iniziale (classe m-armed), poi rivelati quando entrano
     (classe m-in). Ciò che si vede già al caricamento non viene toccato.
     Le animazioni vere stanno nel CSS, sezione 7 di style.css.
     ----------------------------------------------------------------------- */

  var triggers = document.querySelectorAll('.featured, .work, .process, .about, .timeline, .contact');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('m-in');
        entry.target.dispatchEvent(new CustomEvent('reveal'));
        observer.unobserve(entry.target); // una volta sola
      });
    }, { rootMargin: '-100px' });

    triggers.forEach(function (el) {
      if (el.getBoundingClientRect().top >= window.innerHeight) {
        el.classList.add('m-armed');
        observer.observe(el);
      }
    });
  }


  /* -----------------------------------------------------------------------
     4. CONTEGGIO
     Le statistiche contano da zero quando la sezione 02 entra (600ms,
     ease-out). Solo se la cifra contiene numeri: i segnaposto "XX" restano
     come sono. Nell'HTML c'è sempre il valore finale.
     ----------------------------------------------------------------------- */

  var featured = document.querySelector('.featured');

  if (featured && featured.classList.contains('m-armed') && !reduceMotion) {
    var values = featured.querySelectorAll('.stat__value');
    var parts = [];

    values.forEach(function (el) {
      var match = el.textContent.match(/^(\D*)([\d.,]+)(.*)$/);
      if (!match) return;
      var target = parseFloat(match[2].replace(/\./g, '').replace(',', '.'));
      parts.push({ el: el, before: match[1], after: match[3], target: target, text: el.textContent });
      el.textContent = match[1] + '0' + match[3];
    });

    featured.addEventListener('reveal', function () {
      var start = null;
      var duration = 600;
      var step = function (now) {
        if (start === null) start = now;
        var t = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - t, 3); // ease-out
        parts.forEach(function (p) {
          p.el.textContent = t < 1 ? p.before + Math.round(p.target * eased) + p.after : p.text;
        });
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }


  /* -----------------------------------------------------------------------
     5. PARALLAX (GSAP + ScrollTrigger)
     Linee dell'hero a 0.3×: mentre la pagina sale di 100px, loro salgono
     di 30. Immagini della 03: la cornice resta ferma, l'immagine dentro
     scorre più lenta, al massimo ±16px. Spento sotto i 768px e con
     movimento ridotto.
     ----------------------------------------------------------------------- */

  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);
    var mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', function () {
      if (hero) {
        gsap.to('.hero__lines', {
          y: function () { return hero.offsetHeight * 0.7; },
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true }
        });
      }

      document.querySelectorAll('.work__image img').forEach(function (img) {
        gsap.fromTo(img, { y: -16, scale: 1.2 }, {
          y: 16,
          scale: 1.2,
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });
    });
  }


  /* -----------------------------------------------------------------------
     6. CURSORE
     Sulle righe della 03 un'etichetta segue il puntatore con inerzia: a
     ogni frame si avvicina del 15% della distanza che manca. Il testo
     dipende da data-destinazione; con "nessuno" non compare. Solo con
     mouse o trackpad, e non con movimento ridotto.
     ----------------------------------------------------------------------- */

  var labels = { caso: 'Vedi di più', link: 'Vedi il sito' };
  var rows = document.querySelectorAll('.work[data-destinazione]');

  if (finePointer && !reduceMotion && rows.length) {
    var cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="cursor__text"></span>' +
      '<svg class="icon" viewBox="0 0 16 16"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>';
    document.body.appendChild(cursor);

    var cursorText = cursor.querySelector('.cursor__text');
    var x = 0, y = 0, targetX = 0, targetY = 0;
    var active = false, running = false;

    var loop = function () {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      cursor.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      if (active || Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    document.addEventListener('mousemove', function (event) {
      targetX = event.clientX;
      targetY = event.clientY;
    }, { passive: true });

    rows.forEach(function (row) {
      var label = labels[row.dataset.destinazione];
      if (!label) return;

      row.addEventListener('mouseenter', function (event) {
        cursorText.textContent = label;
        if (!cursor.classList.contains('is-active')) {
          // entra dal punto del puntatore, non dall'ultima posizione
          x = targetX = event.clientX;
          y = targetY = event.clientY;
        }
        active = true;
        cursor.classList.add('is-active');
        if (!running) {
          running = true;
          requestAnimationFrame(loop);
        }
      });

      row.addEventListener('mouseleave', function () {
        active = false;
        cursor.classList.remove('is-active');
      });
    });
  }


  /* -----------------------------------------------------------------------
     7. POPUP DI APPROFONDIMENTO
     I pulsanti usano commandfor e command: nei browser recenti aprono e
     chiudono il popup da soli, senza JavaScript. Qui:
     a) ripiego per i browser che non li conoscono;
     b) chiusura cliccando fuori, dove closedby="any" non è supportato;
     c) link diretti: il popup di Pizzerie Sara ha l'indirizzo
        #pizzerie-sara; aprendo quel link, il popup si apre da solo.
     ----------------------------------------------------------------------- */

  var PREFIX = 'approfondimento-';

  var dialogFromHash = function () {
    var slug = decodeURIComponent(location.hash.slice(1));
    return slug ? document.getElementById(PREFIX + slug) : null;
  };

  var openDialog = function (dialog) {
    if (dialog && dialog.matches('dialog.modal') && !dialog.open) dialog.showModal();
  };

  // a) Apertura e chiusura dai pulsanti
  if (!('commandForElement' in HTMLButtonElement.prototype)) {
    document.addEventListener('click', function (event) {
      var button = event.target.closest('button[commandfor]');
      if (!button) return;
      var dialog = document.getElementById(button.getAttribute('commandfor'));
      if (!dialog) return;
      var command = button.getAttribute('command');
      if (command === 'show-modal') openDialog(dialog);
      if (command === 'close') dialog.close();
    });
  }

  document.querySelectorAll('dialog.modal').forEach(function (dialog) {
    // b) Clic sullo sfondo: arriva al <dialog> stesso
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', function (event) {
        if (event.target === dialog) dialog.close();
      });
    }

    // c) Alla chiusura l'indirizzo torna quello della pagina
    dialog.addEventListener('close', function () {
      if (dialogFromHash() === dialog) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
  });

  // c) All'apertura l'indirizzo prende il nome del progetto
  document.addEventListener('click', function (event) {
    var button = event.target.closest('button[command="show-modal"]');
    if (!button) return;
    var id = button.getAttribute('commandfor') || '';
    if (id.indexOf(PREFIX) === 0) {
      history.replaceState(null, '', '#' + id.slice(PREFIX.length));
    }
  });

  // c) Arrivando da un link diretto
  openDialog(dialogFromHash());
  window.addEventListener('hashchange', function () {
    openDialog(dialogFromHash());
  });


  window.__motionReady = true;
})();
