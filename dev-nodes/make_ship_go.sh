#!/usr/bin/env bash

# make genesis block
./genesis.sh

# run bootnode
./bootnode.sh

# start miners
./runminers.sh

# start node
EXPOSE_FLAG="-p 8545:8545 -p 8546:8546" ./runnode.sh spck-n1

