#!/usr/bin/env nodejs

var Web3 = require("web3")
var web3 = new Web3("http://localhost:8545")
web3.eth.personal.unlockAccount("0x8Cc5A1a0802DB41DB826C2FcB72423744338DcB0", "pass", 1000000).then(console.log)

