#!/usr/bin/env bash

if [ "$#" -ne 1 ]; then
    echo "Usage $0 <abi/bin file starting to glob for>"
    exit 1
fi

echo "var contract = {}; contract.abi = '$(cat $1*abi)'; contract.bin= '$(cat $1*bin)'; var testContract = web3.eth.contract(JSON.parse(contract.abi)); personal.unlockAccount(eth.accounts[0], \"pass\"); var address=''; var test = testContract.new({ from: eth.accounts[0], data: \"0x\" + contract.bin, gas: 4700000},  function (e, contract) {    console.log(e, contract);    if (typeof contract.address !== 'undefined') {         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);    address=contract.address;}  });" > test.js
