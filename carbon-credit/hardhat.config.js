require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.20" },
      { version: "0.8.28" }
    ]
  },
  networks: {
    besu: {
      url: 'http://localhost:8545', 
      accounts: ['a146597eb47858335f8e132af2d32832651dddaf5f78a1f7ac03e7149f16178b']
    }
  }
};