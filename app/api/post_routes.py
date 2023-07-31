from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, Comment, db, Upvote, Downvote

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

# Get ONE post
@post_routes.route('/<int:id>', methods=["GET"])
def get_one_post(id):
    post = Post.query.get(id)
    if post:
        return jsonify({'post': post.to_dict()})
    return jsonify({'message': 'Post not found'}), 404


@post_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if post:
        db.session.delete(post)
        db.session.commit()
        return {"message": "successful"}
    return jsonify({'message': 'Post not found'}), 404

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

    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

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

    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

@post_routes.route("/<int:id>/comments/<int:comment_id>/", methods=["DELETE"])
@login_required
def delete_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    if comment and comment.post_id == id:
        db.session.delete(comment)
        db.session.commit()
        return {"message": "successful"}
    return jsonify({'message': 'Comment not found'}), 404

@post_routes.route('/<int:id>/upvotes/', methods=["GET"])
def get_upvotes_for_post(id):
    post = Post.query.get(id)
    if post:
        return jsonify({'upvotes': [upvote.to_dict() for upvote in post.upvotes]})
    return jsonify({'message': 'Post not found'}), 404


@post_routes.route('/<int:id>/upvotes/', methods=["PUT", "DELETE"])
@login_required
def handle_upvote(id):
    post = Post.query.get(id)

    if post:
        if request.method == "PUT":
            # Check if the user has already upvoted the post
            if any(upvote.user_id == current_user.id for upvote in post.upvotes):
                return jsonify({'message': 'You have already upvoted this post'}), 400

            new_upvote = Upvote(user_id=current_user.id, post_id=post.id)
            db.session.add(new_upvote)
            db.session.commit()

            return jsonify({'message': 'Upvote added successfully'}), 201

        elif request.method == "DELETE":
            # Find the upvote associated with the current user and remove it
            upvote_to_remove = next((upvote for upvote in post.upvotes if upvote.user_id == current_user.id), None)

            if upvote_to_remove:
                db.session.delete(upvote_to_remove)
                db.session.commit()
                return jsonify({'message': 'Upvote removed successfully'}), 200
            else:
                return jsonify({'message': 'You have not upvoted this post'}), 400

    return jsonify({'message': 'Post not found'}), 404


@post_routes.route('/<int:id>/downvotes/', methods=["PUT", "DELETE"])
@login_required
def handle_downvote(id):
    post = Post.query.get(id)

    if post:
        if request.method == "PUT":
            # Check if the user has already downvoted the post
            if any(downvote.user_id == current_user.id for downvote in post.downvotes):
                return jsonify({'message': 'You have already downvoted this post'}), 400

            new_downvote = Downvote(user_id=current_user.id, post_id=post.id)
            db.session.add(new_downvote)
            db.session.commit()

            return jsonify({'message': 'downvote added successfully'}), 201

        elif request.method == "DELETE":
            # Find the downvote associated with the current user and remove it
            downvote_to_remove = next((downvote for downvote in post.downvotes if downvote.user_id == current_user.id), None)

            if downvote_to_remove:
                db.session.delete(downvote_to_remove)
                db.session.commit()
                return jsonify({'message': 'downvote removed successfully'}), 200
            else:
                return jsonify({'message': 'You have not downvoted this post'}), 400

    return jsonify({'message': 'Post not found'}), 404