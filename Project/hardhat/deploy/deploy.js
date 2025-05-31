const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // 1. Verifica connessione alla rete
  const network = await ethers.provider.getNetwork();
  console.log(`🌐 Connected to: ${network.name} (Chain ID: ${network.chainId})`);

  // 2. Mostra info account deployer
  const [deployer] = await ethers.getSigners();
  console.log(`👤 Deployer: ${deployer.address}`);
  console.log(`💰 Balance: ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} ETH`);

  // 3. Parametri del deploy (ADATTATO AL TUO COSTRUTTORE)
  const initialSupply = ethers.parseEther("10000"); // 1000 CO2 token (formato: "1000" = 1000 * 10^18)

  try {
    const CarbonCredit = await ethers.getContractFactory("CarbonCredit");
    const contract = await CarbonCredit.deploy(
      initialSupply, // Unico parametro richiesto dal tuo costruttore
      {
        gasLimit: 5_000_000,
   
      }
    );
    
    const blockBefore = await ethers.provider.getBlockNumber();
    console.log("Block before:", blockBefore);
    
    setTimeout(async () => {
      const blockAfter = await ethers.provider.getBlockNumber();
      console.log("Block after 30s:", blockAfter);
    }, 30000);
    
  // 5. Attendi la conferma
  console.log(`\n⏳ Waiting for deployment confirmation...`);
  console.log(`📝 TX Hash: ${contract.deploymentTransaction().hash}`);
  
  await contract.waitForDeployment();
  const tokenAddress = await contract.getAddress();
  console.log("Contract deployed at:", tokenAddress);


  // 6. Salva i dettagli del deploy
  const deploymentInfo = {
    contract: "CarbonCredit",
    address: tokenAddress,
    deployer: deployer.address,
    initialSupply: initialSupply,
    decimals: 18,
    symbol: "CO2", // Hardcodato nel tuo costruttore
    transaction: contract.deploymentTransaction().hash,
    network: {
      name: network.name,
      chainId: network.chainId
    }
  };

  // 7. Output per MetaMask
  console.log(`
    ✅ DEPLOY COMPLETATO!
    
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    █                                 █
    █  🔷 INDIRIZZO TOKEN (DA COPIARE):
    █  ${tokenAddress}
    █                                 █
    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
    
    📋 Istruzioni per MetaMask:
    1. Apri MetaMask e seleziona la rete con Chain ID: ${network.chainId}
    2. Clicca su "Import Token" → "Custom Token"
    3. Incolla questo indirizzo: ${tokenAddress}
    4. Symbol: CO2 (auto-riempirà il nome "Carbon Credit")
    5. Decimali: 18
    
    📊 Dettagli Token:
    • Nome: Carbon Credit (hardcodato nel contratto)
    • Simbolo: CO2
    • Supply iniziale: ${initialSupply} + mintabile con mine()
    • Mining reward: 100 CO2 ogni 15 giorni
    `);
      // 8. Verifica
  console.log("\n🔍 Verifica contratto:");
  console.log("- Nome:", await contract.name());
  console.log("- Simbolo:", await contract.symbol());
  console.log("- Total supply:", ethers.formatEther(await contract.totalSupply()));
  console.log("- Mining reward:", ethers.formatEther(await contract.MINE_REWARD()));

  } catch (err) {
    console.error("Deployment failed:", err);
  }
}

main().catch((error) => {
  console.error("\n❌ ERRORE NEL DEPLOY:");
  console.error(error.reason || error.message);
  process.exit(1);
});