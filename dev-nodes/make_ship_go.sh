#!/usr/bin/env bash

# just cd otherwise dep scripts wont work
cd ./private-eth

# make genesis block
./genesis.sh

# run bootnode
./bootnode.sh

sleep 20
# start miners
./runminers.sh

sleep 20
# start node
EXPOSE_FLAG="-p 8545:8545 -p 8546:8546" ./runnode.sh n1

