import unittest
import requests as r
class TestDatabase(unittest.TestCase):
    def test_connect_mainpage(self):
        database = r.get("http://spicy-chicken.ddns.net")
        self.assertEqual(database.status_code, 200)
        #print("connect the database, OK")

if __name__ == '__main__':
    log_file = 'log_file_mainpage.txt'
    with open(log_file, "w") as f:
        runner = unittest.TextTestRunner(f)
        unittest.main(testRunner=runner)