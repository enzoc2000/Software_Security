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
      accounts: [process.env.PRIVATE_KEY!],
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
export const CARBON_CREDIT_ADDRESS = "0xc28D3a776d696c8FA4E76a147F7AB11D2F4DEB7D"
export default config;