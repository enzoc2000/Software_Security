const { ethers } = require("hardhat");

async function checkBalance() {
  const tokenAddress = "0x62D55e0606595ff038b9dAA4b972547fD385e36B";
  const userAddress = "0x9c895B655b7340615b953bA7E777455B78550DF6"; // Sostituisci con il tuo address

  const token = await ethers.getContractAt("CarbonCredit", tokenAddress);
  const balance = await token.balanceOf(userAddress);


  console.log("Saldo CO2:", ethers.formatEther(balance), "CO2");
}

checkBalance().catch(console.error);