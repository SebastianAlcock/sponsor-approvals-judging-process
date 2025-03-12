from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend communication

@app.route("/")
def home():
    return jsonify({"message": "Flask Backend is Running!"})

if __name__ == "__main__":
    app.run(debug=True)
