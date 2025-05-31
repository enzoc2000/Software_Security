import { ethers } from "ethers";
import carbonCreditAbi from "../contracts/carbonCreditAbi.json";

// Provider su Besu (come in hardhat.config)
const provider = new ethers.JsonRpcProvider("http://localhost:8545");

// Stesso indirizzo del contratto usato da Hardhat
const TOKEN_ADDRESS = "0xc28D3a776d696c8FA4E76a147F7AB11D2F4DEB7D";

// Account di test (puoi anche importarli da .env se vuoi)
const Account1 = "0xc73aF3677eBc555Fc631d3EdfCE675A656b684e5";
const Account1_private_key = "7a18769fc1e450f623619bb54b67e118a2462ae5f8f4be8f066de5a77cfc3cf1";

const Account2="0x9c895B655b7340615b953bA7E777455B78550DF6";
const Account2_private_key="356fd7201a910f2bde48d0037f06d337dce0bf00014fa3f74114301f4396e6df";

export async function checkBalances(account: any) {
  const token = new ethers.Contract(TOKEN_ADDRESS, carbonCreditAbi, provider);

    try {
      const ethBalance = await provider.getBalance(account);
      const tokenBalance = await token.balanceOf(account);
      const balance= ethers.formatEther(tokenBalance)

      console.log(`📬 Address: ${account}`);
      console.log(`💰 ETH: ${ethers.formatEther(ethBalance)}`);
      console.log(`🌿 CO2: ${balance}`);
      console.log(` ` )
      console.log("───────────────────────────────");
    } catch (err) {
      console.error(`❌ Errore con ${account}:`, err);
    }
  

  const block = await provider.getBlockNumber();
  console.log(`📦 Ultimo blocco: ${block}`);
}


export async function transferCarbonCredits(amountInEther: string,account1: any,account2: any) {
  const wallet = new ethers.Wallet(Account1_private_key, provider);
  const token = new ethers.Contract(TOKEN_ADDRESS, carbonCreditAbi, wallet);

  try {
    // 👇 Converti input a BigInt
    const amount = ethers.parseEther(amountInEther); // BigInt

    // 👇 Recupera il debito del destinatario (placeholder, simula con 100)
    const debito = ethers.parseEther("100"); // BigInt

    if (debito > 0) {
      if (amount > debito) {
        const amountToSend = amount - debito;

        const burnTx = await token.burn(debito); // ✅ usa direttamente debito
        console.log(`🔥 Bruciando ${ethers.formatEther(debito)} token per coprire il debito...`);
        await burnTx.wait();
        console.log(`✅ Debito di ${ethers.formatEther(debito)} token bruciato.`);

        const tx = await token.transfer(account2, amountToSend);
        console.log("⏳ Transazione inviata. In attesa di conferma...");
        await tx.wait();
        console.log(`✅ ${ethers.formatEther(amountToSend)} CO2 inviati a ${account2}`);
        console.log(`🔗 Hash transazione: ${tx.hash}`);

        // await updateDebito(account2, 0); // placeholder
      } else {
        const nuovoDebito = debito - amount;
        // await updateDebito(account2, nuovoDebito); // placeholder
        console.log(`ℹ️ Importo insufficiente, debito aggiornato a ${ethers.formatEther(nuovoDebito)} CO2`);
      }
    } else {
      const tx = await token.transfer(account2, amount);
      console.log("⏳ Transazione inviata. In attesa di conferma...");
      await tx.wait();
      console.log(`✅ ${ethers.formatEther(amount)} CO2 inviati a ${account2}`);
      console.log(`🔗 Hash transazione: ${tx.hash}`);
    }
  } catch (err) {
    console.error("❌ Errore durante il trasferimento:", err);
  }
}
export async function mintCarbonCredits(toAddress: string, amountInEther: string) {
  const wallet = new ethers.Wallet(Account1_private_key, provider); // deve essere l'owner
  const token = new ethers.Contract(TOKEN_ADDRESS, carbonCreditAbi, wallet);

  try {
    const amount = ethers.parseEther(amountInEther); // BigInt
    const tx = await token.mint(toAddress, amount);
    console.log(`⛏️ Minting ${amountInEther} CO2 per ${toAddress}...`);
    await tx.wait();
    console.log(`✅ Mint completato. TX Hash: ${tx.hash}`);
  } catch (err) {
    console.error("❌ Errore nel mint:", err);
  }
}

async function main() {
  await checkBalances(Account1);
  //await checkBalances(Account2); 
  //await transferCarbonCredits("200", Account1, Account2);
  await mintCarbonCredits(Account1,"200");
 // await checkBalances(Account2); 
  await checkBalances(Account1);
  
}
// Esegui
main();