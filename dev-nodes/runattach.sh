#!/bin/sh
NODE=$1
NODE=${NODE:-"spck-node1"}
docker exec -ti "$NODE" geth attach
