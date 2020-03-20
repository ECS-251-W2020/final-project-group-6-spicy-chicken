#!/bin/bash
DATA_ROOT=${SPCK_DATA_ROOT:-$(pwd)}
echo "Removing containers..."
docker stop $(docker ps -q -f name=spck)
docker rm $(docker ps -aq -f name=spck)
echo "Removing volumes in $DATA_ROOT..."
sudo rm -Rf $DATA_ROOT/.spck-*
sudo rm -Rf $DATA_ROOT/.ethash
sudo rm -Rf $DATA_ROOT/.bootnode
