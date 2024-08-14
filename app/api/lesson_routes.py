from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Curriculum, User, db
from app.models.student import Student
from app.models.student_curriculum import StudentCurriculum

lessons_routes = Blueprint('lessons', __name__)


@lessons_routes.route('/<int:lesson_id>')
@login_required
def lesson(lesson_id):
    """
    Query for all info needed in a lesson and returns it in a dictionary
    """
    user = User.query.get(current_user.id)

    lesson = Curriculum.query.get(lesson_id)
    if user.settings[0].role=='student' and lesson:
        return lesson.to_dict_details()
    if user.settings[0].role=='parent' and lesson:
        return lesson.to_dict_parent()
    if user.settings[0].role=='teacher' and lesson:
        pass


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
    if data['complete']==True and 'child' in data:
        student = Student.query.filter(Student.user_id==data['child']).first()
        db.session.flush()
        lesson = StudentCurriculum.query.filter(StudentCurriculum.curriculum_id==lesson_id, StudentCurriculum.student_id==student.id).first()
        if lesson:
            lesson.complete=True
            db.session.commit()
            return lesson.curriculum.to_dict_parent()
        else:
            return {'error': 'Unable to mark as complete.'}
    user = User.query.get(current_user.id)
    db.session.flush()
    lesson = StudentCurriculum.query.filter(StudentCurriculum.curriculum_id==lesson_id, StudentCurriculum.student_id==user.students[0].id).first()
    if lesson and data['complete']==True:
        lesson.complete=True
        db.session.commit()
        return lesson.curriculum.to_dict_details()
