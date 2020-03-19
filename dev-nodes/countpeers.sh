#!/bin/sh
NODE=$1
NODE=${NODE:-"n1"}
CONTAINER_NAME="spck-$NODE"
docker exec -ti "$CONTAINER_NAME" geth --exec 'admin.peers.length' attach
