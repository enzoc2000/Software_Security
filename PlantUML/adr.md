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
- log utente
- chiamata user service 
- utente preregistrato accede


# Use Case per DataService
- input dei dati dall'utente da frontend
- verifica dei dati da parte del servizio
- se dati validi => ritorna ok all'utente("Richiesta inviata con successo") 
-                   chiamata al TokenService
- se dati non validi => ritorna Not-ok all'utente("Richiesta non inviata-errore")


# Use Case per TokenService
- log utente
- chiamata user service 
- utente preregistrato accede


# Use Case per CarbonCreditService
- log utente
- chiamata user service 
- utente preregistrato accede


# Use Case per SupplyChainService
- log utente
- chiamata user service 
- utente preregistrato accede


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
