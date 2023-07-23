from .db import db, environment, SCHEMA, add_prefix_for_prod


class Upvote(db.Model):
    __tablename__ = 'upvotes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')))
    answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('answers.id')))

    user = db.relationship('User', back_populates='upvotes', lazy=True)
    post = db.relationship('Post', back_populates='upvotes', lazy=True)
    comment = db.relationship('Comment', back_populates='upvotes', lazy=True)
    answer = db.relationship('Answer', back_populates='upvotes', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
        }
