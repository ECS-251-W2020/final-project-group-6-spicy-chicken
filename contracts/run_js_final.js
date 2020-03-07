var Web3 = require("web3")
var web3 = new Web3(new Web3.providers.HttpProvider("http://172.18.0.6:8545"));

var inc_json = require("./truffle/build/contracts/Incident.json")
var inc = new web3.eth.Contract(inc_json.abi,"0x18f4ca4Fe0ABAaf2446a388F18BC119C3981762b")
inc.methods.getAccident(1).call().then(function(e){console.log(e)})

