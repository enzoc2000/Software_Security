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
      accounts: [process.env.PRIVATE_KEY!,process.env.ACCOUNT_1! ],
      gas: 12_000_000,
      gasPrice: 0x342770c0,
      timeout: 120000
    },
    hardhat: {
      chainId: 1337,
      accounts: [{
        privateKey: "a146597eb47858335f8e132af2d32832651dddaf5f78a1f7ac03e7149f16178b",
        balance: "10000000000000000000000"
      }],
      mining: {                // Configurazione aggiuntiva per Hardhat Network
        auto: true,
        interval: 1000
      }
    }
  }
};

export default config;