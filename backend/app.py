from flask import Flask
from pymongo import MongoClient
import os
from flask import request
from flask_cors import CORS
import random
import datetime
import time
import hashlib
from flask import jsonify
from datetime import datetime

# Get the MongoDB connection details from environment variables
mongo_host = os.environ.get('MONGO_HOST', 'db') # 'db' is the default name of the MongoDB service within the Docker network TODO: change to localhost for local development 
mongo_port = int(os.environ.get('MONGO_PORT', '27017'))
mongo_username = os.environ.get('MONGO_USERNAME', 'root')
mongo_password = os.environ.get('MONGO_PASSWORD', 'mongo')

# Create a MongoDB client
client = MongoClient(host=mongo_host, port=mongo_port, username=mongo_username, password=mongo_password)

# Get the MongoDB database
db = client['filtrr_db']

app = Flask(__name__)
CORS(app)

def hash_input(input):
    # Convert the input to bytes
    input_bytes = input.encode('utf-8')

    # Create a hash object
    hash_object = hashlib.sha256()

    # Update the hash object with the input bytes
    hash_object.update(input_bytes)

    # Get the hashed value as a hexadecimal string
    hashed_input = hash_object.hexdigest()

    return hashed_input

@app.route('/api')
def hello():
    return 'Filtrr api is running!'

@app.route('/api/analytics', methods=['GET'])
def get_data():
    # Extract query parameters
    rating = request.args.get('rating', type=float)
    label = request.args.get('label')
    source = request.args.get('source')
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')

    if start_date_str and end_date_str:
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        # Ensure end_date is inclusive by moving to the end of the day
        end_date = end_date.replace(hour=23, minute=59, second=59)
    else:
        return jsonify({"error": "Please provide both start_date and end_date query parameters in 'YYYY-MM-DD' format."}), 400

    query = {}
    
    # Add filters to the query if they are specified
    if rating is not None:
        query['rating'] = rating
    if label:
        query['label'] = label
    if source:
        query['source'] = source
    if start_date and end_date:
        query['date'] = {"$gte": start_date, "$lte": end_date}

    print(query['date'])

    # Perform the query
    results = db.mails.find(query)

    # Convert the results to a list of dicts
    data = list(results)

    # Optionally, you might want to exclude the '_id' field from the response
    for item in data:
        item.pop('_id', None)

    return jsonify(data), 200

@app.route('/api', methods=['POST'])
def add_mail():
    if request.content_type != 'application/json':
        return jsonify({"error": "Unsupported Media Type"}), 415

    # Get the data from the request
    data = request.json

    # Get the source from the request headers
    source = request.headers.get('Source')

    # Add the source to the data
    hash = str(hash_input(data['body']))

    start_time = time.time()

    # TODO: process the data

    end_time = time.time()
    processing_time = end_time - start_time

    # Generate a random response
    label = random.choice(["BI_ENGINEER", "IRRELEVANT", "DATA_ENGINEER"])
    certainty = random.random()
    keywords = ["een", "twee", "drie", "vier", "vijf"]

    # Make the response in JSON format
    response = {
    "id": hash,
    "label": label,
    "date": datetime.now(),
    "keywords": keywords,
    "rating": 0,
    "datetime_start": start_time,
    "datetime_end": end_time,
    "datetime_elapsed": processing_time,
    "certainty": certainty,
    "source": source
   }

    # Add the data to the database
    db.mails.insert_one(response.copy())

    # Remove the id from the response
    response.pop('id', None)

    return jsonify(response), 200


@app.route('/api/rating', methods=['POST'])
def update_rating():
    data = request.json

    # Add the source to the data
    hash = {"id": str(hash_input(data['body']))}
    new_rating = data['rating']

    result = db.mails.update_one(hash, {"$set": {"rating": new_rating}})

    if result.modified_count > 0:
        return "Rating updated successfully."
    else:
        return "No documents matched the query. No update was made."
    


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
