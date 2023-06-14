from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)

    user = db.relationship('User', back_populates='question')
    answer = db.relationship('Answer', back_populates='question')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user': self.user.to_dict()
        }
