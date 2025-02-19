import os
import time
import random
import csv
from urllib import response

from flask import Flask, jsonify, json, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tmp/test.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# db = SQLAlchemy(app)

import firebase_admin
from firebase_admin import db, credentials

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://skills-surgery-default-rtdb.firebaseio.com/"})
ref= db.reference("/")



# define image names. You can load this information from a local file or a database
images = [{'name': 'cardinal.jpg', 'label': 'Cardinal'}, 
          {'name': 'bluejay.jpg', 'label': 'Blue jay'},
          {'name': 'cedarwaxwing.jpg', 'label': 'Cedar waxwing'}]

# check that the backend is connected
@app.route('/time')
def get_current_time():
    return jsonify({'time': time.strftime("%I:%M:%S %p", time.localtime())})

# send data from backend to frontend

# use case 1: assign a random task to the current user and create an id
@app.route('/setup', methods=['GET'])
def setup():
    user_id = request.args.get('user_id')
    existing_user = False
    
    task_num = random.randint(1,2) # 1 is traditional, 2 is ai

    if existing_user:
        return jsonify({'user_id': user_id, 'task_number': task_num})
    else:
        return jsonify({'message': 'User not found'}), 404

    # new_user = User(task=task_num)
    # db.session.add(new_user)
    # db.session.commit()
    # user_id = new_user.user_id
    # response = {'user_id': user_id, 'task_number': task_num}
    # return jsonify(response)

@app.route('/start_main', methods=['POST'])
def start_main():
    # Parse the incoming JSON data
    request_data = json.loads(request.data)
    user_id = request_data['user_id']
    # TODO: check that the ID doesnt exist to avoid overwriting data
    user_ref = db.reference("/user_study/" + user_id)
    user_data = user_ref.get()

    if (user_data):
        return jsonify({"error": "User ID already exists. Please use a different ID."}), 400

    user_ref.set('')
    print(f"User with user_id {user_id} added to the database.")
    # Prepare the response
    response_body = {'user_id': user_id}  # Send back the user_id
    return jsonify(response_body)

# use case 2:# define the order of the images to be loaded
@app.route('/imageInfo', methods=['GET'])
def getImageInfo():
    random.shuffle(images)
    response_body = {'imgs': images}
    return jsonify(response_body)

@app.route('/get_videos', methods=['GET'])
def get_videos():
    # Load the video data from the CSV file
    videos = []
    try:
        if not os.path.exists('videos.csv'):
            return jsonify({"error": "File not found"}), 404
        
        with open('videos.csv', mode='r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                videos.append({'videoName': row['name']})
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return jsonify({'error': 'Error loading video data from CSV.'}), 500

    # Shuffle the list of videos for random order
    random.shuffle(videos)
    
    # Return the shuffled video data
    response_body = {'videos': videos}
    return jsonify(response_body)

# send data from frontend to backend
@app.route('/responsesData', methods=['POST'])
def responsesData():
    request_data = json.loads(request.data)
    q_id = request_data['q_id']
    user_id = request_data['user_id']
    ans = request_data['ans']
    text = request_data['input']
    time = request_data['time']
    print('saving data')
    msg = "Record successfully added"
    print(msg)
    response_body = {'user_id': user_id}
    return jsonify(response_body)


@app.route('/surveyData', methods=['POST'])
def surveyData():
    request_data = json.loads(request.data)
    folder = request_data['folder']
    survey_type = request_data['type']
    data = request_data["content"]
    user_id = request_data['user_id']
    
    db.reference("/user_study/" + user_id + '/' + folder + '/' + survey_type).set(data)


    msg = "Record successfully added"
    print(msg)
    response_body = {'user_id': user_id}
    return jsonify(response_body) 

# auxiliary functions to visualize stored data
def responses_serializer(obj):
    return {
      'id': obj.id,
      'q_id': obj.q_id,
      'user_id': obj.user_id,
      'ans': obj.ans,
      'text': obj.text,
      'time': obj.time
    }


def user_serializer(obj):
  return {
    'user_id': obj.user_id,
    'task': obj.task
  }


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

