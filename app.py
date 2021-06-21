import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env
    
 
app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")


mongo = PyMongo(app)


@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/get_event")
def get_event():
    events = mongo.db.events.find()
    return render_template("supper-club.html", events=events)


@app.route("/register", methods=["GET", "POST"])
def register():
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
            "password": generate_password_hash(request.form.get("password"))
        }
        mongo.db.users.insert_one(register)
        
        # put the new user into 'session'
        session["user"] = request.form.get("username").lower()
        flash("Registration Successful!")
        return redirect(url_for("profile", username=session["user"]))
    
    return render_template("register.html")


@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():
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


@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    # get the session username
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]
    
    if session["user"]:
        return render_template("profile.html", username=username)
    
    return redirect(url_for("sign_in"))


@app.route("/sign-out")
def sign_out():
    # remove user from session cookies
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("sign_in"))


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/create-event")
def create_event():
    return render_template("create-event.html")


@app.route("/supper-club")
def supper_club():
    return render_template("supper-club.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"), 
            port=int(os.environ.get("PORT")),
            debug=True) 
    
