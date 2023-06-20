# from flask import Blueprint, jsonify, request
# from flask_login import login_required, current_user
# from app.models import Answer, db
# from app.forms.answer_form import AnswerForm

# answer_routes = Blueprint('answers', __name__)

# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f'{field} : {error}')
#     return errorMessages

# @answer_routes.route('/<int:id>/answers/')
# def allAnswers(id):
#     answers = Answer.query.filter(Answer.question_id == id).all()
#     print("🥹",answers)
#     return {'answers': [answer.to_dict() for answer in answers]}