import { ethers } from "ethers";
import { WalletDAO } from "../DAO/WalletDao";
export async function getWalletDetails(userId: number) {
  // 1. Get wallet from database
  const wallet = await WalletDAO.findByUserId(userId);
  if (!wallet) throw new Error("Wallet not found");

  // 2. Initialize provider (ethers v6 syntax)
  const provider = new ethers.JsonRpcProvider(
    "http://localhost:8545", // Besu RPC URL
    1338 // Chain ID
  );

  // 3. Initialize contract (ensure you have the ABI and address)
  const tokenContract = new ethers.Contract(
    process.env.CARBON_CREDIT_ADDRESS!, // Contract address
    CarbonCreditABI, // Import your ABI
    provider
  );

  // 4. Query blockchain (parallel requests)
  const [ethBalance, tokenBalance] = await Promise.all([
    provider.getBalance(wallet.address),
    tokenContract.balanceOf(wallet.address)
  ]);

  // 5. Update database (optional cache)
  await WalletDAO.updateBalance(
    userId,
    ethers.formatEther(ethBalance), // ethers v6 format
    ethers.formatEther(tokenBalance)
  );

  // 6. Return formatted response
  return {
    address: wallet.address,
    ethBalance: ethers.formatEther(ethBalance),
    tokenBalance: ethers.formatEther(tokenBalance),
    lastUpdated: new Date().toISOString()
  };
}