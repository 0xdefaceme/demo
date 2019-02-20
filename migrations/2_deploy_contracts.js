// @format

const Web3 = require('web3');
const Exploitable = artifacts.require('./Exploitable.sol');
const ZeroDay = artifacts.require('./ZeroDay.sol');

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ZeroDay).then(instance => {
    return deployer
      .deploy(Exploitable, instance.address)
      .then(async instance => {
        const web3 = new Web3(
          new Web3.providers.HttpProvider('http://localhost:8545'),
        );
        const account = (await web3.eth.getAccounts())[0];
        const contract = new web3.eth.Contract(
          Exploitable.abi,
          instance.address,
        );
        return contract.methods
          .deposit()
          .send({from: account, value: web3.utils.toWei('1', 'ether')});
      });
  });
};
