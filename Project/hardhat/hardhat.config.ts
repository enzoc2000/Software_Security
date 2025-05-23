import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    besu: {
      url: "http://localhost:8545",
      chainId: 1337,
      accounts: ["a146597eb47858335f8e132af2d32832651dddaf5f78a1f7ac03e7149f16178b"],
      gas: "auto",            // Aggiungi queste linee
      gasPrice: 1000,             // 0 Gwei per reti private
      gasMultiplier: 1.5,      // Buffer del 50% per sicurezza
      timeout: 120000          // Timeout aumentato a 2 minuti
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