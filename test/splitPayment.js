const SplitPayment = artifacts.require('SplitPayment');

contract('SplitPayment', (accounts) => {
  let splitPayment = null;
  before(async () => {
    splitPayment = await SplitPayment.deployed();
  })
  it('Should send split payment', async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amount = [40, 20, 30];
    const initialBalances = await Promise.all(recipients.map(recipient => {
      return web3.eth.getBalance(recipient);
    }));
    await splitPayment.send(recipients, amount, {from: accounts[0], value: 90});
    const finalBalances = await Promise.all(recipients.map(recipient => {
      return web3.eth.getBalance(recipient);
    }));
    recipients.forEach((_item, i) => {
      const finalBalance = web3.eth.utils.toBN(finalBalances[i]);
    recipients.forEach((_item, i) => {
      const initialBalance = web3.eth.utils.toBN(initialBalances[i]);
    assert(finalBalance.sub(initialBalance).toNumber() === amounts[i]);
    });
  });
});
