from flask import Flask, render_template

app = Flask(__name__)
app.config.from_object('config')

@app.route('/')
@app.route('/grandpybot/')
def home():
    """This view return the GrandPy template"""

    return render_template("grandpy.html")

if __name__ == '__main__':
    app.run()