from flask import Blueprint
from flask_login import current_user, login_required
from app.models import User, Course, Curriculum

courses_routes = Blueprint('courses', __name__)


@courses_routes.route('')
@login_required
def courses():
    """
    Query for all info needed on the courses and returns it in a list of dictionaries
    """
    user = User.query.get(current_user.id)

    if user.settings[0].role=='student':
        return [course.to_dict_courses() for course in user.students[0].courses]

    if user.settings[0].role=='parent':
        return [{'student': child.user.to_dict(),
                'courses': [course.to_dict_courses()
                            for course in child.courses]}
                            for child in user.children]

@courses_routes.route('/<int:course_id>')
@login_required
def course(course_id):
    """
    Query for all info needed in a course and returns it in a dictionary
    """
    user = User.query.get(current_user.id)

    if user.settings[0].role=='student':
        course = Course.query.get(course_id)
        curriculum = Curriculum.query.filter(Curriculum.course_id == course.id).all()
        return {'course': course.to_dict_courses(), 'lessons': [lesson.to_dict() for lesson in curriculum]}

    # if user.settings[0].role=='parent':
    #     return [{'student': child.user.to_dict(),
    #             'courses': [course.to_dict_courses()
    #                         for course in child.courses]}
    #                         for child in user.children]
