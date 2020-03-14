#!/bin/bash
# NODE_NAME=$1
# NODE_NAME=${NODE_NAME:-"miner1"}
# ETHERBASE=${ETHERBASE:-"0x0000000000000000000000000000000000000001"}
# ./runnode.sh $NODE_NAME --syncmode=full --mine --minerthreads=1 --etherbase="$ETHERBASE"


./runnode.sh "m1" --syncmode=full --mine --minerthreads=1 --etherbase="0x3590aca93338b0721966a8d0c96ebf2c4c87c544"
sleep 10
./runnode.sh "m2" --syncmode=full --mine --minerthreads=1 --etherbase="0x8cc5a1a0802db41db826c2fcb72423744338dcb0"
sleep 10
./runnode.sh "m3" --syncmode=full --mine --minerthreads=1 --etherbase="0x0000000000000000000000000000000000000001"

