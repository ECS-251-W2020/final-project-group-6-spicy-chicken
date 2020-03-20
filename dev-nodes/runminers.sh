#!/bin/bash
# NODE_NAME=$1
# NODE_NAME=${NODE_NAME:-"miner1"}
# ETHERBASE=${ETHERBASE:-"0x0000000000000000000000000000000000000001"}
# ./runnode.sh $NODE_NAME --syncmode=full --mine --minerthreads=1 --etherbase="$ETHERBASE"

if [ "$1" == "m1" ]; then
    ./runnode.sh "m1" --syncmode=full --mine --minerthreads=1 --etherbase="0x3590aca93338b0721966a8d0c96ebf2c4c87c544"
elif [ "$1" == "m2" ]; then
#sleep 10
    ./runnode.sh "m2" --syncmode=full --mine --minerthreads=1 --etherbase="0x8cc5a1a0802db41db826c2fcb72423744338dcb0"
elif [ "$1"  == "m3" ]; then
#sleep 10
    ./runnode.sh "m3" --syncmode=full --mine --minerthreads=1 --etherbase="0x0000000000000000000000000000000000000001"
elif [ "$1" == "" ]; then
    ./runnode.sh "m1" --syncmode=full --mine --minerthreads=1 --etherbase="0x3590aca93338b0721966a8d0c96ebf2c4c87c544"
    ./runnode.sh "m2" --syncmode=full --mine --minerthreads=1 --etherbase="0x8cc5a1a0802db41db826c2fcb72423744338dcb0"
    ./runnode.sh "m3" --syncmode=full --mine --minerthreads=1 --etherbase="0x0000000000000000000000000000000000000001"
fi;


