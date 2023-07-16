from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class ChangePicForm(FlaskForm):
    profile_pic = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
