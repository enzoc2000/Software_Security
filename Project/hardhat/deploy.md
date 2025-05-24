# collegare metamask con la rete privata - add network e inserire
Network Name	localhost
New RPC URL	http://localhost:8545
Chain ID	1337

# file .env dentro hardhat
PRIVATE_KEY=7a18769fc1e450f623619bb54b67e118a2462ae5f8f4be8f066de5a77cfc3cf1
ACCOUNT_1=356fd7201a910f2bde48d0037f06d337dce0bf00014fa3f74114301f4396e6df

# dentro la cartella /Project/hardhat
`npx hardhat run deploy/deploy.js --network besu` (ci mette un po)

# su metamask inserire la chiave per importare l'account 
chiave_privata = 7a18769fc1e450f623619bb54b67e118a2462ae5f8f4be8f066de5a77cfc3cf1
chiave_pubblica = 0xc73aF3677eBc555Fc631d3EdfCE675A656b684e5

# per importare il token
inserire l'indirizzo che il deploy produce su metamask

# per check balance
`npx hardhat run scripts/checkBalance.js --network besu`
