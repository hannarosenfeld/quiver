from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(5000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable = False)

    user = db.relationship('User', back_populates='answer')
    question = db.relationship('Question', back_populates='answer')

    def to_dict(self):
        return {
            'id': self.id,
            'answer': self.answer,
            'user': self.user.to_dict(),
            'question': self.question.to_dict()
        }
