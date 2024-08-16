from flask import Blueprint
from flask_login import current_user, login_required
from app.models import User
from app.models.course import Course

grade_routes = Blueprint('grades', __name__)


@grade_routes.route('', methods=['GET'])
@login_required
def account():
    """
    Query for all grade info by user type and returns it as a dictionary
    """
    user = User.query.get(current_user.id)
    if user.settings[0].role=='student':
        return { 'grades': [grade.to_dict() for grade in user.students[0].grades]}

    if user.settings[0].role=='parent':
        return {'children': [{'child': child.user.to_dict(), 'complete': [grade.to_dict() for grade in child.grades]} for child in user.children],
                'parent': user.to_dict()}

    if user.settings[0].role=='teacher':
        courses = Course.query.filter(Course.teacher_id==user.id).all()
        return {'courses': [{ 'course': course.to_dict(), 'students': [{'student': student.user.to_dict(), 'complete': [grade.to_dict() for grade in student.grades]} for student in course.students]} for course in courses]}
