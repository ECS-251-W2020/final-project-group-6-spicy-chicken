#!/usr/bin/env python3
import time
import random
import calendar
import requests 
import secrets

from pprint import pprint as pprint

#SERVER_URL = "http://spicy-chicken.ddns.net"
SERVER_URL = "http://35.239.151.101"
#SERVER_URL = "http://34.71.47.146"
TOKEN_LEN = 13

def create_dummy_entry():

    ret = {
        'email': 'test@test.com',
        'heading': random.randint(-10,10),
        'speed': random.randint(0,100),
        'timestamp': calendar.timegm(time.gmtime()),
        'latitude': random.uniform(38.535, 38.545),
        'longitude': random.uniform(-121.740, -121.770),
        'authToken': secrets.token_urlsafe(TOKEN_LEN)
        }
    return ret

def send_webserver_request():

    dummy_entry = create_dummy_entry()
    req = requests.post(SERVER_URL + "/report", dummy_entry)
    print(req.status_code, req.text)

    return req

if __name__ == "__main__":
    send_webserver_request()

