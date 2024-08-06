from flask import Blueprint, request
from flask_login import login_required
from app.models import Curriculum, db

lessons_routes = Blueprint('lessons', __name__)


@lessons_routes.route('/<int:lesson_id>')
@login_required
def lesson(lesson_id):
    """
    Query for all info needed in a lesson and returns it in a dictionary
    """
    lesson = Curriculum.query.get(lesson_id)
    if lesson:
        return lesson.to_dict_details()


@lessons_routes.route('/<int:lesson_id>', methods=["PUT"])
@login_required
def complete_lesson(lesson_id):
    """
    Change status of a lesson to complete
    """
    data = request.get_json(force=True, cache=True)
    lesson = Curriculum.query.get(lesson_id)
    if lesson and data['complete']==True:
        lesson.complete[0].complete=True
        db.session.commit()
        return lesson.to_dict_details()
