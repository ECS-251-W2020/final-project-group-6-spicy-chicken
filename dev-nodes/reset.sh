#!/usr/bin/env bash

PROJ_DIR="${SPCK_PROJECT_PATH}"

# start containers
cd "$PROJ_DIR/dev-nodes/"
./make_ship_go.sh

# deploy
cd "${PROJ_DIR}/contracts/truffle"
truffle compile
nodejs "${PROJ_DIR}/dev-nodes/unlock.js"
truffle migrate --network dev
ADDR=`echo "console.log(Incident.address)" | truffle console --network dev| grep -Eo "[a-fA-F0-9]{6}[a-fA-F0-9]*"`

echo "wait til dag generation is done"
echo $ADDR
export CONTRACT_ADDR="$ADDR"

# compile go server
cd "$PROJ_DIR/dev-nodes/web-server"
go clean
go build

# start server
sudo -E CONTRACT_ADDR="$ADDR" ./web-server

