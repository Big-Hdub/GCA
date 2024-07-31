from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User, Student

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
