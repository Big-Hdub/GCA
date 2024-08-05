from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, StudentCurriculum, Curriculum, Student

lessons_routes = Blueprint('lessons', __name__)


# @lessons_routes.route('')
# @login_required
# def lessons():
#     """
#     Query for all info needed on the lessons and returns it in a list of dictionaries
#     """
#     user = User.query.get(current_user.id)

#     if user.settings[0].role=='student':
#         return [lesson.to_dict_lessons() for lesson in user.students[0].lessons]

#     if user.settings[0].role=='parent':
#         return [{'student': child.user.to_dict(),
#                 'lessons': [lesson.to_dict_lessons()
#                             for lesson in child.lessons]}
#                             for child in user.children]

@lessons_routes.route('/<int:lesson_id>')
@login_required
def lesson(lesson_id):
    """
    Query for all info needed in a lesson and returns it in a dictionary
    """
    lesson = Curriculum.query.get(lesson_id)
    if lesson:
        print(lesson.to_dict())
        return lesson.to_dict_details()

    # if user.settings[0].role=='student':
    #     lesson = Lesson.query.get(lesson_id)
    #     curriculum = Curriculum.query.filter(Curriculum.lesson_id == lesson.id).all()
    #     return {'lesson': lesson.to_dict_lessons(), 'lessons': [lesson.to_dict() for lesson in curriculum]}

    # if user.settings[0].role=='parent':
    #     return [{'student': child.user.to_dict(),
    #             'lessons': [lesson.to_dict_lessons()
    #                         for lesson in child.lessons]}
    #                         for child in user.children]
