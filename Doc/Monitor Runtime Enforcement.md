# Programmazione Sicura

Di seguito si riportano le scelte e le implementazioni adottate per garantire la sicurezza dell’applicazione sia lato client sia lato server, con un’attenzione particolare al ​**runtime enforcement**​ delle policy di accesso.

---

## 1. Controllo lato Client - SAFETY: `PrivateRoute`

### 1.1 Obiettivo
- Impedire che un utente non autenticato navighi verso pagine riservate.
- Fornire un feedback immediato (reindirizzamento a `/login`) prima ancora di richiedere risorse al server.

### 1.2 Come funziona
1. Viene creato un hook di autenticazione (`useAuth`) che:
   - Legge token e dati utente da `sessionStorage` o `localStorage` al montaggio.
   - Espone `{ user, token, login(), logout() }` tramite un contesto React (`AuthContext`).
2. Nell’albero delle rotte (file `App.tsx`), si definisce:
   ```tsx
   function PrivateRoute() {
     const { token } = useAuth();
     return token ? <Outlet /> : <Navigate to="/page" />;
   }

   // Esempio di utilizzo:
   <Routes>
     <Route path="/page" element={<Page />} />
     <Route element={<PrivateRoute />}>
       <Route path="/page1" element={<Page1 />} />
       <!-- …altre rotte protette… -->
     </Route>
   </Routes>
     ```
3. **Risultato**: ogni volta che React Router incontra un `<Route>` annidato in `<PrivateRoute>`, verifica se `token !== null`:
   - Se sì → mostra il componente desiderato.
   - Se no → reindirizza immediatamente a `/login`, senza effettuare alcuna chiamata API.

### 1.3 Vantaggi e punti di sicurezza
- **Prevenzione precoce**: l’utente senza token non carica mai la UI delle pagine protette, riducendo i rischi di esposizione accidentale di componenti sensibili.  
- **UX coerente**: l’utente viene portato a login prima di tentare alcuna operazione, evitando errori da chiamate fallite.  
- **Defence-in-depth**: integra un primo livello di filtro; resta comunque indispensabile un controllo lato server (vedi §2).

---

## 2. Controllo lato Server - SAFETY: `authMiddleware`

### 2.1 Obiettivo
- Intercettare tutte le chiamate verso endpoint protetti e rifiutare richieste prive di JWT valido.
- Assicurare che solo chi è autenticato (e autorizzato) possa accedere alle API riservate.

### 2.2 Come funziona
1. Il middleware viene inserito prima del controller di ogni rotta protetta (es. `/api/submitEmissions`).
2. Estrae l’header `Authorization` e verifica che inizi con `"Bearer "`.
3. Decodifica il JWT usando la chiave segreta (`JWT_SECRET`).
   - Se il token è valido, salva `userId` e `role` all’interno di `req` e prosegue con `next()`.
   - Altrimenti, risponde immediatamente con `401 Unauthorized`.

### 2.3 Vantaggi e punti di sicurezza
- **Single Point of Enforcement**  
  Centralizza la logica di verifica del token in un unico layer, riducendo duplicazioni e semplificando la manutenzione.
- **Blocco preventivo**  
  Richieste prive o con token scaduto vengono respinte prima di raggiungere la logica di business.
- **Accesso ai dati dell’utente**  
  L’handler successivo (controller) dispone di `req.userId` e `req.role` già validati, utili per controlli aggiuntivi (es. verifica di permessi).
- **Defence-in-depth**  
  Anche se il client “PrivateRoute” lato browser venisse aggirato, il server non esegue mai operazioni sensibili senza un JWT corretto.
- **Flessibilità per RBAC**  
  Grazie ai campi `role` nel payload, è possibile estendere facilmente il middleware per controlli di ruolo più sofisticati (ad es. consentire solo “admin” per certe rotte).

---
## 3. Controllo lato Server - RESPONSE: `withTimeout`

### 3.1 Obiettivo
- Impedire che operazioni asincrone lato server rimangano in attesa indefinitamente.
- Garantire che ogni endpoint risponda entro un tempo massimo stabilito, migliorando la robustezza e la prevedibilità dell’applicazione.

### 3.2 Come funziona
1. È stata creata una funzione generica `withTimeout<T>(promise, ms, errorMessage)` nel modulo `utils/withTimeout.ts`.
2. La funzione prende in input una `Promise`, un timeout in millisecondi (`ms`) e un messaggio personalizzato per l’errore.
3. Usa `Promise.race()` per far competere:
   - La `Promise` originale.
   - Una `Promise` che viene rigettata dopo `ms` millisecondi.
4. Se la risposta non arriva in tempo, viene lanciato un errore gestibile.

### 3.3 Esempio di utilizzo
Nel backend, `withTimeout` viene utilizzato in endpoint critici come `/api/submitBurn`:

```ts
await withTimeout(
  confirmBurn(burnRequest),
  60000,
  "Submit burn timed out"
);
```

### 3.4 Vantaggi e punti di sicurezza

- **Prevenzione di stalli**  
  Blocca operazioni che richiedono troppo tempo, evitando che il thread/event loop rimanga bloccato o impegnato a tempo indefinito.

- **Controllo centralizzato del timeout**  
  È possibile riutilizzare `withTimeout` su qualsiasi `Promise`, evitando duplicazioni di codice e permettendo policy uniformi.

- **Miglior gestione degli errori lato client**  
  In caso di timeout, il server restituisce uno status `504` con un messaggio esplicativo, aiutando il client a prendere decisioni correttive.

- **Resilienza applicativa**  
  In scenari di congestione della rete, bug nei servizi terzi o rallentamenti della blockchain, il sistema reagisce in modo prevedibile e controllato.

- **Facilmente testabile**  
  La funzione `withTimeout` è pura e isolata, rendendola semplice da testare unitariamente.

- **Compliance alla proprietà di Guarantee/Response**  
  Il sistema si comporta coerentemente con i principi di progettazione sicura, garantendo che una risposta (successo o fallimento) avvenga sempre entro un tempo limite stabilito.



