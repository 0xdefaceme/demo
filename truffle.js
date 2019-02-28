//@format
require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3();
const Wallet = require("ethereumjs-wallet");
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env["RINKEBY_PRIVATE_KEY"], "https://rinkeby.infura.io"),
      gas: 4600000,
      gasPrice: web3.utils.toWei("20", "gwei"),
      network_id: "4"
    }
  }
};
