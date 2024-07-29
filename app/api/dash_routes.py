from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User, Student

dash_routes = Blueprint('dashs', __name__)


@dash_routes.route('')
@login_required
def dashs():
    """
    Query for all info needed on the dashboard and returns it in a list of dictionaries
    """
    user = User.query.get(current_user.id)
    if user.settings[0].role=='student':
        lessons=[lesson for lesson in user.students[0].complete if (lesson.complete==False and lesson.assigned==True)]
        return [lesson.curriculum.to_dict_student_dash() for lesson in lessons]
    if user.settings[0].role=='parent':
        return [{'student': child.user.to_dict(), 'lessons': [[lesson.complete, lesson.curriculum.to_dict_student_dash()] for lesson in child.complete if (lesson.assigned==True)], } for child in user.children]
