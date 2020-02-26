#!/usr/bin/env bash

IP="spicy-chicken.ddns.net"

echo "http://${IP}"

curl -vv -XPOST "http://${IP}/report" -H "Content-Type: application/x-www-form-urlencoded" -d "accountId=11231&latitude=23.2232&longitude=23.232342"

curl -vv -XPOST "http://${IP}/report" -H "Content-Type: application/x-www-form-urlencoded" -d "accountId=21231&latitude=23.2232&longitude=23.232342"

curl -vv -XPOST "http://${IP}/report" -H "Content-Type: application/x-www-form-urlencoded" -d "accountId=23231&latitude=21.2232&longitude=16.232342"

curl -vv -XPOST "http://${IP}/report" -H "Content-Type: application/x-www-form-urlencoded" -d "accountId=23231&latitude=20.2232&longitude=23.33342"

curl -vv -XPOST "http://${IP}/report" -H "Content-Type: application/x-www-form-urlencoded" -d "accountId=23423&latitude=20.2232&longitude=13.232342"
