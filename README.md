# Software Security – Progetto

Questo repository contiene il progetto realizzato per l'esame di Software Security, nell’ambito del corso di laurea magistrale presso l’Università Politecnica delle Marche.

L’obiettivo è lo sviluppo di un sistema per la filiera agroalimentare che consente di:
- Monitorare le emissioni di CO₂eq lungo tutta la filiera
- Tracciare i crediti di carbonio scambiati tra gli attori tramite blockchain

## 📄 Documentazione

Per l’installazione e l’utilizzo del sistema, consultare il file [`manual.md`](./Doc/manual.md) presente nella cartella `Doc`.

## 🔗 Tecnologie principali

- Frontend: React + Typescript
- Backend: Node.js + Express
- Blockchain: Hyperledger Besu, Solidity, OpenZeppelin
- Database: MySQL
- Firma digitale: Metamask

## 📁 Struttura del repository

- `/Project` : componenentistica del progetto
- `/PlantUML` : diagrammi per lo studio dell'architettura e dei requisiti
- `/Doc`: relazione e manuale
- `/Project/client`: interfaccia utente
- `/Project/server`: logica applicativa e API
- `/Project/hardhat`: smart contracts in Solidity, test e deploy
- `/Project/Besu`: rete privata Hyperledger-Besu




