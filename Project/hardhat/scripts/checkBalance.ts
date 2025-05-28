import { ethers } from "hardhat";

async function checkConnectedBalances() {
  // 1. Verifica la connessione
  const provider = ethers.provider;
  const network = await provider.getNetwork();
  console.log(`✅ Connesso a ${network.name} (Chain ID: ${network.chainId})\n`);

  // 2. Recupera gli account disponibili
  const accounts = await ethers.getSigners();
  
  if (accounts.length === 0) {
    console.log("⚠️ Nessun account configurato in hardhat.config.ts");
    return;
  }

  // 3. Controllo saldi per ogni account
  for (const [index, account] of accounts.entries()) {
    try {
      const balance = await provider.getBalance(account.address);
      const txCount = await provider.getTransactionCount(account.address);
      
      console.log(`👤 Account #${index + 1}:`);
      console.log(`   Address: ${account.address}`);
      console.log(`   Balance: ${ethers.formatEther(balance)} ETH`);
      console.log(`   TX Count: ${txCount}`);
      
      // 4. Verifica saldo token CO2 (se contratto esiste)
      try {
        const token = await ethers.getContractAt(
          "CarbonCredit", 
          "0x2E6A0e0106F37A045a8b0B9C9357Ffe9a873Fa4c"
        );
        const tokenBalance = await token.balanceOf(account.address);
        console.log(`   CO2 Balance: ${ethers.formatEther(tokenBalance)}`);
      } catch (tokenError) {
        console.log("   Token CO2: Contratto non disponibile");
      }
      
      console.log("──────────────────────────────────");
      
    } catch (error) {
      console.error(`Errore sull'account ${account.address}:`, error instanceof Error ? error.message : error);
    }
  }

  // 5. Stato della rete
  const blockNumber = await provider.getBlockNumber();
  const block = await provider.getBlock(blockNumber);
  console.log(`\n📦 Ultimo blocco: #${blockNumber}`);
}

// Esecuzione con gestione errori
checkConnectedBalances()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Errore globale:", error instanceof Error ? error.message : error);
    process.exit(1);
  });