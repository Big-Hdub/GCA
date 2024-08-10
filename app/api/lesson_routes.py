from flask import Blueprint, request
from flask_login import login_required
from app.models import Curriculum, db
from app.models.student import Student
from app.models.student_curriculum import StudentCurriculum

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


@lessons_routes.route('/<int:lesson_id>', methods=["POST"])
@login_required
def assign_lesson(lesson_id):
    """
    Change status of a lesson to complete
    """
    data = request.get_json(force=True, cache=True)
    if data['student']:
        student = Student.query.filter(Student.user_id==int(data['student'])).first()
        lesson = StudentCurriculum.query.filter(StudentCurriculum.student_id == student.id, StudentCurriculum.curriculum_id == int(lesson_id)).first()
        # lesson=StudentCurriculum.query.get(lesson_id)
        lesson.assigned=True
        db.session.commit()
        return lesson.to_dict()


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
