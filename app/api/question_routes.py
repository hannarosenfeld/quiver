from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Question, Answer, db
from app.forms.question_form import QuestionForm

question_routes = Blueprint('questions', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@question_routes.route('/<int:id>/answers/')
def allAnswers(id):
    answers = Answer.query.filter(Answer.question_id == id).all()
    print("🥹",answers)
    return {'answers': [answer.to_dict() for answer in answers]}

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
    
@question_routes.route("/<int:id>/", methods=["PUT"])
def edit_question(id):
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        question = Question.query.filter(Question.id == id).first()
        question.title = form.data["title"]

        db.session.commit()
        return question.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@question_routes.route("/<string:title>", methods=["DELETE"])
@login_required
def delete_question(title):
    question = Question.query.get(title)
    db.session.delete(question)
    db.session.commit()
    return {"message": "successful"}

# @question_routes.route('/<string:title>')
# def question(id):
#     """
#     Query for a question by title and returns that question in a dictionary
#     """
#     question = Question.query.get(id)
#     return question.to_dict()