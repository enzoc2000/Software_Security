# Manuale

## Requisiti di sistema
- Docker
- node v23.2.0
- npm 11.3.0
- at least 1GB of free space on disk
- conoscenza base di configurazioni e variabili di ambiente

## Istruzioni d'uso
1. Avviare docker compose, su terminale

     `cd Besu; docker compose up --build; cd ..`

2. Avviare scripts su terminale per deploy smart contract. Questo passaggio mandata una transazione sulla rete Besu.

    `cd Project; cd hardhat; npx hardhat run deploy/deploy.js --network besu; cd ..`

3. Avviare script su terminale

    `npm run devall`


4. Scrivere http://localhost:5173 sul browser
5. Registrarsi cliccando il bottone opportuno
6. Inserire il codice seriale ricevuto
7. Iniziare ad usare l'applicativo


## Getting started
### Vedere il proprio saldo


### Inviare una dichiarazione di emissioni


### Inviare dei crediti ad un altro utente


### 
