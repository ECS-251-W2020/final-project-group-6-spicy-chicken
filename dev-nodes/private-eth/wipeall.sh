#!/bin/bash
DATA_ROOT=${DATA_ROOT:-$(pwd)}
echo "Removing containers..."
docker stop $(docker ps -q -f name=spck)
docker rm $(docker ps -aq -f name=spck)
echo "Removing volumes in $DATA_ROOT..."
rm -Rf $DATA_ROOT/.ether-*
rm -Rf $DATA_ROOT/.ethash
rm -Rf $DATA_ROOT/.bootnode
