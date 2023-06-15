from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Question

question_routes = Blueprint('questions', __name__)

print("🤓 def in the question_routes file!!")

@question_routes.route('/')
def allQuestions():
    """
    Query for all questions and returns them in a list of question dictionaries
    """
    print("😎 in allQuestion route")
    questions = Question.query.all()
    print("😇", questions)
    return {'questions': [question.to_dict() for question in questions]}


@question_routes.route('/<string:title>')
def question(id):
    """
    Query for a question by title and returns that question in a dictionary
    """
    question = Question.query.get(id)
    return question.to_dict()