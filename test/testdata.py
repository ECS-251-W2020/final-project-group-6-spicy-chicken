import time
import random
import calendar
import requests 
from pprint import pprint as pprint
​
SERVER_URL = "http://spicy-chicken.ddns.net"
​
def create_dummy_entry():
​
    ret = {
        'email': 'test@test.com',
        'heading': random.randint(-10,10),
        'speed': random.randint(0,100),
        'timestamp': calendar.timegm(time.gmtime()),
        'latitude': random.randint(-90, 90),
        'longitude': random.randint(-90, 90)
        }
    return ret
​
def send_webserver_request():
​
    dummy_entry = create_dummy_entry()
    req = requests.post(SERVER_URL + "/report", dummy_entry)
    print(req.status_code, req.text)
​
    return req
​
if __name__ == "__main__": 
    send_webserver_request()
