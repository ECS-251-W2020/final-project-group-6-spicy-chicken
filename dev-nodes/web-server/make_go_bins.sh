#!/usr/bin/env bash

CONTRACT_DIR="${SPCK_PROJECT_PATH}/contracts"
CONTRACT="${CONTRACT_DIR}/Incident.sol"

BUILD_DIR=build

solc --optimize-runs 200 --evm-version byzantium --overwrite --abi --bin "${CONTRACT}" -o "${BUILD_DIR}"
abigen --bin="${BUILD_DIR}/Incident.bin" --abi="${BUILD_DIR}/Incident.abi" --pkg=incident --out="${BUILD_DIR}/Incident.go"

