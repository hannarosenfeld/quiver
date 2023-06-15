from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField



class QuestionForm(FlaskForm):
    title = StringField('Start your question with "What", "How", "Why", etc.', validators=[DataRequired()])
