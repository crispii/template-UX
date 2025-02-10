import os
import time
import random
from urllib import response

from flask import Flask, jsonify, json, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tmp/test.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class User(db.Model):
    user_id = db.Column(db.Integer, nullable=False, primary_key=True)
    task = db.Column(db.Integer, nullable=False)

    def __init__(self, user_id, task):
        self.user_id = user_id
        self.task = task


class Responses(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    q_id = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    ans = db.Column(db.Integer, nullable=False)
    text = db.Column(db.String(50), nullable=False)
    time = db.Column(db.Float, nullable=False)

    def __init__(self, q_id, user_id, ans, text, time):
        self.q_id = q_id
        self.user_id = user_id
        self.ans = ans
        self.text = text
        self.time = time


class Survey(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    q1 = db.Column(db.Integer, nullable=False)
    q2 = db.Column(db.Integer, nullable=False)

    def __init__(self, user_id, q1, q2):
      self.user_id = user_id
      self.q1 = q1
      self.q2 = q2


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
    existing_user = User.query.filter_by(user_id=user_id).first()

    
    task_num = random.randint(1,2)

    if existing_user:
        task_num = existing_user.task
        return jsonify({'user_id': user_id, 'task_number': task_num})
    else:
        return jsonify({'message': 'User not found'}), 404

    # new_user = User(task=task_num)
    # db.session.add(new_user)
    # db.session.commit()
    # user_id = new_user.user_id
    # response = {'user_id': user_id, 'task_number': task_num}
    # return jsonify(response)

# @app.route('/setup_main', methods=['GET'])
# def setup_main():
#     # Parse the incoming JSON data
#         request_data = request.get_json()
#         user_id = request_data.get('user_id')

#         # Check if the user already exists or create a new user
#         existing_user = User.query.filter_by(user_id=user_id).first()
#         if not existing_user:
#             new_user = User(user_id=user_id)  # Store only user_id
#             db.session.add(new_user)
#             db.session.commit()

#         # Prepare the response
#         response_body = {'user_id': user_id}  # Send back the user_id
#         return jsonify(response_body)

    # task_num = 1
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
    task = random.randint(1,2)
    # Check if the user already exists or create a new user
    existing_user = User.query.filter_by(user_id=user_id).first()
    if not existing_user:
        new_user = User(user_id=user_id, task=task)  # Store only user_id
        db.session.add(new_user)
        db.session.commit()

    print(f"User with user_id {user_id} added to the database.")
    # Prepare the response
    response_body = {'user_id': user_id, 'task_number': task}  # Send back the user_id
    return jsonify(response_body)

# use case 2:# define the order of the images to be loaded
@app.route('/imageInfo', methods=['GET'])
def getImageInfo():
    random.shuffle(images)
    response_body = {'imgs': images}
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
    new_entry = Responses(q_id, user_id, ans, text, time)
    db.session.add(new_entry)
    db.session.commit()
    msg = "Record successfully added"
    print(msg)
    response_body = {'user_id': user_id}
    return jsonify(response_body)


@app.route('/surveyData', methods=['POST'])
def surveyData():
    request_data = json.loads(request.data)
    user_id = request_data['user_id']
    q1 = request_data['q1']
    q2 = request_data['q2']
    new_entry = Survey(user_id=user_id, q1=q1, q2=q2)
    db.session.add(new_entry)
    db.session.commit()
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


# visualize the current entries in the tables
@app.route('/api', methods=['GET'])
def api():
    return jsonify([*map(responses_serializer, Responses.query.all())])
    # return jsonify([*map(user_serializer, User.query.all())])


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

