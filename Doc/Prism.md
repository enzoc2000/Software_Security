# Modellazione Probabilistica della Funzionalità "Invio Crediti"

## Obiettivo

Nel contesto del progetto e dell'interazione con la blockchain, una delle operazioni più critiche è l’invio di carbon credit da un attore a un altro. Questa funzionalità ha implicazioni dirette sulla sicurezza, affidabilità e correttezza del sistema.

Per dimostrare la correttezza della logica implementata e la conformità ai requisiti di progettazione sicura, abbiamo modellato tale comportamento tramite una catena di Markov a tempo discreto (DTMC) utilizzando PRISM, e verificato due proprietà fondamentali:

- Una proprietà di **safety** (non invio consecutivo di crediti finchè non è terminata la transazione precedente)
- Una proprietà di **guarantee/response** (terminazione garantita)

---

## Modello DTMC

dtmc

module SendCredits

    // Stati: 0 = idle, 1 = sending, 2 = success, 3 = failed
    state : [0..3] init 0;

    // Avvia l'invio (solo se inattivo)
    [send] state=0 -> 1.0 : (state'=1);

    // Esito dell'invio: 90% successo, 10% fallimento
    [result] state=1 -> 0.9 : (state'=2) + 0.1 : (state'=3);

    // Reset dopo invio
    [reset] state=2 | state=3 -> 1.0 : (state'=0);

endmodule

## Proprietà da verificare

// Safety: non si inviano 2 crediti consecutivi
P>=1 [ G ( (state != 1) | (X (state != 1)) ) ]

// Guarantee: ogni invio termina con successo o fallimento
P>=1 [ (state=1) => (true U (state=2 | state=3)) ]

---

## Interpretazione degli Stati

| Stato | Significato                        |
|-------|------------------------------------|
| 0     | Idle (nessuna operazione in corso) |
| 1     | Invio in corso                     |
| 2     | Invio riuscito                     |
| 3     | Invio fallito                      |

---

## Proprietà Verificate

### 1. Proprietà di Safety

P>=1 [ G ( (state != 1) | (X (state != 1)) ) ]

- **Significato**: non è mai possibile avere due step consecutivi in cui lo stato rimane in "sending".
- **Motivazione**: impedisce l’invio di crediti multipli senza esito, una condizione anomala.
- **Realizzabilità**: questa proprietà è rispettata nel codice grazie alla disabilitazione del bottone `submit` e alla logica di invio asincrona.

### 2. Proprietà di Guarantee/Response

P>=1 [ (state=1) => (true U (state=2 | state=3)) ]

- **Significato**: ogni operazione di invio termina con successo o fallimento.
- **Motivazione**: garantisce che ogni richiesta venga gestita entro un tempo finito, senza stalli.
- **Realizzabilità**: implementata nel progetto tramite:
  - Timeout `withTimeout()` lato backend per le transazioni blockchain.
  - Stato di caricamento con feedback all’utente lato frontend.

---

## Allineamento con il Codice

La struttura modellata è direttamente riconducibile alle funzionalità implementate nel codice dell’applicazione:

- Il bottone per l’invio è disabilitato durante un'operazione in corso (`disabled={showModal}`), prevenendo invii multipli e dando sicurezza operativa (safety).
- La logica di attesa della conferma della transazione e la gestione dell’errore sono gestite lato frontend e backend, dunque il completamento è garantito (guarantee/response).
- Gli stati "success" e "failed" sono rappresentati nella UI e gestiti con messaggi specifici.

---

## Conclusione

La modellazione PRISM ha fornito una validazione formale di due proprietà fondamentali per l'affidabilità dell'invio dei crediti nella nostra piattaforma. Le proprietà sono effettivamente enforceable grazie ai controllori già presenti nel codice. Questo rafforza la robustezza del sistema dal punto di vista della progettazione sicura.