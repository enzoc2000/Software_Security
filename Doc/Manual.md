# Manuale

[Link to final report](https://www.overleaf.com/read/mdhwjpjjhsgc#758340)


## Requisiti di sistema
- Docker [get-docker](https://docs.docker.com/get-docker)
- at least 2GB of free space on disk
- at least 8GB of RAM

### Requisiti di sistema per utente finale
- Docker [get-docker](https://docs.docker.com/get-docker)
- Metmask estensione per browser [ink1](), [link2]()
- node v22.16.0^
- npm 11.3.0^
- conoscenza base di configurazioni e variabili di ambiente

## Istruzioni d'uso semplificate per l'utente finale
con node installato:

1. Entrare nella cartella Project
2. sul terminale lanciare il comando `node launcher.js`
3. accedere al programma via [http:/localhost:5173/](http:/localhost:5173/)

oppure:

per Windows
1. Entrare nella cartella Project
2. `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. `./launcher.ps1` 

per Unix
1. Entrare nella cartella Project
2. `chmod +x launcher.sh`
3. `./launcher.sh`


## Istruzioni d'uso approfondite per developers
0. Creare i file .env nelle stesse cartelle dei file `.env.placeholder` e inserire le proprie variabili di ambiente e i secret necessari

1. Avviare docker compose, su terminale per avviare la rete Besu e il database MySQL

     `cd Besu; docker compose up --build; cd ..`

2. Avviare scripts su terminale per deploy smart contract. Questo passaggio mandata una transazione sulla rete Besu.

    `cd Project; cd hardhat; npx hardhat run deploy/deploy.js --network besu; cd ..`

3. Avviare script su terminale

    `npm run devall`


## Getting started
### Configurazione Metamask
1. Installare l'estensione di Metamask sul browser
2. Aggiungere rete custom http://localhost:8545
3. Inserire nel campo chain_id il valore 1338
4. 
2. Importare il token CO2
3. Inserire nel campo indirizzo contratto il valore presente nei log dello script di installazione

<img src="token.png" alt="Esempio di token" width="600px">

### Introduzione

1. Scrivere http://localhost:5173 sul browser
2. Registrarsi cliccando il bottone opportuno
3. Inserire il codice seriale ricevuto
4. Iniziare ad usare l'applicativo

### Vedere il proprio saldo
1. Dopo aver fatto il login si viene reindirizzati nella propria area personale.
2. In basso si vede il proprio saldo

### Inviare una dichiarazione di emissioni


### Inviare dei crediti ad un altro utente


### 
