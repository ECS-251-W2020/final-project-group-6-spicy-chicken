#!/usr/bin/env bash

CONTRACT_DIR="/home/uttie/final-project-group-6-spicy-chicken/contracts/truffle/contracts"
CONTRACT="${CONTRACT_DIR}/Incident.sol"

BUILD_DIR=build


solc --overwrite --abi --bin "${CONTRACT}" -o "${BUILD_DIR}"
abigen --bin="${BUILD_DIR}/Incident.bin" --abi="${BUILD_DIR}/Incident.abi" --pkg=incident --out="${BUILD_DIR}/Incident.go"

