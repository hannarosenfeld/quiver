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
    upvotes = db.relationship('Upvote', back_populates='post', cascade='all, delete-orphan')
    downvotes = db.relationship('Downvote', back_populates='post', cascade='all, delete-orphan')

    def to_dict(self):
        # upvotes_count = len(self.upvotes)
        # downvotes_count = len(self.downvotes)

        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'content': self.content,
            'comments': [{'id': comment.id, 'comment': comment.comment, 'user': comment.user.to_dict(), 'post_id': comment.post_id} for comment in self.comments],
            'upvotes': [{'user_id': upvote.user_id} for upvote in self.upvotes],
            'downvotes': [{'user_id': downvote.user_id} for downvote in self.downvotes],
            'created_at': self.created_at
        }
