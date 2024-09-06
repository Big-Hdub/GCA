from flask import Blueprint
from flask_login import current_user, login_required
from app.models import User

dash_routes = Blueprint('dashs', __name__)


@dash_routes.route('')
@login_required
def dashs():
    """
    Query for all info needed on the dashboard and returns it in a list of dictionaries
    """
    user = User.query.get(current_user.id)
    if user.settings[0].role=='student':
        return [lesson.to_dict_student_dash()
                for lesson in user.students[0].complete
                if (lesson.complete==False and lesson.assigned==True)]
    if user.settings[0].role=='parent':
        return [{
            'student': child.user.to_dict(),
            'lessons': [[lesson.complete,
                        lesson.curriculum.to_dict_student_dash()]
                        for lesson in child.complete
                        if (lesson.assigned==True)], }
                for child in user.children]
    if user.settings[0].role=='teacher':
        return user.to_dict_teacher_dash()
    if user.settings[0].role=='admin':
        teachers =  User.query.all()
        return [{'teacher': teacher.to_dict(), 'courses': teacher.to_dict_teacher_dash()} for teacher in teachers if teacher.settings[0].role=='teacher']
