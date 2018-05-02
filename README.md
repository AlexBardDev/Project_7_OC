# Project_7_OC GrandPy Bot

The purpose of this project is to get a web page where the user can ask the adress of a place. The web page(=GrandPy Bot) will answer with the exact adress, a 'google maps' map and some information about the place.

For the exact adress, I have to use the Google Maps API and for the information about the place, I have to use the Wikipedia API. I have to use AJAX to interact with the APIs.

The web server is coded with Flask. It just returns the right web page. The web page is fully responsive.

I have to use a Test-Driven Developement for this project.

# Files and folders

- requirements.txt contains all the required librairies for this program.
- grandbypot.py is the main script coded with Flask. Double-click on it to start the web server.
- config.py contains some configurations for Flask and tests.py contains the tests of the web server.
- the folder *static* contains the JavaScript and CSS files. And the folder *templates* contains the HTML page.

# Link

Here is the project : https://alexbarddev-grandpybot.herokuapp.com/

# Attention

When you use GrandPy Bot and you are looking for a new place, please enter the new place in French like : "l'adresse de/d' *[lieu]* ?". For example, "Peux-tu me donner l'adresse d'OpenClassrooms ?" or "Quelle est l'adresse de Google ?".
