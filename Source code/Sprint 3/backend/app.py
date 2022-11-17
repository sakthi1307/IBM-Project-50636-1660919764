from flask import Flask, request, jsonify, make_response,current_app
from flask_sqlalchemy import SQLAlchemy
import uuid
from sqlalchemy import extract
from flask_cors import CORS


from  werkzeug.security import generate_password_hash, check_password_hash
# imports for PyJWT authentication
import jwt
from datetime import datetime, timedelta
from functools import wraps
  
# creates Flask object
app = Flask(__name__)
CORS(app)

# configuration
# NEVER HARDCODE YOUR CONFIGURATION IN YOUR CODE

    # within this block, current_app points to app.
# INSTEAD CREATE A .env FILE AND STORE IN IT
app.config['SECRET_KEY'] = 'your secret key'
# database name
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# creates SQLALCHEMY object
db = SQLAlchemy(app)
# Database ORMs


default_info = {
        'name':'',
        'limit':-1,
        'phone_number':0,
        'currency':'₹',
        'income':0,
        'category':'misc'
        }


with app.app_context():
    db.create_all()
class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    public_id = db.Column(db.String(50), unique = True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(70), unique = True)
    password = db.Column(db.String(80))
    monthly_limit = db.Column(db.Float)
    phone_number = db.Column(db.Integer)
    income = db.Column(db.Float)

class Record(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    user = db.Column(db.String(50))
    category = db.Column(db.String(50))
    date_created = db.Column(db.DateTime(timezone=True),default=datetime.utcnow)
    amount = db.Column(db.Float)
    gain = db.Column(db.Boolean)
    @property
    def serialize(self):
       return {
           'id'         : self.id,
           'user':self.user,
           'category':self.category,
           'date_created':self.date_created,
           'amount':self.amount,
           'gain':self.gain
           # This is an example how to deal with Many2Many relations
       }

class Bills(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user = db.Column(db.String(50))
    name = db.Column(db.String(50))
    due_date = db.Column(db.Date)
    amount = db.Column(db.Float)
    date_created = db.Column(db.DateTime(timezone=True),default=datetime.utcnow)
    @property
    def serialize(self):
       return {
           'id'         : self.id,
           'user':self.user,
           'name':self.name,
           'date_created':self.date_created,
           'due_date':self.due_date,
           'amount':self.amount,
           # This is an example how to deal with Many2Many relations
       }
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
            # print("received token : ",token)
            # print(app.config['SECRET_KEY'])
            data = jwt.decode(token, app.config['SECRET_KEY'],algorithms=["HS256"])
            # print("data",data)
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
  
    res = jsonify({'users': output})
    res.headers['Access-Control-Allow-Origin'] = '*'
    return res
  

# def user_has_exceeded_send_email(current_user):
    

@app.route('/getinfo',methods=['GET'])
@token_required
def get_info(current_user):
    output = {}
    
    output['public_id'] = current_user.public_id
    output['name'] = current_user.name
    output['email'] = current_user.email
    output['monthly_limit'] = current_user.monthly_limit
    output['phone_number'] = current_user.phone_number
    output['income'] = current_user.income

    res = jsonify({'users': output})
    res.headers['Access-Control-Allow-Origin'] = '*'
    return res
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
        res =  make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="User does not exist !!"'}
        )
        res.headers['Access-Control-Allow-Origin'] = '*'
        return res
  
    if check_password_hash(user.password, auth.get('password')):
        # generates the JWT Token
        token = jwt.encode({
            'public_id': user.public_id,
            'exp' : datetime.utcnow() + timedelta(minutes = 24*60*10)
        }, app.config['SECRET_KEY'],algorithm="HS256")
  
        res = make_response(jsonify({'token' : token}), 201)
        res.headers['Access-Control-Allow-Origin'] = '*'
        return res
    # returns 403 if password is wrong
    res = make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate' : 'Basic realm ="Wrong Password !!"'}
    )
    res.headers['Access-Control-Allow-Origin'] = '*'
    return res

  
# signup route
@app.route('/signup', methods =['POST'])
def signup():
    # creates a dictionary of the form data
    data = request.form
  
    # gets name, email and password
    name, email = data.get('name'), data.get('email')
    password = data.get('password')
    income = data.get('income')
    monthly_limit = data.get('monthly_limit')
    phone_number = data.get('phone_number')
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
            password = generate_password_hash(password),
            income = income,
            monthly_limit = monthly_limit,
            phone_number = phone_number
        )
        # insert user
        db.session.add(user)
        db.session.commit()
  
        res = make_response('Successfully registered.', 201)
        res.headers['Access-Control-Allow-Origin'] = '*'
    else:
        # returns 202 if user already exists
        res = make_response('User already exists. Please Log in.', 202)
        res.headers['Access-Control-Allow-Origin'] = '*'
    return res


