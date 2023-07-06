from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    content = StringField('Write your post', validators=[DataRequired()])
