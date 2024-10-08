from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, Course, Student, db, Curriculum, Grade

students_routes = Blueprint('students', __name__)

@students_routes.route('/<int:student_id>/courses/<int:course_id>', methods=['POST'])
@login_required
def add_course(student_id, course_id):
    user=User.query.get(current_user.id)
    db.session.flush()
    if user.settings[0].role=='admin':
        student=Student.query.filter(Student.user_id==student_id).first()
        db.session.flush()
        course=Course.query.get(int(course_id))
        student.courses.append(course)
        grade=Grade(course_id=course_id, student_id=student.id)
        student.grades.append(grade)
        curriculum=Curriculum.query.filter(Curriculum.course_id==course_id).all()
        for lesson in curriculum:
            student.curriculum.append(lesson)
        db.session.commit()
        return student.to_dict_admin()
    else:
        return jsonify({'message': 'Unautorized'}), 401

@students_routes.route('/<int:student_id>/courses/<int:course_id>', methods=['DELETE'])
@login_required
def remove_course(student_id, course_id):
    user=User.query.get(current_user.id)
    db.session.flush()
    if user.settings[0].role=='admin':
        student=Student.query.filter(Student.user_id==student_id).first()
        db.session.flush()
        course=Course.query.get(int(course_id))
        student.courses.remove(course)
        grade=Grade.query.filter(Grade.course_id==course_id, Grade.student_id==student.id).first()
        db.session.flush()
        if grade:
            student.grades.remove(grade)
        curriculum=Curriculum.query.filter(Curriculum.course_id==course_id).all()
        db.session.flush()
        for lesson in curriculum:
            student.curriculum.remove(lesson)
        db.session.commit()
        return student.to_dict_admin()
    else:
        return jsonify({'message': 'Unauthorized'}), 401