@app.route('/bills', methods =['GET'])
@token_required
def get_bills(current_user):
    bills = Bills.query.filter_by(user=current_user.public_id).all()
    if bills is None:
        bills = []
    res = make_response(jsonify({'records':[i.serialize for i in bills]}),201)
    res.headers['Access-Control-Allow-Origin'] = '*'
    return res


@app.route('/records', methods =['GET'])
@token_required
def get_record(current_user):
    records = Record.query.filter_by(user=current_user.public_id).all()
    if records is None:
        records = {}
    res = make_response(jsonify({'records':[i.serialize for i in records]}),201)
    res.headers['Access-Control-Allow-Origin'] = '*'
    return res

@app.route('/records', methods =['POST'])
@token_required
def put_record(current_user):
    form = request.form
    if not form :
        res= make_response('could not add record no data received',401)
        res.headers['Access-Control-Allow-Origin'] = '*'
        return res
    if not form.get('category') or (form.get('gain') is None) or not form.get('amount') :
        res = make_response('could not add record no enough data received',401)
        res.headers['Access-Control-Allow-Origin'] = '*'
        return res
    record = Record(
        user=current_user.public_id,
        category=form.get('category') if form.get('category') else default_info['category'], 
        amount=form.get('amount'),
        gain=form.get('gain')=="True"
        )
    
    db.session.add(record)
    db.session.commit()
    res = make_response("sucessfully added record",201)

    # res = jsonify("")
    res.headers['Access-Control-Allow-Origin'] = '*'
    return res


@app.route('/bills', methods =['POST'])
@token_required
def put_bills(current_user):
    form = request.form
    if not form :
        res= make_response('could not add record no data received',401)
        res.headers['Access-Control-Allow-Origin'] = '*'
        return res
    if not form.get('amount') or not form.get('due_date') or not form.get('amount') or not form.get('bill_name'):
        res = make_response('could not add record no enough data received',401)
        res.headers['Access-Control-Allow-Origin'] = '*'
        return res
    bills = Bills(
        user=current_user.public_id,
        amount=form.get('amount'),
        due_date=datetime.strptime(form.get('due_date'), "%m/%d/%Y").date(),
        name = form.get('bill_name')
        )
    
    db.session.add(bills)
    db.session.commit()
    res = make_response("sucessfully added bill",201)
    res.headers['Access-Control-Allow-Origin'] = '*'
    return res


@app.route('/dashboard', methods =['GET'])
@token_required
def dashboard(current_user):
    dt = datetime.utcnow()
    record_this_month = Record.query.filter_by(user=current_user.public_id).filter(db.extract('year',Record.date_created)==dt.year,db.extract('month',Record.date_created)==dt.month)
    record_last_seven_days = Record.query.filter_by(user=current_user.public_id).filter(Record.date_created > (dt-timedelta(days=7))).all()
    last_week_spending = sum([-1*i.amount if i.gain else i.amount for i in record_last_seven_days])
    current_month_spending = sum([-1*i.amount if i.gain else i.amount for i in record_this_month.all()])
    if dt.month >1:
       last_month_spending =  Record.query.filter_by(user=current_user.public_id).filter(db.extract('month',Record.date_created)==dt.month-1,db.extract('year',Record.date_created)==dt.year).all()
    else:
        last_month_spending =  Record.query.filter_by(user=current_user.public_id).filter(db.extract('month',Record.date_created)==12,db.extract('year',Record.date_created)==dt.year-1).all()
    income = current_user.income if current_user.income is not None else 0
    balance = income - current_month_spending
    by_category = record_this_month.filter_by(gain=False).with_entities(Record.category, db.func.sum(Record.amount)).group_by(Record.category).all()
    category_list = {}
    for x,y in by_category:
        category_list[x] = y
    response_obj = make_response(jsonify({'last_week_spending':last_week_spending,'expense_by_category':category_list,'income':income,'balance':balance,'monthly_limit':current_user.monthly_limit,'current_month_spending':current_month_spending}),201)
    response_obj.headers['Access-Control-Allow-Origin'] = '*'
    return  response_obj

@app.route('/budget',methods=['POST'])
@token_required
def addbudget(current_user):
    form = request.form
    limit = form.get('budget')
    current_user.monthly_limit = limit
    db.session.add(current_user)
    db.session.commit()
    res = make_response("sucessfully added budget",201)
    res.headers['Access-Control-Allow-Origin'] = '*'
    return res
@app.before_first_request
def create_tables():
    db.create_all()




if __name__ == "__main__":
    # setting debug to True enables hot reload
    # and also provides a debugger shell
    # if you hit an error while running the server
    app.run(debug = True,host="0.0.0.0")

