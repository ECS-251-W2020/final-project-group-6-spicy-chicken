#!/bin/bash
IMGNAME="ethereum/client-go:v1.8.12"
#IMGNAME="ethereum/solc:stable-alpine"
#IMGNAME="ethereum/client-go:alltools-stable"
#IMGNAME="ethereum/client-go:alltools-v1.8.11"
NODE_NAME=$1
NODE_NAME=${NODE_NAME:-"node1"}
DETACH_FLAG=${DETACH_FLAG:-"-d"}
EXPOSE_FLAG=${EXPOSE_FLAG:-""}
CONTAINER_NAME="spck-$NODE_NAME"
#CONTAINER_NAME="$NODE_NAME"
DATA_ROOT_DIR=${SPCK_DATA_ROOT:-"$(pwd)"}
DATA_ROOT="${DATA_ROOT_DIR}/.spck-$NODE_NAME"
DATA_HASH=${DATA_HASH:-"$(pwd)/.ethash"}

echo "Destroying old container $CONTAINER_NAME..."
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME
RPC_PORTMAP=
RPC_ARG=
if [[ ! -z $RPC_PORT ]]; then
#    RPC_ARG='--ws --wsaddr=0.0.0.0 --wsport 8546 --wsapi=db,eth,net,web3,personal --wsorigins "*" --rpc --rpcaddr=0.0.0.0 --rpcport 8545 --rpcapi=db,eth,net,web3,personal --rpccorsdomain "*"'
    RPC_ARG='--rpc --rpcaddr=0.0.0.0 --rpcport 8545 --rpcapi=db,eth,net,web3,personal --rpccorsdomain=* --rpcvhosts=*'
    RPC_PORTMAP="-p $RPC_PORT:8545"
fi


if  [[ ! -z $EXPOSE_FLAG ]]; then
    # if EXPOSE_FLAG is set
    RPC_ARG="--ws --wsaddr=0.0.0.0 --wsport 8546 --wsapi=db,eth,net,web3,personal --wsorigins=* --rpc --rpcaddr=0.0.0.0 --rpcport 8545 --rpcapi=db,eth,net,web3,personal,admin --rpccorsdomain=* --rpcvhosts=* --syncmode=full "
fi

BOOTNODE_URL=${BOOTNODE_URL:-$(./getbootnodeurl.sh)}
if [ ! -f $(pwd)/genesis.json ]; then
    echo "No genesis.json file found, please run 'genesis.sh'. Aborting."
    exit
fi
if [ ! -d $DATA_ROOT/keystore ]; then
    echo "$DATA_ROOT/keystore not found, running 'geth init'..."
    docker run --rm \
        -v $DATA_ROOT:/root/.ethereum \
        -v $(pwd)/genesis.json:/opt/genesis.json \
        -v $(pwd)/pass:/opt/pass \
        $IMGNAME init /opt/genesis.json
    echo "...done!"
fi

echo "$EXPOSE_FLAG"
echo "Running new container $CONTAINER_NAME..."
docker run $DETACH_FLAG --name $CONTAINER_NAME \
    $EXPOSE_FLAG \
    --network ethereum \
    -v $DATA_ROOT:/root/.ethereum \
    -v $DATA_HASH:/root/.ethash \
    -v $(pwd)/genesis.json:/opt/genesis.json \
    -v $(pwd)/pass:/opt/pass \
    $RPC_PORTMAP \
    $IMGNAME ${@:2} --bootnodes=$BOOTNODE_URL $RPC_ARG --cache=512 --verbosity=4 --maxpeers=3 

