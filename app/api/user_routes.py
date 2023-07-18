from flask import Blueprint, jsonify, request, render_template
from flask_login import login_required
from app.models import User, db
from app.forms import ChangePicForm
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def profile_pic(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    print("🐳 in backend")
    user = User.query.get(id)
    print("🐡 user", user)
    print("🐳 form", ChangePicForm())

    form = ChangePicForm()
    print("🐳 form", form)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        profile_pic = form.data["profile_pic"]
        print("🐳 pic", profile_pic)
        profile_pic.filename = get_unique_filename(profile_pic.filename)
        upload = upload_file_to_s3(profile_pic)

        if "url" not in upload:
            return render_template("post_form.html", form=form, type="post", errors=[upload])
        
        user.profile_pic=upload["url"]

        print("🐕 user: ", user)
        print("🦃 profile pic", user.profile_pic)

        db.session.commit()
        return user.to_dict()
    
    return {"Test": "Test"}
