from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, Comment, db
from app.forms.post_form import PostForm
from app.forms.comment_form import CommentForm


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
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return {"message": "successful"}


@post_routes.route('/', methods=["POST"])
def add_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newPost = Post(
            content=form.data['content'],
            user_id=current_user.id,
        )

        db.session.add(newPost)
        db.session.commit()
        dict_new_post = newPost.to_dict()

        return dict_new_post
    
@post_routes.route('/<int:id>/comments/', methods=["POST"])
def add_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newComment = Comment(
            comment=form.data['comment'],
            user_id=current_user.id,
            post_id=id
        )

        db.session.add(newComment)
        db.session.commit()
        dict_new_comment = newComment.to_dict()

    return dict_new_comment

@post_routes.route("/<int:id>/comments/<int:comment_id>/", methods=["DELETE"])
@login_required
def delete_answer(id, comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return {"message": "successful"}