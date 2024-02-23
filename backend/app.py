# app.py
from flask import Flask
import json
from pymongo import MongoClient
import os
from flask import request
from flask_cors import CORS
from flask import jsonify

# Get the MongoDB connection details from environment variables
mongo_host = os.environ.get('MONGO_HOST', 'db')
mongo_port = int(os.environ.get('MONGO_PORT', '27017'))
mongo_username = os.environ.get('MONGO_USERNAME', 'root')
mongo_password = os.environ.get('MONGO_PASSWORD', 'mongo')

# Create a MongoDB client
client = MongoClient(host=mongo_host, port=mongo_port, username=mongo_username, password=mongo_password)

# Get the MongoDB database
db = client['filtrr_db']

app = Flask(__name__)
CORS(app)

@app.route('/api')
def hello():
    return 'Filtrr api'

@app.route('/api/site')
def site():
    # Get the data from the database
    data = list(db.site.find())

    # Convert the data to JSON
    response = json.dumps(data, default=str)

    return response

@app.route('/api/site', methods=['POST'])
def add_site():
    # Get the data from the request
    data = request.json

    # Add the data to the database
    db.site.insert_one(data)

    with open('classifications.json', 'r') as file:
        content = json.load(file)
    return content

@app.route('/api/addin')
def addin():
    # Get the data from the database
    data = list(db.site.find())
    
    # Convert the data to JSON
    response = json.dumps(data, default=str)

    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
