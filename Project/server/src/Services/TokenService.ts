import { ethers } from "ethers";
const { ethers } = require("hardhat");
import carbonCreditAbi from "../contracts/carbonCreditAbi.json";
import { DebtsDAO } from "../DAO/DebtsDAO";
import { UserWalletDAO } from "../DAO/UserWalletDAO";
import { UserWallet } from "../Models/UserWallet";
import { BurnRequestDTO } from "../Models/BurnRequestDTO";
import { Emission } from "../Models/Emission";
import { EmissionDAO } from "../DAO/EmissionDAO";

// Provider su Besu (come in hardhat.config)
const provider = new ethers.JsonRpcProvider("http://localhost:8545");

// Stesso indirizzo del contratto usato da Hardhat
const TOKEN_ADDRESS = "0x2E6A0e0106F37A045a8b0B9C9357Ffe9a873Fa4c";

// Account di test (puoi anche importarli da .env se vuoi)
const Account1 = "0xc73aF3677eBc555Fc631d3EdfCE675A656b684e5";
const Account1_private_key = "7a18769fc1e450f623619bb54b67e118a2462ae5f8f4be8f066de5a77cfc3cf1";

const Account2="0x9c895B655b7340615b953bA7E777455B78550DF6";
const Account2_private_key="356fd7201a910f2bde48d0037f06d337dce0bf00014fa3f74114301f4396e6df";

const debtsDAO = new DebtsDAO();
const userWalletDAO = new UserWalletDAO();

export async function checkBalances(account: string, userId: number): Promise<number> {
}

/*export async function transferCarbonCredits(amountInEther: string, sender: string, receiver: string) {
  //Qui poi andrà l'account del mittente (sender), ma per ora usiamo Account1
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
}*/

// Funzione per mintare i carbon credits, se ho debito minto solo la differenza tra l'importo richiesto 
// e il debito corrente, aggiornando il debito dell'utente
export async function mintCarbonCredits(idReceiver: number, receiver: string, amountInEther: number): Promise<number> {
}

export async function removeCarbonCredits(userId: number, address: string, debt: number, co2Amount: number): Promise<BurnRequestDTO> {
  
  const emissionDAO = new EmissionDAO();
  const balance = await checkBalances(address, userId);
  console.log(`Quantity of crdits do you have: ${balance}`);

  if (balance > 0) {
    const amountToBurn = Math.min(balance, debt);
    const newDebt = debt - amountToBurn;
    const amount = ethers.parseEther(amountToBurn.toString()); // BigInt

    console.log(`amount: ${amount}`)
    // Prepara i dati della transazione da inviare al frontend
    const iface = new ethers.Interface(carbonCreditAbi);
    const data = iface.encodeFunctionData("burn", [amount]);

    console.log(data)

    const burnRequest: BurnRequestDTO = {
      requiresBurn: true,
      userId: userId,
      carbonCredits: debt,
      tx: {
        contractAddress: TOKEN_ADDRESS,
        from: address,
        data: data
      },
      remainingDebt: newDebt,
      emissionAmount: co2Amount
    };

    console.log(burnRequest);
    
    return burnRequest;
  }
  else {
    // Aggiornamento db con emissione
    const emission = new Emission(
      0,
      userId,
      co2Amount,
      new Date(),
      -debt
    );

    await emissionDAO.save(emission);

    //Aggiornamento db con debito
    const oldDebdt = await debtsDAO.findByUserId(userId);
    await debtsDAO.update(userId, oldDebdt + debt);

    const burnRequest: BurnRequestDTO = {
      requiresBurn: false,
      userId: userId,
      carbonCredits: -debt,
      remainingDebt: oldDebdt + debt,
      emissionAmount: co2Amount
    };

    return burnRequest;
  }
}

export async function confirmBurn(burnRequest: BurnRequestDTO): Promise<void> {

  let receipt: ethers.TransactionReceipt | null = null;
  const emissionDAO = new EmissionDAO();

  try {
    //Verifica la transazione
    if(burnRequest.tx?.hash) {
        receipt = await provider.waitForTransaction(burnRequest.tx.hash, 1, 60000); // aspetta max 60s

      if (!receipt || receipt.status !== 1) {
        throw new Error("Transazione fallita o non trovata");
      }

      console.log(`✅ Transazione ${burnRequest.tx.hash} confermata`);

      // Aggiornamento db con emissione solo nel caso in cui era una richiesta di burn originariamente
      if(burnRequest.requiresBurn) {
        const emission = new Emission(
          0,
          burnRequest.userId,
          burnRequest.emissionAmount,
          new Date(),
          burnRequest.carbonCredits
        );

        await emissionDAO.save(emission);
      }

      //Aggiornamento db con debito
      if (burnRequest.remainingDebt > 0)
        await debtsDAO.update(burnRequest.userId, burnRequest.remainingDebt);
    }
  } 
  catch (err) {
    console.error("❌ Errore in submitBurn:", err);
    throw err;
  }
}

/* async function main() {
  await checkBalances(Account1);
  //await checkBalances(Account2); 
  //await transferCarbonCredits("200", Account1, Account2);
  await mintCarbonCredits(Account1,"200");
 // await checkBalances(Account2); 
  await checkBalances(Account1);
  
}
// Esegui
main(); */

// solo logica non provate

export async function donazioneCarbonCredits(
  idMandante: number,
  idRicevente: number,
  amountInEther: string
): Promise<void> {
  try {
    // Conversione importo
    const amountToBurn = ethers.parseEther(amountInEther);

    // Recupero dati utenti e saldi
    const [mandante, ricevente, creditiMandante, debitoRicevente] = await Promise.all([
      getUserById(idMandante),
      getUserById(idRicevente),
      carbonCreditsDAO.getBalance(idMandante),
      debtsDAO.findByUserId(idRicevente)
    ]);

    // Calcoli debito
    const debitoInWei = ethers.parseEther(debitoRicevente.toString());
    const amountEffective = Math.min(amountToBurn, debitoInWei);
    const nuovoDebitoWei = debitoInWei - amountEffective;
    const nuovoDebito = Number(ethers.formatEther(nuovoDebitoWei));

    // Operazione di burn
    const burnRequest = await removeCarbonCredits(
      idMandante,
      mandante.walletAddress,
      Number(amountInEther),
      Number(amountInEther)
    );

    // Transazione blockchain (se necessaria)
    if (burnRequest.requiresBurn && burnRequest.tx) {
      const tx = await carbonCreditContract.burnFrom(
        mandante.walletAddress,
        amountEffective,
        { from: mandante.walletAddress }
      );
      burnRequest.tx.hash = tx.hash;
      console.log(`🔥 Transazione inviata: ${tx.hash}`);
    }

    // Aggiornamento debito e log
    await debtsDAO.update(idRicevente, nuovoDebito);
    console.log(nuovoDebitoWei <= 0 ?
      `✅ Debito COMPLETAMENTE saldato per il ricevente ${idRicevente}` :
      `📉 Debito ridotto a ${nuovoDebito} ETH per il ricevente ${idRicevente}`
    );

    await confirmBurn(burnRequest);

  } catch (error) {
    console.error(`❌ Errore nella donazione: ${error.message}`);
    throw error;
  }
}


export async function EthtoNewUser(userAddress) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const deployer = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
  
  const tx = await deployer.sendTransaction({
    to: userAddress,
    value: ethers.utils.parseEther("100.0")
  });
  
  console.log(`Funds sent to ${userAddress}: ${tx.hash}`);
  return tx.hash;
}