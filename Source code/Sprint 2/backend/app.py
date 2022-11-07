from flask import Flask, request, jsonify, make_response,current_app
from flask_sqlalchemy import SQLAlchemy
import uuid

from  werkzeug.security import generate_password_hash, check_password_hash
# imports for PyJWT authentication
import jwt
from datetime import datetime, timedelta
from functools import wraps
  
# creates Flask object
app = Flask(__name__)
# configuration
# NEVER HARDCODE YOUR CONFIGURATION IN YOUR CODE

    # within this block, current_app points to app.
# INSTEAD CREATE A .env FILE AND STORE IN IT
app.config['SECRET_KEY'] = 'your secret key'
# database name
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# creates SQLALCHEMY object
db = SQLAlchemy(app)
# Database ORMs


default_info = {
        'limit':10000,
        'phone_number':0,
        'currency':'₹',
        'income':0,
        }


with app.app_context():
    db.create_all()
class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    public_id = db.Column(db.String(50), unique = True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(70), unique = True)
    password = db.Column(db.String(80))
    info = db.relationship('Info', uselist=False,back_populates='user')

class Info(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String(50),db.ForeignKey('user.public_id'),nullable = False, unique=True)
    user = db.relationship('User',back_populates='info')
    limit = db.Column(db.Float)
    phone_number = db.Column(db.Integer)
    income = db.Column(db.Float)
    currency = db.Column(db.String(10))

class Expense(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    user = db.Column(db.String(50))
    category = db.Column(db.String(50))
    date_created = db.Column(db.DateTime(),)

class Bills(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.String(50))
    title = db.Column(db.String(50))
    desc = db.Column(db.String(100))
    date = db.Column(db.Date)
# decorator for verifying the JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            print("received token : ",token)
            print(app.config['SECRET_KEY'])
            data = jwt.decode(token, app.config['SECRET_KEY'],algorithms=["HS256"])
            print("data",data)
            current_user = User.query\
                .filter_by(public_id = data['public_id'])\
                .first()
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated
  
# User Database Route
# this route sends back list of users
@app.route('/user', methods =['GET'])
@token_required
def get_all_users(current_user):
    # querying the database
    # for all the entries in it
    users = User.query.all()
    # converting the query objects
    # to list of jsons
    output = []
    for user in users:
        # appending the user data json
        # to the response list
        output.append({
            'public_id': user.public_id,
            'name' : user.name,
            'email' : user.email
        })
  
    return jsonify({'users': output})
  
@app.route('/info',methods=['POST'])
@token_required
def add_info(current_user):
    form = request.form

    if not form :
        return make_response('could not add info no data received',401)
    if not form.get('limit'):
        return make_response('limit not found',401)
    info = Info(
            user_id=current_user.public_id,
            user=current_user,
            limit=form.get('limit') if form.get('limit') else default_info['limit'],
            phone_number=form.get('phone_number') if form.get('phone_number') else default_info['phone_number'],
            income=form.get('income') if form.get('income') else default_info['income'],
            currency=form.get('currency') if form.get('currency') else default_info['currency']
            )
    db.session.add(info)
    db.session.commit()
    return make_response('Successfully added.', 201)
# route for logging user in
@app.route('/login', methods =['POST'])
def login():
    # creates dictionary of form data
    auth = request.form
  
    if not auth or not auth.get('email') or not auth.get('password'):
        # returns 401 if any email or / and password is missing
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="Login required !!"'}
        )
  
    user = User.query\
        .filter_by(email = auth.get('email'))\
        .first()
  
    if not user:
        # returns 401 if user does not exist
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="User does not exist !!"'}
        )
  
    if check_password_hash(user.password, auth.get('password')):
        # generates the JWT Token
        token = jwt.encode({
            'public_id': user.public_id,
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
        }, app.config['SECRET_KEY'],algorithm="HS256")
  
        return make_response(jsonify({'token' : token}), 201)
    # returns 403 if password is wrong
    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate' : 'Basic realm ="Wrong Password !!"'}
    )
  
# signup route
@app.route('/signup', methods =['POST'])
def signup():
    # creates a dictionary of the form data
    data = request.form
  
    # gets name, email and password
    name, email = data.get('name'), data.get('email')
    password = data.get('password')
    print("received password",password,name,email)
    # checking for existing user
    user = User.query\
        .filter_by(email = email)\
        .first()
    if not user:
        # database ORM object
        user = User(
            public_id = str(uuid.uuid4()),
            name = name,
            email = email,
            password = generate_password_hash(password)
        )
        # insert user
        db.session.add(user)
        db.session.commit()
  
        return make_response('Successfully registered.', 201)
    else:
        # returns 202 if user already exists
        return make_response('User already exists. Please Log in.', 202)
  


@app.route('/home', methods =['GET'])
@token_required
def get_expenses(current_user):
    return make_response(current_user.public_id,201)



@app.before_first_request
def create_tables():
    db.create_all()

if __name__ == "__main__":
    # setting debug to True enables hot reload
    # and also provides a debugger shell
    # if you hit an error while running the server
    app.run(debug = True)
