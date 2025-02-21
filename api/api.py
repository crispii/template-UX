import os
import time
import random
import csv
import subprocess
import threading
import uuid
from urllib import response

from flask import Flask, jsonify, json, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from script_to_run import time_consuming_process


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

jobs = {}

def load_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)

# functions to run the python code from the backend
def run_background_task(job_id, data_size, complexity, trial):
    try:
        result = time_consuming_process(data_size, complexity, trial)
        jobs[job_id] = {"status": "completed", "result": result}
    except Exception as e:
        jobs[job_id] = {"status": "failed", "error": str(e)}


def run_command(command):
    """Runs a shell command and checks for errors."""
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"Error in command: {command}")
        print(result.stderr)
        exit(1)  # Stop execution if an error occurs
    
    print(result.stdout)


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

    return jsonify({'user_id': user_id, 'task_number': task_num})

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

@app.route('/process_videos', methods=['POST'])
def process_videos():
    request_data = json.loads(request.data)
    userID = request_data['user_id'] # will need this userID later to tell the video file
    trial_video = request_data['trial_number']
    print('requesting processing in the backend for trial {}'.format(trial_video))
    # run_command(
    #     f"python generate_dataset.py "
    #     f"--videos_root {args.videos_root} "
    # )

    job_id = str(uuid.uuid4())
    
    # Initialize job status
    jobs[job_id] = {"status": "processing"}
    
    # Start process in background
    thread = threading.Thread(
        target=run_background_task,
        args=(job_id, 10000, 20, trial_video)
    )
    thread.daemon = True
    thread.start()
    
    # TODO: may need to consider if there is an error launching the code 
    
    # Return immediately with job ID
    return jsonify({
        "success": True,
        "job_id": job_id,
        "message": "Process started in background"
    })



@app.route('/check-status/<job_id>', methods=['GET'])
def check_status(job_id):
    if job_id not in jobs:
        return jsonify({"success": False, "message": "Job not found"}), 404
    
    return jsonify({
        "success": True,
        "job_id": job_id,
        "status": jobs[job_id]["status"],
        "result": jobs[job_id].get("result"),
        "error": jobs[job_id].get("error")
    })

@app.route('/load_outputs', methods=['GET'])
def load_outputs():
    data1 = load_json('output_1.json')
    data2 = load_json('output_2.json')
    sample1 = data1["result_sample"]
    sample2 = data2["result_sample"]

    # Compute the average for each index
    average_sample = [(a + b) / 2 for a, b in zip(sample1, sample2)]

    averaged_data = {
                        "result_sample": average_sample
                    }

    return jsonify(averaged_data)

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

