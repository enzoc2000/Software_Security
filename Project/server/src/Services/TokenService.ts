// server/src/services/walletService.ts
import { ethers } from "ethers";
import { UserWalletDAO } from "../DAO/UserWalletDAO";
import hardhatConfig from "../../hardhat-config.json"; // Config esportata da Hardhat

const walletDAO = new UserWalletDAO();

export async function getWalletBalance(userId: number): Promise<{
  ethBalance: string;
  tokenBalance: string;
  address: string;
}> {
  try {
    // 1. Recupera l'indirizzo dal database usando l'ID utente
    const walletData = await walletDAO.findByUserId(userId);
    if (!walletData) throw new Error("Wallet non trovato per questo utente");

    // 2. Configura il provider (connessione alla blockchain)
    const provider = new ethers.JsonRpcProvider(hardhatConfig.network.url);

    // 3. Crea l'istanza del contratto token
    const tokenContract = new ethers.Contract(
      hardhatConfig.token.address,
      hardhatConfig.token.abi,
      provider
    );

    // 4. Recupera i saldi IN PARALLELO (performance ottimizzata)
    const [ethBalance, tokenBalance] = await Promise.all([
      provider.getBalance(walletData.address), // Saldo ETH
      tokenContract.balanceOf(walletData.address), // Saldo token
    ]);

    // 5. Formatta i risultati
    return {
      ethBalance: ethers.formatEther(ethBalance), // Converti wei → ETH
      tokenBalance: ethers.formatEther(tokenBalance), // Converti wei → token
      address: walletData.address,
    };
  } catch (error) {
    console.error(`Errore nel recupero saldo per l'utente ${userId}:`, error);
    throw new Error("Impossibile ottenere il saldo");
  }
}