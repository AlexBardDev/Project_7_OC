import unittest
import grandpybot

class TestGrandPyBot(unittest.TestCase):
    """This class contains all the tests for the script grandpybot.py"""

    def setUp(self):
        """This method is called before each test"""

        grandpybot.app.testing = True
        self.app = grandpybot.app.test_client()

    def test_home(self):
        """This method tests the view called 'home'"""

        rv1 = self.app.get('/')
        rv2 = self.app.get('/grandpybot/')
        assert rv1.data == rv2.data
        assert b'<title>GrandPy Bot</title>' in rv2.data

unittest.main()