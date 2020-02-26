web3.eth.defaultAccount = web3.eth.accounts[0];
var CoursetroContract = web3.eth.contract(JSON.parse(coursetro.abi));
var Coursetro = CoursetroContract.at(address);

