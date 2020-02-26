#!/usr/bin/env bash

curl -vv -XPOST "http://localhost:8080/report" -H "Content-Type: application/x-www-form-urlencoded" -d "accountId=23423&latitude=23.2232&longitude=23.232342"
