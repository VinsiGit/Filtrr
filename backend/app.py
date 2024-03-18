from flask import Flask , request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from os import environ as e
from hashlib import sha256
from datetime import datetime, timedelta
from time import time
from functools import wraps
import random


def hash_input(input):
    # Convert the input to bytes
    input_bytes = input.encode('utf-8')

    # Create a hash object
    hash_object = sha256()

    # Update the hash object with the input bytes
    hash_object.update(input_bytes)

    # Get the hashed value as a hexadecimal string
    hashed_input = hash_object.hexdigest()

    return hashed_input

def find_mails(query):
    # Perform the query
    results = db.mails.find(query)

    # Convert the results to a list of dicts
    data = list(results)

    # Exclude the '_id' field from the response
    for item in data:
        item.pop('_id', None)

    return data

# Get the MongoDB connection details from environment variables
mongo_host = e.get('MONGO_HOST', 'db') # 'db' is the default name of the MongoDB service within the Docker network TODO: change to localhost for local development 
mongo_port = int(e.get('MONGO_PORT', '27017'))
mongo_username = e.get('MONGO_USERNAME', 'root')
mongo_password = e.get('MONGO_PASSWORD', 'mongo')

# Create a MongoDB client
client = MongoClient(host=mongo_host, port=mongo_port, username=mongo_username, password=mongo_password)

# Get the MongoDB database
db = client['filtrr_db']

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = e.get('JWT_SECRET_KEY', 'very-secret-key')
CORS(app)
jwt = JWTManager(app)

users = [
    {'username': 'admin', 'password_hash': generate_password_hash(e.get('ADMIN_PASSWORD', 'password')), 'role': 'admin'},
    {'username': 'demo', 'password_hash': generate_password_hash('password'), 'role': 'demo'}
]

# Check if any users exist
if db.users.count_documents({}) == 0:
    # No users exist, insert new users
    db.users.insert_many(users)
    print("Users inserted.")
else:
    print("Users already exist in the database.")

@app.route('/api')
def hello():
    return 'Filtrr api is running!'

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = db.users.find_one({'username': username})
    if user and check_password_hash(user['password_hash'], password):
        # Include the user's role in the JWT
        if user['role'] == 'demo':
            access_token = create_access_token(identity={'username': username, 'role': user['role']}, expires_delta=timedelta(minutes=1))
        else:
            access_token = create_access_token(identity={'username': username, 'role': user['role']}, expires_delta=timedelta(hours=168))

        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

def check_role(*roles):
    def wrapper(fn):
        @wraps(fn) 
        @jwt_required()
        def decorator(*args, **kwargs):
            current_user = get_jwt_identity()
            if current_user['role'] not in roles:
                return jsonify({"msg": "Insufficient permissions"}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

@app.route('/api/adduser', methods=['POST'])
@check_role('admin')
def add_user():
    username = request.json.get('username')
    password = request.json.get('password')
    role = request.json.get('role')
    if not username or not password or not role:
        return jsonify({"msg": "Username, password and role are required"}), 400
    if db.users.find_one({'username': username}):
        return jsonify({"msg": "Username already exists"}), 400
    db.users.insert_one({'username': username, 'password_hash': generate_password_hash(password), 'role': role})
    return jsonify({"msg": "User added successfully"}), 200


@app.route('/api/stats', methods=['GET'])
@check_role('admin', 'demo')
def get_data():
    # Extract query parameters
    rating = request.args.get('rating', type=float)
    label = request.args.get('label')
    source = request.args.get('source')
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')
    
    query = {}

    if start_date_str and end_date_str:
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        # Ensure end_date is inclusive by moving to the end of the day
        end_date = end_date.replace(hour=23, minute=59, second=59)
    else:
        # Get the current date
        today = datetime.now()

        # Set the start date and end date to today
        start_date = today.replace(hour=0, minute=0, second=0)
        end_date = today.replace(hour=23, minute=59, second=59)

    # Add filters to the query if they are specified
    if rating is not None:
        query['rating'] = rating
    else:    
        rating = "all_ratings"
    if label:
        query['label'] = label
    else:
        label = "all_labels"
    if source:
        query['source'] = source
    else:
        source = "all_sources"
    if start_date and end_date:
        query['date'] = {"$gte": start_date, "$lte": end_date}
    
    mails = find_mails(query)

    average_certainty = sum(mail['certainty'] for mail in mails) / len(mails) if mails else 0
    average_processing_time = sum(mail['datetime_elapsed'] for mail in mails) / len(mails) if mails else 0

    report = {
        "total": len(mails), 
        "label": label, 
        "rating": rating, 
        "source": source, 
        "start_date": start_date, 
        "end_date": end_date, 
        "average_certainty": average_certainty, 
        "average_processing_time": average_processing_time
    }

    return jsonify(report), 200

@app.route('/api', methods=['POST'])
@check_role('admin', 'demo', 'user')
def add_mail():
    if request.content_type != 'application/json':
        return jsonify({"error": "Unsupported Media Type"}), 415

    # Get the data from the request
    data = request.json

    # Get the source from the request headers
    source = request.headers.get('Source')

    # Add the source to the data
    hash = str(hash_input(data['body']))
    existing_record = db.mails.find_one({"id": hash})
    
    if existing_record:
        existing_record.pop('_id', None)
        existing_record['already_exists'] = True
        return jsonify(existing_record), 200
    

    start_time = time()

    # TODO: process the data

    end_time = time()
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
    "source": source,
   }

    # Add the data to the database
    db.mails.insert_one(response.copy())

    # Remove the id from the response
    response.pop('id', None)

    return jsonify(response), 200


@app.route('/api/rating', methods=['POST'])
@check_role('admin', 'demo', 'user')
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
    
@app.route('/api/settings', methods=['GET'])
@check_role('admin')
def get_settings():
    # TODO: implement settings
    # settings = db.settings.find_one()
    # settings.pop('_id', None)
    return jsonify({"settings": "TODO"}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
