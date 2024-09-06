from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.create_lesson import CreateLesson
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
    if user.settings[0].role in ['admin', 'teacher'] and lesson:
        return lesson.to_dict_teacher_details()


@lessons_routes.route('/<int:lesson_id>', methods=["POST"])
@login_required
def assign_lesson(lesson_id):
    """
    Change status of a lesson to complete
    """
    user = User.query.get(current_user.id)
    data = request.get_json(force=True, cache=True)
    if data['student'] and user.settings[0].role in ['admin', 'teacher']:
        student = Student.query.filter(Student.user_id==int(data['student'])).first()
        lesson = StudentCurriculum.query.filter(StudentCurriculum.student_id == student.id, StudentCurriculum.curriculum_id == int(lesson_id)).first()
        # lesson=StudentCurriculum.query.get(lesson_id)
        lesson.assigned=True
        db.session.commit()
        return lesson.to_dict()
    return {'message': 'Unauthorized'}, 401

@lessons_routes.route('/<int:lesson_id>', methods=["PUT"])
@login_required
def edit_lesson(lesson_id):
    """
    Edit a lesson
    """
    user = User.query.get(current_user.id)
    data = request.get_json(force=True, cache=True)
    if user.settings[0].role=='student':
        if 'complete' in data and data['complete']==True and 'child' in data:
            student = Student.query.filter(Student.user_id==data['child']).first()
            db.session.flush()
            lesson = StudentCurriculum.query.filter(StudentCurriculum.curriculum_id==lesson_id, StudentCurriculum.student_id==student.id).first()
            if lesson:
                lesson.complete=True
                db.session.commit()
                return lesson.curriculum.to_dict_parent()
            else:
                return {'error': 'Unable to mark as complete.'}
        db.session.flush()
        lesson = StudentCurriculum.query.filter(StudentCurriculum.curriculum_id==lesson_id, StudentCurriculum.student_id==user.students[0].id).first()
        if lesson and data['complete']==True:
            lesson.complete=True
            db.session.commit()
            return lesson.curriculum.to_dict_details()
    if user.settings[0].role=='teacher':
        form=CreateLesson()
        form['csrf_token'].data=request.cookies['csrf_token']
        if form.validate_on_submit():
            lesson=Curriculum.query.get(lesson_id)
            db.session.flush()
            if 'title' in data:
                lesson.title=data['title']
            if 'text' in data:
                lesson.text=data['text']
            if 'type' in data:
                lesson.type=data['type']
            db.session.commit()
            return lesson.to_dict_teacher_details()
        else:
            return form.errors, 401
    else:
        return jsonify({ 'message': 'Unauthorized' }), 401

@lessons_routes.route('/<int:lesson_id>', methods=["DELETE"])
@login_required
def delete_lesson(lesson_id):
    """
    Delete a lesson
    """
    user = User.query.get(current_user.id)
    if user.settings[0].role=='teacher':
        lesson=Curriculum.query.get(lesson_id)
        if lesson:
            db.session.delete(lesson)
            db.session.commit()
            return jsonify()({ 'message': 'Successfully deleted' })
        else:
            return jsonify({ 'message': 'Lesson not found'}), 404
    return jsonify({ 'message': 'Unauthorized' }), 401
