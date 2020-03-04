import unittest
import os
import requests as r
import timeout_decorator
import time
  
class TimeOut(unittest.TestCase):
    def setUp(self):
        pass
    
    # test for connecting the database
    @timeout_decorator.timeout(seconds=5)
    def test_connect_database(self):
        database = r.get("http://spicy-chicken.ddns.net/list")
        self.assertEqual(database.status_code, 200)
        #print("connect the database, OK")
   
    # test for write to list
    @timeout_decorator.timeout(seconds=5)   #if database is large, timeout should be larger
    def test_has_item(self):
        resp = r.get("http://spicy-chicken.ddns.net/list")
        with open("list.txt","w") as f:
            f.write(resp.json)
        self.assertNotEqual(os.path.exists('list.txt') and os.path.getsize('list.txt'), 0)

    def tearDown(self):
        pass

if __name__ == '__main__':
    log_file = 'log_file_list.txt'
    with open(log_file, "w") as f:
        runner = unittest.TextTestRunner(f)
        unittest.main(testRunner=runner)
