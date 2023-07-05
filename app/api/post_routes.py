from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, db

post_routes = Blueprint('posts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@post_routes.route('/')
def allPosts():
    """
    Query for all posts and returns them in a list of post dictionaries
    """
    print("⛑️ halloooooooo")
    posts = Post.query.all()
    print("👁️posts:", posts)
    return {'posts': [post.to_dict() for post in posts]}