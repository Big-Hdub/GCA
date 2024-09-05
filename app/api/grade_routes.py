from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import User, db, Course, Grade

grade_routes = Blueprint('grades', __name__)


@grade_routes.route('', methods=['GET'])
@login_required
def grades():
    """
    Query for all grade info by user type and returns it as a dictionary
    """
    user = User.query.get(current_user.id)
    if user.settings[0].role=='student':
        return { 'grades': [grade.to_dict() for grade in user.students[0].grades],
                'complete': [complete.to_dict() for complete in user.students[0].complete]}

    if user.settings[0].role=='parent':
        return {'children': [{'child': child.user.to_dict(),
                            'grades': [grade.to_dict() for grade in child.grades],
                            'complete': [complete.to_dict() for complete in child.complete]}
                            for child in user.children],
                'parent': user.to_dict()}

    if user.settings[0].role=='teacher':
        courses = Course.query.filter(Course.teacher_id==user.id).all()
        return {'courses':
            [{ 'course': course.to_dict(),
            'students': [{'student': student.user.to_dict(),
                        'grade': [grade.to_dict() for grade in student.grades if grade.course_id==course.id],
                        'complete': [complete.to_dict() for complete in student.complete if complete.curriculum.course_id==course.id]}
                for student in course.students]}
            for course in courses]}

    if user.settings[0].role=='admin':
        courses = Course.query.all()
        return {'courses':
            [{ 'course': course.to_dict(),
            'students': [{'student': student.user.to_dict(),
                        'grade': [grade.to_dict() for grade in student.grades if grade.course_id==course.id],
                        'complete': [complete.to_dict() for complete in student.complete if complete.curriculum.course_id==course.id]}
                for student in course.students]}
            for course in courses]}

@grade_routes.route('/<int:grade_id>', methods=['PUT'])
@login_required
def update_grade(grade_id):
    """
    Update grade for student
    """
    data = request.get_json(force=True, cache=True)
    grade = Grade.query.get(grade_id)
    if grade:
        grade.grade=data['grade']
        db.session.commit()
        return grade.to_dict()
    else:
        return {'message': 'Grade not found'}, 404
