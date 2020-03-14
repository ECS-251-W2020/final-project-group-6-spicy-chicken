#!/bin/sh
docker stop $(docker ps -q -f name=spck)
docker rm $(docker ps -aq -f name=spck)
