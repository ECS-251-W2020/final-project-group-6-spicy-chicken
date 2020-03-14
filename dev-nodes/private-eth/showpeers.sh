#!/bin/sh
NODE=$1
NODE=${NODE:-"node1"}
CONTAINER_NAME="spck-$NODE"
docker exec -ti "$CONTAINER_NAME" geth --exec 'admin.peers' attach
