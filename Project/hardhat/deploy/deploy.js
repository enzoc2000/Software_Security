const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const initialSupply = ethers.parseEther("10"); // 1000 CO2 token (formato: "1000" = 1000 * 10^18)

  const CarbonCredit = await ethers.getContractFactory("CarbonCredit");
  const token = await CarbonCredit.deploy(initialSupply);
  await token.waitForDeployment(); 

  console.log("CarbonCredit deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
