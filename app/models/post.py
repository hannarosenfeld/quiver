from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(5000), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)

    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'content': self.content,
            'comment': [{'id': comment.id, 'comment': comment.comment, 'user': comment.user.to_dict()} for comment in self.comments],
            'created_at': self.created_at
        }
