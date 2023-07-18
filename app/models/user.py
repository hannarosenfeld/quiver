from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


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

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'answers': [{'id': answer.id, 'answer': answer.answer, 'question_title': answer.question.title, 'question_id': answer.question.id} for answer in self.answers],
            'questions': [ {'id': question.id, 'title' : question.title, 'answers': [answer.answer for answer in question.answers]} for question in self.questions],
            'posts': [ {'id': post.id, 'content' : post.content, 'comments': [comment.comment for comment in post.comments], 'created_at': post.created_at} for post in self.posts],
        }
