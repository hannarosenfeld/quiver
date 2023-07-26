from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Question, Answer, Upvote, Downvote, db
from app.forms.question_form import QuestionForm
from app.forms.answer_form import AnswerForm

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


@question_routes.route('/')
def allQuestions():
    """
    Query for all questions and returns them in a list of question dictionaries
    """
    questions = Question.query.all()
    return {'questions': [question.to_dict() for question in questions]}


@question_routes.route("/<string:title>", methods=["GET"])
def get_question(title):
    question = Question.query.get(title)

    return {'question': question.to_dict()}


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

@question_routes.route('/<int:id>/answers/')
def allAnswers(id):
    answers = Answer.query.filter(Answer.question_id == id).all()

    answer_dict = []

    for answer in answers:
        answer_dict.append(answer.to_dict())

    return answer_dict

print("🐋 in router")
@question_routes.route('/<int:id>/answers/<int:answerId>')
def oneAnswer(id, answerId):
    print("🌵 in route")
    answer = Answer.query.filter(Answer.question_id == answerId).all()
    print("🇬🇧 answer: ", answer)
    return answer


@question_routes.route('/<int:id>/answers/', methods=["POST"])
def add_answer(id):
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newAnswer = Answer(
            answer=form.data['answer'],
            user_id=current_user.id,
            question_id=id
        )

        db.session.add(newAnswer)
        db.session.commit()
        dict_new_answer = newAnswer.to_dict()

    return dict_new_answer

@question_routes.route("/<int:id>/answers/<int:answer_id>/", methods=["PUT"])
def edit_answer(id, answer_id):
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        answer = Answer.query.filter(Answer.id == answer_id).first()
        answer.answer = form.data["answer"]

        db.session.commit()
        return answer.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@question_routes.route("/<int:id>/answers/<int:answer_id>/", methods=["DELETE"])
@login_required
def delete_answer(id, answer_id):
    answer = Answer.query.get(answer_id)
    db.session.delete(answer)
    db.session.commit()
    return {"message": "successful"}

@question_routes.route('/<int:id>/answers/<int:answerId>/upvotes/', methods=["GET"])
def get_upvotes_for_answer(id, answerId):
    answer = Answer.query.get(answerId)
    if answer:
        upvotes = [upvote.to_dict() for upvote in answer.upvotes]
        return jsonify({'upvotes': upvotes})
    return jsonify({'message': 'answer not found'}), 404

@question_routes.route('/<int:id>/answers/<int:answerId>/upvotes/', methods=["PUT", "DELETE"])
@login_required
def handle_upvote(id, answerId):
    answer = Answer.query.get(answerId)

    if answer:
        if request.method == "PUT":
            # Check if the user has already upvoted the answer
            if any(upvote.user_id == current_user.id for upvote in answer.upvotes):
                return jsonify({'message': 'You have already upvoted this answer'}), 400

            new_upvote = Upvote(user_id=current_user.id, answer_id=answerId)
            db.session.add(new_upvote)
            db.session.commit()

            return jsonify({'message': 'Upvote added successfully'}), 201

        elif request.method == "DELETE":
            # Find the upvote associated with the current user and remove it
            upvote_to_remove = next((upvote for upvote in answer.upvotes if upvote.user_id == current_user.id), None)

            if upvote_to_remove:
                db.session.delete(upvote_to_remove)
                db.session.commit()
                return jsonify({'message': 'Upvote removed successfully'}), 200
            else:
                return jsonify({'message': 'You have not upvoted this answer'}), 400

    return jsonify({'message': 'answer not found'}), 404