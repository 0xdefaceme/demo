// @format
const Exploitable = artifacts.require('./Exploitable.sol');
const ZeroDay = artifacts.require('./ZeroDay.sol');

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ZeroDay).then(instance => {
    return deployer.deploy(Exploitable, instance.address);
  });
};
