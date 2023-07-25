from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from itertools import chain
import uuid


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255), default='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')

    answers = db.relationship('Answer', back_populates='user')
    questions = db.relationship('Question', back_populates='user')
    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    upvotes = db.relationship('Upvote', back_populates='user')
    downvotes = db.relationship('Downvote', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def to_dict(self):
        posts = [{'type': 'post','id': post.id, 'content': post.content, 'created_at': post.created_at} for post in self.posts]
        questions = [{'type': 'question','id': question.id, 'title': question.title, 'created_at': question.created_at} for question in self.questions]
        answers = [{'type': 'answer','id': answer.id, 'answer': answer.answer, 'created_at': answer.created_at} for answer in self.answers]

        # Combine posts, questions, and answers into a single list
        combined_array = list(chain(posts, questions, answers))

        # Add a unique ID to each element in the combined array
        for item in combined_array:
            item['unique_id'] = str(uuid.uuid4())  # Generate a random UUID

        # Sort the combined array based on the 'created_at' value
        combined_array.sort(key=lambda item: item['created_at'])

        # Retrieve the user's upvoted post IDs and add them to the dictionary
        upvoted_posts = [upvote.post_id for upvote in self.upvotes]
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'answers': [{'id': answer.id, 'created_at': answer.created_at, 'answer': answer.answer, 'question_title': answer.question.title, 'question_id': answer.question.id} for answer in self.answers],
            'questions': [ {'id': question.id, 'title' : question.title, 'answers': [answer.answer for answer in question.answers], 'question.created_at': question.created_at} for question in self.questions],
            'posts': [ {'id': post.id, 'content' : post.content, 'comments': [comment.comment for comment in post.comments], 'created_at': post.created_at} for post in self.posts],
            'upvoted_posts': upvoted_posts,  # Add upvoted_posts to the dictionary
            'combined_array': combined_array
        }
