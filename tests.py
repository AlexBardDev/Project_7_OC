#import external library
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from flask_testing import LiveServerTestCase
from flask import Flask, url_for

from grandpybot import app

import unittest

class TestGrandPyBot(LiveServerTestCase):
    """This class contains all the tests for the script grandpybot.py"""

    def create_app(self):
        """It creates the app for the testing purpose"""

        app.config.testing=True
        return app

    def setUp(self):
        """This method is called before each test"""

        self.driver = webdriver.Firefox()
        self.driver.get(self.get_server_url())
        
    def tearDown(self):
        """This method is called after each test"""

        self.driver.quit()

    def test_home(self):
        """It tests that the user reaches the web page"""

        content = self.driver.find_element_by_css_selector(".dialog p")
        assert content.text == "Vos messages seront affichés ici"

    def call_the_apis(self):
        """It calls the APIs"""

        form = self.driver.find_element_by_css_selector("section textarea")
        form.send_keys("Salut GrandPy ! Est-ce que tu connais l'adresse d'OpenClassrooms ?")
        ActionChains(self.driver).key_down(Keys.ENTER).perform()

    def test_google_maps_api(self):
        """It tests the Google Maps API. If after 5 seconds there is nothing,
        selenium will raise a TimeOut Exception. Otherwise, my_map exists and
        the Google Maps API gaves data to the JavaScript file."""

        self.call_the_apis()
        my_map = WebDriverWait(self.driver, 6).until(EC.presence_of_element_located((By.ID, "map1")))
        assert my_map

    def test_media_wiki_api(self):
        """It tests the Media Wiki API"""

        self.call_the_apis()
        story = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "story")))
        assert story.text[:51] == "Mais t'ai-je déjà raconté l'histoire de ce quartier"

unittest.main()