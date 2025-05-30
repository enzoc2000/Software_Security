# collegare metamask con la rete privata - add network e inserire
Network Name	localhost
New RPC URL	http://localhost:8545
Chain ID	1337

# file .env dentro hardhat
PRIVATE_KEY=7a18769fc1e450f623619bb54b67e118a2462ae5f8f4be8f066de5a77cfc3cf1
ACCOUNT_1=356fd7201a910f2bde48d0037f06d337dce0bf00014fa3f74114301f4396e6df

# i due wallet nella rete dopo il deploy
const Account1 = "0xc73aF3677eBc555Fc631d3EdfCE675A656b684e5";
const Account1_private_key = "7a18769fc1e450f623619bb54b67e118a2462ae5f8f4be8f066de5a77cfc3cf1";

const Account2="0x9c895B655b7340615b953bA7E777455B78550DF6";
const Account2_private_key="356fd7201a910f2bde48d0037f06d337dce0bf00014fa3f74114301f4396e6df";

# dentro la cartella /Project/hardhat
`npx hardhat run deploy/deploy.js --network besu` (ci mette un po)

# su metamask inserire la chiave per importare l'account 
Le chiavi private degli account 

# per importare il token
inserire l'indirizzo che il deploy produce su metamask (import tokens), ad ogni nuovo deploy la chiave cambia 

# dentro la cartella server per provare le funzioni di tokens su console
`npx tsx src/Services/TokenService.ts`
 prima cambiare dentro Tokenservice la variabile TOKEN_ADDRESS, con l'indirizzo che il deploy restituisce
 anche dentro la cartella hardhat in hardhat.config.ts cambiare la variabile  CARBON_CREDIT_ADDRESS, con l'indirizzo che il deploy restituisce
