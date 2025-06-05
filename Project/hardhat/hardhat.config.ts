import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();


const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    besu: {
      url: "http://localhost:8545",
      chainId: 1338,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
      gas: 12_000_000,
      gasPrice: 0x342770c0,
      timeout: 120000
    },
    hardhat: {
      chainId: 1337,
      mining: {                // Configurazione aggiuntiva per Hardhat Network
        auto: true
      }
    }
  }
};
export const CARBON_CREDIT_ADDRESS = "0x2E6A0e0106F37A045a8b0B9C9357Ffe9a873Fa4c"
export default config;