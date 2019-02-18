// @format
const truffleAssert = require('truffle-assertions');

var ZeroDay = artifacts.require('./build/contracts/ZeroDay');
var Exploitable = artifacts.require('./build/contracts/Exploitable');

contract('ZeroDay', function(accounts) {
  it('should create a commit', async () => {
    const zeroday = await ZeroDay.new();
    const exploitable = await Exploitable.new(zeroday.address);
    await zeroday.commit(exploitable.address, 0);
  });
});
