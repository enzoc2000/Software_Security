const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const initialSupply = ethers.parseEther("10000"); // 1000 CO2 token (formato: "1000" = 1000 * 10^18)

  try {
    const CarbonCredit = await ethers.getContractFactory("CarbonCredit");
    const carbonCredit = await CarbonCredit.deploy(initialSupply);
    console.log("Deploy tx sent:", carbonCredit.deployTransaction.hash);
    await carbonCredit.deployed();
    console.log("Contract deployed at:", carbonCredit.address);
  } catch (err) {
    console.error("Deployment failed:", err);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
