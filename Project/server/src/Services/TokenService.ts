import { ethers, Transaction } from "ethers";
import carbonCreditAbi from "../contracts/carbonCreditAbi.json";
import { DebtsDAO } from "../DAO/DebtsDAO";
import { UserWalletDAO } from "../DAO/UserWalletDAO";
import { UserWallet } from "../Models/UserWallet";
import { BurnRequestDTO } from "../Models/BurnRequestDTO";
import { Emission } from "../Models/Emission";
import { EmissionDAO } from "../DAO/EmissionDAO";
import { DonationDAO } from "../DAO/DonationDAO";
import { Donation } from "../Models/Donation";
import { TransactionDTO } from "../Models/TransactionDTO";
import { UserDAO } from "../DAO/UserDAO";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS!;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY!;

// Account di test (puoi anche importarli da .env se vuoi)
const Account1 = "0xc73aF3677eBc555Fc631d3EdfCE675A656b684e5";
const Account1_private_key = "7a18769fc1e450f623619bb54b67e118a2462ae5f8f4be8f066de5a77cfc3cf1";

const Account2 = "0x9c895B655b7340615b953bA7E777455B78550DF6";
const Account2_private_key = "356fd7201a910f2bde48d0037f06d337dce0bf00014fa3f74114301f4396e6df";

const userDAO = new UserDAO();
const debtsDAO = new DebtsDAO();
const userWalletDAO = new UserWalletDAO();
const transactionDAO = new DonationDAO();
const emissionDAO = new EmissionDAO();

