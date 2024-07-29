from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Setting, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/settings', methods=['PUT'])
@login_required
def user_settings(id):
    """
    Update a users settings
    """
    user = User.query.filter(User.id==id).first()
    if user:
        if request.json['theme']:
            user.settings[0].theme='dark' if user.settings[0].theme=='light' else 'light'
        if request.json['font']:
            user.settings[0].font_size = int(request.json['font'])
        db.session.commit()
    return user.to_dict_session()
