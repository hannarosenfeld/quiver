from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Question, db
from app.forms.question_form import QuestionForm

question_routes = Blueprint('questions', __name__)

@question_routes.route('/')
def allQuestions():
    """
    Query for all questions and returns them in a list of question dictionaries
    """
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}

@question_routes.route('/', methods=["POST"])
def add_question():
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newQuestion = Question(
            title=form.data['title'],
            user_id=current_user.id,
        )

        db.session.add(newQuestion)
        db.session.commit()
        dict_new_question = newQuestion.to_dict()

        return dict_new_question

# @question_routes.route('/<string:title>')
# def question(id):
#     """
#     Query for a question by title and returns that question in a dictionary
#     """
#     question = Question.query.get(id)
#     return question.to_dict()