export async function ethNewUser(userAddress: string, amount: string = "100.0"): Promise<string> {

  if (!deployerPrivateKey) {
    throw new Error("Deployer private key not configured");
  }

  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const deployer = new ethers.Wallet(deployerPrivateKey, provider);

  try {
    const tx = await deployer.sendTransaction({
      to: userAddress,
      value: ethers.parseEther(amount) // <-- Modifica qui (senza .utils)
    });

    console.log(`Funded ${userAddress} with ${amount} ETH. Tx hash: ${tx.hash}`);

    return tx.hash;
  }
  catch (error) {
    console.error("Error funding new user:", error);
    throw new Error(`Failed to fund user: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function checkBalances(account: string, userId: number): Promise<number> {
  const token = new ethers.Contract(TOKEN_ADDRESS, carbonCreditAbi, provider);

  try {
    const ethBalance = await provider.getBalance(account);
    const tokenBalance = await token.balanceOf(account);
    const balance = ethers.formatEther(tokenBalance)
    console.log(`🌿 CO2: ${tokenBalance}`);
    const userWallet = new UserWallet(
      userId,
      parseInt(balance),
      account,
    )

    await userWalletDAO.update(userWallet);

    console.log(`📬 Address: ${account}`);
    console.log(`💰 ETH: ${ethers.formatEther(ethBalance)}`);
    console.log(`🌿 CO2: ${balance}`);
    console.log(` `)
    console.log("───────────────────────────────");

    return parseInt(balance)
  }
  catch (err) {
    console.error(`❌ Errore con ${account}:`, err);
    return 0;
  }

  /*const block = await provider.getBlockNumber();
  console.log(`📦 Ultimo blocco: ${block}`);
  return 0;*/
}

// Funzione per mintare i carbon credits, se ho debito minto solo la differenza tra l'importo richiesto 
// e il debito corrente, aggiornando il debito dell'utente
export async function mintCarbonCredits(idReceiver: number, receiver: string, amountInEther: number): Promise<number> {
  //Recupero il debito dell'utente
  const currentDebts = await debtsDAO.findByUserId(idReceiver);

  // Calcolo l'importo da mintare come differenza tra l'importo richiesto e il debito corrente
  const amountToMint = amountInEther - currentDebts;

  // Se i token guadagnati non superano il debito, non minto nulla e aggiorno il debito
  if (amountToMint <= 0) {
    debtsDAO.update(idReceiver, currentDebts - amountInEther);
    console.log(`🔥 Bruciati ${Math.abs(amountInEther)} CO2 perchè ${receiver} in debito`);
  }
  else {
    // Se l'utente aveva un debito, lo azzero e minto i token
    if (currentDebts > 0) {
      debtsDAO.update(idReceiver, 0);
      console.log(`🔥 Bruciati ${currentDebts} CO2 perchè ${receiver} in debito`);
    }

    const wallet = new ethers.Wallet(deployerPrivateKey, provider); // deve essere l'owner
    const token = new ethers.Contract(TOKEN_ADDRESS, carbonCreditAbi, wallet);

    try {
      const amount = ethers.parseEther(amountToMint.toString()); // BigInt
      const tx = await token.mint(receiver, amount);
      console.log(`⛏️ Minting ${amount} CO2 per ${receiver}...`);
      await tx.wait();
      console.log(`✅ Mint completato. TX Hash: ${tx.hash}`);
    }
    catch (err) {
      console.error("❌ Errore nel mint:", err);
    }
  }

  // Ritorna a prescindere l'importo di carbon credit associato all'emissione
  return amountInEther;
}

// Funzione che fa richiesta di burn dei carbon credits al frontend in caso in cui abbia a disposizione balance 
// sufficiente per coprire il debito, altrimenti aggiorna il db con emissione e debito
export async function removeCarbonCredits(userId: number, address: string, debt: number, co2Amount: number, credits?: number): Promise<BurnRequestDTO> {

  let balance: number;
  // Verifico se la chiamata sta avvenendo sotto forma di donazione 
  if (!credits) {
    balance = await checkBalances(address, userId);
    console.log(`Quantity of credits do you have: ${balance}`);
  }
  else {
    // prendo solo i crediti della donazione 
    balance = credits;
  }
  if (balance > 0) {
    const amountToBurn = Math.min(balance, debt);
    const newDebt = debt - amountToBurn;
    const amount = ethers.parseEther(amountToBurn.toString()); // BigInt

    console.log(`amount: ${amount}`)
    // Prepara i dati della transazione da inviare al frontend
    const iface = new ethers.Interface(carbonCreditAbi);
    const data = iface.encodeFunctionData("burn", [amount]);

    const burnRequest: BurnRequestDTO = {
      requiresBurn: true,
      userId: userId,
      carbonCredits: debt,
      tx: {
        contractAddress: TOKEN_ADDRESS,
        from: address,
        data: data
      },
      isDonation: false,
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
      isDonation: false,
      remainingDebt: oldDebdt + debt,
      emissionAmount: co2Amount
    };

    return burnRequest;
  }
}

// Funzione che verifica che la transazione di burn da frontend e aggiorna il db con emissione e debito
// Conferma burn sia in caso di burn diretto di un utente che in caso di donazione per coprire il debito 
// di un altro utente
export async function confirmBurn(burnRequest: BurnRequestDTO): Promise<void> {

  let receipt: ethers.TransactionReceipt | null = null;

  try {
    //Verifica la transazione
    if (burnRequest.tx?.hash) {
      receipt = await provider.waitForTransaction(burnRequest.tx.hash, 1, 60000); // aspetta max 60s

      if (!receipt || receipt.status !== 1) {
        throw new Error("Transazione fallita o non trovata");
      }
      console.log(`✅ Transazione ${burnRequest.tx.hash} confermata`);
    }

    //Se la transazione è di burn devo aggiornare i dati
    if (burnRequest.requiresBurn) {
      //Se non è una transazione aggiorno emissione e debito su db
      if (!burnRequest.isDonation && burnRequest.emissionAmount) {
        const emission = new Emission(
          0,
          burnRequest.userId,
          burnRequest.emissionAmount,
          new Date(),
          burnRequest.carbonCredits
        );

        console.log(emission);

        await emissionDAO.save(emission);

        //Aggiornamento db con debito
        if (burnRequest.remainingDebt > 0)
          await debtsDAO.update(burnRequest.userId, burnRequest.remainingDebt);
      }
      //Se è una transazione la salvo e aggiorno il debito del beneficiario
      else {
        // Aggiornamento db con transazione
        if (burnRequest.idRecipient && burnRequest.tx) {
          const recipientWallet = await userWalletDAO.findByUserId(burnRequest.idRecipient);
          if (!recipientWallet) {
            throw new Error(`Wallet non trovato per l'utente con ID ${burnRequest.idRecipient}`);
          }

          const transaction: Donation = new Donation(
            0,
            burnRequest.userId,
            burnRequest.idRecipient,
            burnRequest.tx?.from,
            recipientWallet.address,
            burnRequest.carbonCredits - burnRequest.remainingDebt,
            new Date()
          )
          console.log(transaction);
          transactionDAO.save(transaction);

          //Aggiornamento db con debito
          await debtsDAO.update(burnRequest.idRecipient, burnRequest.remainingDebt);
        }
      }
    }
  }
  catch (err) {
    console.error("❌ Errore in submitBurn:", err);
    throw err;
  }
}

export async function getAllTransactions(): Promise<TransactionDTO[]> {
  const transactions = await transactionDAO.findAll();
  if (transactions.length === 0) {
    alert("No transactions found")
    return [];
  }

  const transactionAdjusted = await Promise.all(
    transactions.map(
      async transaction => {
        const { name: senderName, role: senderRole } = await userDAO.findNameRoleById(transaction.senderUserId);
        const { name: receiverName, role: receiverRole } = await userDAO.findNameRoleById(transaction.receiverUserId);
        return {
          id: transaction.id,
          senderName: senderName,
          senderRole: senderRole,
          receiverName: receiverName,
          receiverRole: receiverRole,
          amount: transaction.amount,
          timestamp: transaction.timestamp
        }
      })
  );
  return transactionAdjusted;

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