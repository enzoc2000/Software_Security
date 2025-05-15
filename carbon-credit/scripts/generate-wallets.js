// scripts/generate-wallets.js
const { ethers } = require("hardhat");

async function main() {
  const wallet = ethers.Wallet.createRandom();
  console.log("Address:", wallet.address);
  console.log("Private Key:", wallet.privateKey); 
  console.log("Mnemonico:", wallet.mnemonic.phrase); 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// per piu utenti

/*
// Script bulk-wallets.js
const { writeFileSync } = require("fs");
const { ethers } = require("ethers");

const wallets = Array(10).fill().map(() => ethers.Wallet.createRandom());
const output = wallets.map(w => ({
  address: w.address,
  privateKey: w.privateKey
}));

writeFileSync("wallets.json", JSON.stringify(output, null, 2));*/