#!/usr/bin/env bash

cd /home/uttie/spicy-chicken-repo/contracts/truffle
truffle compile
nodejs /home/uttie/spicy-chicken-repo/contracts/unlock.js
truffle migrate --network dev
ADDR=`echo "console.log(Incident.address)" | truffle console --network dev| grep -Eo "[a-fA-F0-9]{6}[a-fA-F0-9]*"`

echo $ADDR
