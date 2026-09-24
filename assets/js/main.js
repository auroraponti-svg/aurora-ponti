/* =========================================================================
   MAIN.JS
   Per ora solo i popup di approfondimento. Le animazioni arrivano al punto 4.
   Il sito deve funzionare anche se questo file non parte: qui dentro ci
   sono solo miglioramenti, mai il meccanismo principale.
   ========================================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     POPUP DI APPROFONDIMENTO
     I pulsanti "Vedi di più" usano gli attributi commandfor e command: nei
     browser recenti aprono e chiudono il popup da soli, senza JavaScript.
     Qui sotto due ripieghi per i browser che non li conoscono ancora.
     ----------------------------------------------------------------------- */

  // 1. Apertura e chiusura dai pulsanti
  if (!('commandForElement' in HTMLButtonElement.prototype)) {
    document.addEventListener('click', function (event) {
      var button = event.target.closest('button[commandfor]');
      if (!button) return;

      var dialog = document.getElementById(button.getAttribute('commandfor'));
      if (!dialog) return;

      var command = button.getAttribute('command');
      if (command === 'show-modal' && !dialog.open) dialog.showModal();
      if (command === 'close') dialog.close();
    });
  }

  // 2. Chiusura cliccando fuori dal popup (closedby="any" fa lo stesso,
  //    dove è supportato). Il clic sullo sfondo arriva al <dialog> stesso.
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    document.querySelectorAll('dialog.modal').forEach(function (dialog) {
      dialog.addEventListener('click', function (event) {
        if (event.target === dialog) dialog.close();
      });
    });
  }
})();
