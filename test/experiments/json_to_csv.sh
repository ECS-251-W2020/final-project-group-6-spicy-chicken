#!/usr/bin/env bash

jq -r '.timings.data| keys[] as $k | "\($k), \(.[$k]|.serv_recv), \(.[$k]| .geth_sbmt), \(.[$k]|.geth_done), \(.[$k]|.serv_resp)"' $1 | sed 's/ //g'
