#!/usr/bin/env bash

PROJ_DIR=/home/uttie/spicy-chicken-repo

cd "${PROJ_DIR}/contracts/truffle"
truffle compile
nodejs "${PROJ_DIR}/contracts/unlock.js"
truffle migrate --network dev
ADDR=`echo "console.log(Incident.address)" | truffle console --network dev| grep -Eo "[a-fA-F0-9]{6}[a-fA-F0-9]*"`

echo "wait til dag generation is done"
echo $ADDR

# compile go server
cd "$PROJ_DIR/dev-nodes/web-server"
go clean
go build

# start server
