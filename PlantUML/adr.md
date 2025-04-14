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
- VSCode (Ambiente)
- Hardhat (development environment for Ethereum software)

# Languages
- Typescript (Frontend/Backend)
- JavaScript (Frontend/Backend)
- Solidity (Smart Contracts)

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


# History of choices
sprint 1: 
- every project as runnable and independ. DENIED, because it will several open port on the local network which leads to an increase in exposure.
- Projects are build as libraries. APPROVED, because it is easier for learning TS, speeds development and reduces exposition. Manteinance will be harder on the long run, this is not a requisite.
- use cases to plan an idea for the GUI and required functions.