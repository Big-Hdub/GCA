from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, Student, db

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

    # if user.settings[0].role=='parent':
    #     return {'children': [child.user.to_dict() for child in user.children],
    #             'parent': user.to_dict()}
