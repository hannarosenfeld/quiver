from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Answer, db
from app.forms.answer_form import AnswerForm

answer_routes = Blueprint('answers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@answer_routes.route('/')
def allanswers():
    """
    Query for all answers and returns them in a list of answer dictionaries
    """
    answers = Answer.query.all()
    return {'answers': [answer.to_dict() for answer in answers]}

@answer_routes.route('/', methods=["POST"])
def add_answer():
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newAnswer = Answer(
            title=form.data['title'],
            user_id=current_user.id,
        )

        db.session.add(newAnswer)
        db.session.commit()
        dict_new_answer = newAnswer.to_dict()

        return dict_new_answer
    
@answer_routes.route("/<int:id>", methods=["PUT"])
def edit_answer(id):
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        answer = Answer.query.filter(answer.id == id).first()
        answer.title = form.data["title"]

        db.session.commit()
        return answer.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@answer_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_answer(id):
    answer = Answer.query.get(id)
    db.session.delete(answer)
    db.session.commit()
    return {"message": "successful"}