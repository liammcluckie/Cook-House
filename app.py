import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

# Connect to database
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)


# Homepage
@app.route("/")
@app.route("/home")
def home():
    """ Return and render homepage template """

    return render_template("home.html")


# Delete expired events
def delete_expired_events():
    """ Store the current date as a string in a variable
    Loop through all events and store events date in a variable
    If the event date is greater than the current date and remove from db """

    current_date = datetime.now()
    current_date_string = current_date.strftime("%Y-%m-%d")
    events = list(mongo.db.events.find())

    for event in events:
        event_date = event['date']

        if current_date_string > event_date:
            mongo.db.events.remove(event)
            print(event_date)


# Retrieve events/supper clubs
@app.route("/get_event")
def get_event():
    """ Get all event documents from DB
    Sort in ascending date order
    Call delete expired dates function """

    events = list(mongo.db.events.find().sort("date", 1))
    delete_expired_events()
    return render_template("supper-club.html", events=events)


# Events search functionality
@app.route("/search", methods=["GET", "POST"])
def search():
    """ Retrieve user input from search box
    Perform text search for events in DB
    Output retrieved events """

    query = request.form.get("query")
    events = list(mongo.db.events.find({"$text": {"$search": query}}))
    return render_template("supper-club.html", events=events)


# Register new user
@app.route("/register", methods=["GET", "POST"])
def register():
    """ Check that username is unique
    Store successful registered user info in DB
    Perform password hash to encrypt
    return new user profile page with correct info
    Call delete expired events function """

    if request.method == "POST":
        # check if username exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            flash("Sorry username already exists")
            return redirect(url_for("register"))

        register = {
            # get user data from name attribute
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(request.form.get("password")),
            "profile_pic": request.form.get("profile_pic")
        }
        mongo.db.users.insert_one(register)

        # put the new user into 'session'
        session["user"] = request.form.get("username").lower()
        flash("Registration Successful!")
        delete_expired_events()
        return redirect(url_for("profile", username=session["user"]))

    return render_template("register.html")


# User Sign in
@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():
    """ Search DB to find registered user
    Check users details and put user into a session
    Call delete expired events function
    Return user to profile page or redirect if incorrect """

    if request.method == "POST":
        # check if username exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # ensure hashed password matches
            if check_password_hash(
                existing_user["password"], request.form.get("password")):
                    session["user"] = request.form.get("username").lower()
                    flash("Hello, {}! Welcome to cook house".format(
                        request.form.get("username")))
                    delete_expired_events()
                    return redirect(url_for(
                        "profile", username=session["user"]))
            else:
                # Invalid password
                flash("Incorrect username/password")
                return redirect(url_for("sign_in"))

        else:
            # username doesn't exist
            flash("Incorrect username/password")
            return redirect(url_for("sign_in"))

    return render_template("sign-in.html")


# User profile page
@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    """ Find username in DB stored in a session
    Find user object from the current session["user"]
    Find session users created events
    Call delete expired events function
    Return profile page with events, username and image """

    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]
    user_profile = mongo.db.users.find_one({"username": session["user"]})
    events = list(mongo.db.events.find({"created_by": session["user"]}))

    if session["user"]:
        delete_expired_events()
        return render_template("profile.html",
            username=username, events=events,
            user_profile=user_profile)

    return redirect(url_for("sign_in"))


# Sign user out
@app.route("/sign-out")
def sign_out():
    """ Remove session user
    Return sign in page """

    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("sign_in"))


# Contact page
@app.route("/contact")
def contact():
    """ Render and return contact page """

    return render_template("contact.html")


# Create event/supper club
@app.route("/create-event", methods=["GET", "POST"])
def create_event():
    """ Retrieve all user form data
    Convert counter input into an integer
    Insert event document into DB
    Call delete expired events function
    Find and sort category name order
    Redirect to get event page """

    if request.method == "POST":
        event = {
            "event_name": request.form.get("event_name"),
            "location": request.form.get("location"),
            "category_name": request.form.get("category_name"),
            "date": request.form.get("date"),
            "starter": request.form.get("starter"),
            "main": request.form.get("main"),
            "dessert": request.form.get("dessert"),
            "extras": request.form.get("extras"),
            "counter": int(request.form.get("counter")),
            "created_by": session["user"]
        }
        mongo.db.events.insert_one(event)
        flash("Supper Club Successfully Added")
        delete_expired_events()
        return redirect(url_for("get_event"))

    categories = mongo.db.categories.find().sort("category_name", 1)
    return render_template("create-event.html", categories=categories)


# Update event guest counter and email addresses
@app.route("/update-counter/<event_id>", methods=["GET", "POST"])
def update_event_guests(event_id):
    """ Store counter input as an integer in a variable
    Update counter item in DB with user input that matched object id
    Add attending guests email to DB as an object within an array
    Return supper club page """

    if request.method == "POST":
        update = {"counter": int(request.form.get("counter"))}
        # join_email = {"guest_email": request.form.get("join_event_email")}

        mongo.db.events.update({"_id": ObjectId(event_id)},
            {"$set": update})
        mongo.db.events.update({"_id": ObjectId(event_id)},
            {"$push": {"guest_emails": {
                "guest_emails": request.form.get("join_event_email")}}})
        flash("Supper Club Successfully Joined!")
        return redirect(url_for("get_event"))

    event = mongo.db.events.find_one({"_id": ObjectId(event_id)})
    return render_template("supper-club.html", event=event)


# Edit event
@app.route("/edit-event/<event_id>", methods=["GET", "POST"])
def edit_event(event_id):
    """ Find event object id to update
    Sort category names order
    Submit updated user event input to matching object id
    Redirect user to profile page """

    if request.method == "POST":
        submit = {
            "event_name": request.form.get("event_name"),
            "location": request.form.get("location"),
            "category_name": request.form.get("category_name"),
            "date": request.form.get("date"),
            "starter": request.form.get("starter"),
            "main": request.form.get("main"),
            "dessert": request.form.get("dessert"),
            "extras": request.form.get("extras"),
            "counter": int(request.form.get("counter")),
            "created_by": session["user"]
        }
        mongo.db.events.update({"_id": ObjectId(event_id)}, submit)
        flash("Supper Club Successfully Updated")
        return redirect(url_for("profile", username=session['user']))

    event = mongo.db.events.find_one({"_id": ObjectId(event_id)})
    categories = mongo.db.categories.find().sort("category_name", 1)
    return render_template("edit-event.html", event=event, categories=categories)


# Delete event
@app.route("/delete-event/<event_id>")
def delete_event(event_id):
    """ Find matching event object id in DB and remove
    Return user to profile """

    mongo.db.events.remove({"_id": ObjectId(event_id)})
    flash("Supper Club Successfully Deleted")
    return redirect(url_for("profile", username=session['user']))


# Supper club
@app.route("/supper-club")
def supper_club():
    """ Render supper club page """

    return render_template("supper-club.html")


# Custom error pages

# Authorization error
@app.errorhandler(401)
def auth_error(e):
    return render_template("401.html"), 401


# Permissions error
@app.errorhandler(403)
def permission_error(e):
    return render_template("403.html"), 403


# Invalid URL
@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


# Server Error
@app.errorhandler(500)
def server_error(e):
    return render_template("500.html"), 500


# Gateway error
@app.errorhandler(502)
def gateway_error(e):
    return render_template("502.html"), 502


# Maintenance error
@app.errorhandler(503)
def maintenance_error(e):
    return render_template("503.html"), 503


# Server Response error
@app.errorhandler(504)
def server_response_error(e):
    return render_template("504.html"), 504


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
