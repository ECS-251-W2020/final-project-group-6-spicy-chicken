#!/usr/bin/env bash

function hello {
    curl -X POST \
        -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}' \
        http://localhost:8545
}

function run {
    curl -X POST \
        -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_call","params": [{"from": "0x8cc5a1a0802db41db826c2fcb72423744338dcb0", "to": "0x18f4ca4Fe0ABAaf2446a388F18BC119C3981762b", "data": "0x22c5bd5a0000000000000000000000000000000000000000000000000000000000000001"}, "latest"], "id":1}' http://localhost:8545
}
run
