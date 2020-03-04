import unittest
import os
import requests as r
class TestDatabase(unittest.TestCase):
    def test_connect_database(self):
        database = r.get("http://spicy-chicken.ddns.net/list")
        self.assertEqual(database.status_code, 200)
        #print("connect the database, OK")
    
    def test_has_item(self):
        resp = r.get("http://spicy-chicken.ddns.net/list")
        with open("list.txt","w") as f:
            f.write(resp.text)
        self.assertNotEqual(os.path.exists('list.txt') and os.path.getsize('list.txt'), 0)

if __name__ == '__main__':
    log_file = 'log_file_list.txt'
    with open(log_file, "w") as f:
        runner = unittest.TextTestRunner(f)
        unittest.main(testRunner=runner)
