const { ethers } = require("hardhat");

async function checkBalance() {
  const tokenAddress = "0x2E6A0e0106F37A045a8b0B9C9357Ffe9a873Fa4c";
  const userAddress = "0xc73aF3677eBc555Fc631d3EdfCE675A656b684e5"; // Sostituisci con il tuo address

  const token = await ethers.getContractAt("CarbonCredit", tokenAddress);
  const balance = await token.balanceOf(userAddress);


  console.log("Saldo CO2:", ethers.formatEther(balance), "CO2");
}

checkBalance().catch(console.error);