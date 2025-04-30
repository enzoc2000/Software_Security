V 0.1

# Core functionalities
- Utente deve essere preregistrato su DB (BlockChain permissioned in teoria, in pratica BlockChain in locale)
- Invio e verifica dati sulle emissioni dell'utente tramite DataService
- Emissione crediti sulla base dei dati ricevuti dal DataService, utilizzando il TokenService
- Scambio dei crediti tra gli utenti con il CarbonCreditService
- Azioni sui dati non inerenti i carbon credit gestiti dal SupplyChainService(Capire come implementare sviluppando dei casi d'uso)
- Azioni sui dati inerenti l'utente, tra cui cambio password e login, tramite UserService
- Fronted fa chiamate al localhost (gestita come chiamata Web) per connettersi ai servizi di Backend

# Technologies
- Docker (Distribuzione)
- Github (Repository)
- VScode (Ambiente)

# Languages
- Typescript (Frontend/Backend)
- JavaScript (Frontend/Backend)
- Solidity (Chiamate alla BlockChain)

# Prerequisiti
- Docker compose con i servizi da avviare in contemporanea
- avvio della rete


# Use Case per UserService
**Obiettivo:** Gestione degli utenti della filiera
**Funzionalità:**
- Autenticazione per l'accesso ai servizi
- Aggiornamento dei dati dell'utente


# Use Case per DataService
**Obiettivo:** Ricevere, validare e inoltrare i dati relativi alle emissioni di CO2
**Funzionalità:**
- Ricezione dei dati inseriti dall'utente nel frontend
- Validazione dei dati (correttezza e completezza)
- se dati validi => ritorna ok all'utente("Richiesta inviata con successo") 
-                   chiamata al TokenService
- se dati non validi => ritorna Not-ok all'utente("Richiesta non inviata-errore")


# Use Case per TokenService
**Obiettivo:** Emissione di token fungibili all'utente tramite interazione con la blockchain
**Funzionalità:**
- Interazione con la blockchain
- Emissione dei token sulla base dei dati ricevuti dal DataService
- Gestione dei saldi (?)


# Use Case per CarbonCreditService
**Obiettivo:** Gestione delle transazioni di carbon credit tra gli attori della filiera
**Funzionalità:**
- Verifica requisiti e preparazione transazione
- Trasferimento dei token
- Storico delle transazioni (?)


# Use Case per SupplyChainService (?)
**Obiettivo:** Gestione dati della supply chain (esclusi emissioni e token)
**Funzionalità:**   
- Registrazione dati
- Accesso dati


# Database
- Utente
- Wallet/crediti
- transazioni

# Suddivisione Compiti
- Matte: Use Case
- Nicco: Use Case
- Ema: Smart Contract
- Yassir: Creazione Chiavi/Wallet
- Enzo: Frontend
