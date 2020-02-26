#!/bin/bash

echo "run miners.sh instead"
exit 1
NODE_NAME=$1
NODE_NAME=${NODE_NAME:-"miner1"}
ETHERBASE=${ETHERBASE:-"0x0000000000000000000000000000000000000001"}
./runnode.sh $NODE_NAME --syncmode=full --mine --minerthreads=1 --etherbase="$ETHERBASE"
