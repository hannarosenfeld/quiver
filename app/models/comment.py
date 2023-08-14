from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(5000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable = False)

    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')
    upvotes = db.relationship('Upvote', back_populates='comment', lazy=True)
    downvotes = db.relationship('Downvote', back_populates='comment', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user': self.user.to_dict(),
            'post': self.post.to_dict(),
            'post_id': self.post_id,
            'created_at': self.created_at            
        }
