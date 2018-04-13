from flask import Flask

app = Flask(__name__)
app.config.from_object('config')

@app.route('/')
@app.route('/grandpybot/')
def home():
    """This view return the template"""

    return "Hello World !"

if __name__ == '__main__':
    app.run()